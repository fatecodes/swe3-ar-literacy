function createGame(animal) {
  const state = {
    animal,
    word: [],
  };

  function addLetter(letter) {
    state.word.push(letter);
  }

  function validateLetter(letter) {
    const count = state.word.length;
    return animal[count] == letter;
  }

  function validateWord() {
    console.log(state);
    const wordStr = state.word.join("");
    return wordStr == state.animal;
  }

  return { state, addLetter, validateWord, validateLetter };
}
