let selectedSystem = null;
let selectedFile = null;

function selectSystem(sys) {
  selectedSystem = sys;

  document.getElementById("home").classList.remove("active");
  document.getElementById("rom").classList.add("active");

  document.getElementById("systemTitle").innerText =
    "Load ROM (" + sys.toUpperCase() + ")";
}

function backHome() {
  document.getElementById("rom").classList.remove("active");
  document.getElementById("home").classList.add("active");
}

document.getElementById("fileInput").addEventListener("change", (e) => {
  selectedFile = e.target.files[0];
});

function startGame() {
  if (!selectedSystem || !selectedFile) {
    alert("Bitte System und ROM wählen!");
    return;
  }

  const url = URL.createObjectURL(selectedFile);

  // EmulatorJS config
  window.EJS_player = "#game";
  window.EJS_gameUrl = url;
  window.EJS_pathtodata = "data/";

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

  // switch screen
  document.getElementById("rom").classList.remove("active");
  document.getElementById("emulator").classList.add("active");

  // load emulator dynamically
  const script = document.createElement("script");
  script.src = "data/loader.js";
  document.body.appendChild(script);
}
