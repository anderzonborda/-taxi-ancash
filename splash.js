/* Pantalla de inicio de Taxi Áncash: una camioneta que llega, se muestra el nombre y desaparece sola */
(function () {
  var css =
    '#splash{position:fixed;inset:0;z-index:100;background:var(--hero,#0b1a2b);color:#eaf0f6;display:grid;place-items:center;animation:spOut .5s ease 2s forwards}' +
    '@keyframes spOut{to{opacity:0;visibility:hidden}}' +
    '#splash .sp-in{text-align:center;width:min(320px,78vw)}' +
    '#splash svg{width:100%;height:auto;display:block;overflow:visible}' +
    '#splash .sp-slide{animation:spIn .9s cubic-bezier(.2,.8,.2,1) both}' +
    '@keyframes spIn{from{transform:translateX(-220px)}to{transform:none}}' +
    '#splash .sp-body{animation:spBounce .45s ease-in-out .9s infinite alternate}' +
    '@keyframes spBounce{to{transform:translateY(-2px)}}' +
    '#splash .sp-wheel{transform-box:fill-box;transform-origin:center;animation:spRoll .5s linear infinite}' +
    '@keyframes spRoll{to{transform:rotate(360deg)}}' +
    '#splash .sp-dash{animation:spDash .5s linear infinite}' +
    '@keyframes spDash{to{stroke-dashoffset:48}}' +
    '#splash .sp-t{font:800 34px "Bricolage Grotesque",Georgia,sans-serif;letter-spacing:-.02em;margin-top:14px;animation:spUp .6s ease .5s both}' +
    '#splash .sp-s{color:#9fb3c6;font:500 15px "Instrument Sans",system-ui,sans-serif;margin-top:4px;animation:spUp .6s ease .7s both}' +
    '@keyframes spUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}' +
    '@media (prefers-reduced-motion:reduce){#splash{animation-delay:.7s}#splash .sp-slide,#splash .sp-body,#splash .sp-wheel,#splash .sp-dash,#splash .sp-t,#splash .sp-s{animation:none}}';

  var wheel = function (cx) {
    return '<g class="sp-wheel"><circle cx="' + cx + '" cy="68" r="12" fill="#0f1b29"/>' +
      '<circle cx="' + cx + '" cy="68" r="5" fill="#9fb3c6"/>' +
      '<path d="M' + cx + ' 58v20M' + (cx - 10) + ' 68h20" stroke="#9fb3c6" stroke-width="2"/></g>';
  };

  var svg =
    '<svg viewBox="0 0 170 96" aria-hidden="true">' +
    '<line class="sp-dash" x1="0" y1="85" x2="170" y2="85" stroke="#f2b705" stroke-width="3" stroke-linecap="round" stroke-dasharray="14 10" opacity=".55"/>' +
    '<g class="sp-slide"><g class="sp-body">' +
    '<path d="M10 40h60v22H10z" fill="#f2b705"/>' +
    '<path d="M10 36h60v4H10z" fill="#c99700"/>' +
    '<path d="M72 62V40h14l12-16h30l14 16h10l6 6v16z" fill="#f2b705"/>' +
    '<path d="M90 40l9-12h27l11 12z" fill="#0b1a2b"/>' +
    '<path d="M10 62h148v6H10z" fill="#c99700"/>' +
    '<circle cx="154" cy="52" r="3" fill="#fff"/>' +
    wheel(36) + wheel(124) +
    '</g></g></svg>';

  var st = document.createElement('style');
  st.textContent = css;
  document.head.appendChild(st);

  var d = document.createElement('div');
  d.id = 'splash';
  d.setAttribute('aria-hidden', 'true');
  d.innerHTML = '<div class="sp-in">' + svg + '<div class="sp-t">Taxi Áncash</div><div class="sp-s">San Marcos ↔ Antamina</div></div>';
  document.body.insertBefore(d, document.body.firstChild);

  setTimeout(function () { if (d.parentNode) d.parentNode.removeChild(d); }, 2800);
})();
