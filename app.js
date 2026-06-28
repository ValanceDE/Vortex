const input = document.getElementById("romInput");
const fileName = document.getElementById("fileName");

input.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  fileName.innerText = file.name;

  const url = URL.createObjectURL(file);

  launchVortex(url);
});

function launchVortex(gameUrl) {

  // hide menu
  document.getElementById("menu").style.display = "none";

  // show emulator fullscreen
  document.getElementById("emulatorScreen").classList.remove("hidden");

  // EmulatorJS config
  EJS_player = "#game";
  EJS_core = "gba";
  EJS_gameUrl = gameUrl;
  EJS_pathtodata = "https://cdn.emulatorjs.org/latest/data/";

  // load once
  if (!window.__vortex_loaded) {
    window.__vortex_loaded = true;

    const script = document.createElement("script");
    script.src = "https://cdn.emulatorjs.org/latest/data/loader.js";
    document.body.appendChild(script);
  } else {
    location.reload();
  }
}
