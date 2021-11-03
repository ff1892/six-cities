import {
  updateCurrentOffer,
  updateOffersList,
  updateFavoriteOffersList
} from '../../utils';

import { AppData } from '../../types/state';
import { createReducer } from '@reduxjs/toolkit';
import {
  loadOffers,
  loadCurrentOffer,
  loadCurrentOfferComments,
  loadCurrentOfferError,
  loadNearbyOffers,
  loadFavoriteOffers,
  UpdateOffer
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
  favoriteOffers: [],
  isFavoriteOffersLoaded: false,
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
    })
    .addCase(loadFavoriteOffers, (state, action) => {
      const { favoriteOffers } = action.payload;
      state.favoriteOffers = favoriteOffers;
      state.isFavoriteOffersLoaded = true;
    })
    .addCase(UpdateOffer, (state, action) => {
      const {updatedOffer} = action.payload;
      if (state.currentOffer) {
        state.currentOffer = updateCurrentOffer(state.currentOffer, updatedOffer);
      }
      state.offers = updateOffersList(state.offers, updatedOffer);
      state.nearbyOffers = updateOffersList(state.nearbyOffers, updatedOffer);
      state.favoriteOffers = updateFavoriteOffersList(state.favoriteOffers, updatedOffer);
    });
});

export {appData};
