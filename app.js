const PRODUCTS = [
  { id: "blazer", title: "Blazer gris", price: "$ 49.900", firstExt: "png", measures: { Hombro: 44, Pecho: 52, Largo: 72 } },
  { id: "buzo_nike", title: "Buzo Nike", price: "$ 32.500", firstExt: "jpg", measures: { Pecho: 56, Largo: 70 } },
  { id: "camisa_brooksfield", title: "Camisa Brooksfield", price: "$ 28.900", firstExt: "jpg", measures: { Hombro: 43, Pecho: 50, Largo: 74 } },
  { id: "camisa_tommy", title: "Camisa Tommy", price: "$ 35.700", firstExt: "jpg", measures: { Hombro: 44, Pecho: 52, Largo: 76 } },
  { id: "camisa_zara", title: "Camisa Zara", price: "$ 26.500", firstExt: "jpg", measures: { Hombro: 45, Pecho: 54, Largo: 75 } },
  { id: "campera_lacoste", title: "Campera Lacoste", price: "$ 69.900", firstExt: "jpg", measures: { Pecho: 60, Largo: 70 } },
  { id: "campera_stwd", title: "Campera STWD", price: "$ 44.000", firstExt: "jpg", measures: { Pecho: 58, Largo: 68 } },
  { id: "campera_zara", title: "Campera Zara", price: "$ 54.900", firstExt: "jpg", measures: { Pecho: 59, Largo: 67 } },
  { id: "cartera_blanca", title: "Cartera blanca", price: "$ 21.500", firstExt: "jpg", measures: { Alto: 20, Ancho: 25, Prof: 8} },
  { id: "cartera_negra", title: "Cartera negra", price: "$ 23.900", firstExt: "jpg", measures: { Alto: 22, Ancho: 26, Prof: 9 } },
  { id: "chaleco", title: "Chaleco acolchado", price: "$ 29.500", firstExt: "jpg", measures: { Pecho: 56, Largo: 64 } },
  { id: "zapatillas", title: "Zapatillas plataforma", price: "$ 51.750", firstExt: "jpg", measures: { LargoPlantilla: 24 } }
];

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

function imagePath(id, index, firstExt) {
  const ext = index === 1 ? firstExt : "jpg";
  return `img/${id}/${index}.${ext}`;
}
function byId(id) { return PRODUCTS.find(p => p.id === id); }

function renderProduct() {
  const gallery = document.getElementById('product-gallery');
  const detail = document.getElementById('product-detail');
  if (!gallery || !detail) return;

  const params = new URLSearchParams(location.search);
  const id = parseInt(params.get('id'), 10);
  const p = byId(id);
  if (!p) return;

  const titleEl = detail.querySelector('h1');
  const priceEl = detail.querySelector('.price');
  const descEl = detail.querySelector('.desc');
  const measuresEl = detail.querySelector('.measures');

  if (titleEl) titleEl.textContent = p.title;
  if (priceEl) priceEl.textContent = p.price;
  if (descEl) descEl.textContent = p.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Podés escribir acá la descripción real después.';
  if (measuresEl) measuresEl.textContent = p.measures || 'Medidas aproximadas: busto 45 cm, largo 60 cm (ejemplo, después lo cambiás).';

  gallery.innerHTML = `
    <div class="gallery-main">
      <img src="${imagePath(p.id, 1, p.firstExt)}" alt="${p.title}">
    </div>
    <div class="gallery-thumbs">
      <img src="${imagePath(p.id, 1, p.firstExt)}" alt="${p.title}">
      <img src="${imagePath(p.id, 2, p.firstExt)}" alt="${p.title}">
      <img src="${imagePath(p.id, 3, p.firstExt)}" alt="${p.title}">
    </div>
  `;

  const mainImg = gallery.querySelector('.gallery-main img');
  const thumbs = gallery.querySelectorAll('.gallery-thumbs img');

  thumbs.forEach(img => {
    img.addEventListener('click', () => {
      mainImg.src = img.src;
    });
  });
}



function renderHome() {
  const wrap = document.getElementById('grid-productos');
  if (!wrap) return;
  wrap.innerHTML = PRODUCTS.map(p => `
    <article class="card">
      <a class="card-media" href="producto.html?id=${p.id}">
        <img src="${imagePath(p.id, 1, p.firstExt)}" alt="${p.title}">
      </a>
      <div class="card-body">
        <h3 class="card-title">${p.title}</h3>
        <p class="card-meta">Excelente estado</p>
        <div class="card-bottom">
          <span class="price">${p.price}</span>
          <a class="btn btn-cta" href="producto.html?id=${p.id}">Ver</a>
        </div>
      </div>
    </article>
  `).join('');
}

