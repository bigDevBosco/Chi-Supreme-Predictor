let btn = document.querySelector("#check")

let goal_scored_home = document.querySelector("#goal_scored_home")
let goal_scored_away = document.querySelector("#goal_scored_away")
let goal_conceded_home = document.querySelector("#goal_concede_home")
let goal_conceded_away = document.querySelector("#goal_concede_away")
let display = document.querySelector("#display")

let home_goal_1
let home_goal_2
let away_goal_1
let away_goal_2

//g=goal S=Scored C=concede h=home v= value
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





function score() {
  gShv = +goal_scored_home.value
  gSav = +goal_scored_away.value

  gChv = +goal_conceded_home.value
  gCav = +goal_conceded_away.value


  //based on the logic of concede

  //getting concede mean and adding extra difficult not get 100% that is reason of multilplying the mean by 1.5
  let concede_mean = ((gChv + gCav) / 2) * 1.5;
  //using away to determine how home will concede base
  home_goal_ratio = gCav / concede_mean;
  //using home to determine how away will concede
  away_goal_ratio = gChv / concede_mean;

  //Multiply personal average goal With opponents average concede
  home_score_ratio = gShv * gCav;
  away_score_ratio = gSav * gChv;

  let totals = (gSav + gShv)
  let score_mean = (totals / 2)
  let cede_mean = (gChv + gCav) / 2
  estimated_goal = (cede_mean / score_mean) * totals
  estimate_home = gShv / totals
  estimate_away = gSav / totals
}


function goal_method(a, b) {
  return a * b
}



const result = () => {
  score()

  home_goal_1 = goal_method(home_score_ratio, home_goal_ratio)
  away_goal_1 = goal_method(away_score_ratio, away_goal_ratio)


  home_goal_2 = goal_method(estimated_goal, estimate_home)

  away_goal_2 = goal_method(estimated_goal, estimate_away)


  let final_goal_home_1 = goal(home_goal_1)
  let final_goal_away_1 = goal(away_goal_1)

  let final_goal_home_2 = goal(home_goal_2)
  let final_goal_away_2 = goal(away_goal_2)

  

  let home_total = goal(((final_goal_home_1 + final_goal_home_2) / 2))
  let away_total = goal(((final_goal_away_1 + final_goal_away_2) / 2))
  let goalsTotal = home_total + away_total
  let correct_score = `${home_total}:${away_total}`



  let suggestions = []

  if (home_total >= 1 && away_total >= 1) {
    suggestions.push("Both Teams to Score")
  }

  if (goalsTotal>2) {
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

  display.innerHTML =
    `
  <p> possible Correct score:
  <h3>${correct_score}</h3>
  </p>
  <p>Possible Outcomes:</p>
  `
  for (suggestion of suggestions) {
    display.innerHTML += `<h4>${suggestion}</h4>
    `
  }

  display.innerHTML += `<p>Random Choice: <h3>${random_Choice}</h3></p>
`

}


/*
Function below is used to approximate the possible goal
*/

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
//Still no styling


btn.addEventListener("click", result)
//console.log(goal(0.6))