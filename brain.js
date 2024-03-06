let home_form = document.querySelector("#home_form")
let away_form = document.querySelector("#away_form")
let btn = document.querySelector("#check")
let home_form_value;
let away_form_value;

let home_value;
let away_value;

let home_value_w;
let away_value_w;

let goal_scored_home = document.querySelector("#goal_scored_home")
let goal_scored_away = document.querySelector("#goal_scored_away")
let goal_conceded_home = document.querySelector("#goal_concede_home")
let goal_conceded_away = document.querySelector("#goal_concede_away")
let display = document.querySelector("#display")



let home_goal_1
let home_goal_2
let away_goal_1
let away_goal_2

let home_goal_1_w
let home_goal_2_w
let away_goal_1_w
let away_goal_2_w


let gShv;
let gSav;
let gChv;
let gCav;

let gShv_w;
let gSav_w;
let gChv_w;
let gCav_w;


let home_score_ratio;
let away_score_ratio;
let home_goal_ratio;
let away_goal_ratio;

let estimated_goal;
let estimate_home;
let estimate_away;

let home_score_ratio_w;
let away_score_ratio_w;
let home_goal_ratio_w;
let away_goal_ratio_w;

let estimated_goal_w;
let estimate_home_w;
let estimate_away_w;



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
    counter += 1.50
  } else if (array[2] == "w") {
    counter += 0.75
  }

  //fourth array

  if (array[3] === "w") {
    counter += 2
  } else if (array[3] == "d") {
    counter += 1
  } else if (array[3] == "l") {
    counter += 0.5
  }

  //fifth array
  if (array[4] === "w") {
    counter += 1
  } else if (array[4] == "d") {
    counter += 0.5
  } else if (array[4] == "l") {
    counter += 0.25
  }

  return counter / 15
}

/***/
function array_2_numbers_w(array) {
  let counter = 0
  //first array
  if (array[0] === "w") {
    counter += 5
  } else if (array[0] == "d") {
    counter += 1.25
  } else if (array[0] == "l") {
    counter += 0.3125
  }

  //second array
  if (array[1] === "w") {
    counter += 4
  } else if (array[1] == "d") {
    counter += 1
  } else if (array[1] == "l") {
    counter += 0.25
  }

  //third array beginning of winning

  if (array[2] === "w") {
    counter += 3
  } else if (array[2] == "d") {
    counter += 1.50
  } else if (array[2] == "l") {
    counter += 0.75
  }

  //fourth array

  if (array[3] === "w") {
    counter += 2
  } else if (array[3] == "d") {
    counter += 1
  } else if (array[3] == "l") {
    counter += 0.5
  }

  //fifth array
  if (array[4] === "w") {
    counter += 1
  } else if (array[4] == "d") {
    counter += 0.5
  } else if (array[4] == "l") {
    counter += 0.25
  }

  return counter / 15
}
/***/

