const groups = [
  ['Submitting Cases',[
    ['How do I submit a case?','You can submit cases three ways: upload digital scans (STL/PLY) through our partner portal, send physical impressions via our daily courier route, or schedule a hand-delivery from our local team in Dubai, Riyadh, or Doha.'],
    ['What files do you need with a digital scan?','Please include open STL or PLY files, a completed prescription, bite registration, and shade photographs for aesthetic cases.'],
    ['Do you accept open STL files from any scanner?','Yes. We accept open STL and PLY files from all major intraoral scanner systems.'],
    ['Can I send physical impressions if I do not have a scanner?','Yes. Physical impressions can be collected through our courier route or delivered directly to the lab.']
  ]],
  ['Turnaround & Logistics',[
    ['What is your average turnaround time?','Single-unit cases average three business days; full-arch and aesthetic cases typically take five to seven business days.'],
    ['Do you offer same-day or next-day service?','Rush service is available for suitable cases, subject to technical review and capacity.'],
    ['How are completed cases delivered?','Cases are sterile-packed and delivered to your clinic with a signed quality-control card.']
  ]],
  ['Materials & Quality',[
    ['What materials do you use?','We use original-source certified systems including Ivoclar e.max, KATANA Zirconia, 3M Lava Plus, and Vita materials.'],
    ['How is shade matching handled?','Shade is verified under D65 daylight; high-stakes aesthetic cases can include photographs, custom shade guidance, and a try-in.'],
    ['What quality control happens before delivery?','Every case passes design, post-mill, and pre-dispatch quality checks before it leaves the lab.']
  ]],
  ['Pricing & Payment',[
    ['How is pricing structured?','Pricing is based on restoration type, material, complexity, and turnaround requirements. Contact us for the current laboratory price list.'],
    ['Do you offer credit terms?','Credit terms may be arranged for approved clinic partners. Our team can discuss the available options with you.'],
    ['What happens if a remake is needed?','We review the case with your clinician, identify the cause, and agree the quickest appropriate remake path.']
  ]]
];

export const renderFaq = () => `
  <header class="faq-hero">
    <div class="eyebrow">FAQ</div>
    <h1>Questions, answered by senior lab staff.</h1>
    <p>The most common things clinicians ask before their first case. If yours is not <br>here, reach out and we will respond within one business day.</p>
  </header>
  <section class="faq-list">
    ${groups.map((group,groupIndex)=>`<div class="faq-group">
      <div class="eyebrow">${group[0]}</div>
      <div class="faq-box">${group[1].map((item,itemIndex)=>{
        const open=groupIndex===0&&itemIndex===0;
        const id=`answer-${groupIndex}-${itemIndex}`;
        return `<div class="faq-item ${open?'open':''}">
          <button class="faq-question" type="button" aria-expanded="${open}" aria-controls="${id}">
            <span>${item[0]}</span><span class="faq-indicator" aria-hidden="true"><img class="icon plus" src="/assets/icons/plus.svg" alt=""><img class="icon minus" src="/assets/icons/minus.svg" alt=""></span>
          </button>
          <div class="answer" id="${id}"><div>${item[1]}</div></div>
        </div>`;
      }).join('')}</div>
    </div>`).join('')}
  </section>
`;
