export enum ActionType {
  ChangeCity = 'main/changeCity'
}

export type ChangeCityAction = {
  type: ActionType.ChangeCity,
  payload: string,
};

export type Actions = ChangeCityAction;
