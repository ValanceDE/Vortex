function loadGame(rom) {
  document.getElementById("emulator").classList.remove("hidden");

  // EmulatorJS init
  window.EJS_player = "#emulator";
  window.EJS_core = "gba";
  window.EJS_gameUrl = "roms/" + rom;

  const script = document.createElement("script");
  script.src = "https://cdn.emulatorjs.org/latest/data/loader.js";
  document.body.appendChild(script);
}
