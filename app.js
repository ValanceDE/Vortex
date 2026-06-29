/* =========================
   STATE
========================= */

let selectedCore = null;
let romUrl = null;
let isLoaded = false;

/* =========================
   ELEMENTS
========================= */

const romInput = document.getElementById("romInput");
const loading = document.getElementById("loading");

/* =========================
   SYSTEM SELECT
========================= */

document.querySelectorAll(".systemCard").forEach(btn => {
  btn.addEventListener("click", () => {
    selectedCore = btn.dataset.core;

    // trigger file picker instantly
    romInput.value = "";
    romInput.click();
  });
});

/* =========================
   FILE PICKER
========================= */

romInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file || !selectedCore) return;

  romUrl = URL.createObjectURL(file);

  launchEmulator();
});

/* =========================
   MAIN START FUNCTION
========================= */

function launchEmulator() {

  // show loading
  loading.classList.add("active");

  // switch UI state
  document.body.classList.add("emu-active");

  document.getElementById("home").style.display = "none";
  document.getElementById("emulator").style.display = "block";

  // delay slightly for smooth UI (iOS feel)
  setTimeout(() => {
    initEmulator();
  }, 250);
}

/* =========================
   EMULATOR INIT (IMPORTANT)
========================= */

function initEmulator() {

  // CLEAN GAME CONTAINER
  const game = document.getElementById("game");
  game.innerHTML = "";

  /* IMPORTANT ORDER (EmulatorJS requirement) */

  window.EJS_player = "#game";
  window.EJS_gameUrl = romUrl;
  window.EJS_pathtodata = "https://cdn.emulatorjs.org/latest/data/";

  /* CORE MAPPING */

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

  /* LOAD EMULATOR ONLY ONCE */

  if (!isLoaded) {
    isLoaded = true;

    const script = document.createElement("script");
    script.src = "https://cdn.emulatorjs.org/latest/data/loader.js";

    script.onload = () => {
      // hide loading after load
      setTimeout(() => {
        loading.classList.remove("active");
      }, 600);
    };

    document.body.appendChild(script);
  } else {
    // already loaded → just hide loading
    setTimeout(() => {
      loading.classList.remove("active");
    }, 400);
  }
}

/* =========================
   OPTIONAL: BACK RESET (future use)
========================= */

function resetApp() {
  location.reload();
}