function renderFicha() {
  const ficha = document.getElementById('ficha');
  if (!ficha) return;

  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const prod = byId(id);

  if (!prod) {
    ficha.innerHTML = `<p>No encontramos este producto. <a href="index.html#productos">Volver</a></p>`;
    return;
  }

  $('#prod-title').textContent = prod.title;
  $('#prod-price').textContent = prod.price;
  $('#prod-desc').textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer feugiat, risus id efficitur commodo, eros lectus mattis erat, eget gravida arcu augue in risus. Maecenas tempor nisl quam, in convallis metus dapibus et. Integer posuere, arcu in blandit pellentesque, ex mi varius nibh, sit amet lacinia arcu magna sit amet est.";

  const main = $('#img-principal');
  main.src = imagePath(prod.id, 1, prod.firstExt);
  main.alt = prod.title;

  const thumbs = $('#thumbs');
  thumbs.innerHTML = [1, 2, 3].map(i => `
    <img data-i="${i}" src="${imagePath(prod.id, i, prod.firstExt)}" alt="Vista ${i} de ${prod.title}">
  `).join('');

  $$('#thumbs img').forEach(img => {
    img.addEventListener('click', () => {
      const i = Number(img.dataset.i);
      main.src = imagePath(prod.id, i, prod.firstExt);
    });
  });

  const tbody = $('#measures-body');
  tbody.innerHTML = Object.keys(prod.measures || {}).map(k => `
    <tr><td>${k}</td><td>${prod.measures[k]} cm</td></tr>
  `).join('') || `<tr><td colspan="2">—</td></tr>`;
}

function handleContact() {
  const form = document.getElementById('form-contacto');
  if (!form) return;
  const msg = document.getElementById('contacto-msg');

  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const nombre = data.get('nombre')?.trim();
    const email = data.get('email')?.trim();
    const texto = data.get('mensaje')?.trim();
    if (!nombre || !email || !texto) {
      msg.textContent = 'Completá todos los campos 🙏';
      return;
    }
    msg.textContent = '¡Gracias! Te escribiremos a la brevedad.';
    form.reset();
  });
}

function handleNews() {
  const form = document.getElementById('form-news');
  if (!form) return;
  const msg = document.getElementById('news-msg');

  form.addEventListener('submit', e => {
    e.preventDefault();
    const email = new FormData(form).get('email')?.trim();
    if (!email) {
      msg.textContent = 'Ingresá tu email para suscribirte.';
      return;
    }
    msg.textContent = '¡Listo! Te sumamos a la lista de novedades.';
    form.reset();
  });
}

function renderCarousel() {
  const track = document.getElementById('car-track');
  if (!track) return;

  const FOLDERS = [
    'blazer','buzo_nike','camisa_brooksfield','camisa_tommy','camisa_zara',
    'campera_lacoste','campera_stwd','campera_zara','cartera_blanca',
    'cartera_negra','chaleco','zapatillas'
  ];
  const firstImage = f => f === 'blazer' ? `img/${f}/1.png` : `img/${f}/1.jpg`;

  track.innerHTML = FOLDERS.map(f => `
    <li class="car-slide"><img src="${firstImage(f)}" alt="${f.replaceAll('_',' ')}"></li>
  `).join('');

  const wnd = track.parentElement;
  const prev = document.querySelector('.car-btn.prev');
  const next = document.querySelector('.car-btn.next');
  const step = () => Math.max(wnd.clientWidth * 0.85, 280);

  prev?.addEventListener('click', () => { wnd.scrollLeft -= step(); });
  next?.addEventListener('click', () => { wnd.scrollLeft += step(); });

  let auto = setInterval(() => { wnd.scrollLeft += step() / 2; }, 3000);
  wnd.addEventListener('mouseenter', () => clearInterval(auto));
  wnd.addEventListener('mouseleave', () => {
    auto = setInterval(() => { wnd.scrollLeft += step() / 2; }, 3000);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderHome();
  renderFicha();
  renderCarousel();
  handleContact();
  handleNews();
});
