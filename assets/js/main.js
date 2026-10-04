
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const store = { get: k => { try { return localStorage.getItem(k) } catch (e) { return null } }, set: (k, v) => { try { localStorage.setItem(k, v) } catch (e) { } } };
setTimeout(() => { const p = document.getElementById('preloader'); p && p.classList.add('done'); document.body.classList.add('ready') }, 3000);
const FB = 'onerror="this.onerror=null;this.src=this.dataset.fb"';

/* Render data */
$('#tags').innerHTML = 'HTML,CSS,JavaScript,React,Node.js,PHP,Laravel,Tailwind,Bootstrap,SCSS,MySQL,SQLite,PhpMyAdmin,XAMPP,Dart,Go,AI,Git,GitHub,Web Hosting,VS Code,Framer,Canva,Photoshop'.split(',').map(t => `<span class="tag">${t}</span>`).join('');
const cf = 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=600&q=80';
$('#certs').innerHTML = ['png', 'jpeg', 'png', 'png', 'jpeg', 'jpeg', 'jpeg', 'png', 'png', 'png'].map((e, i) =>
    `<div class="cert card rv d${i % 3}"><button type="button" class="zoom" data-g="certs" aria-label="Sertifikat ${i + 1}"><img src="assets/img/sertifikat ${i + 1}.${e}" alt="Sertif" loading="lazy" decoding="async" data-fb="${cf}" ${FB}></button></div>`).join('');
const P = [
    ['portfolio1.png', 'Markaz Dimsum', 'Markaz Dimsum', ['Laravel', 'Tailwind'], 'https://markaz-dimsum.com', 'uil-arrow-up-right', 'photo-1555939594-58d7cb561ad1'],
    ['portfolio2.png', 'Diniyyah', 'Website Diniyyah', ['HTML', 'CSS', 'JS'], 'https://website-diniyyah.vercel.app/index.html', 'uil-arrow-up-right', 'photo-1517694712202-14dd9538aa97'],
    ['portfolio3.png', 'Monetra', 'Monetra Web', ['Tailwind', 'JS'], 'https://monetra-zeta.vercel.app', 'uil-arrow-up-right', 'photo-1460925895917-afdab827c52f'],
    ['portfolio4.png', 'IDN SPORT', 'IDN SPORT', ['Bootstrap', 'JS'], 'https://hponj.github.io/IDN-Sport-Center/', 'uil-arrow-up-right', 'photo-1507238691740-187a5b1d37b8'],
    ['portfolio5.png', 'SGC', 'SGC API', ['Laravel', 'MySQL'], 'https://github.com/mrizzzz97/sgc', 'uil-github-alt', 'photo-1542831371-29b0f74f9713']];
$('#projects').innerHTML = P.map((p, i) => `<article class="work card rv d${i % 2}">
<div class="bar"><i></i><i></i><i></i><span>${new URL(p[4]).host}</span></div>
<div class="shot"><button type="button" class="zoom" data-g="work" aria-label="${p[1]}"><img src="assets/img/${p[0]}" alt="${p[1]}" loading="lazy" decoding="async" data-fb="https://images.unsplash.com/${p[6]}?w=900&q=80" ${FB}></button></div>
<div class="winfo"><div><h3>${p[2]}</h3><div class="wtech">${p[3].map(t => `<span>${t}</span>`).join('')}</div></div>
<a href="${p[4]}" target="_blank" rel="noopener noreferrer" class="go" aria-label="Buka ${p[2]}"><i class="uil ${p[5]}"></i></a></div></article>`).join('');

/* Marquee seamless */
$$('.marquee-content').forEach(m => m.innerHTML += m.innerHTML.repeat(3));

/* Preloader */
const pre = $('#preloader'), hidePre = () => { pre.classList.add('done'); document.body.classList.add('ready') };
addEventListener('load', () => setTimeout(hidePre, 500)); setTimeout(hidePre, 3000);

