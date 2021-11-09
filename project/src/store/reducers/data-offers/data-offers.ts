import { DataOffers } from '../../../types/state';
import { createReducer } from '@reduxjs/toolkit';
import { loadOffers, updateOffer } from '../../actions';
import { updateOffersList } from '../../../utils/common';

const initialState: DataOffers = {
  offers: [],
  isOffersLoaded: false,
};

const dataOffers = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOffers, (state, action) => {
      const { offers } = action.payload;
      state.offers = offers;
      state.isOffersLoaded = true;
    })
    .addCase(updateOffer, (state, action) => {
      const { updatedOffer } = action.payload;
      state.offers = updateOffersList(state.offers, updatedOffer);
    });
});

export { dataOffers};
