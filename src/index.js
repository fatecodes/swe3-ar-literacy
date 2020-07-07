const Markers = LoadMarkers();
const markersElements = Markers.load();

const game = createGame(localStorage.getItem("animal"));
const animalElement = document.getElementById("animal");
const animalTextElement = document.getElementById("animalText");
const letterStatusElement = document.getElementById("letterStatus");
const sceneElement = document.getElementById("scene");

let timer = null;

window.onload = () => {
  sceneElement.appendChild(markersElements);
  drawAnimal();

  localStorage.removeItem("expressions");

  setInterval(persistExpression, 3000);
};

AFRAME.registerComponent("registerevents", {
  init: function () {
    var marker = this.el;
    marker.addEventListener("markerFound", () => markerFound(marker));
    marker.addEventListener("markerLost", () => markerLost(marker));
  },
});

function drawAnimal() {
  const animal = localStorage.getItem("animal");

  animalElement.setAttribute("src", `#${animal}`);
}

function markerFound(markerElement) {
  const markerId = markerElement.id;

  if (game.validateLetter(markerId)) {
    game.addLetter(markerId);
    addLetterAnimalText(markerId);
    changeLetterStatus(true);
  } else {
    changeLetterStatus(false);
    console.log(
      "Letra errada. Você informou a letra: " +
      markerId +
      ". Informe outra letra"
    );
  }

  if (game.validateWord()) {
    window.location = "results.html";
  }
}

function markerLost(markerElement) {
  const markerId = markerElement.id;
}

function addLetterAnimalText(letter) {
  const currentValue = animalTextElement.getAttribute("value");
  const newValue = `${currentValue}${letter}`;
  animalTextElement.setAttribute("value", newValue.toUpperCase());
}

function changeLetterStatus(letterStatus) {
  clearLetterStatus();

  const image = letterStatus ? "#hit" : "#err";
  letterStatusElement.setAttribute("src", image);

  timer = setTimeout(clearLetterStatus, 3 * 1000);
}

function clearLetterStatus() {
  clearTimeout(timer);
  letterStatusElement.setAttribute("src", "#defaultStatus");
}

function persistExpression() {
  if (!faceExpressionInstance.state.currentDetection) return;

  const persistedExpressions = localStorage.getItem("expressions");
  let array = persistedExpressions ? JSON.parse(persistedExpressions) : [];
  array = [...array, faceExpressionInstance.state.currentDetection];
  localStorage.setItem("expressions", JSON.stringify(array));
}