/* Reveal */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { threshold: .08, rootMargin: '0px 0px -30px 0px' });
$$('.rv').forEach(el => io.observe(el));

/* Spotlight */
if (matchMedia('(hover:hover)').matches) {
    let raf; addEventListener('pointermove', e => {
        const c = e.target.closest && e.target.closest('.card'); if (!c) return; cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => { const r = c.getBoundingClientRect(); c.style.setProperty('--mx', e.clientX - r.left + 'px'); c.style.setProperty('--my', e.clientY - r.top + 'px') })
    }, { passive: true })
}

/* Scroll: nav aktif + tombol ke atas */
const links = $$('.nav-link'), ids = ['about', 'education', 'certificates', 'portfolio', 'contact'], topBtn = $('#top'); let tick = false;
const onScroll = () => {
    tick = false; const y = scrollY, ref = y + innerHeight * .35, bottom = innerHeight + y >= document.documentElement.scrollHeight - 6;
    let cur = ''; ids.forEach(id => { if ($('#' + id).offsetTop <= ref) cur = id }); if (bottom) cur = 'contact';
    links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + cur)); topBtn.classList.toggle('show', y > 700); document.documentElement.style.setProperty('--sp', Math.min(1, y / Math.max(1, document.documentElement.scrollHeight - innerHeight)));
    const ed = $('#edu'), er = ed.getBoundingClientRect(), h = innerHeight * .65; ed.style.setProperty('--p', Math.min(1, Math.max(0, (h - er.top) / er.height)));
    $$('.edu-item').forEach(i => i.classList.toggle('on', i.getBoundingClientRect().top < h))
};
addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(onScroll) } }, { passive: true }); onScroll();
topBtn.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

/* Lightbox galeri (prev/next, panah keyboard) */
const lb = $('#lb'), lbImg = $('#lb-img'), lbN = $('#lb-n'); let items = [], idx = 0, opener = null;
const show = () => { const im = items[idx].querySelector('img'); lbImg.src = im.currentSrc || im.src; lbImg.alt = im.alt; lbN.textContent = (idx + 1) + ' / ' + items.length };
const step = d => { idx = (idx + d + items.length) % items.length; show() };
const openLb = b => { items = $$(`.zoom[data-g="${b.dataset.g}"]`); idx = items.indexOf(b); opener = b; lb.classList.toggle('single', items.length < 2); show(); lb.classList.add('show'); document.body.style.overflow = 'hidden'; $('.lb-close').focus() };
const closeLb = () => { if (!lb.classList.contains('show')) return; lb.classList.remove('show'); document.body.style.overflow = ''; opener && opener.focus() };
document.addEventListener('click', e => {
    const z = e.target.closest('.zoom'); if (z) return openLb(z);
    const a = e.target.closest('[data-a]'); if (a) { const v = a.dataset.a; v === 'close' ? closeLb() : step(v === 'next' ? 1 : -1); return }
    if (e.target === lb) closeLb();
    if (!e.target.closest('nav')) closeMenu()
});
addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeLb(); closeMenu() }
    if (lb.classList.contains('show') && items.length > 1) { if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1) }
});
let sx = 0; lb.addEventListener('touchstart', e => sx = e.touches[0].clientX, { passive: true });
lb.addEventListener('touchend', e => { const d = e.changedTouches[0].clientX - sx; if (Math.abs(d) > 50 && items.length > 1) step(d < 0 ? 1 : -1) });

/* Menu mobile */
const nl = $('#nav-links'), mt = $('#menu-toggle'), mi = mt.querySelector('i');
function closeMenu() { nl.classList.remove('open'); mt.setAttribute('aria-expanded', 'false'); mi.className = 'uil uil-bars' }
mt.addEventListener('click', e => { e.stopPropagation(); const o = nl.classList.toggle('open'); mt.setAttribute('aria-expanded', o); mi.className = 'uil ' + (o ? 'uil-times' : 'uil-bars') });
links.forEach(l => l.addEventListener('click', closeMenu));

