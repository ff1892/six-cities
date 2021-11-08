import { updateFavoriteOffersList } from '../../utils/common';
import { DataFavorites } from '../../types/state';
import { createReducer } from '@reduxjs/toolkit';
import { loadFavoriteOffers, updateOffer } from '../action';

const initialState: DataFavorites = {
  favoriteOffers: [],
  isFavoriteOffersLoaded: false,
};

const dataFavorites = createReducer(initialState, (builder) => {
  builder
    .addCase(loadFavoriteOffers, (state, action) => {
      const { favoriteOffers } = action.payload;
      state.favoriteOffers = favoriteOffers;
      state.isFavoriteOffersLoaded = true;
    })
    .addCase(updateOffer, (state, action) => {
      const {updatedOffer} = action.payload;
      state.favoriteOffers = updateFavoriteOffersList(state.favoriteOffers, updatedOffer);
    });
});

export { dataFavorites };
