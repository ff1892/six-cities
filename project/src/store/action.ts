import { ActionType, ChangeCityAction, ChangeSortingAction } from '../types/action';

export const changeCity = (city: string): ChangeCityAction => ({
  type: ActionType.ChangeCity,
  payload: city,
});

export const changeSorting = (currentSorting: string): ChangeSortingAction => ({
  type: ActionType.ChangeSorting,
  payload: currentSorting,
});
