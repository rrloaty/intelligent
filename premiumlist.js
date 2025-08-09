// premiumlist.js

// Define which users have premium access
const premiumUsers = [123456789];

// Premium links list
const premiumLinksData = [
  { title: "Example Link", url: "https://example.com", thumb: "https://logo.clearbit.com/example.com" },
  { title: "Another Link", url: "https://another.com", thumb: "https://logo.clearbit.com/another.com" }
];

// Load premium links into the DOM
document.addEventListener("DOMContentLoaded", () => {
  const userId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id || null;
  const premiumLinksContainer = document.getElementById("premium-links");

  premiumLinksData.forEach(link => {
    premiumLinksContainer.appendChild(createLinkItem(link, false, userId));
  });

  // Show premium message if user is not premium
  if (!premiumUsers.includes(userId)) {
    document.getElementById("premium-msg").textContent =
      "Go premium to view or copy these links.";
  }
});

// Creates link elements
function createLinkItem(link, isFree, userId) {
  const tg = window.Telegram?.WebApp || null;
  const isPremiumUser = premiumUsers.includes(userId);

  const wrapper = document.createElement("div");
  wrapper.className = "link-item";

  // Thumbnail
  const imgDiv = document.createElement("div");
  imgDiv.className = "link-thumb";
  const img = document.createElement("img");
  img.src = link.thumb;
  imgDiv.appendChild(img);
  wrapper.appendChild(imgDiv);

  // Body
  const bodyDiv = document.createElement("div");
  bodyDiv.className = "link-body";

  const title = document.createElement("div");
  title.className = "link-title";
  title.textContent = link.title;
  bodyDiv.appendChild(title);

  const urlDisplay = document.createElement("div");
  urlDisplay.className = "link-url";
  urlDisplay.textContent = isFree || isPremiumUser
    ? link.url.replace("{id}", userId || "")
    : "🔒 Premium — Subscribe to Unlock";
  bodyDiv.appendChild(urlDisplay);

  wrapper.appendChild(bodyDiv);

  // Actions
  const actions = document.createElement("div");
  actions.className = "link-actions";

  const copyBtn = document.createElement("button");
  copyBtn.className = "btn ghost";
  copyBtn.textContent = "Copy";
  copyBtn.addEventListener("click", () => {
    if (!isFree && !isPremiumUser) {
      alert("Premium only!");
      return;
    }
    const finalUrl = link.url.replace("{id}", userId || "");
    navigator.clipboard.writeText(finalUrl).then(() => {
      alert("Link copied!");
    });
  });
  actions.appendChild(copyBtn);

  const openBtn = document.createElement("button");
  openBtn.className = "btn";
  openBtn.textContent = "Open";
  openBtn.addEventListener("click", () => {
    if (!isFree && !isPremiumUser) {
      alert("Premium only!");
      return;
    }
    const finalUrl = link.url.replace("{id}", userId || "");
    if (tg?.openLink) tg.openLink(finalUrl);
    else window.open(finalUrl, "_blank");
  });
  actions.appendChild(openBtn);

  wrapper.appendChild(actions);
  return wrapper;
}