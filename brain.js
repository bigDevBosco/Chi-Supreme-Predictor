let home_form = document.querySelector("#home_form")
let away_form = document.querySelector("#away_form")
let btn = document.querySelector("#check")
let home_form_value;
let away_form_value;
let home_value;
let away_value;
let goal_scored_home = document.querySelector("#goal_scored_home")
let goal_scored_away = document.querySelector("#goal_scored_away")
let goal_conceded_home = document.querySelector("#goal_concede_home")
let goal_conceded_away = document.querySelector("#goal_concede_away")
let display = document.querySelector("#display")



let home_goal_1
let home_goal_2
let away_goal_1
let away_goal_2

let gShv;
let gSav;
let gChv;
let gCav;

let home_score_ratio;
let away_score_ratio;
let home_goal_ratio;
let away_goal_ratio;

let estimated_goal;
let estimate_home;
let estimate_away;


/*function form_to_array(form) {
  return form.split("")
}

let home_form_array = form_to_array(home_form_value)
let away_form_array = form_to_array(away_form_value)*/


function array_2_numbers(array) {
  let counter = 0
  //first array
  if (array[0] === "l") {
    counter += 5
  } else if (array[0] == "d") {
    counter += 1.25
  } else if (array[0] == "w") {
    counter += 0.3125
  }

  //second array
  if (array[1] === "l") {
    counter += 4
  } else if (array[1] == "d") {
    counter += 1
  } else if (array[1] == "w") {
    counter += 0.25
  }

  //third array beginning of winning

  if (array[2] === "l") {
    counter += 3
  } else if (array[2] == "d") {
    counter += 0.75
  } else if (array[2] == "w") {
    counter += 0.1875
  }

  //fourth array

  if (array[3] === "l") {
    counter += 2
  } else if (array[3] == "d") {
    counter += 0.5
  } else if (array[3] == "w") {
    counter += 0.125
  }

  //fifth array
  if (array[4] === "l") {
    counter += 1
  } else if (array[4] == "d") {
    counter += 0.25
  } else if (array[4] == "w") {
    counter += 0.0625
  }

  return counter / 15
}

function score() {
  gShv = +goal_scored_home.value
  gSav = +goal_scored_away.value

  gChv = +goal_conceded_home.value
  gCav = +goal_conceded_away.value


  //based on the logic of concede
  //getting concede mean and adding extra difficult not get 100%
  let concede_mean = ((gChv + gCav) / 2) * 1.5;
  //using away to determine how home will concede base
  home_goal_ratio = +gCav / concede_mean;
  //using home to determine how away will concede
  away_goal_ratio = +gChv / concede_mean;

  //Multiply personal average goal With opponents average concede
  home_score_ratio = +gShv * +gCav;
  away_score_ratio = gSav * gChv;

  let totals = (gSav + gShv)
  let score_mean = (totals / 2)
  let cede_mean = (gChv + gCav) / 2
  estimated_goal = (cede_mean / score_mean) * totals
  estimate_home = gShv / totals
  estimate_away = gSav / totals
}


function goal_method(a, b) {
  return +a * +b
}



