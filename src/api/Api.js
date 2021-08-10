import axios from 'axios';

class Api {
  constructor() {
    this.myValue = '3476f426c6d8f97027e143c1f5b3b21e';
    this.serverApi = 'https://api.openweathermap.org/data/2.5';
    this.client = axios.create({
      baseURL: this.serverApi,
      params: { APPID: this.myValue },
    });
  }
}

export default new Api();