function form_to_array(form) {
  return form.split("")
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


  let home_form_array = form_to_array(home_form_value)
  let away_form_array = form_to_array(away_form_value)

  //form values
  home_value = array_2_numbers(home_form_array)


  away_value = array_2_numbers(away_form_array)

  home_value_w = array_2_numbers_w(home_form_array)


  away_value_w = array_2_numbers_w(away_form_array)


  home_goal_1 = goal_method(home_score_ratio, home_goal_ratio)

  away_goal_1 = goal_method(away_score_ratio, away_goal_ratio)

  home_goal_2 = goal_method(estimated_goal, estimate_home)

  away_goal_2 = goal_method(estimated_goal, estimate_away)

  /***/

  gShv_w = inverse_value(away_value)
  gSav_w = inverse_value(home_value)

  /*gChv_w = inverse_value(home_value_w)
  gCav_w = inverse_value(away_value_w)*/
  
  gChv_w = +goal_conceded_home.value
  gCav_w = +goal_conceded_away.value



  //based on the logic of concede
  //getting concede mean and adding extra difficult not get 100%
  let concede_mean_w = ((gChv_w + gCav_w) / 2) * 1.5;
  //using away to determine how home will concede base
  home_goal_ratio_w = +gCav_w / concede_mean_w;
  //using home to determine how away will concede
  away_goal_ratio_w = +gChv_w / concede_mean_w;

  //Multiply personal average goal With opponents average concede
  home_score_ratio_w = +gShv_w * +gCav_w;
  away_score_ratio_w = gSav_w * gChv_w;

  let totals_w = (gSav_w + gShv_w)
  let score_mean_w = (totals_w / 2)
  let cede_mean_w = (gChv_w + gCav_w) / 2
  estimated_goal_w = (cede_mean_w / score_mean_w) * totals_w
  estimate_home_w = gShv_w / totals_w
  estimate_away_w = gSav_w / totals_w





  home_goal_1_w = goal_method(home_score_ratio_w, home_goal_ratio_w)

  away_goal_1_w = goal_method(away_score_ratio_w, away_goal_ratio_w)

  home_goal_2_w = goal_method(estimated_goal_w, estimate_home_w)

  away_goal_2_w = goal_method(estimated_goal_w, estimate_away_w)



  let fgh1w = goal(home_goal_1_w)
  let fga1w = goal(away_goal_1_w)

  let fgh2w = goal(home_goal_2_w)
  let fga2w = goal(away_goal_2_w)

  let homeWinW = goal2((fgh1w + fgh2w) / 2)
  let awayWinW = goal2((fga1w + fga2w) / 2)

  console.log(fgh1w, fga1w)
  console.log(fgh2w, fga2w)
  console.log(homeWinW, awayWinW)

  /***/


  //Only for Scores

  let final_goal_home_1 = goal(home_goal_1)
  let final_goal_away_1 = goal(away_goal_1)

  let final_goal_home_2 = goal(home_goal_2)
  let final_goal_away_2 = goal(away_goal_2)


  //for wins

  let home_total = goal2(((final_goal_home_1 + final_goal_home_2) / 2))
  let away_total = goal2(((final_goal_away_1 + final_goal_away_2) / 2))
  let goalsTotal = home_total + away_total

  let winH = goal2((homeWinW + home_total) / 2)
  let winA = goal2((awayWinW + away_total) / 2)

  let home1 =winH
  let away1 = winA


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


  if (compare_score(fgh1w, fga1w) == "h") {
    h += 1
  } else if (compare_score(fgh1w, fga1w) == "a") {
    a += 1
  } else if (compare_score(fgh1w, fga1w) == "d") {
    d += 1
  }

  if (compare_score(fgh2w, fga2w) == "h") {
    h += 1
  } else if (compare_score(fgh2w, fga2w) == "a") {
    a += 1
  } else if (compare_score(fgh2w, fga2w) == "d") {
    d += 1
  }

  //for win 2

  let totalwin = h + d + a

  let homeWin = (h / totalwin) * 100
  let awayWin = (a / totalwin) * 100
  let drawWin = (d / totalwin) * 100
  //console.log(homeWin, drawWin, awayWin)
  gScore = `${final_goal_home_1}:${final_goal_away_1}
${final_goal_home_2}:${final_goal_away_2}
....
${home1}:${away1}
`
  //console.log(gScore)

  //start


  let ho_me = 0;
  let aw_ay = 0;
  let dr_aw = 0;
  let combo;

  if (home_total > away_total) {
    combo = home_total + away_total + 1;
    ho_me += (home_total / combo) * 100;
    aw_ay += (away_total / combo) * 100;
  } else if (away_total > home_total) {
    combo = home_total + away_total + 1;
    aw_ay += (away_total / combo) * 100;
    ho_me += (home_total / combo) * 100;
  } else {
    if (home_total == 0) {
      dr_aw = (3 / 4) * 100
    } else if (home_total == 1) {
      dr_aw = (2 / 3) * 100
    } else {
      dr_aw = (1 / 2) * 100
    }
    ho_me += 0;
    aw_ay += 0;
  }

  if (home1 > away1) {
    combo = home1 + away1 + 1;
    ho_me += (home1 / combo) * 100;
  } else if (home1 < away1) {
    combo = home1 + away1 + 1;
    aw_ay += (away1 / combo) * 100
  } else {

    if (home1 == 0) {
      dr_aw = (3 / 4) * 100
    } else if (home1 == 1) {
      dr_aw = (2 / 3) * 100
    } else {
      dr_aw = (1 / 2) * 100
    }
    ho_me += 0;
    aw_ay += 0;

  }

  ho_me = (ho_me / 2).toFixed(2);
  aw_ay = (aw_ay / 2).toFixed(2);
  dr_aw = (dr_aw / 2).toFixed(2);
  console.log(ho_me, dr_aw, aw_ay)
  let dif;
  if (home_form_value && away_form_value && gShv && gSav && gChv && gCav) {

    if (ho_me > dr_aw && ho_me > aw_ay) {
      if (aw_ay <= 0 && dr_aw <= 0) {
        dif = ho_me;
        info = `Prediction Value ${dif}`
      } else {
        if (aw_ay > dr_aw) {
          dif = ho_me - aw_ay

          info = `Prediction Value ${dif}`
        } else if (aw_ay < dr_aw) {
          dif = ho_me - dr_aw;
          info = `Prediction Value ${dif}`;
        } else if (aw_ay == dr_aw) {

        }
      }
    } else if (dr_aw > ho_me && dr_aw > aw_ay) {
      if (ho_me <= 0 && aw_ay <= 0) {
        dif = dr_aw
        info = `Prediction Value ${dif}`
      } else {
        if (ho_me > aw_ay) {
          dif = dr_aw - ho_me
          info = `Prediction Value ${dif}`
        } else if (ho_me < aw_ay) {
          dif = dr_aw - aw_ay
          info = `Prediction Value ${dif}`
        } else if (ho_me == aw_ay) {

        }
      }
    } else if (aw_ay > dr_aw && aw_ay > ho_me) {
      if (ho_me <= 0 && dr_aw <= 0) {
        dif = aw_ay;
        info = `Prediction Value ${dif}`
      } else {
        if (dr_aw > ho_me) {
          dif = aw_ay - dr_aw
          info = `Prediction Value ${dif}`
        } else if (dr_aw < ho_me) {
          dif = aw_ay - ho_me
          info = `Prediction Value ${dif}`
        } else if (ho_me == dr_aw) {

        }
      }

    }
  } else {
    info = null
  }

  if (home1 > away1) {
    choice = "Home"
  } else if (home1 < away1) {
    choice = "Away"
  } else if (home1 == away1) {
    choice = "Draw"
  }



  //console.log(gScore)

  let correct_score = `${home_total}:${away_total}`
  let winPrediction = `${home1}:${away1}`


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


let f_array = ["w", "l", "d"]
const caller = () => {
  return f_random = Math.floor(Math.random() * 3)

}

const random_form = () => {
  let f_sug = []
  let f;

  for (i = 0; i < 5; i++) {
    f = f_array[caller()]
    f_sug.push(f)
  }


  return f_sug.join("")
}


home_form.value = random_form()
away_form.value = random_form()

btn.addEventListener("click", result)