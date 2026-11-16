/* Taxi Áncash: animaciones de inicio.
   1 = camioneta, al abrir la web.  2 = ruta, al entrar al portal de reservas. */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var css =
    '#splash{position:fixed;inset:0;z-index:100;background:var(--hero,#0b1a2b);color:#eaf0f6;display:grid;place-items:center;animation:spOut .5s ease 2s forwards}' +
    '@keyframes spOut{to{opacity:0;visibility:hidden}}' +
    '#splash .sp-in{text-align:center;width:min(320px,78vw)}' +
    '#splash .sp-in.wide{width:min(340px,92vw)}' +
    '#splash svg{width:100%;height:auto;display:block;overflow:visible}' +
    '#splash .sp-slide{animation:spIn .9s cubic-bezier(.2,.8,.2,1) both}' +
    '@keyframes spIn{from{transform:translateX(-220px)}to{transform:none}}' +
    '#splash .sp-body{animation:spBounce .45s ease-in-out .9s infinite alternate}' +
    '@keyframes spBounce{to{transform:translateY(-2px)}}' +
    '#splash .sp-wheel{transform-box:fill-box;transform-origin:center;animation:spRoll .5s linear infinite}' +
    '@keyframes spRoll{to{transform:rotate(360deg)}}' +
    '#splash .sp-dash{animation:spDash .5s linear infinite}' +
    '@keyframes spDash{to{stroke-dashoffset:48}}' +
    '#splash .ridge{fill:none;stroke:#f2b705;stroke-width:6;stroke-linecap:round;stroke-dasharray:1;stroke-dashoffset:1;animation:spDraw 1.8s ease-out forwards}' +
    '@keyframes spDraw{to{stroke-dashoffset:0}}' +
    '#splash .lbl{fill:#eaf0f6;font:600 26px "Instrument Sans",sans-serif;animation:spUp .5s ease both}' +
    '#splash .sp-t{font:800 34px "Bricolage Grotesque",Georgia,sans-serif;letter-spacing:-.02em;margin-top:14px;animation:spUp .6s ease .5s both}' +
    '#splash .sp-s{color:#9fb3c6;font:500 15px "Instrument Sans",system-ui,sans-serif;margin-top:4px;animation:spUp .6s ease .7s both}' +
    '@keyframes spUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}' +
    '@media (prefers-reduced-motion:reduce){#splash{animation-delay:.7s}#splash .sp-slide,#splash .sp-body,#splash .sp-wheel,#splash .sp-dash,#splash .sp-t,#splash .sp-s,#splash .lbl{animation:none}#splash .ridge{animation:none;stroke-dashoffset:0}}';

  var wheel = function (cx) {
    return '<g class="sp-wheel"><circle cx="' + cx + '" cy="68" r="12" fill="#0f1b29"/>' +
      '<circle cx="' + cx + '" cy="68" r="5" fill="#9fb3c6"/>' +
      '<path d="M' + cx + ' 58v20M' + (cx - 10) + ' 68h20" stroke="#9fb3c6" stroke-width="2"/></g>';
  };

  var truck =
    '<path d="M10 40h60v22H10z" fill="#f2b705"/>' +
    '<path d="M10 36h60v4H10z" fill="#c99700"/>' +
    '<path d="M72 62V40h14l12-16h30l14 16h10l6 6v16z" fill="#f2b705"/>' +
    '<path d="M90 40l9-12h27l11 12z" fill="#0b1a2b"/>' +
    '<path d="M10 62h148v6H10z" fill="#c99700"/>' +
    '<circle cx="154" cy="52" r="3" fill="#fff"/>' +
    wheel(36) + wheel(124);

  var P = 'M0 130 C60 120 90 118 130 104 S200 100 240 84 S330 74 370 52 S450 34 560 24';
  var names = '<div class="sp-t">Taxi Áncash</div><div class="sp-s">San Marcos ↔ Antamina</div>';

  // 1: la camioneta llega por el camino (al abrir la web)
  function v1() {
    return '<div class="sp-in"><svg viewBox="0 0 170 96" aria-hidden="true">' +
      '<line class="sp-dash" x1="0" y1="85" x2="170" y2="85" stroke="#f2b705" stroke-width="3" stroke-linecap="round" stroke-dasharray="14 10" opacity=".55"/>' +
      '<g class="sp-slide"><g class="sp-body">' + truck + '</g></g></svg>' + names + '</div>';
  }

  // 2: la camioneta sube por la ruta de San Marcos a Antamina (al entrar al portal)
  function v2() {
    var small = '<g transform="translate(-52,-50) scale(.6)">' + truck + '</g>';
    var mover = reduce
      ? '<g transform="translate(520,24)">' + small + '</g>'
      : '<g><animateMotion dur="1.8s" fill="freeze" rotate="auto" path="' + P + '" calcMode="spline" keyTimes="0;1" keySplines=".3 0 .2 1"/>' + small + '</g>';
    return '<div class="sp-in wide"><svg viewBox="0 0 560 150" aria-hidden="true">' +
      '<path d="' + P + ' L560 150 L0 150Z" fill="#ffffff0d"/>' +
      '<path class="ridge" pathLength="1" d="' + P + '"/>' +
      '<text class="lbl" x="6" y="116" style="animation-delay:.2s">San Marcos</text>' +
      '<text class="lbl" x="556" y="10" text-anchor="end" style="animation-delay:1.6s">Antamina</text>' +
      mover + '</svg>' + names + '</div>';
  }

  var st = document.createElement('style');
  st.textContent = css;
  document.head.appendChild(st);

  var timer;
  function play(n) {
    var old = document.getElementById('splash');
    if (old && old.parentNode) old.parentNode.removeChild(old);
    clearTimeout(timer);
    var d = document.createElement('div');
    d.id = 'splash';
    d.setAttribute('aria-hidden', 'true');
    d.innerHTML = n === 2 ? v2() : v1();
    document.body.insertBefore(d, document.body.firstChild);
    timer = setTimeout(function () { if (d.parentNode) d.parentNode.removeChild(d); }, 2800);
  }
  window.TaxiSplash = { play: play };

  // al abrir la web
  play(1);

  // al entrar al portal: se activa cuando la persona toca "Entrar / Crear cuenta / Verificar"
  // y, un momento después, aparece la pantalla de reservas
  var armed = false, armTimer;
  function arm() {
    armed = true;
    clearTimeout(armTimer);
    armTimer = setTimeout(function () { armed = false; }, 20000);
  }
  document.addEventListener('click', function (e) {
    var b = e.target && e.target.closest && e.target.closest('[data-act="auth"],[data-act="otp"]');
    if (b) arm();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && e.target && (e.target.id === 'aPass' || e.target.id === 'aOtp')) arm();
  });
  document.addEventListener('DOMContentLoaded', function () {
    var main = document.getElementById('sMain');
    if (!main || !window.MutationObserver) return;
    new MutationObserver(function () {
      if (armed && !main.classList.contains('hidden')) { armed = false; play(2); }
    }).observe(main, { attributes: true, attributeFilter: ['class'] });
  });
})();
