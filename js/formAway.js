export default class formAway {
  constructor() {
    this.form = null;
    this.id = null;
  }

  setForm(array) {
    this.form = array
  }

  getForm() {
    return this.form.join('')
  }

  setId(id) {
    this.id = id;
  }

  getId() {
    return this.id
  }
}