/* Tema */
const root = document.documentElement, ti = $('#theme-toggle i');
const syncIcon = () => { const l = root.classList.contains('light'); ti.classList.toggle('uil-sun', l); ti.classList.toggle('uil-moon', !l) }; syncIcon();
$('#theme-toggle').addEventListener('click', () => { root.classList.toggle('light'); store.set('theme', root.classList.contains('light') ? 'light' : 'dark'); syncIcon() });

/* Bahasa */
const lt = $('#lang-toggle'); let lang = store.get('lang') === 'en' ? 'en' : 'id';
const setLang = () => { $$('.lang').forEach(el => { const v = el.getAttribute('data-' + lang); if (v == null) return; el.matches('input,textarea') ? el.placeholder = v : el.innerHTML = v }); root.lang = lang; lt.textContent = lang === 'id' ? 'EN' : 'ID'; split($('.hero-title')) };
setLang(); lt.addEventListener('click', () => { lang = lang === 'id' ? 'en' : 'id'; store.set('lang', lang); setLang() });

/* Salin kontak */
document.addEventListener('click', async e => {
    const b = e.target.closest('.copy'); if (!b) return;
    try { await navigator.clipboard.writeText(b.dataset.copy) } catch (_) { const t = document.createElement('textarea'); t.value = b.dataset.copy; document.body.append(t); t.select(); try { document.execCommand('copy') } catch (_) { } t.remove() }
    const i = b.querySelector('i'); i.className = 'uil uil-check'; b.classList.add('ok'); setTimeout(() => { i.className = 'uil uil-copy'; b.classList.remove('ok') }, 1500)
});

/* Form WhatsApp (pakai link sementara agar tidak diblokir popup blocker) */
$('#wa-form').addEventListener('submit', e => {
    e.preventDefault();
    const t = `Halo Rizki, perkenalkan saya ${$('#name').value.trim()}.\n\nTopik: ${$('#topic').value.trim()}\nPesan: ${$('#message').value.trim()}`;
    const a = document.createElement('a'); a.href = 'https://wa.me/62895350399990?text=' + encodeURIComponent(t); a.target = '_blank'; a.rel = 'noopener noreferrer'; document.body.append(a); a.click(); a.remove()
});

/* ===== UPGRADE JS ===== */
function split(el) {
    let i = 0; (function w(n) {
        [...n.childNodes].forEach(c => {
            if (c.nodeType === 3) {
                const f = document.createDocumentFragment();
                c.textContent.split(/(\s+)/).forEach(p => {
                    if (!p) return; if (/^\s+$/.test(p)) return f.append(' '); const s = document.createElement('span'); s.className = 'w';
                    [...p].forEach(ch => { const k = document.createElement('span'); k.className = 'ch'; k.textContent = ch; k.style.setProperty('--i', i++); s.append(k) }); f.append(s)
                }); c.replaceWith(f)
            }
            else if (c.tagName !== 'BR') w(c)
        })
    })(el)
}
if (matchMedia('(hover:hover)').matches) { const g = $('#glow'); addEventListener('pointermove', e => { g.classList.add('on'); g.style.transform = `translate3d(${e.clientX - 260}px,${e.clientY - 260}px,0)` }, { passive: true }) }
const cio = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return; cio.unobserve(e.target); const el = e.target, n = +el.dataset.n, sf = el.dataset.s || '', t0 = performance.now();
    const f = t => { const k = Math.min(1, (t - t0) / 1400); el.textContent = Math.round(n * (1 - Math.pow(1 - k, 3))) + sf; k < 1 && requestAnimationFrame(f) }; requestAnimationFrame(f)
}), { threshold: .6 });
$$('[data-n]').forEach(el => { el.textContent = '0' + (el.dataset.s || ''); cio.observe(el) });
