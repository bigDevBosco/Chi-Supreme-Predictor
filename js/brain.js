import formHome from '/js/formHome.js';
import formAway from '/js/formAway.js';
import goalHome from '/js/goalsHome.js';
import goalAway from '/js/goalsAway.js';
import prediction from '/js/prediction.js';

const newHomeForm = new formHome();
const newAwayForm = new formAway();
const newHomeGoal = new goalHome();
const newAwayGoal = new goalAway();
const analysis = new prediction();
let accuracy = 0;
let result = 0;




document.addEventListener("readystatechange", (event) => {
  if (event.target.readyState == "complete") {
    initApp();
  }
});

const initApp = () => {
  document.querySelector("#check").addEventListener("click", () => {
    //calculation functions
    calcFormValues()
    calNormalScore()
    analyst()
    //renderList()
    clearInputField()
    focus()
  })
  loadRandomData()
  //clearAllList()
  //renderList()
};

const loadRandomData = () => {
  loadGoals();
  loadRandomForms();


};

const loadGoals = () => {
  document.querySelector("#goal_scored_home").value = rand()
  document.querySelector("#goal_scored_away").value = rand()
  document.querySelector("#goal_concede_home").value = rand()
  document.querySelector("#goal_concede_away").value = rand()
};

const rand = () => {
  return (Math.random() * 3).toFixed(2)
}

const loadRandomForms = () => {
  document.querySelector("#home_form").value = loadForms();
  document.querySelector("#away_form").value = loadForms();
}

const loadForms = () => {
  const arrayLetters = ["w", "d", "l"];
  const array = [];
  let num = 0;
  do {
    array.push(arrayLetters[rand3()])
    num++
  } while (num < 5)

  return array.join("")
}

const rand3 = () => {
  return Math.ceil(Math.random() * 3) - 1;
}

/*const clearAllList = () => {
  const parentElement = document.querySelector("#data");
  deleteContent(parentElement);
}*/

/*//const deleteContent = (parentElement) => {
  let child = parentElement.lastElementChild
  if (child) {
    parentElement.removeChild(child);
    child = parentElement.lastElementChild
  }

}*/

const renderList = () => {
  const lists = [newHomeForm.getForm(), newAwayForm.getForm(), newHomeGoal.getGoal(), newAwayGoal.getGoal(), analysis.getPrediction()];
  buildAllLists(lists)

}

const buildAllLists = (lists) => {
  const div = document.createElement("div")
  div.classList.add("row");
  div.classList.add("border");
  let div1 = document.createElement("div");
  div1.classList.add("col-4");
  div1.innerHTML = `Form:
  <span>${lists[0]}/${lists[1]}</span>
  `;

  let div2 = document.createElement("div");
  div2.classList.add("col-4");
  div2.innerHTML = `Score <span id="scoreHome">${lists[2]}</span> - </span>${lists[3]}</span>`;

  let div3 = document.createElement("div");
  div3.classList.add("col-4")
  div3.innerHTML = `Prediction: Result - ${lists[4][0]} Accuracy - ${lists[4][1]}`;

  div.append(div1, div2, div3);
  document.querySelector("#data").appendChild(div);
}

const clearInputField = () => {
  document.querySelector("#goal_scored_home").value = ""
  document.querySelector("#goal_scored_away").value = ""
  document.querySelector("#goal_concede_home").value = ""
  document.querySelector("#goal_concede_away").value = ""
  document.querySelector("#home_form").value = "";
  document.querySelector("#away_form").value = "";
}

const focus = () => {
  document.querySelector("#goal_scored_home").focus();

}

const calcFormValues = () => {
  const home = document.querySelector("#home_form").value.split("");
  const away = document.querySelector("#away_form").value.split("");
  const homeValue = formAux(home);
  const awayValue = formAux(away);

  const h1 = inverseValue(awayValue);
  const a1 = inverseValue(homeValue);
  const h2 = +(document.querySelector("#goal_concede_home").value)
  const a2 = +(document.querySelector("#goal_concede_away").value)

  let method1Goals = method1(h1, h2, a1, a2);
  let method2Goals = method2(h1, h2, a1, a2);

  const goal1 = (method1Goals[0] + method2Goals[0]) / 2;
  const goal2 = (method1Goals[1] + method2Goals[1]) / 2;
  const goalH = goalCondenser(goal1);
  const goalA = goalCondenser(goal2);

  const nums = [];
  nums.push(homeValue, awayValue, goalH, goalA);
  newHomeForm.setForm(home);
  newAwayForm.setForm(away);
  return nums


}

