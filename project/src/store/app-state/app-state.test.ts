import { appState } from './app-state';
import { changeCity, changeSorting } from '../action';
import { DEFAULT_CITY, DEFAULT_SORTING } from '../../const';
import { address, datatype } from 'faker';

describe('Reducer: appState', () => {

  it('without additional parameters should return initial state', () => {
    expect(appState(void 0, {type: 'UNKNOWN_TYPE'}))
      .toEqual({ selectedCity: DEFAULT_CITY, currentSorting: DEFAULT_SORTING});
  });

  it('should change city by a given value', () => {
    const state = { selectedCity: DEFAULT_CITY, currentSorting: DEFAULT_SORTING};
    const anotherCity = address.cityName();
    expect(appState(state, changeCity(anotherCity)))
      .toEqual({ selectedCity: anotherCity, currentSorting: DEFAULT_SORTING});
  });

  it('should change sorting by a given value', () => {
    const state = { selectedCity: DEFAULT_CITY, currentSorting: DEFAULT_SORTING };
    const anotherSorting = datatype.string();
    expect(appState(state, changeSorting(anotherSorting)))
      .toEqual({ selectedCity: DEFAULT_CITY, currentSorting: anotherSorting});
  });
});
