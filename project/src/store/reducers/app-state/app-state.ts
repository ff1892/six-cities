import { AppState } from '../../../types/state';
import { City, SortingType } from '../../../const';
import { createReducer } from '@reduxjs/toolkit';
import { changeCity, changeSorting } from '../../actions';

const initialState: AppState = {
  selectedCity: City.Paris,
  currentSorting: SortingType.Popularity,
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
