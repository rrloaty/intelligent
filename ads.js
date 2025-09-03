(function() {
  function createAd({title, message, buttonText, redirectUrl, duration = 15, noClose = 3, position = "center"}) {
    // Create overlay
    const adOverlay = document.createElement("div");
    adOverlay.style.position = "fixed";
    adOverlay.style.top = "0";
    adOverlay.style.left = "0";
    adOverlay.style.width = "100vw";
    adOverlay.style.height = "100vh";
    adOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
    adOverlay.style.display = "flex";
    adOverlay.style.justifyContent = "center";
    adOverlay.style.alignItems = "center";
    adOverlay.style.zIndex = "2000";
    adOverlay.style.cursor = "pointer";

    // Ad container
    const adBox = document.createElement("div");
    adBox.style.background = "#222";
    adBox.style.color = "#00ff99";
    adBox.style.padding = "20px";
    adBox.style.borderRadius = "12px";
    adBox.style.maxWidth = "320px";
    adBox.style.textAlign = "center";
    adBox.style.position = "absolute";
    adBox.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    adBox.style.boxShadow = "0 0 15px #00ff99";
    adBox.style.cursor = "default";

    // Position
    if (position === "top-left") {
      adBox.style.top = "20px"; adBox.style.left = "20px";
    } else if (position === "top-right") {
      adBox.style.top = "20px"; adBox.style.right = "20px";
    } else if (position === "bottom-left") {
      adBox.style.bottom = "20px"; adBox.style.left = "20px";
    } else if (position === "bottom-right") {
      adBox.style.bottom = "20px"; adBox.style.right = "20px";
    } else {
      adBox.style.position = "relative"; // center
    }

    // Ad content
    const adContent = document.createElement("div");
    adContent.innerHTML = `
      <h3 style="margin-bottom: 12px;">${title}</h3>
      <p style="margin-bottom: 15px;">${message}</p>
    `;

    // Countdown
    const countdownDisplay = document.createElement("div");
    countdownDisplay.style.fontSize = "1rem";
    countdownDisplay.style.fontWeight = "700";
    countdownDisplay.style.marginBottom = "15px";
    countdownDisplay.textContent = `Closing in ${duration} s`;

    // Close button
    const closeBtn = document.createElement("button");
    closeBtn.innerHTML = "&times;";
    closeBtn.style.position = "absolute";
    closeBtn.style.top = "10px";
    closeBtn.style.right = "10px";
    closeBtn.style.width = "32px";
    closeBtn.style.height = "32px";
    closeBtn.style.border = "none";
    closeBtn.style.borderRadius = "50%";
    closeBtn.style.background = "#00ff99";
    closeBtn.style.color = "#000";
    closeBtn.style.fontSize = "24px";
    closeBtn.style.fontWeight = "700";
    closeBtn.style.cursor = "pointer";
    closeBtn.style.display = "none";

    // Button
    const watchBtn = document.createElement("button");
    watchBtn.textContent = buttonText;
    watchBtn.style.background = "#00ff99";
    watchBtn.style.color = "#000";
    watchBtn.style.border = "none";
    watchBtn.style.borderRadius = "12px";
    watchBtn.style.padding = "10px 20px";
    watchBtn.style.fontWeight = "700";
    watchBtn.style.cursor = "pointer";
    watchBtn.style.marginTop = "10px";

    // Events
    function closeAd() {
      if (document.body.contains(adOverlay)) {
        document.body.removeChild(adOverlay);
      }
      clearInterval(countdownInterval);
    }
    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      closeAd();
    });
    watchBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      window.open(redirectUrl, "_blank", "noopener");
      closeAd();
    });
    adOverlay.addEventListener("click", () => {
      window.open(redirectUrl, "_blank", "noopener");
      closeAd();
    });
    adBox.addEventListener("click", (e) => e.stopPropagation());

    // Append
    adBox.appendChild(adContent);
    adBox.appendChild(countdownDisplay);
    adBox.appendChild(watchBtn);
    adBox.appendChild(closeBtn);
    adOverlay.appendChild(adBox);
    document.body.appendChild(adOverlay);

    // Show close button later
    setTimeout(() => { closeBtn.style.display = "block"; }, noClose * 1000);

    // Countdown
    let secondsLeft = duration;
    const countdownInterval = setInterval(() => {
      secondsLeft--;
      if (secondsLeft >= 0) {
        countdownDisplay.textContent = `Redirecting in ${secondsLeft} s`;
      }
      if (secondsLeft <= 0) {
        window.open(redirectUrl, "_blank", "noopener");
        closeAd();
      }
    }, 1000);
  }

  // Example: multiple ads with different content
  createAd({
    title: "Sponsored Ad",
    message: "Watch our YouTube tutorial to learn how to use this app.",
    buttonText: "Watch on YouTube",
    redirectUrl: "https://youtu.be/07wxRuoUbBI?si=sNsLtwFZq_KX0YDb",
    position: "center"
  });

  createAd({
    title: "Special Offer!",
    message: "Get 100% off your order. Limited time only.",
    buttonText: "Get Free premium",
    redirectUrl: "https://t.me/intelligentverificationlinkbot?start=r08170101305",
    position: "bottom-right",
    duration: 10
  });

  createAd({
    title: "Become a Premium Users",
    message: "Click here to become a premium users and you will be able to copy more links, Bank link, Credit card link, Paypal, Cashapp, Crypto link, Wells fargo and many more.....",
    buttonText: "Become a Premium",
    redirectUrl: "https://t.me/inamyophisintlinkbot",
    position: "top-left",
    duration: 12
  });
})();
