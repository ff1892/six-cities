import { AppState } from '../../types/state';
import { DEFAULT_CITY, DEFAULT_SORTING } from '../../const';
import { createReducer } from '@reduxjs/toolkit';
import { changeCity, changeSorting } from '../action';

const initialState: AppState = {
  selectedCity: DEFAULT_CITY,
  currentSorting: DEFAULT_SORTING,
};

const appState = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.selectedCity = action.payload;
    })
    .addCase(changeSorting, (state, action) => {
      state.currentSorting = action.payload;
    });
});

export { appState };