const result = () => {
  score()
  home_form_value = home_form.value;
  away_form_value = away_form.value;

  function form_to_array(form) {
    return form.split("")
  }

  let home_form_array = form_to_array(home_form_value)
  let away_form_array = form_to_array(away_form_value)

  //form values
  home_value = array_2_numbers(home_form_array)


  away_value = array_2_numbers(away_form_array)
  //console.log(home_value, away_value)


  home_goal_1 = goal_method(home_score_ratio, home_goal_ratio)

  away_goal_1 = goal_method(away_score_ratio, away_goal_ratio)

  home_goal_2 = goal_method(estimated_goal, estimate_home)

  away_goal_2 = goal_method(estimated_goal, estimate_away)

  let est = 1 / (estimated_goal * 1.5)

  let win_goal_home1 = home_value * home_goal_1
  let win_goal_away1 = away_value * away_goal_1
  let win_goal_home2 = home_value * home_goal_2
  let win_goal_away2 = away_value * away_goal_2
  //console.log(estimated_goal)

  //Only for Scores

  let final_goal_home_1 = goal(home_goal_1)
  let final_goal_away_1 = goal(away_goal_1)

  let final_goal_home_2 = goal(home_goal_2)
  let final_goal_away_2 = goal(away_goal_2)
  //console.log(home_goal_2,away_goal_2)

  //for wins
  let home1 = goal(win_goal_home1)
  let away1 = goal(win_goal_away1)
  let home2 = goal(win_goal_home2)
  let away2 = goal(win_goal_away2)



  //comparing Scores
  let a = 0
  let d = 0
  let h = 0

  //final goal 1

  if (compare_score(final_goal_home_1, final_goal_away_1) == "h") {
    h += 1
  } else if (compare_score(final_goal_home_1, final_goal_away_1) == "a") {
    a += 1
  } else if (compare_score(final_goal_home_1, final_goal_away_1) == "d") {
    d += 1
  }



  //final goal

  if (compare_score(final_goal_home_2, final_goal_away_2) == "h") {
    h += 1
  } else if (compare_score(final_goal_home_2, final_goal_away_2) == "a") {
    a += 1
  } else if (compare_score(final_goal_home_2, final_goal_away_2) == "d") {
    d += 1
  }


  //for win 1


  if (compare_score(home1, away1) == "h") {
    h += 1
  } else if (compare_score(home1, away1) == "a") {
    a += 1
  } else if (compare_score(home1, away1) == "d") {
    d += 1
  }


  //for win 2

  if (compare_score(home2, away2) == "h") {
    h += 1
  } else if (compare_score(home2, away2) == "a") {
    a += 1
  } else if (compare_score(home2, away2) == "d") {
    d += 1
  }



  let totalwin = h + d + a

  let homeWin = (h / totalwin) * 100
  let awayWin = (a / totalwin) * 100
  let drawWin = (d / totalwin) * 100
  //console.log(homeWin, drawWin, awayWin)
  gScore = `${final_goal_home_1}:${final_goal_away_1}
${final_goal_home_2}:${final_goal_away_2}
....
${home1}:${away1}
${home2}:${away2}
`

  //start


  let home_total = goal2(((final_goal_home_1 + final_goal_home_2) / 2))
  let away_total = goal2(((final_goal_away_1 + final_goal_away_2) / 2))
  let goalsTotal = home_total + away_total
  //console.log(home_total, away_total)

  let home_total2 = goal2(((home1 + home2) / 2))
  let away_total2 = goal2(((away1 + away2) / 2))

  let home = goal2(((home_total + home_total2) / 2))
  let away = goal2(((away_total + away_total2) / 2))
  //console.log(home_total2, away_total2)
  if (home_form_value && away_form_value && gShv && gSav && gChv && gCav) {
    if (home > away) {
      choice = `Home`
      info = `Prediction Accuracy: ${homeWin}%`
    } else if (home < away) {
      choice = `Away`
      info = `Prediction Accuracy: ${awayWin}%`
    } else {
      choice = `Draw`
      info = `Prediction Accuracy: ${drawWin}%`
    }
  } else {
    choice = `Some Data missing`
    info = null
  }
  //console.log(gScore)

  let correct_score = `${home_total}:${away_total}`
  let winPrediction = `${home}:${away}`

  console.log(home_value, away_value)

  let suggestions = []

  if (home_total >= 1 && away_total >= 1) {
    suggestions.push("Both Teams to Score")
  }

  if (goalsTotal > 2) {
    suggestions.push("Over 2.5")
    suggestions.push("Over 1.5")
  }
  if (goalsTotal > 1) {
    if (suggestions.includes("Over 1.5")) {

    } else {
      suggestions.push("Over 1.5")
    }
  }

  if (home_total >= 2 && home_total >= 2) {
    suggestions.push("Home Score 2")
    suggestions.push("Home Score 1")
  }

  if (away_total >= 2 && away_total >= 2) {
    suggestions.push("Away Score 2")
    suggestions.push("Away Score 1")
  }

  if (home_total >= 1 && home_total >= 1) {
    if (suggestions.includes("Home Score 1")) {} else {
      suggestions.push("Home Score 1")
    }
  }

  if (away_total >= 1 && away_total >= 1) {
    if (suggestions.includes("Away Score 1")) {} else {
      suggestions.push("Away Score 1")
    }
  }

  if (home_total < 1 && away_total < 1) {
    suggestions.push("Under 3.5")
  }

  let random = Math.floor(Math.random() * suggestions.length)
  let random_Choice = suggestions[random]


  //fininsh

  display.innerHTML =
    `
  <p> possible Correct score:
  <h3>${correct_score}</h3>
  </p>
  <p>Possible Outcomes:</p>
  `
  for (suggestion of suggestions) {
    display.innerHTML += `<p class="display-5">${suggestion}</p>
    `
  }

  display.innerHTML += `<p>Random Choice: <span class="display-5">${random_Choice}</span></p>
<p>Winning Prediction</p>
<p> <span class="display-3">${choice}  ${winPrediction}</span></p>
<p>${info}</p>
`

  home_form.value = ""
  away_form.value = ""
  goal_scored_home.value = ""
  goal_scored_away.value = ""
  goal_conceded_home.value = ""
  goal_conceded_away.value = ""
}




