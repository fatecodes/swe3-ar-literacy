(() => {
  const resultsElement = document.getElementById("results");

  const mapExpressions = {
    neutral: "Neutro",
    happy: "Feliz",
    surprised: "Surpreso",
    sad: "Triste",
    angry: "Bravo",
    fearful: "Medo",
    disgusted: "Aborrecido",
  };

  function generateCard(expression, percentage) {
    const divCard = document.createElement("div");
    divCard.className = "card";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const flexDiv = document.createElement("div");
    flexDiv.className = "d-flex justify-content-between";

    const expressionNameDiv = document.createElement("div");
    expressionNameDiv.textContent = expression;

    const expressionPercentageDiv = document.createElement("div");
    expressionPercentageDiv.textContent = percentage;

    flexDiv.appendChild(expressionNameDiv);
    flexDiv.appendChild(expressionPercentageDiv);

    const fragment = document.createDocumentFragment();
    divCard.appendChild(cardBody).appendChild(flexDiv);

    fragment.appendChild(divCard);

    return fragment;
  }

  function calculateExpressions() {
    let expressions = localStorage.getItem("expressions");

    if (!expressions) return;

    expressions = JSON.parse(expressions);

    const total = expressions.length;

    let expressionsCount = {};

    const expressionMap = expressions.map(
      (expression) => expression.expression
    );

    expressionMap.forEach((expression) => {
      if (expressionsCount.hasOwnProperty(expression)) {
        expressionsCount[expression] = expressionsCount[expression] + 1;
      } else {
        expressionsCount[expression] = 1;
      }
    });

    let expressionsPercentage = {};

    for (let key in expressionsCount) {
      const value = expressionsCount[key];

      expressionsPercentage[key] = Math.round((value * 100) / total);
    }

    generateCards(expressionsPercentage);
  }

  function generateCards(calculateExpressions) {
    for (let key in calculateExpressions) {
      const value = calculateExpressions[key];
      const mapKey = mapExpressions[key] || key;

      const elementCard = generateCard(mapKey, `${value}%`);
      resultsElement.appendChild(elementCard);
    }
  }

  calculateExpressions();
})();
