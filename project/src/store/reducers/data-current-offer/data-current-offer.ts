import { DataCurrentOffer } from '../../../types/state';
import { createReducer } from '@reduxjs/toolkit';
import { updateCurrentOffer } from '../../../utils/common';

import {
  loadCurrentOffer,
  loadCurrentOfferError,
  updateOffer
} from '../../actions';

const initialState: DataCurrentOffer = {
  currentOffer: null,
  isCurrentOfferLoaded: false,
  isCurrentOfferError: false,
};

const dataCurrentOffer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadCurrentOffer, (state, action) => {
      state.currentOffer = action.payload;
      state.isCurrentOfferLoaded = true;
      if (state.isCurrentOfferError) {
        state.isCurrentOfferError = false;
      }
    })
    .addCase(loadCurrentOfferError, (state) => {
      state.isCurrentOfferError = true;
    })
    .addCase(updateOffer, (state, action) => {
      const { updatedOffer } = action.payload;
      if (state.currentOffer) {
        state.currentOffer = updateCurrentOffer(state.currentOffer, updatedOffer);
      }
    });
});

export { dataCurrentOffer };