const formAux = (array) => {
  let counter = 0;
  if (array[0] == "l") {
    counter += 5
  } else if (array[0] == "d") {
    counter += 2.5;
  } else {
    counter += 1.25;
  }

  if (array[1] == "l") {
    counter += 4
  } else if (array[1] == "d") {
    counter += 2;
  } else {
    counter += 1;
  }

  if (array[2] == "l") {
    counter += 3
  } else if (array[2] == "d") {
    counter += 1.5;
  } else {
    counter += 0.75;
  }

  if (array[3] == "l") {
    counter += 2
  } else if (array[3] == "d") {
    counter += 1;
  } else {
    counter += 0.5;
  }

  if (array[4] == "l") {
    counter += 1
  } else if (array[4] == "d") {
    counter += 0.5;
  } else {
    counter += 0.25;
  }

  return counter / 15;

}

const calNormalScore = () => {
  let h1 = document.querySelector("#goal_scored_home").value
  let a1 = document.querySelector("#goal_scored_away").value
  let h2 = document.querySelector("#goal_concede_home").value
  let a2 = document.querySelector("#goal_concede_away").value

  h1 = Number(h1);
  h2 = Number(h2);
  a1 = Number(a1);
  a2 = Number(a2);

  let method1Goals = method1(h1, h2, a1, a2);
  let method2Goals = method2(h1, h2, a1, a2);
  const goal1 = (method1Goals[0] + method2Goals[0]) / 2;
  const goal2 = (method1Goals[1] + method2Goals[1]) / 2;
  const score = [];
  const goalH = goalCondenser(goal1)
  const goalA = goalCondenser(goal2)
  score.push(goalH, goalA)

  return score;

}

const method1 = (h1, h2, a1, a2) => {
  const concedeAverage = ((h2 + a2) / 2) * 1.5;
  const homeConcede = (h2 / concedeAverage);
  const awayConcede = (a2 / concedeAverage);
  const homeScore = (h1 * a2);
  const awayScore = (a1 * h2);

  const homeGoal = homeConcede * homeScore
  const awayGoal = awayConcede * awayScore;
  const score = [];
  score.push(homeGoal, awayGoal)

  return score;
}

const method2 = (h1, h2, a1, a2) => {
  const total = h1 + h2;
  const concedeAverage = (a1 + h1) / 2;
  const goalAverage = (h2 + a2) / 2;
  const estimateGoal = ((concedeAverage / goalAverage) * total)

  const homeGoal = h1 / estimateGoal;
  const awayGoal = a1 / estimateGoal;
  const score = []
  score.push(homeGoal, awayGoal)
  return score;
}

const goalCondenser = (x) => {
  const goal = Math.floor(x);
  const goalMini = x - goal;

  if (x >= 1) {
    if (goalMini >= 0.5) {
      x = Math.ceil(x)
    } else {
      x = goal;
    }
  } else {
    if (goalMini >= 0.5) {
      x = Math.ceil(x)
    } else {
      x = goal;
    }
  }

  return x;
}

const inverseValue = (x) => {
  return 1 / x;
}

const analyst = () => {
  const totalHome = (calNormalScore()[0] + calcFormValues()[2]) / 2;
  const home = goalEstimator(totalHome)
  const totalAway = (calNormalScore()[1] + calcFormValues()[3]) / 2;
  const away = goalEstimator(totalAway);
  document.querySelector("#display").textContent = `${home}-${away}
`;

  newHomeGoal.setGoal(home)
  newAwayGoal.setGoal(away)
  decider(home, away)

}

const goalEstimator = (x) => {
  const goal = Math.floor(x);
  const goalMini = x - goal;
  if (x > 0.5) {
    if (goalMini >= 0.5) {
      x = Math.ceil(x)
    } else {
      x = x
    }
  } else {
    x = 0
  }

  return x;
}

