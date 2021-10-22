export enum ActionType {
  ChangeCity = 'main/changeCity',
  ChangeSorting = 'main/ChangeSorting'
}

export type ChangeCityAction = {
  type: ActionType.ChangeCity,
  payload: string,
};

export type ChangeSortingAction = {
  type: ActionType.ChangeSorting,
  payload: string,
};

export type Actions = ChangeCityAction | ChangeSortingAction;
