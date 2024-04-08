import { State } from "./state.js";
import { getReptilePlanets } from "./apis.js";
import { generatePlanetsCards } from "./planet-card.js";
import { generateErrorElement } from "./error-element.js";

const radios = document.querySelectorAll('input[name="theme-switch"]');
radios.forEach((radio) => {
  if (radio.value === "black") {
    // default bg is black
    document.documentElement.classList.add("dark");
    radio.checked = true;
  }
  radio.addEventListener("click", function (event) {
    if (event.target.value === "white") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  });
});

function render(htmlCode) {
  const planets = document.getElementById("content");
  planets.innerHTML = htmlCode;
}

const state = new State();

state.setData = function (data) {
  this.data = data;
};

state.error = function () {
  this.data = [];
};

state.subscribe("setData", function (data) {
  const htmlCode = generatePlanetsCards(data);
  render(htmlCode);
});

state.subscribe("error", function (data) {
  const htmlCode = generateErrorElement(data);
  render(htmlCode);
});

await getReptilePlanets()
  .then((planets) => {
    state.dispatch("setData", planets);
  })
  .catch((error) => {
    state.dispatch("error", error.message);
  });
