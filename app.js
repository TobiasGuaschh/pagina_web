const PRODUCTS = [
  { id: "blazer", title: "Blazer gris", price: "$ 49.900", firstExt: "jpg", measures: { Hombro: 44, Pecho: 52, Largo: 72 } },
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

function byId(id) {
  return PRODUCTS.find(p => p.id === id);
}

function imagePath(id, index) {
  return `img/${id}/${index}.jpg`;
}


function renderHome() {
  const wrap = $('#grid-productos');
  if (!wrap) return;

  wrap.innerHTML = PRODUCTS.map(p => `
    <article class="card">
      <a class="card-media" href="producto.html?id=${p.id}">
        <img src="${imagePath(p.id, 1)}" alt="${p.title}">
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

function renderProductDetail() {
  const detail = $('#product-detail');
  if (!detail) return;

  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const product = byId(id);

  if (!product) {
    detail.innerHTML = `<p>Producto no encontrado.</p>`;
    return;
  }

  const gallery = $('#product-gallery');
  gallery.innerHTML = `
    <div class="gallery-main">
      <img id="main-img" src="${imagePath(product.id, 1)}" alt="${product.title}">
    </div>
    <div class="gallery-thumbs">
      <img data-i="1" src="${imagePath(product.id, 1)}" alt="">
      <img data-i="2" src="${imagePath(product.id, 2)}" alt="">
      <img data-i="3" src="${imagePath(product.id, 3)}" alt="">
    </div>
  `;

  $('#product-detail h1').textContent = product.title;
  $('.price').textContent = product.price;
  $('.desc').textContent = "Prenda en excelente estado. Descripción pendiente.";
  
  const measures = $('.measures');
  measures.innerHTML = Object.entries(product.measures)
    .map(([k,v]) => `<p>${k}: ${v} cm</p>`)
    .join('');

  const mainImg = $('#main-img');
  $$('.gallery-thumbs img').forEach(img => {
    img.addEventListener('click', () => {
      mainImg.src = imagePath(product.id, img.dataset.i);
    });
  });
}

function renderFicha() {
  const ficha = $('#ficha');
  if (!ficha) return;

  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const prod = byId(id);

  if (!prod) {
    ficha.innerHTML = `<p>No encontramos este producto.</p>`;
    return;
  }

  $('#prod-title').textContent = prod.title;
  $('#prod-price').textContent = prod.price;

  const main = $('#img-principal');
  main.src = imagePath(prod.id, 1);

  const thumbs = $('#thumbs');
  thumbs.innerHTML = [1,2,3].map(i => `
    <img data-i="${i}" src="${imagePath(prod.id, i)}">
  `).join('');

  $$('#thumbs img').forEach(img => {
    img.addEventListener('click', () => {
      main.src = imagePath(prod.id, img.dataset.i);
    });
  });

  const tbody = $('#measures-body');
  tbody.innerHTML = Object.keys(prod.measures)
    .map(k => `<tr><td>${k}</td><td>${prod.measures[k]} cm</td></tr>`)
    .join('');
}

function renderCarousel() {
  const track = $('#car-track');
  if (!track) return;

  const FOLDERS = PRODUCTS.map(p => p.id);

  track.innerHTML = FOLDERS.map(f => `
    <li class="car-slide"><img src="${imagePath(f, 1)}" alt="${f}"></li>
  `).join('');
}

function handleContact() {
  const form = $('#form-contacto');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const msg = $('#contacto-msg');
    msg.textContent = "¡Mensaje enviado!";
    form.reset();
  });
}

function handleNews() {
  const form = $('#form-news');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const msg = $('#news-msg');
    msg.textContent = "¡Listo! Te sumamos a novedades.";
    form.reset();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderHome();
  renderProductDetail();
  renderFicha();
  renderCarousel();
  handleContact();
  handleNews();
});

