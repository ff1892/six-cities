import { ActionType, ChangeCityAction } from '../types/action';

export const changeCity = (city: string): ChangeCityAction => ({
  type: ActionType.ChangeCity,
  payload: city,
});
