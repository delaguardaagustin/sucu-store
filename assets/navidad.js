/* Temporada navideña de Sucu Store (la dueña lo aprobó el 22-11-2026).
   Activa hasta el 06-01-2027 inclusive; después la página vuelve sola a su diseño de siempre.
   Para verla fuera de fecha: ?navidad=1 */
(function () {
  var FIN = new Date('2027-01-07T00:00:00-03:00');
  var forzar = /[?&]navidad=1/.test(location.search);
  if (!forzar && new Date() >= FIN) return;

  document.documentElement.classList.add('navidad');
  var reducido = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var ESTRELLA = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 1.5l2.6 6.9 7.4.4-5.8 4.6 2 7.1L12 16.4l-6.2 4.1 2-7.1L2 8.8l7.4-.4z"/></svg>';

  function listo(fn) { if (document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }

  listo(function () {
    /* 1. Guirnalda de luces bajo la cabecera */
    var top = document.querySelector('header.top');
    if (top) {
      var g = document.createElement('div');
      g.className = 'nv-guirnalda';
      g.setAttribute('aria-hidden', 'true');
      top.appendChild(g);
      var dibujar = function () {
        var w = top.clientWidth || window.innerWidth, paso = w < 600 ? 38 : 48, n = Math.ceil(w / paso);
        var d = 'M0 2', focos = '';
        for (var i = 0; i < n; i++) {
          var x0 = i * paso, xm = x0 + paso / 2, x1 = x0 + paso;
          d += ' Q' + xm + ' 14 ' + x1 + ' 2';
          var c = 'f' + ((i % 4) + 1), retraso = ((i * 0.37) % 2.4).toFixed(2);
          focos += '<g class="foco ' + c + '" style="animation-delay:-' + retraso + 's"><rect class="casquillo" x="' + (xm - 2.5) + '" y="6.5" width="5" height="4" rx="1"/>' +
            '<ellipse cx="' + xm + '" cy="15.5" rx="4.2" ry="6.2"/></g>';
        }
        g.innerHTML = '<svg viewBox="0 0 ' + (n * paso) + ' 26" preserveAspectRatio="none"><path class="cable" d="' + d + '"/>' + focos + '</svg>';
      };
      dibujar();
      var t; window.addEventListener('resize', function () { clearTimeout(t); t = setTimeout(dibujar, 150); });
    }

    /* 2. Portada: sello, adornos colgando y nieve */
    var hero = document.querySelector('.hero');
    if (hero) {
      var ojo = hero.querySelector('.ojo');
      if (ojo) {
        var s = document.createElement('span');
        s.className = 'nv-sello';
        s.innerHTML = ESTRELLA + 'Regalos de Navidad 2026';
        ojo.parentNode.insertBefore(s, ojo);
        ojo.parentNode.insertBefore(document.createElement('br'), ojo);
      }
      var colores = [['#c23a46', '#7f2430'], ['#e2b955', '#a67a25'], ['#3b8d66', '#1f5039']];
      var largos = [60, 110, 40];
      var ad = document.createElement('div');
      ad.className = 'nv-adornos';
      ad.setAttribute('aria-hidden', 'true');
      ad.innerHTML = colores.map(function (c, i) {
        var L = largos[i], id = 'nvb' + i;
        return '<span class="nv-adorno"><svg viewBox="0 0 64 ' + (L + 66) + '">' +
          '<defs><radialGradient id="' + id + '" cx="35%" cy="32%" r="70%"><stop offset="0" stop-color="#fff" stop-opacity=".85"/><stop offset=".18" stop-color="' + c[0] + '"/><stop offset="1" stop-color="' + c[1] + '"/></radialGradient></defs>' +
          '<line x1="32" y1="0" x2="32" y2="' + L + '" stroke="#b08a4a" stroke-width="1.4"/>' +
          '<rect x="25" y="' + L + '" width="14" height="9" rx="2" fill="#c9a55a"/>' +
          '<circle cx="32" cy="' + (L + 35) + '" r="27" fill="url(#' + id + ')"/>' +
          '<path d="M10 ' + (L + 31) + ' q22 9 44 0" stroke="rgba(255,240,200,.55)" stroke-width="2.4" fill="none"/>' +
          '</svg></span>';
      }).join('');
      hero.appendChild(ad);
      if (!reducido) nieve(hero);
    }

    /* 3. Banda «Esta Navidad, regala vida» justo antes del catálogo */
    var cat = document.getElementById('catalogo');
    if (cat) {
      var sec = document.createElement('section');
      sec.className = 'nv-saludo';
      sec.setAttribute('aria-labelledby', 'nv-titulo');
      sec.innerHTML = '<div class="puntos" aria-hidden="true"></div><div class="wrap">' +
        '<span class="estrella-grande">' + ESTRELLA + '</span>' +
        '<h2 id="nv-titulo">Esta Navidad, <em>regala vida</em></h2>' +
        '<p>Suculentas personalizadas para tus regalos de Navidad, el amigo secreto y las celebraciones de fin de año de tu empresa o tu curso. Haz tu pedido con anticipación para asegurar tu fecha.</p>' +
        '<div class="ideas"><span>🎄 Regalos de Navidad</span><span>🎁 Amigo secreto</span><span>🏢 Fin de año en la empresa</span><span>🎓 Cierre de año escolar</span></div>' +
        '<div class="acciones"><a class="btn btn-p" href="#catalogo">Arma tu pedido</a><a class="btn btn-s" href="#maceteros">Ver maceteros de yeso</a></div></div>';
      cat.parentNode.insertBefore(sec, cat);
    }

    /* 4. «Navidad» como ocasión en la ventana del pedido */
    var oc = document.getElementById('mp-ocasion');
    if (oc && !/Navidad/.test(oc.textContent)) {
      var b = document.createElement('button');
      b.type = 'button'; b.textContent = 'Navidad';
      oc.insertBefore(b, oc.firstChild);
    }

    /* 5. Saludo en el pie */
    var pie = document.querySelector('footer .wrap > span');
    if (pie) {
      var p = document.createElement('span');
      p.className = 'nv-pie-saludo';
      p.innerHTML = ESTRELLA + 'Feliz Navidad y un próspero 2027';
      pie.parentNode.insertBefore(p, pie.nextSibling);
    }
  });

  function nieve(cont) {
    var cv = document.createElement('canvas');
    cv.className = 'nv-nieve';
    cv.setAttribute('aria-hidden', 'true');
    cont.insertBefore(cv, cont.firstChild);
    var ctx = cv.getContext('2d'), copos = [], W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2), visible = true, raf = 0;
    function medir() {
      W = cont.clientWidth; H = cont.clientHeight;
      cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.round(Math.min(80, W / 15));
      while (copos.length < n) copos.push(nuevo(true));
      copos.length = n;
    }
    function nuevo(alAzar) {
      return { x: Math.random() * W, y: alAzar ? Math.random() * H : -8, r: 1.2 + Math.random() * 2.8,
        v: 0.25 + Math.random() * 0.7, f: Math.random() * Math.PI * 2, a: 0.6 + Math.random() * 0.4 };
    }
    function cuadro() {
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < copos.length; i++) {
        var c = copos[i];
        c.y += c.v; c.f += 0.012; c.x += Math.sin(c.f) * 0.35;
        if (c.y > H + 6) { copos[i] = nuevo(false); continue; }
        ctx.beginPath(); ctx.arc(c.x, c.y, c.r, 0, 6.283);
        ctx.fillStyle = 'rgba(255,255,255,' + c.a + ')';
        ctx.shadowColor = 'rgba(120,80,90,.45)'; ctx.shadowBlur = 3;
        ctx.fill();
      }
      raf = visible && !document.hidden ? requestAnimationFrame(cuadro) : 0;
    }
    medir();
    var tm; window.addEventListener('resize', function () { clearTimeout(tm); tm = setTimeout(medir, 150); });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (e) {
        visible = e[0].isIntersecting;
        if (visible && !raf) raf = requestAnimationFrame(cuadro);
      }).observe(cont);
    }
    document.addEventListener('visibilitychange', function () { if (!document.hidden && visible && !raf) raf = requestAnimationFrame(cuadro); });
    raf = requestAnimationFrame(cuadro);
  }
})();
