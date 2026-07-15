// ===== PRODUCT DATA =====
const products = [
  { id:1, name:"Teal Pattu Silk", fabric:"Pure Pattu Silk", price:"₹1,650", tag:"silk", badge:"badge-silk", badgeLabel:"Pattu", img:"assets/saree_teal_new.png", desc:"Exquisite teal blue Pattu silk saree with rich silver and navy zari weave throughout the body. Features a traditional temple-border pallu and contrast navy trim — a stunning choice for weddings and grand festive occasions." },
  { id:2, name:"Golden Pattu Silk", fabric:"Pure Pattu Silk", price:"₹1,650", tag:"silk", badge:"badge-silk", badgeLabel:"Pattu", img:"assets/saree_gold_new.png", desc:"Radiant golden yellow Pattu silk saree with dense floral zari weave and a lustrous rose-gold border. The heavy, lustrous pattu fabric drapes beautifully — ideal for brides, receptions, and festive celebrations." },
  { id:3, name:"Emerald Pattu Silk", fabric:"Pure Pattu Silk", price:"₹1,650", tag:"silk", badge:"badge-silk", badgeLabel:"Pattu", img:"assets/saree_emerald_new.png", desc:"Magnificent deep emerald green Pattu silk saree with bold geometric temple borders in rose-gold zari. The rich pattu weave and striking contrast pallu make it a timeless bridal and festive masterpiece." },
  { id:4, name:"Cotton Silk Saree", fabric:"Pure Cotton Silk", price:"₹850", tag:"casual", badge:"badge-casual", badgeLabel:"Casual", img:"assets/red-saree.jpeg", desc:"Lightweight cotton silk saree with a graceful drape and comfortable feel, perfect for everyday elegance and festive wear." },
  { id:5, name:"Kanchipuram Silk Saree", fabric:"Pure Kanchipuram Silk", price:"₹1,700", tag:"silk", badge:"badge-silk", badgeLabel:"Kanchipuram", img:"assets/kancheepuram-silk.jpeg", desc:"Elegant Kanchipuram silk saree that can be worn on both sides, offering a versatile and luxurious look for grand occasions." },
  { id:6, name:"Floral Silk Blend Saree", fabric:"Silk Blend", price:"₹1,200", tag:"silk", badge:"badge-silk", badgeLabel:"Floral", img:"assets/floral-silk-blend.jpeg", desc:"Beautiful floral silk-blend saree with a graceful drape and elegant print, perfect for festive and casual occasions." },
  { id:7, name:"Elegant Handloom Saree", fabric:"Cotton", price:"₹500", tag:"casual", badge:"badge-casual", badgeLabel:"Casual", img:"assets/light-blue500.png", desc:"Simple yet elegant cotton saree with a comfortable drape and timeless charm for everyday wear." },
  { id:8, name:"Classic Handloom Saree", fabric:"Cotton", price:"₹500", tag:"casual", badge:"badge-casual", badgeLabel:"Casual", img:"assets/dark-blue-500.png", desc:"Classic cotton saree with a clean look, soft texture, and effortless comfort for everyday styling." },
  { id:9, name:"Handloom Saree", fabric:"Handloom", price:"₹500", tag:"casual", badge:"badge-casual", badgeLabel:"Casual", img:"assets/pink-500.png", desc:"Handloom saree woven with traditional charm, soft texture, and a graceful drape for festive occasions." },
  { id:10, name:"Handloom Saree", fabric:"Handloom", price:"₹500", tag:"casual", badge:"badge-casual", badgeLabel:"Casual", img:"assets/full-dark-blue-500.png", desc:"Elegant handloom saree featuring a lightweight weave, earthy elegance, and timeless craftsmanship." },
  { id:11, name:"Combo Silk Saree Pack", fabric:"2 Sarees", price:"₹1,000", tag:"silk", badge:"badge-silk", badgeLabel:"Combo", img:"assets/combo-saree.jpeg", desc:"Special silk combo offer for 2 sarees at just ₹1,000. Perfect for festive gifting or stocking up on elegant staples." },

];

// ===== THREE.JS BACKGROUND =====
(function initBackground() {
  const canvas = document.getElementById('bg-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 30;

  // Gold particles
  const count = 1800;
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    pos[i * 3]     = (Math.random() - 0.5) * 120;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 120;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 80;
    sizes[i] = Math.random() * 1.5 + 0.3;
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  const mat = new THREE.PointsMaterial({
    color: 0xc9a96e,
    size: 0.25,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.45,
  });
  const particles = new THREE.Points(geo, mat);
  scene.add(particles);

  // Floating torus (decorative ring)
  const torusGeo = new THREE.TorusGeometry(12, 0.05, 16, 80);
  const torusMat = new THREE.MeshBasicMaterial({ color: 0xc9a96e, transparent: true, opacity: 0.07 });
  const torus1 = new THREE.Mesh(torusGeo, torusMat);
  torus1.rotation.x = Math.PI / 4;
  scene.add(torus1);

  const torus2 = new THREE.Mesh(
    new THREE.TorusGeometry(18, 0.03, 16, 80),
    new THREE.MeshBasicMaterial({ color: 0xe8c97a, transparent: true, opacity: 0.04 })
  );
  torus2.rotation.x = -Math.PI / 6;
  torus2.rotation.y = Math.PI / 3;
  scene.add(torus2);

  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', e => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  function animate() {
    requestAnimationFrame(animate);
    const t = Date.now() * 0.0003;
    particles.rotation.y = t * 0.08 + mouseX * 0.05;
    particles.rotation.x = t * 0.04 + mouseY * 0.03;
    torus1.rotation.z = t * 0.25;
    torus2.rotation.z = -t * 0.18;
    torus2.rotation.x = t * 0.1;
    renderer.render(scene, camera);
  }
  animate();
})();