function inverse_value(num) {
  return 1 / num
}

function goal(goal) {
  let result;
  let goal_midi = Math.floor(goal);
  let goal_mini = goal - goal_midi


  if (goal < 1) {
    if (goal_mini > 0.79) {
      result = Math.ceil(goal)
    } else {
      result = Math.floor(goal)
    }
  } else {
    if (goal_mini >= 0.6) {
      result = Math.ceil(goal)
    } else {
      result = Math.floor(goal)
    }
  }
  return result
}

function goal2(goal) {
  let result;
  let goal_midi = Math.floor(goal);
  let goal_mini = goal - goal_midi


  if (goal < 1) {
    if (goal_mini > 0.79) {
      result = Math.ceil(goal)
    } else {
      result = Math.floor(goal)
    }
  } else {
    if (goal_mini >= 0.5) {
      result = Math.ceil(goal)
    } else {
      result = Math.floor(goal)
    }
  }
  return result
}



function compare_score(home, away) {
  if (home > away) {
    return "h"
  } else if (home < away) {
    return "a"
  } else {
    return "d"
  }
}
const randomizer = () => {
  return (Math.random() * 3).toFixed(2)
}
//console.log(randomizer())
goal_scored_home.value = randomizer()
goal_scored_away.value = randomizer()
goal_conceded_home.value = randomizer()
goal_conceded_away.value = randomizer()

const random_form = () => {
  let f_array = ["w", "l", "d"]
  let f_random = Math.floor(Math.random() * 3)
  let f_random2 = Math.floor(Math.random() * 3)
  let f_random3 = Math.floor(Math.random() * 3)
  let f_random4 = Math.floor(Math.random() * 3)
  let f_random5 = Math.floor(Math.random() * 3)

  let f_sug = []
  let f;
  let t1 = f_array[f_random]
  f_sug.push(t1)
  let t2 = f_array[f_random2]
  f_sug.push(t2)
  let t3 = f_array[f_random3]
  f_sug.push(t3)
  let t4 = f_array[f_random4]
  f_sug.push(t4)
  let t5 = f_array[f_random5]
  f_sug.push(t5)
  return f_sug.join("")
}

home_form.value = random_form()
away_form.value = random_form()

btn.addEventListener("click", result)
//console.log(goal(0.6))
//Still testing

// t = (e/2)