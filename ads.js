(function() {
  const totalDuration = 10;  // total ad duration in seconds
  const noCloseDuration = 3; // seconds before close button appears
  const redirectUrl = "https://youtu.be/07wxRuoUbBI?si=sNsLtwFZq_KX0YDb"; // change this to your target URL

  // Create the ad overlay element
  const adOverlay = document.createElement("div");
  adOverlay.style.position = "fixed";
  adOverlay.style.top = "0";
  adOverlay.style.left = "0";
  adOverlay.style.width = "100vw";
  adOverlay.style.height = "100vh";
  adOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
  adOverlay.style.display = "flex";
  adOverlay.style.justifyContent = "center";
  adOverlay.style.alignItems = "center";
  adOverlay.style.zIndex = "2000";
  adOverlay.style.cursor = "pointer"; // cursor pointer for click outside ad

  // Ad container box
  const adBox = document.createElement("div");
  adBox.style.background = "#222";
  adBox.style.color = "#00ff99";
  adBox.style.padding = "20px";
  adBox.style.borderRadius = "12px";
  adBox.style.maxWidth = "320px";
  adBox.style.textAlign = "center";
  adBox.style.position = "relative";
  adBox.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
  adBox.style.boxShadow = "0 0 15px #00ff99";
  adBox.style.cursor = "default"; // reset cursor inside ad box so only outside is pointer

  // Ad content (you can customize this)
  const adContent = document.createElement("div");
  adContent.innerHTML = `
    <h3 style="margin-bottom: 12px;">Sponsored Ad</h3>
    <p style="margin-bottom: 15px;">Are you New to Intelligent! watch a tutorial video on youtube to learn how you will use this webapp.</p>
  `;

  // Countdown display
  const countdownDisplay = document.createElement("div");
  countdownDisplay.style.fontSize = "1rem";
  countdownDisplay.style.fontWeight = "700";
  countdownDisplay.style.marginBottom = "15px";
  countdownDisplay.textContent = `Closing in ${totalDuration} s`;

  // Close button, hidden initially, styled as times (×) icon
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
  closeBtn.style.lineHeight = "30px";
  closeBtn.style.cursor = "pointer";
  closeBtn.style.userSelect = "none";
  closeBtn.style.display = "none"; // hide initially
  closeBtn.style.padding = "0";
  closeBtn.style.textAlign = "center";

  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // prevent click from bubbling to overlay
    document.body.removeChild(adOverlay);
    clearInterval(countdownInterval);
  });

  // Watch button
  const watchBtn = document.createElement("button");
  watchBtn.textContent = "Watch on YouTube";
  watchBtn.style.background = "#00ff99";
  watchBtn.style.color = "#000";
  watchBtn.style.border = "none";
  watchBtn.style.borderRadius = "12px";
  watchBtn.style.padding = "10px 20px";
  watchBtn.style.fontWeight = "700";
  watchBtn.style.cursor = "pointer";
  watchBtn.style.userSelect = "none";
  watchBtn.style.fontSize = "1rem";
  watchBtn.style.marginTop = "10px";

  watchBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // prevent overlay click
    window.open(redirectUrl, "_blank", "noopener");
    if (document.body.contains(adOverlay)) {
      document.body.removeChild(adOverlay);
    }
    clearInterval(countdownInterval);
  });

  // Redirect function (for overlay clicks and auto redirect)
  function redirect() {
    window.open(redirectUrl, "_blank", "noopener");
    if (document.body.contains(adOverlay)) {
      document.body.removeChild(adOverlay);
    }
    clearInterval(countdownInterval);
  }

  // Click on overlay but NOT the ad box or close button triggers redirect
  adOverlay.addEventListener("click", redirect);
  // Prevent clicks inside adBox from redirecting (except closeBtn and watchBtn)
  adBox.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  adBox.appendChild(adContent);
  adBox.appendChild(countdownDisplay);
  adBox.appendChild(watchBtn);
  adBox.appendChild(closeBtn);
  adOverlay.appendChild(adBox);

  // Append the ad overlay to body
  document.body.appendChild(adOverlay);

  // Show close button after 3 seconds
  setTimeout(() => {
    closeBtn.style.display = "block";
  }, noCloseDuration * 1000);

  let secondsLeft = totalDuration;
  const countdownInterval = setInterval(() => {
    secondsLeft--;
    if (secondsLeft >= 0) {
      countdownDisplay.textContent = `Redirecting in ${secondsLeft} s`;
    }
    if (secondsLeft <= 0) {
      redirect();
    }
  }, 1000);
})();