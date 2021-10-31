import { AppData } from '../../types/state';
import { createReducer } from '@reduxjs/toolkit';
import {
  loadOffers,
  loadCurrentOffer,
  loadCurrentOfferComments,
  loadCurrentOfferError,
  loadNearbyOffers
} from '../action';

const initialState: AppData = {
  offers: [],
  isOffersLoaded: false,
  currentOffer: null,
  isCurrentOfferLoaded: false,
  isCurrentOfferError: false,
  currentOfferComments: [],
  isCommentsLoaded: false,
  nearbyOffers: [],
  isNearbyOffersLoaded: false,
};

const appData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOffers, (state, action) => {
      const { offers } = action.payload;
      state.offers = offers;
      state.isOffersLoaded = true;
    })
    .addCase(loadCurrentOffer, (state, action) => {
      state.currentOffer = action.payload;
      state.isCurrentOfferLoaded = true;
    })
    .addCase(loadCurrentOfferError, (state) => {
      state.isCurrentOfferError = true;
    })
    .addCase(loadCurrentOfferComments, (state, action) => {
      const { comments } = action.payload;
      state.currentOfferComments = comments;
      state.isCommentsLoaded = true;
    })
    .addCase(loadNearbyOffers, (state, action) => {
      const { nearbyOffers } = action.payload;
      state.nearbyOffers = nearbyOffers;
      state.isNearbyOffersLoaded = true;
    });
});

export {appData};
