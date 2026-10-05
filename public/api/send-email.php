<?php
// Requires PHP 7.4+ and an enabled hosting mail transport.
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
function respond($code, $success, $message) {
    http_response_code($code);
    echo json_encode(['success' => $success, 'message' => $message]);
    exit;
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST'); respond(405, false, 'Method not allowed.');
}
if ((int)($_SERVER['CONTENT_LENGTH'] ?? 0) > 16384) respond(413, false, 'Request too large.');
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin && !in_array(strtolower(parse_url($origin, PHP_URL_HOST) ?? ''), ['alnajah-tdl.net', 'www.alnajah-tdl.net', 'alnajahlab.com', 'www.alnajahlab.com'], true)) {
    respond(403, false, 'Origin not allowed.');
}
$data = json_decode(file_get_contents('php://input', false, null, 0, 16385), true);
if (!is_array($data)) respond(400, false, 'Invalid request.');
function field($data, $key, $max = 200) {
    $value = $data[$key] ?? '';
    if (!is_string($value) || strlen($value) > $max || preg_match('/[\r\n\x00]/', $value)) respond(422, false, 'Invalid field.');
    return trim($value);
}
if (field($data, 'website') !== '') respond(422, false, 'Invalid request.');
$type = field($data, 'type');
$email = field($data, 'email', 254);
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) respond(422, false, 'Valid email required.');
if (!in_array($type, ['case', 'newsletter'], true)) respond(422, false, 'Invalid form.');
$body = "Website enquiry\nEmail: $email\n";
if ($type === 'case') {
    $name = field($data, 'name'); $phone = field($data, 'phone', 60);
    if ($name === '' || $phone === '') respond(422, false, 'Name and phone required.');
    $body .= "Name: $name\nPhone: $phone\nClinic: " . field($data, 'clinic') . "\nService: " . field($data, 'service') . "\n";
}
// Serialize submissions from each IP and limit to five attempts per ten minutes.
$key = hash('sha256', $_SERVER['REMOTE_ADDR'] ?? 'unknown');
$lock = fopen(sys_get_temp_dir() . '/alnajah-mail-' . $key, 'c+');
if (!$lock || !flock($lock, LOCK_EX)) respond(503, false, 'Please try again later.');
$attempts = json_decode(stream_get_contents($lock), true) ?: [];
$attempts = array_values(array_filter($attempts, function ($t) { return is_int($t) && $t > time() - 600; }));
if (count($attempts) >= 5) respond(429, false, 'Please try again later.');
$attempts[] = time(); rewind($lock); ftruncate($lock, 0); fwrite($lock, json_encode($attempts));
flock($lock, LOCK_UN); fclose($lock);
$subject = $type === 'case' ? 'New case enquiry — Al Najah Dental Lab' : 'Newsletter subscription enquiry';
$headers = "From: Al Najah Dental Lab <info@alnajahlab.com>\r\nReply-To: $email\r\nMIME-Version: 1.0\r\nContent-Type: text/plain; charset=UTF-8";
if (!function_exists('mail') || !@mail('info@alnajahlab.com', $subject, $body, $headers)) respond(503, false, 'Mail service unavailable.');
respond(200, true, 'Message accepted by the mail server.');
