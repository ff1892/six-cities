import { updateOffersList } from '../../../utils/common';
import { DataNearby } from '../../../types/state';
import { createReducer } from '@reduxjs/toolkit';
import { loadNearbyOffers, updateOffer } from '../../actions';

const initialState: DataNearby = {
  nearbyOffers: [],
  isNearbyOffersLoaded: false,
};

const dataNearby = createReducer(initialState, (builder) => {
  builder
    .addCase(loadNearbyOffers, (state, action) => {
      const { nearbyOffers } = action.payload;
      state.nearbyOffers = nearbyOffers;
      state.isNearbyOffersLoaded = true;
    })
    .addCase(updateOffer, (state, action) => {
      const { updatedOffer } = action.payload;
      state.nearbyOffers = updateOffersList(state.nearbyOffers, updatedOffer);
    });
});

export { dataNearby };
