const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const store = { get: k => { try { return localStorage.getItem(k) } catch (e) { return null } }, set: (k, v) => { try { localStorage.setItem(k, v) } catch (e) { } } };
const root = document.documentElement;
const pre = $('#pre'), hide = () => { pre.classList.add('done'); document.body.classList.add('ready') }; addEventListener('load', () => setTimeout(hide, 700)); setTimeout(hide, 3000);

/* terjemahan */
const D = {
    id: { n_about: 'Tentang', n_edu: 'Pendidikan', n_cert: 'Sertifikat', n_work: 'Karya', n_contact: 'Kontak', status: 'Full Stack Dev & UI Designer', h1: 'Halo, saya <br><span class="nm">Rizki.</span>', lead: 'Saya memadukan kode dan desain menjadi satu pengalaman yang utuh. Membangun website yang tidak hanya cepat, tetapi juga tampil berkelas.', cta1: 'Lihat Karya', cta2: 'Mari Berdiskusi', h_about: 'Tentang Saya', a_h: 'Belajar Langsung dari Praktik', a_p: 'Saya pelajar SMK IDN Islamic Boarding School jurusan Software Engineering. Saya lebih suka langsung terjun ke proyek nyata. Bagi saya, logika backend yang kuat kurang berarti jika tampilan frontend-nya kaku, karena itu saya menguasai keduanya.', s1: 'Proyek Selesai', s2: 'Klien Bisnis', h_edu: 'Pendidikan', now: 'Sedang berjalan', h_cert: 'Sertifikat Pilihan', cert_sub: 'Beberapa sertifikat pilihan sebagai bukti kompetensi. (Klik untuk memperbesar)', h_work: 'Proyek Pilihan', h_contact: 'Mari Bekerja Sama.', loc: 'Lokasi', send: 'Kirim via WhatsApp', f_name: 'Nama kamu', f_topic: 'Apa yang ingin dibuat?', f_msg: 'Ceritakan detailnya...' },
    en: { n_about: 'About', n_edu: 'Education', n_cert: 'Certs', n_work: 'Work', n_contact: 'Contact', status: 'Full Stack Dev & UI Designer', h1: 'Hi, I am <br><span class="nm">Rizki.</span>', lead: 'I blend code and design into one epic experience. Building websites that are not only fast, but look ridiculously premium.', cta1: 'View Work', cta2: "Let's Talk", h_about: 'Who Am I?', a_h: 'Built Different', a_p: "Studying Software Engineering at SMK IDN. My game plan: dive straight into real projects. A powerful backend is useless if the frontend feels stiff. That's why I master both.", s1: 'Projects Done', s2: 'Biz Clients', h_edu: 'Education', now: 'Ongoing', h_cert: 'Selected Certificates', cert_sub: 'A few selected certificates. (Click to expand)', h_work: 'Selected Work', h_contact: "Let's Build.", loc: 'Location', send: 'Send via WhatsApp', f_name: 'Your name', f_topic: "What's the idea?", f_msg: 'Tell me more...' }
};
let lang = store.get('lang') === 'en' ? 'en' : 'id';
const setLang = () => { $$('[data-i]').forEach(e => e.innerHTML = D[lang][e.dataset.i]); $$('[data-p]').forEach(e => e.placeholder = D[lang][e.dataset.p]); root.lang = lang; $('#lang').textContent = lang === 'id' ? 'EN' : 'ID'; $$('[data-n]').forEach(e => e.textContent = e.dataset.n + '+') };
$('#lang').onclick = () => { lang = lang === 'id' ? 'en' : 'id'; store.set('lang', lang); setLang() };

