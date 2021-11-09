import { appState } from './app-state';
import { changeCity, changeSorting } from '../../actions';
import { City, SortingType} from '../../../const';
import { address, datatype } from 'faker';

describe('Reducer: appState', () => {

  it('without additional parameters should return initial state', () => {
    expect(appState(void 0, {type: 'UNKNOWN_TYPE'}))
      .toEqual({ selectedCity: City.Paris, currentSorting: SortingType.Popularity});
  });

  it('should change city by a given value', () => {
    const state = { selectedCity: City.Paris, currentSorting: SortingType.Popularity};
    const anotherCity = address.cityName();
    expect(appState(state, changeCity(anotherCity)))
      .toEqual({ selectedCity: anotherCity, currentSorting: SortingType.Popularity});
  });

  it('should change sorting by a given value', () => {
    const state = { selectedCity: City.Paris, currentSorting: SortingType.Popularity };
    const anotherSorting = datatype.string();
    expect(appState(state, changeSorting(anotherSorting)))
      .toEqual({ selectedCity: City.Paris, currentSorting: anotherSorting});
  });
});