// ===== CONTACT SECTION THREE.JS =====
(function initContactCanvas() {
  const canvas = document.getElementById('contact-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const w = canvas.parentElement.offsetWidth;
  const h = canvas.parentElement.offsetHeight || 600;
  renderer.setSize(w, h);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000);
  camera.position.z = 25;

  const count = 800;
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    pos[i * 3]     = (Math.random() - 0.5) * 80;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 60;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 40;
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const mat = new THREE.PointsMaterial({ color: 0xc9a96e, size: 0.18, transparent: true, opacity: 0.5 });
  scene.add(new THREE.Points(geo, mat));

  function animate() {
    requestAnimationFrame(animate);
    scene.rotation.y += 0.0012;
    renderer.render(scene, camera);
  }
  animate();
})();

// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
});

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
  hamburger.classList.remove('active');
  document.body.style.overflow = '';
}));


// ===== RENDER PRODUCTS =====
function renderProducts(filter = 'all') {
  const grid = document.getElementById('products-grid');
  grid.innerHTML = '';
  const filtered = filter === 'all' ? products : products.filter(p => p.tag === filter);
  filtered.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.style.animationDelay = `${i * 0.08}s`;
    card.innerHTML = `
      <div class="card-img-wrap">
        <img src="${p.img}" alt="${p.name}" loading="lazy" />
        <div class="card-overlay"><span>${typeof T!=='undefined'?T[currentLang].view:'View Details'}</span></div>
        <span class="card-badge ${p.badge}">${typeof T!=='undefined'?T[currentLang]['badge_'+p.tag]:p.badgeLabel}</span>
      </div>
      <div class="card-info">
        <h3 class="card-name">${p.name}</h3>
        <p class="card-fabric">${p.fabric}</p>
        <div class="card-footer">
          <span class="card-price">${p.price}</span>
          <a class="card-wa" href="https://wa.me/919550195944?text=Hello%20Chahan%20Fashions!%20I%20am%20interested%20in%20the%20%22${encodeURIComponent(p.name)}%22%20saree.%20Please%20share%20more%20details." target="_blank" title="Order on WhatsApp">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </a>
        </div>
      </div>`;
    card.addEventListener('click', (e) => {
      if (!e.target.closest('.card-wa')) openModal(p);
    });
    grid.appendChild(card);
  });
}
renderProducts();

// ===== FILTER TABS =====
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', function() {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    this.classList.add('active');
    renderProducts(this.dataset.filter);
  });
});

// ===== MODAL =====
function openModal(p) {
  document.getElementById('modal-img').src = p.img;
  document.getElementById('modal-img').alt = p.name;
  document.getElementById('modal-tag').textContent = p.badgeLabel + ' · ' + p.fabric;
  document.getElementById('modal-name').textContent = p.name;
  document.getElementById('modal-fabric').textContent = p.fabric;
  document.getElementById('modal-price').textContent = p.price;
  document.getElementById('modal-desc').textContent = p.desc;
  document.getElementById('modal-order').href = `https://wa.me/919550195944?text=Hello%20Chahan%20Fashions!%20I%20want%20to%20order%20the%20%22${encodeURIComponent(p.name)}%22%20saree%20(${encodeURIComponent(p.price)}).%20Please%20help%20me%20with%20the%20details.`;
  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
document.getElementById('modal-close').addEventListener('click', closeModal);
document.getElementById('modal-overlay').addEventListener('click', e => { if (e.target === document.getElementById('modal-overlay')) closeModal(); });
function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ===== COUNTER ANIMATION =====
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = +el.dataset.target;
    let current = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current).toLocaleString();
      if (current >= target) clearInterval(timer);
    }, 25);
  });
}
const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { animateCounters(); statsObserver.disconnect(); } });
}, { threshold: 0.5 });
statsObserver.observe(document.querySelector('.stats-band'));

// ===== TESTIMONIAL SLIDER =====
let testiIdx = 0;
const slides = document.querySelectorAll('.testi-slide');
const dots = document.querySelectorAll('.dot');
function showSlide(idx) {
  slides.forEach(s => s.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));
  slides[idx].classList.add('active');
  dots[idx].classList.add('active');
  testiIdx = idx;
}
dots.forEach(d => d.addEventListener('click', () => showSlide(+d.dataset.idx)));
setInterval(() => showSlide((testiIdx + 1) % slides.length), 5000);

// ===== LOGO FALLBACK =====
const logoImg = document.getElementById('logo-img');
if (logoImg) {
  logoImg.onerror = function() {
    this.style.display = 'none';
    document.getElementById('logo-text').style.display = 'block';
  };
}

// ===== APPLY SAVED LANGUAGE =====
if (typeof applyLang === 'function') applyLang(currentLang);
