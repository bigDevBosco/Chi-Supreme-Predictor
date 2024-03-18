export default class goalsHome {
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