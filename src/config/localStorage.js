export const localStorage = {
  state: {
    data: [],
    name: 'herolo-weather-app',
    unit: 'Metric' // Imperial
  },

  setUnit(Fahrenheit) {
    this.state.unit = Fahrenheit ? 'Imperial' : 'Metric'; 
  },

  set(data) {
    this.state.data = data;
    window.localStorage.setItem(this.state.name, JSON.stringify(this.state.data));
  },

  get() {
    const localStorage = window.localStorage.getItem(this.state.name) || '[]';
    this.state.data = JSON.parse(localStorage);
    return this.state.data;
  },

  isExistId(key) {
    this.get();
    return this.state.data.findIndex(fav => fav.cityKey == key) > -1;
  },

  remove(key) {
    this.get();

    const index = this.state.data.findIndex(fav => fav.cityKey == key);
    this.state.data.splice(index, 1);
    this.set(this.state.data);
  },

  add(newItem) {
    this.get();

    this.state.data.push(newItem);
    this.set(this.state.data);
  }
};