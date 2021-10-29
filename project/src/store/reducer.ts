import { AuthorizationStatus, DEFAULT_CITY, DEFAULT_SORTING } from '../const';
import { State } from '../types/state';
import { ActionType, Actions } from '../types/action';

const InitialState: State = {
  selectedCity: DEFAULT_CITY,
  currentSorting: DEFAULT_SORTING,
  offers: [],
  isOffersLoaded: false,
  currentOffer: null,
  isCurrentOfferLoaded: false,
  isCurrentOfferError: false,
  currentOfferComments: [],
  isCommentsLoaded: false,
  nearbyOffers: [],
  isNearbyOffersLoaded: false,
  authorizationStatus: AuthorizationStatus.Unknown,
};

const reducer = (state: State = InitialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.ChangeCity:
      return {...state, selectedCity: action.payload};
    case ActionType.ChangeSorting:
      return {...state, currentSorting: action.payload};
    case ActionType.LoadOffers: {
      const {offers} = action.payload;
      return {
        ...state,
        offers,
        isOffersLoaded: true,
      };
    }
    case ActionType.LoadCurrentOffer: {
      return {
        ...state,
        currentOffer: action.payload,
        isCurrentOfferLoaded: true,
      };
    }
    case ActionType.LoadCurrentOfferError: {
      return {
        ...state,
        isCurrentOfferError: true,
      };
    }
    case ActionType.LoadCurrentOfferComments: {
      const {comments} = action.payload;
      return {
        ...state,
        currentOfferComments: comments,
        isCommentsLoaded: true,
      };
    }
    case ActionType.LoadNearbyOffers: {
      const { nearbyOffers } = action.payload;
      return {
        ...state,
        nearbyOffers,
        isNearbyOffersLoaded: true,
      };
    }
    case ActionType.RequireAuthorization:
      return {
        ...state,
        authorizationStatus: action.payload,
      };
    case ActionType.RequireLogout:
      return {...state, authorizationStatus: AuthorizationStatus.NoAuth};
    default:
      return state;
  }
};

export {reducer};
