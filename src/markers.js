function LoadMarkers() {
  const state = {
    defaultUrl:
      "https://raw.githubusercontent.com/fatecodes/swe3-ar-literacy/master/src/utils/alphabet/Markers/marks",
    prefix: "pattern-letra-",
    markers: [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "L",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
    ],
  };

  function load() {
    const fragment = document.createDocumentFragment();
    state.markers.forEach((marker) => {
      const element = document.createElement("a-marker");
      element.id = marker;
      element.setAttribute("registerevents", null);
      element.setAttribute("type", "pattern");
      element.setAttribute(
        "url",
        `${state.defaultUrl}/${state.prefix}${marker}.patt`
      );

      fragment.appendChild(element);
    });

    return fragment;
  }

  return { load };
}
