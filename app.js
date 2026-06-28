let selectedSystem = null;

const input = document.getElementById("romInput");

function selectSystem(sys) {
  selectedSystem = sys;
  input.click();
}

input.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file || !selectedSystem) return;

  const url = URL.createObjectURL(file);
  startGame(url);
});

function startGame(gameUrl) {

  // hide menu completely
  document.getElementById("menu").style.display = "none";

  // show emulator
  document.getElementById("emulatorScreen").classList.remove("hidden");

  // IMPORTANT: EmulatorJS config FIRST (as required)
  window.EJS_player = "#game";
  window.EJS_gameUrl = gameUrl;
  window.EJS_pathtodata = "https://cdn.emulatorjs.org/latest/data/";

  // SYSTEM CORE MAPPING (FIXED)
  if (selectedSystem === "gba") {
    window.EJS_core = "gba";
  }

  if (selectedSystem === "n64") {
    window.EJS_core = "n64";
  }

  if (selectedSystem === "3ds") {
    window.EJS_core = "3ds";
    window.EJS_threads = true;
  }

  // load emulator ONLY ONCE
  if (!window.__ejs_loaded) {
    window.__ejs_loaded = true;

    const script = document.createElement("script");
    script.src = "https://cdn.emulatorjs.org/latest/data/loader.js";
    document.body.appendChild(script);
  }
}
