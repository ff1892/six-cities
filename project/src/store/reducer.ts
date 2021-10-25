import { AuthorizationStatus, DEFAULT_CITY, DEFAULT_SORTING } from '../const';
import { State } from '../types/state';
import { ActionType, Actions } from '../types/action';

const InitialState: State = {
  selectedCity: DEFAULT_CITY,
  currentSorting: DEFAULT_SORTING,
  offers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
};

const reducer = (state: State = InitialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.ChangeCity:
      return {...state, selectedCity: action.payload};
    case ActionType.ChangeSorting:
      return {...state, currentSorting: action.payload};
    case ActionType.LoadOffers: {
      const {offers} = action.payload;
      return {...state, offers};
    }
    case ActionType.RequireAuthorization:
      return {
        ...state,
        authorizationStatus: action.payload,
        isDataLoaded: true,
      };
    case ActionType.RequireLogout:
      return {...state, authorizationStatus: AuthorizationStatus.NoAuth};
    default:
      return state;
  }
};

export {reducer};
