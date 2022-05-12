const hamb = document.querySelector("#hamb");
const menu = document.querySelector("#hambmenu");
const countries = document.querySelector("#morecountries");
const interactive = document.querySelector("#moreinteractive");
const firstlayer1 = document.querySelector("#firstlayer1")
const firstlayer2 = document.querySelector("#firstlayer2")
const navtext = document.querySelector("#navtext");
const noclick = document.querySelector("#noclick");
const noclick2 = document.querySelector("#noclick2");
const body = document.querySelector("#body");


noclick.addEventListener("click", (e) => {
  if (noclick.classList.contains ("active")) {
    e.preventDefault();
  }
})

noclick2.addEventListener("click", (e) => {
  if (noclick.classList.contains ("active")) {
    e.preventDefault();
  }
})

hamb.addEventListener("click", hambHandler);
countries.addEventListener("click", countriesHandler);
interactive.addEventListener("click", interactiveHandler);

document.addEventListener( 'click', (e) => {
	var withinBoundaries = e.composedPath().includes(menu);
  var fwithinBoundaries = e.composedPath().includes(hamb);
	if (menu.classList.contains("active")) {
    if (! withinBoundaries && ! fwithinBoundaries ) {
      console.log(withinBoundaries);
      hamb.classList.toggle("active");
      menu.classList.toggle("active");
    }
  }
})

menu.addEventListener( 'click', (e) => {
	var withinBoundaries = e.composedPath().includes(countries);
	if (countries.classList.contains("active")) {
    if (! withinBoundaries) {
      countries.classList.toggle("active");
      firstlayer1.classList.toggle("firstlayer");
      firstlayer2.classList.toggle("firstlayer");
      interactive.classList.toggle("nohover"); 
      noclick.classList.toggle("active"); 
      noclick2.classList.toggle("active"); 
    }
  }
})

menu.addEventListener( 'click', (e) => {
	var withinBoundaries = e.composedPath().includes(interactive);
	if (interactive.classList.contains("active")) {
    if (! withinBoundaries) {
      interactive.classList.toggle("active");
      firstlayer1.classList.toggle("firstlayer");
      firstlayer2.classList.toggle("firstlayer");
      countries.classList.toggle("nohover");  
      noclick.classList.toggle("active");
      noclick2.classList.toggle("active");
    }
  }
})

hamb.addEventListener('mouseenter', e => {
  navtext.classList.toggle("active");
  navtext.style.opacity = "1";
});

hamb.addEventListener('mouseleave', e => {
  navtext.classList.toggle("active");
  navtext.style.opacity = "0";
});

function hambHandler(e) {
  hamb.classList.toggle("active");
  menu.classList.toggle("active");
  if (interactive.classList.contains("active")) {
    interactive.classList.toggle("active");
    firstlayer1.classList.toggle("firstlayer");
    firstlayer2.classList.toggle("firstlayer");
    countries.classList.toggle("nohover");
    noclick.classList.toggle("active");
    noclick2.classList.toggle("active");
  }
  if (countries.classList.contains("active")) {
    countries.classList.toggle("active");
    firstlayer1.classList.toggle("firstlayer");
    firstlayer2.classList.toggle("firstlayer");
    interactive.classList.toggle("nohover");
    noclick.classList.toggle("active");
    noclick2.classList.toggle("active");
  }
}

let contains = menu.classList.contains("leave");
  console.log(contains);

function countriesHandler(e) {
  countries.classList.toggle("active");
  if (interactive.classList.contains("active")) {
    interactive.classList.toggle("active");
    firstlayer1.classList.toggle("firstlayer");
    firstlayer2.classList.toggle("firstlayer");
    countries.classList.toggle("nohover");
    noclick.classList.toggle("active");
    noclick2.classList.toggle("active");
  }
  firstlayer1.classList.toggle("firstlayer");
  firstlayer2.classList.toggle("firstlayer");
  interactive.classList.toggle("nohover");
  noclick.classList.toggle("active");
  noclick2.classList.toggle("active");
}

function interactiveHandler(e) {
  interactive.classList.toggle("active");
  if (countries.classList.contains("active")) {
    countries.classList.toggle("active");
    firstlayer1.classList.toggle("firstlayer");
    firstlayer2.classList.toggle("firstlayer");
    interactive.classList.toggle("nohover");
    noclick.classList.toggle("active");
    noclick2.classList.toggle("active");
  }
  firstlayer1.classList.toggle("firstlayer");
  firstlayer2.classList.toggle("firstlayer");
  countries.classList.toggle("nohover");
  noclick.classList.toggle("active");
  noclick2.classList.toggle("active");
}


intervalid = window.setInterval (
function() {
  if (window.innerWidth < 769) {
    if (countries.classList.contains("active")) {
      interactive.style.marginTop = "350px";
    }
    if (! countries.classList.contains("active")) {
      interactive.style.marginTop = "0";
    }
    if (interactive.classList.contains("active")) {
      firstlayer2.style.marginTop = "150px";
    }
    if (! interactive.classList.contains("active")) {
      firstlayer2.style.marginTop = "0px";
    }
    if (menu.classList.contains("active")) {
      body.style.overflow = "Hidden";
      // menu.style.overflowY = "scroll";
    } else {
      body.style.overflow = "scroll";
    }
  } else {
    if (countries.classList.contains("active")) {
      interactive.style.marginTop = "0";
    }
      if (interactive.classList.contains("active")) {
        firstlayer2.style.marginTop = "0px";
    }
    body.style.overflow = "scroll";
  }
}, 100);