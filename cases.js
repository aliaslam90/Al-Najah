const cases = [
  ['aesthetic','Aesthetic','8 units','Anterior Lithium Disilicate Veneers','anterior.png'],
  ['implants','Implants','12 units','Full-Arch Zirconia, Screw-Retained','full-arch.png'],
  ['fixed','Fixed','4 units','Posterior Monolithic Crowns','posterior.png'],
  ['removable','Removable','Full upper','Digital Complete Denture','denture.png'],
  ['implants','Implants','6 units','Implant-Supported Bridge','implant-bridge.png'],
  ['aesthetic','Aesthetic','10 units','Veneer Smile Design','smile-design.png'],
  ['fixed','Fixed','3 units','Layered Ceramic Crowns','layered-crowns.png'],
  ['orthodontic','Orthodontic','24 stages','Clear Aligner Series','aligner.png'],
  ['fixed','Fixed','1 pontic','Maryland Bridge Restoration','maryland.png'],
  ['removable','Removable','Lower','Cast Partial Framework','partial.png'],
  ['aesthetic','Aesthetic','6 units','Feldspathic Layered Veneers','veneers.png'],
  ['implants','Implants','2 units','Custom Titanium Abutments','abutments.png']
];

export const renderCases = () => `
  <header class="cases-hero">
    <div class="eyebrow">Case Studies</div>
    <h1>A working archive of clinical detail.</h1>
    <p>Recent restorations from across the lab. Filter by category to explore work <br>relevant to your next case.</p>
  </header>
  <section class="cases-archive">
    <div class="filters" aria-label="Filter case studies">
      ${[['all','All'],['fixed','Fixed'],['implants','Implants'],['aesthetic','Aesthetic'],['removable','Removable'],['orthodontic','Orthodontic']].map(([key,label],index)=>`<button class="${index===0?'selected':''}" type="button" data-filter="${key}">${label}</button>`).join('')}
    </div>
    <div class="gallery">
      ${cases.map(item=>`<article class="case-card" data-category="${item[0]}">
        <img src="/assets/cases-page/${item[4]}" alt="${item[3]}" loading="lazy">
        <div class="case-category">${item[1]}</div>
        <div class="case-copy"><small>${item[2]}</small><h3>${item[3]}</h3></div>
      </article>`).join('')}
    </div>
  </section>
`;
