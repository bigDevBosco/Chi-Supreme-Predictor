export default class formHome {
  constructor() {
    this.form = null;
  }

  setForm(array) {
    this.form = array;
  }

  getForm() {
    return this.form.join('');
  }

  setId(id) {
    this.id = id;
  }

  getId() {
    return this.id
  }

}