const decider = (home, away) => {

  let homeAccuracy = 0;
  let drawAccuracy = 0;
  let awayAccuracy = 0;
  let total = 0;

  if (calcFormValues()) {
    total = calcFormValues()[2] + calcFormValues()[3];
    if (calcFormValues()[2] !== calcFormValues()[3]) {
      homeAccuracy += (calcFormValues()[2] / total) * 100;
      awayAccuracy += (calcFormValues()[3] / total) * 100;
      if (calcFormValues()[2] > calcFormValues()[3]) {
        drawAccuracy += ((calcFormValues()[2] - calcFormValues()[3]) / total) * 100;
      } else if (calcFormValues()[2] < calcFormValues()[3]) {
        drawAccuracy += ((calcFormValues()[3] - calcFormValues()[2]) / total) * 100;
      }
    } else {
      if (calcFormValues()[2] == 0) {
        drawAccuracy += 100;
        homeAccuracy += 0
        awayAccuracy += 0
      } else if (calcFormValues()[2] == 1) {
        homeAccuracy += 25;
        awayAccuracy += 25;
        drawAccuracy += 50;

      } else if (calcFormValues()[2] > 1) {
        homeAccuracy += 31;
        awayAccuracy += 31;
        drawAccuracy += 38;
      }

    }
  }

  if (calNormalScore()) {
    total = calNormalScore()[0] + calNormalScore()[1]
    if (calNormalScore()[0] !== calNormalScore()[1]) {
      homeAccuracy += (calNormalScore()[0] / total) * 100;
      awayAccuracy += (calNormalScore()[1] / total) * 100;
      if (calNormalScore()[0] > calNormalScore()[1]) {
        drawAccuracy += ((calNormalScore()[0] - calNormalScore()[1]) / total) * 100;
      } else if (home < away) {
        drawAccuracy = ((calNormalScore()[1] - calNormalScore()[0]) / total) * 100;
      }
    } else {

      if (calNormalScore()[0] == 0) {
        drawAccuracy += 100;
        homeAccuracy += 0
        awayAccuracy += 0
      } else if (calNormalScore()[0] == 1) {
        homeAccuracy += 25;
        awayAccuracy += 25;
        drawAccuracy += 50;

      } else if (calNormalScore()[0] > 1) {
        homeAccuracy += 31;
        awayAccuracy += 31;
        drawAccuracy += 38;
      }


    }

  }


  homeAccuracy = homeAccuracy / 2;
  drawAccuracy = drawAccuracy / 2;
  awayAccuracy = awayAccuracy / 2;

  let percentages = calculatePercentage(homeAccuracy, drawAccuracy, awayAccuracy);
  homeAccuracy = percentages[0].toFixed(2);
  drawAccuracy = percentages[1].toFixed(2);
  awayAccuracy = percentages[2].toFixed(2);


  const bigger = greater(+homeAccuracy, +drawAccuracy, +awayAccuracy);


  if (typeof bigger !== "object") {
    if (bigger == "Home") {
      result = "Home";
      accuracy = homeAccuracy;

    } else if (bigger == "Draw") {
      result = "Draw";
      accuracy = drawAccuracy;
    } else if (bigger == "Away") {
      result = "Away";
      accuracy = awayAccuracy;
    }
  } else {
    if (bigger.includes("Home") && bigger.includes("Draw")) {
      result = "Home/Draw";
      accuracy = homeAccuracy;
    } else if (bigger.includes("Draw") && bigger.includes("Away")) {
      result = "Away/Draw";
      accuracy = awayAccuracy;
    } else if (bigger.includes("Home") && bigger.includes("Away")) {
      result = "Home/Away";
      accuracy = awayAccuracy;

    }
  }
  document.querySelector("#display").textContent += `${result} ${accuracy}`;


  analysis.setPrediction(result, accuracy)
}

const calculatePercentage = (x, y, z) => {
  let total = x + y + z;
  const home = (x / total) * 100;
  const draw = (y / total) * 100;
  const away = (z / total) * 100;

  return [home, draw, away]

}

const greater = (x, y, z) => {
  if (x >= y && x >= z) {
    if (y == z) {
      if (x !== y) {
        return "Home"
      } else {
        return "Draw"
      }
    } else {
      if (x == y) {
        return ["Tie", "Home", "Draw"]
      } else if (x == z) {
        return ["Tie", "Home", "Away"]
      } else if (y !== z) {
        return "Home"
      }
    }
  } else if (y >= x && y >= z) {
    if (x == z) {
      return "Draw"
    } else {
      if (y == x) {
        return ["Tie", "Draw", "Home"]
      } else if (y == z) {
        return ["Tie", "Draw", "Away"]
      } else if (x !== z) {
        return "Draw"
      }
    }
  } else if (z >= x && z >= y) {
    if (x == y) {
      if (z !== x) {
        return "Away"
      } else {
        return "Draw"
      }
    } else {
      if (z == x) {
        return ["Tie", "Away", "Home"]
      } else if (z == y) {
        return ["Tie", "Away", "Draw"]
      } else if (x !== y) {
        return "Away"
      }
    }
  }

}