import { State } from '../types/state';
import { ActionType, Actions } from '../types/action';

const InitialState = {
  city: 'Amsterdam',
};

const reducer = (state: State = InitialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.ChangeCity:
      return {...state, city: action.payload};
    default:
      return state;
  }
};

export {reducer};
