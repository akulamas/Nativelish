const up = document.querySelector("#up");
const down = document.querySelector("#down");
const intro = document.querySelector("#intro");
const gbcss = document.querySelector("#gb");
const usacss = document.querySelector("#usa");
const austcss = document.querySelector("#aust");
const canadcss = document.querySelector("#canad");
const newzelcss = document.querySelector("#newzel");
const contentUsa = document.querySelector ("#contentUsa");
const contentAustralia = document.querySelector ("#contentAustralia");
const contentCanada = document.querySelector ("#contentCanada");
const contentNewzel = document.querySelector ("#contentNewzel");
const contentBritain = document.querySelector ("#contentBritain");
let i = 0;

clc();
sw();

down.addEventListener("click", (e) => {
  clc();
  if ( i < 4) {
    i++;
  } else {
    i = 0;
  }
  sw();
})

up.addEventListener("click", (e) => {
  clc();
  if ( i > 0) {
    i--;
  } else {
    i = 4;
  }
  sw();
})

function sw() {
  switch(i) {
    case 0:
      usa();
      break;
    case 1:
      aust();
      break;
    case 2:
      canad();
      break;
    case 3:
      newzel();
      break;
    case 4:
      gb();
      break;
  }
}

function usa() {
  document.getElementById("slide1").checked = true;
  body.style.background = "a3b8ff";
  contentUsa.style.display = "block";
  intro.classList.add ("usa");
  newzelcss.classList.add ("side01");
  gbcss.classList.add ("side1");
  usacss.classList.add ("main");
  austcss.classList.add ("side2");
  canadcss.classList.add ("side02");
}

function aust() {
  document.getElementById("slide6").checked = true;
  body.style.background = "#82B6E7";
  contentAustralia.style.display = "block";
  intro.classList.add ("aust");
  gbcss.classList.add ("side01");
  usacss.classList.add ("side1")
  austcss.classList.add ("main");
  canadcss.classList.add ("side2");
  newzelcss.classList.add ("side02");
}

function canad() {
  document.getElementById("slide11").checked = true;
  body.style.background = "#90BBE2";
  contentCanada.style.display = "block";
  intro.classList.add ("canad");
  usacss.classList.add ("side01");
  austcss.classList.add ("side1");
  canadcss.classList.add ("main");
  newzelcss.classList.add ("side2");
  gbcss.classList.add ("side02");
}

function newzel() {
  document.getElementById("slide16").checked = true;
  body.style.background = "#8DC5DF";
  contentNewzel.style.display = "block";
  intro.classList.add ("newzel");
  austcss.classList.add ("side01");
  canadcss.classList.add ("side1");
  newzelcss.classList.add ("main");
  gbcss.classList.add ("side2");
  usacss.classList.add ("side02");
}

function gb() {
  document.getElementById("slide19").checked = true;
  body.style.background = "#BDD5F6";
  contentBritain.style.display = "block";
  intro.classList.add ("gb");
  canadcss.classList.add ("side01");
  newzelcss.classList.add ("side1");
  gbcss.classList.add ("main");
  usacss.classList.add ("side2");
  austcss.classList.add ("side02");
}

function clc() {
  body.style.background = null;

  document.getElementById("slide1").checked = false;
  document.getElementById("slide6").checked = false;
  document.getElementById("slide11").checked = false;
  document.getElementById("slide16").checked = false;
  document.getElementById("slide19").checked = false;

  contentUsa.style.display = "none";
  contentAustralia.style.display = "none";
  contentCanada.style.display = "none";
  contentNewzel.style.display = "none";
  contentBritain.style.display = "none";

  intro.classList.remove ("usa");
  intro.classList.remove ("aust");
  intro.classList.remove ("canad");
  intro.classList.remove ("newzel");
  intro.classList.remove ("gb");

  gbcss.classList.remove ("side1");
  gbcss.classList.remove ("side2");
  gbcss.classList.remove ("main");
  gbcss.classList.remove ("side01");
  gbcss.classList.remove ("side02");

  usacss.classList.remove("side1");
  usacss.classList.remove("side2");
  usacss.classList.remove("main");
  usacss.classList.remove ("side01");
  usacss.classList.remove ("side02");

  austcss.classList.remove("side1");
  austcss.classList.remove("side2");
  austcss.classList.remove("main");
  austcss.classList.remove ("side01");
  austcss.classList.remove ("side02");

  canadcss.classList.remove("side2");
  canadcss.classList.remove("side1");
  canadcss.classList.remove("main");
  canadcss.classList.remove ("side01");
  canadcss.classList.remove ("side02");

  newzelcss.classList.remove("side1");
  newzelcss.classList.remove("side2");
  newzelcss.classList.remove("main");
  newzelcss.classList.remove ("side01");
  newzelcss.classList.remove ("side02");
}
