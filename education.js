const steps=[
 ['scan.svg','Prepare the scan','Capture a clean full-arch scan with clear margins and a bite registration. Add retracted + natural smile photos for aesthetic cases.'],
 ['upload.svg','Upload or send','Drop open STL files into our partner portal, or arrange impression pickup on our daily GCC courier route.'],
 ['review.svg','Review the design','Receive a 3D Exceed preview within 24 hours. Approve or request adjustments before manufacturing begins.'],
 ['receive.svg','Receive the case','Sterile-packed delivery with a signed QC card. We follow up after seating to confirm fit and function.']
];
const include=[
 ['Required with every case',['Full upper & lower scan','Bite registration','Completed Rx form','Shade photos (aesthetic cases)']],
 ['Supported scanners',['3Shape TRIOS','Medit i700 / i900','iTero Element','CEREC Primescan','Carestream']],
 ['Turnaround at a glance',['Single-unit crown  3 days','Full-arch / aesthetic  5–7 days','Rush service  24–48 hours','Same-day zones  Dubai & Riyadh']]
];
const guidance=[
 ['scan.svg','Scanning best practice','Keep the field dry, capture margins last, and avoid scan jumps. We accept TRIOS, Medit, iTero, Primescan, and Carestream exports.'],
 ['review.svg','File formats we accept','Open STL and PLY from any scanner, plus a completed Rx. No proprietary lock-in — send what your system exports.'],
 ['shade.svg','Communicating shade','Send shade photos under D65 daylight with a tab in frame. Free try-in available for high-stakes aesthetic cases.'],
 ['support.svg','Direct technician support','Talk to the technician handling your case — not a call centre. Reach us by phone, email, or the portal chat.']
];
const icon=n=>`<span class="ep-icon"><img src="/assets/education-page/${n}" alt=""></span>`;
export function renderEducation(){return `<div class="education-page"><div class="ep-inner"><section class="ep-hero"><p class="ep-kicker">Resources & Support</p><h1>Practical guidance for every case.</h1><p>Practical guidance for clinicians, how to submit a case, what to include,<br>and how to get the best result from every restoration.</p></section><section class="ep-steps"><div><p class="ep-kicker">How to Submit a Case</p><h2>Four steps,<br><i>chairside to delivery.</i></h2></div><div class="ep-step-grid">${steps.map(([ic,h,p],i)=>`<article>${icon(ic)}<b>${i+1}</b><h3>${h}</h3><p>${p}</p></article>`).join('')}</div></section><section class="ep-include"><p class="ep-kicker">What to Include</p><h2>Get it right<br><i>the first time.</i></h2><div class="ep-include-grid">${include.map(([h,items])=>`<article><h3>${h}</h3><ul>${items.map(x=>`<li>${x}</li>`).join('')}</ul></article>`).join('')}</div></section><section class="ep-guidance"><p class="ep-kicker">Guidance & Support</p><h2>Get the best<br><i>from every case.</i></h2><div class="ep-guidance-grid">${guidance.map(([ic,h,p])=>`<article>${icon(ic)}<div><h3>${h}</h3><p>${p}</p></div></article>`).join('')}</div><div class="ep-actions"><a href="#start">Start a Case <span>↗</span></a><a href="faq.html">ⓘ&nbsp; Read the FAQ</a></div></section></div></div>`}
