// N/A Archive interactions — restrained navigation and historical map; no gamification of the subject.
const menuButton = document.querySelector('.menu-button');
const mobileNav = document.querySelector('#mobile-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.textContent = isOpen ? 'Закрыть' : 'Меню';
});

mobileNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
    if (menuButton) menuButton.textContent = 'Меню';
  });
});

const mapPoints = [
  { id: 'opera', number: '01', title: 'Венская опера', note: 'The Opera on the Ring, Vienna · 1913 (?)', coords: [48.20306, 16.36889], source: 'https://www.wiener-staatsoper.at/en/getting-here/' },
  { id: 'minorite', number: '02', title: 'Миноритенкирхе', note: 'Minorite Church and Minorite Square · 1910–12', coords: [48.2094, 16.3636], source: 'https://en.wikipedia.org/wiki/Minoritenkirche_(Vienna)' },
  { id: 'new-market', number: '03', title: 'Новый рынок', note: 'Vienna New Market · 1910–12', coords: [48.2060, 16.37058], source: 'https://www.wien.info/en/neuer-markt-161936' },
  { id: 'burg', number: '04', title: 'Бургтеатр', note: 'The Burg Theater in 1890 · 1910', coords: [48.21028, 16.36139], source: 'https://en.wikipedia.org/wiki/Burgtheater' },
  { id: 'schubert', number: '05', title: 'Дом Шуберта', note: "Courtyard of Schubert's House · 1908 (?)", coords: [48.22750, 16.35528], source: 'https://www.wienmuseum.at/schubert_geburtshaus_en' },
];

function initViennaMap() {
  const mapElement = document.querySelector('#vienna-map');
  const listElement = document.querySelector('#map-list');
  if (!mapElement || !listElement || !window.L) return;

  const map = L.map(mapElement, { scrollWheelZoom: false, zoomControl: true }).setView([48.211, 16.368], 14);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map);

  const markerStyle = L.divIcon({ className: 'museum-marker', html: '<span></span>', iconSize: [18, 18], iconAnchor: [9, 9] });
  const markers = new Map();

  mapPoints.forEach((point) => {
    const marker = L.marker(point.coords, { icon: markerStyle }).addTo(map);
    marker.bindPopup(`<strong>${point.title}</strong><br>${point.note}<br><a href="${point.source}" target="_blank" rel="noreferrer">Источник места ↗</a>`);
    markers.set(point.id, marker);

    const button = document.createElement('button');
    button.className = 'map-point';
    button.type = 'button';
    button.innerHTML = `<span class="map-point-index mono">${point.number}</span><span><span class="map-point-title">${point.title}</span><span class="map-point-note">${point.note}</span></span>`;
    button.addEventListener('click', () => {
      map.setView(point.coords, 16, { animate: true });
      markers.get(point.id).openPopup();
    });
    listElement.appendChild(button);
  });
}

document.addEventListener('DOMContentLoaded', initViennaMap);
