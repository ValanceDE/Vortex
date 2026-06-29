let selectedCore = null;
let romUrl = null;
let emulatorLoaded = false;

const input = document.getElementById("romInput");
const loading = document.getElementById("loading");

/* SYSTEM SELECT */
document.querySelectorAll(".card").forEach(btn => {
  btn.addEventListener("click", () => {
    selectedCore = btn.dataset.core;
    input.click();
  });
});

/* FILE SELECT */
input.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  romUrl = URL.createObjectURL(file);

  start();
});

/* START EMULATOR */
function start() {

  if (!selectedCore || !romUrl) return;

  document.getElementById("home").style.display = "none";
  document.getElementById("emulator").style.display = "block";
  loading.style.display = "flex";

  window.EJS_player = "#game";
  window.EJS_gameUrl = romUrl;
  window.EJS_pathtodata = "https://cdn.emulatorjs.org/latest/data/";

  if (selectedCore === "gba") {
    window.EJS_core = "gba";
  }

  if (selectedCore === "n64") {
    window.EJS_core = "n64";
  }

  if (selectedCore === "3ds") {
    window.EJS_core = "3ds";
    window.EJS_threads = true;
  }

  if (!emulatorLoaded) {
    emulatorLoaded = true;

    const s = document.createElement("script");
    s.src = "https://cdn.emulatorjs.org/latest/data/loader.js";

    s.onload = () => {
      setTimeout(() => {
        loading.style.display = "none";
      }, 800);
    };

    document.body.appendChild(s);
  } else {
    setTimeout(() => {
      loading.style.display = "none";
    }, 400);
  }
}
