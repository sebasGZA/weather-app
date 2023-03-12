require("dotenv").config();
const fs = require("fs");
const axios = require("axios").default;

class Searches {
  records = [];
  path = "./data/data.json";

  constructor() {
    //Todo Read data
    this.readData();
  }

  get getCapitalRecords() {
    return this.records.map((record) => {
      let words = record.split(" ");
      words = words.map((p) => p[0].toUpperCase() + p.substring(1));
      return words.join(' ');
    });
  }

  get getRecords() {
    return this.records;
  }

  get paramsMapBox() {
    return {
      access_token: process.env.MAPBOX_KEY || "",
      limit: 5,
      language: "en",
    };
  }

  get paramsOpenWeather() {
    return {
      appid: process.env.OPENWEATHER_KEY || "",
      lang: "en",
      units: "metric",
    };
  }

  async searchCity(place = "") {
    try {
      //Http request
      const http = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
        params: this.paramsMapBox,
      });
      const { data } = await http.get();
      return data.features.map((place) => ({
        id: place.id,
        name: place.place_name,
        lng: place.center[0],
        lat: place.center[1],
      }));
    } catch (e) {
      console.log("Error into searchCity getting data:", e);
      return [];
    }
  }

  async placeWeather(lat, lon) {
    try {
      const httpWeather = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: {
          ...this.paramsOpenWeather,
          lat,
          lon,
        },
      });

      const resp = await httpWeather.get();
      const { main, weather } = resp.data;

      return {
        desc: weather[0].description,
        min: main.temp_min,
        max: main.temp_max,
        temp: main.temp,
      };
    } catch (e) {
      console.log("Error into placeWeather Getting data", e);
      return {};
    }
  }

  addRecord(place = "") {
    if (!this.records.includes(place.toLowerCase())) {
      this.records.unshift(place.toLowerCase());
      this.saveData();
    }
  }

  saveData() {
    const payload = {
      records: this.getRecords,
    };
    fs.writeFileSync(this.path, JSON.stringify(payload));
  }

  readData() {
    if (!fs.existsSync(this.path)) return;

    const info = fs.readFileSync(this.path, {
      encoding: "utf-8",
    });
    const data = JSON.parse(info);
    this.records = data.records;
  }
}

module.exports = Searches;
