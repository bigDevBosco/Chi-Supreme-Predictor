export default class prediction {
  constructor() {
    this.result = null;
    this.accuracy = null;
    this.info = []

  }

  setResult(val) {
    this.result = val;
  }

  setAccuracy(val) {
    this.accuracy = val;
  }

  setId(id) {
    this.id = id
  }
  getId() {
    return this.id
  }
  setPrediction(result, accuracy) {
    this.info.push(result);
    this.info.push(accuracy);
  }
  getPrediction() {
    return this.info
  }

}