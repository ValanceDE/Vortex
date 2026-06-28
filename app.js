const input = document.getElementById("romInput");
const fileName = document.getElementById("fileName");

input.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  fileName.innerText = file.name;

  const blobURL = URL.createObjectURL(file);

  startEmulator(blobURL);
});

function startEmulator(gameUrl) {
  document.getElementById("emuWrapper").classList.remove("hidden");

  // IMPORTANT: EmulatorJS setup MUST match docs exactly
  EJS_player = "#game";
  EJS_core = "gba"; // or mgba
  EJS_gameUrl = gameUrl;
  EJS_pathtodata = "https://cdn.emulatorjs.org/latest/data/";

  // load emulator ONLY ONCE
  if (!window._ejs_loaded) {
    window._ejs_loaded = true;

    const script = document.createElement("script");
    script.src = "https://cdn.emulatorjs.org/latest/data/loader.js";
    document.body.appendChild(script);
  } else {
    // reload workaround
    location.reload();
  }
}
