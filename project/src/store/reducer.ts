import { DEFAULT_CITY, DEFAULT_SORTING } from '../const';
import { State } from '../types/state';
import { ActionType, Actions } from '../types/action';
import { offers } from '../mock/offers';

const InitialState: State = {
  selectedCity: DEFAULT_CITY,
  offers: offers,
  currentSorting: DEFAULT_SORTING,
};

const reducer = (state: State = InitialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.ChangeCity:
      return {...state, selectedCity: action.payload};
    case ActionType.ChangeSorting:
      return {...state, currentSorting: action.payload};
    default:
      return state;
  }
};

export {reducer};
