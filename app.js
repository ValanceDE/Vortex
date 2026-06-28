const input = document.getElementById("romInput");

input.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const url = URL.createObjectURL(file);

  startGame(url);
});

function startGame(gameUrl) {

  // hide menu
  document.getElementById("menu").style.display = "none";

  // show emulator
  document.getElementById("emulatorScreen").classList.remove("hidden");

  // IMPORTANT: set config FIRST (EXACT EmulatorJS FLOW)
  window.EJS_player = "#game";
  window.EJS_core = "gba"; // default (can be extended later)
  window.EJS_gameUrl = gameUrl;

  // FIXED: use official CDN (this is what actually works)
  window.EJS_pathtodata = "https://cdn.emulatorjs.org/latest/data/";

  // load emulator ONLY ONCE
  if (!window.__ejs_loaded) {
    window.__ejs_loaded = true;

    const script = document.createElement("script");
    script.src = "https://cdn.emulatorjs.org/latest/data/loader.js";
    document.body.appendChild(script);
  }
}
