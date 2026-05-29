// Open custom URL schemes (deep links)
function openURL() {
  const url = document.getElementById("urlInput").value;

  if (!url) return;

  // iOS allows scheme navigation
  window.location.href = url;
}

// Run iOS Shortcuts
function runShortcut() {
  const name = encodeURIComponent(document.getElementById("shortcutName").value);
  const text = encodeURIComponent(document.getElementById("shortcutText").value);

  const url = `shortcuts://run-shortcut?name=${name}&input=text&text=${text}`;

  window.location.href = url;
}

// Notifications
async function enableNotifications() {
  if (!("Notification" in window)) {
    alert("Not supported");
    return;
  }

  const perm = await Notification.requestPermission();

  if (perm === "granted") {
    alert("Notifications aktiviert");
  }
}

function sendTestNotification() {
  if (Notification.permission !== "granted") return;

  new Notification("SpaceLauncher", {
    body: "Test Notification ausgelöst",
    icon: "icon.png"
  });
}

// Service Worker (PWA)
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}