/* data */
$('#chips').innerHTML = 'HTML,CSS,JavaScript,React,Node.js,PHP,Laravel,Tailwind,Bootstrap,SCSS,MySQL,SQLite,PhpMyAdmin,XAMPP,Dart,Go,AI,Git,GitHub,Web Hosting,VS Code,Framer,Canva,Photoshop'.split(',').map(t => `<span>${t}</span>`).join('');
const FB = "onerror=\"this.onerror=null;this.src='https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=600&q=80'\"";
$('#certs').innerHTML = ['png', 'jpeg', 'png', 'png', 'jpeg', 'jpeg', 'jpeg', 'png', 'png', 'png'].map((e, i) => `<button class="zoom" data-g="c" aria-label="Sertifikat ${i + 1}"><img src="assets/img/sertifikat ${i + 1}.${e}" alt="Sertifikat ${i + 1}" loading="lazy" decoding="async" ${FB}></button>`).join('');
const P = [['portfolio1.png', 'Markaz Dimsum', ['Laravel', 'Tailwind'], 'https://markaz-dimsum.com', 'uil-arrow-up-right'], ['portfolio2.png', 'Website Diniyyah', ['HTML', 'CSS', 'JS'], 'https://website-diniyyah.vercel.app/index.html', 'uil-arrow-up-right'], ['portfolio3.png', 'Monetra Web', ['Tailwind', 'JS'], 'https://monetra-zeta.vercel.app', 'uil-arrow-up-right'], ['portfolio4.png', 'IDN SPORT', ['Bootstrap', 'JS'], 'https://hponj.github.io/IDN-Sport-Center/', 'uil-arrow-up-right'], ['portfolio5.png', 'SGC API', ['Laravel', 'MySQL'], 'https://github.com/kiiiihasss/sgc', 'uil-github-alt']];
$('#list').innerHTML = P.map((p, i) => `<article class="pj" data-i2="${i}"><button class="zoom th" data-g="w" aria-label="${p[1]}"><img src="assets/img/${p[0]}" alt="${p[1]}" loading="lazy" ${FB}></button><div><h3>${p[1]}</h3><div class="tg">${p[2].map(t => `<span>${t}</span>`).join('')}</div></div><a class="go" href="${p[3]}" target="_blank" rel="noopener noreferrer" aria-label="Buka ${p[1]}"><i class="uil ${p[4]}"></i></a></article>`).join('');
const pi = $('#pi'), rows = $$('.pj'); let cur = 0;
const pick = i => { cur = i; rows.forEach((r, k) => r.classList.toggle('on', k === i)); if (pi.dataset.k == i) return; pi.dataset.k = i; $('#ph').textContent = new URL(P[i][3]).host; pi.style.opacity = .35; pi.onload = () => pi.style.opacity = 1; pi.src = 'assets/img/' + P[i][0]; pi.alt = P[i][1]; pi.setAttribute('onerror', "this.onerror=null;this.src='https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80'"); rows.forEach((r, k) => r.classList.toggle('on', k === i)) };
rows.forEach((r, i) => { r.addEventListener('mouseenter', () => pick(i)); r.addEventListener('focusin', () => pick(i)) }); pick(0);
const mt = 'AVAILABLE FOR HIRE <b>✦</b> FULL STACK DEV <b>✦</b> UI/UX DESIGNER <b>✦</b> CREATIVE CODER <b>✦</b> WEB ENTHUSIAST <b>✦</b> ';
$$('.mc').forEach(m => m.innerHTML = `<span>${mt}</span>`.repeat(8));

