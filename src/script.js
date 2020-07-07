window.onload = () => {
  removeAnimal();
};

function handleBtn(animal) {
  setAnimal(animal);
  window.location = "index.html";
}

function setAnimal(animal) {
  localStorage.setItem("animal", animal);
}

function removeAnimal() {
  localStorage.removeItem("animal");
}
