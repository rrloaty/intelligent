// premiumlist.js

// Check Telegram WebApp environment
const tg = window.Telegram?.WebApp || null;

// If not inside Telegram or no user data, block everything
if (!tg || !tg.initDataUnsafe?.user) {
  document.body.innerHTML = `
    <div style="font-family:sans-serif;text-align:center;margin-top:50px;">
      <h2>❌ Premium content is only available inside Telegram</h2>
      <p>Please open this link from the Telegram app.</p>
    </div>
  `;
  throw new Error("Not in Telegram WebApp");
}

tg.ready();

// Get Telegram user
const u = tg.initDataUnsafe.user;
const userId = u.id;

// Premium links (edit here)
const premiumLinksData = [
  { title: "Premium Tool 1", url: "https://example.com/premium1?id=" + userId, thumb: "https://example.com/icon1.png" },
  { title: "Premium Tool 2", url: "https://example.com/premium2?id=" + userId, thumb: "https://example.com/icon2.png" }
];

// Function to create a link item
function createLinkItem(link, isFree, userId) {
  const div = document.createElement("div");
  div.className = "link-item";
  div.innerHTML = `
    <img src="${link.thumb}" alt="">
    <div class="link-info">
      <strong>${link.title}</strong>
    </div>
    <button class="btn small" onclick="openLink('${link.url}')">
      Open Link
    </button>
  `;
  return div;
}

// Render premium links
document.addEventListener("DOMContentLoaded", () => {
  const premiumContainer = document.getElementById("premium-links");
  premiumLinksData.forEach(link => {
    premiumContainer.appendChild(createLinkItem(link, false, userId));
  });

  // Show premium message
  document.getElementById("premium-msg").textContent = "You have access to premium links!";
});

// Open link function
function openLink(url) {
  if (tg?.openLink) {
    tg.openLink(url);
  } else {
    window.open(url, "_blank");
  }
}

// Expose createLinkItem to global scope so main.js can use it
window.createLinkItem = createLinkItem;