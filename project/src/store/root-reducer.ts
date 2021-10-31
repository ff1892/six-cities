import { combineReducers } from 'redux';
import { appData } from './app-data/app-data';
import { appState } from './app-state/app-state';
import { userData } from './user-data/user-data';

export enum NameSpace {
  data = 'DATA',
  state = 'STATE',
  user = 'USER',
}

export const rootReducer = combineReducers({
  [NameSpace.data]: appData,
  [NameSpace.state]: appState,
  [NameSpace.user]: userData,
});

export type RootState = ReturnType<typeof rootReducer>;
