import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import CitiesReducer from 'modules/citiesModule/reducer';
import Forecast5DaysReducer from 'modules/forecast5DaysModule/reducer';
import defaultCityReducer from 'modules/defaultCityModule/reducer';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  savedCities: CitiesReducer,
  defaultCity: defaultCityReducer,
  forecastCity: Forecast5DaysReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, composeEnhancer(applyMiddleware(thunk)));
export const persistor = persistStore(store);
