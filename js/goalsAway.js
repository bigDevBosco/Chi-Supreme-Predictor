export default class goalsAway {
  constructor() {
    this.goal = null;
    this.id = null;
  }

  setGoal(data) {
    this.goal = data
  }
  getGoal() {
    return this.goal;
  }

  setId(id) {
    this.id = id
  }
  getId() {
    return this.id
  }
}