import { createSelector } from 'reselect';

const list = (state) => state.forecastCity?.forecast5city?.list || [];

export const weatherData = createSelector(list, (items) =>
  items.map((item) => ({
    name: item.dt_txt,
    temp: (item.main.temp - 273.15).toFixed(0),
  }))
);
