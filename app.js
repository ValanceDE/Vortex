let system = null;
let file = null;

function select(s) {
  system = s;

  document.getElementById("home").classList.remove("active");
  document.getElementById("rom").classList.add("active");

  document.getElementById("title").innerText =
    "Load ROM: " + s.toUpperCase();
}

function back() {
  document.getElementById("rom").classList.remove("active");
  document.getElementById("home").classList.add("active");
}

document.getElementById("file").addEventListener("change", (e) => {
  file = e.target.files[0];
});

function launch() {
  if (!system || !file) return alert("Select system + ROM");

  const url = URL.createObjectURL(file);

  // CLEAR OLD EMULATOR
  document.getElementById("game").innerHTML = "";

  // EmulatorJS config (IMPORTANT ORDER)
  window.EJS_player = "#game";
  window.EJS_gameUrl = url;
  window.EJS_pathtodata = "data/";

  if (system === "gba") window.EJS_core = "gba";
  if (system === "n64") window.EJS_core = "n64";
  if (system === "3ds") {
    window.EJS_core = "3ds";
    window.EJS_threads = true;
  }

  // switch view FIRST
  document.getElementById("rom").classList.remove("active");
  document.getElementById("emu").classList.add("active");

  // LOAD EMULATOR (ONLY ONCE PER SESSION)
  const script = document.createElement("script");
  script.src = "data/loader.js";
  document.body.appendChild(script);
}
