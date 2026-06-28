const input = document.getElementById("romInput");
const fileName = document.getElementById("fileName");

input.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  fileName.innerText = file.name;

  const buffer = await file.arrayBuffer();
  const blob = new Blob([buffer]);
  const url = URL.createObjectURL(blob);

  startEmulator(url);
});

function startEmulator(gameUrl) {
  document.getElementById("emulator").classList.remove("hidden");

  window.EJS_player = "#emulator";
  window.EJS_core = "gba";
  window.EJS_gameUrl = gameUrl;

  const script = document.createElement("script");
  script.src = "https://cdn.emulatorjs.org/latest/data/loader.js";
  document.body.appendChild(script);
}