/* miring halus pada foto */
const pf = $('.pf'); if (matchMedia('(hover:hover)').matches) { pf.addEventListener('pointermove', e => { const r = pf.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; pf.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)` }); pf.addEventListener('pointerleave', () => pf.style.transform = '') }
/* tema + menu */
const ti = $('#theme i'), sync = () => { const d = root.classList.contains('dark'); ti.className = 'uil ' + (d ? 'uil-sun' : 'uil-moon') }; sync();
$('#theme').onclick = () => { root.classList.toggle('dark'); store.set('theme', root.classList.contains('dark') ? 'dark' : 'light'); sync() };
const lk = $('#links'), bg = $('#burger');
const closeMenu = () => { lk.classList.remove('open'); bg.setAttribute('aria-expanded', 'false'); bg.firstChild.className = 'uil uil-bars' };
bg.onclick = e => { e.stopPropagation(); const o = lk.classList.toggle('open'); bg.setAttribute('aria-expanded', o); bg.firstChild.className = 'uil ' + (o ? 'uil-times' : 'uil-bars') };

/* scroll */
const ids = ['about', 'education', 'certificates', 'portfolio', 'contact'], nl = $$('.links a'), topBtn = $('#top'); let tk = false;
const onS = () => { tk = false; const y = scrollY, ref = y + innerHeight * .35; let c = ''; ids.forEach(id => { if ($('#' + id).offsetTop <= ref) c = id }); if (innerHeight + y >= root.scrollHeight - 6) c = 'contact'; nl.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + c)); topBtn.classList.toggle('show', y > 700); root.style.setProperty('--sp', Math.min(1, y / Math.max(1, root.scrollHeight - innerHeight))) };
addEventListener('scroll', () => { if (!tk) { tk = true; requestAnimationFrame(onS) } }, { passive: true }); onS();
topBtn.onclick = () => scrollTo({ top: 0, behavior: 'smooth' });

/* angka naik */
const io = new IntersectionObserver(es => es.forEach(e => { if (!e.isIntersecting) return; io.unobserve(e.target); const el = e.target, n = +el.dataset.n, t0 = performance.now(); const f = t => { const k = Math.min(1, (t - t0) / 1200); el.textContent = Math.round(n * (1 - Math.pow(1 - k, 3))) + '+'; k < 1 && requestAnimationFrame(f) }; requestAnimationFrame(f) }), { threshold: .6 });
setLang(); $$('[data-n]').forEach(e => { e.textContent = '0+'; io.observe(e) });

/* lightbox */
const lb = $('#lb'), li = $('#lbi'), ln = $('#lbn'); let items = [], ix = 0, op = null;
const show = () => { const im = items[ix].querySelector('img'); li.src = im.currentSrc || im.src; li.alt = im.alt; ln.textContent = (ix + 1) + ' / ' + items.length };
const step = d => { ix = (ix + d + items.length) % items.length; show() };
const openLb = b => { if (b.id === 'pz') { items = $$('.pj .zoom'); ix = cur } else { items = $$(`.zoom[data-g="${b.dataset.g}"]:not(#pz)`); ix = items.indexOf(b) } op = b; lb.classList.toggle('one', items.length < 2); show(); lb.classList.add('show'); document.body.style.overflow = 'hidden'; $('.x').focus() };
const closeLb = () => { if (!lb.classList.contains('show')) return; lb.classList.remove('show'); document.body.style.overflow = ''; op && op.focus() };
document.addEventListener('click', e => { const z = e.target.closest('.zoom'); if (z) return openLb(z); const a = e.target.closest('[data-a]'); if (a) { const v = a.dataset.a; v === 'x' ? closeLb() : step(v === 'n' ? 1 : -1); return } if (e.target === lb) closeLb(); if (!e.target.closest('nav')) closeMenu() });
addEventListener('keydown', e => { if (e.key === 'Escape') { closeLb(); closeMenu() } if (lb.classList.contains('show') && items.length > 1) { if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1) } });
let sx = 0; lb.addEventListener('touchstart', e => sx = e.touches[0].clientX, { passive: true });
lb.addEventListener('touchend', e => { const d = e.changedTouches[0].clientX - sx; if (Math.abs(d) > 50 && items.length > 1) step(d < 0 ? 1 : -1) });

/* salin kontak */
document.addEventListener('click', async e => {
    const b = e.target.closest('.copy'); if (!b) return;
    try { await navigator.clipboard.writeText(b.dataset.c) } catch (_) { const t = document.createElement('textarea'); t.value = b.dataset.c; document.body.append(t); t.select(); try { document.execCommand('copy') } catch (_) { } t.remove() }
    const i = b.querySelector('i'); i.className = 'uil uil-check'; b.classList.add('ok'); setTimeout(() => { i.className = 'uil uil-copy'; b.classList.remove('ok') }, 1500)
});

/* form WhatsApp */
$('#wa').addEventListener('submit', e => {
    e.preventDefault();
    const t = `Halo Rizki, perkenalkan saya ${$('#fn').value.trim()}.\n\nTopik: ${$('#ft').value.trim()}\nPesan: ${$('#fm').value.trim()}`;
    const a = document.createElement('a'); a.href = 'https://wa.me/62895350399990?text=' + encodeURIComponent(t); a.target = '_blank'; a.rel = 'noopener noreferrer'; document.body.append(a); a.click(); a.remove()
});
