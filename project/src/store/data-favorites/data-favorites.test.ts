import { DataFavorites } from '../../types/state';
import { dataFavorites } from './data-favorites';
import { loadFavoriteOffers, updateOffer } from '../action';
import { makeFakeOffer } from '../../utils/mocks';
import { getRandomInteger } from '../../utils/common';

const state: DataFavorites = {
  favoriteOffers: [],
  isFavoriteOffersLoaded: false,
};

const offers = new Array(5).fill(null).map(makeFakeOffer);

describe('Reducer: dataFavorites', () => {
  it('without additional parameters should return initial state', () => {
    expect(dataFavorites(void 0, { type: 'UNKNOWN_TYPE' }))
      .toEqual(state);
  });
  it('should update favorites and loaded status by load favorites', () => {
    expect(dataFavorites(state, loadFavoriteOffers(offers)))
      .toEqual({
        favoriteOffers: offers,
        isFavoriteOffersLoaded: true,
      });
  });
  it('should update favorites when updating launched', () => {
    const randomOffer = offers[getRandomInteger(0, offers.length - 1)];
    const uniqueId = offers.reduce((summ, current) => summ + current.id, 1);
    const updatedOfferSameId = Object.assign({}, makeFakeOffer(), { id: randomOffer.id });
    const updatedOfferUniqeId = Object.assign({}, makeFakeOffer(), { id: uniqueId });

    const initialState = {
      favoriteOffers: offers,
      isFavoriteOffersLoaded: true,
    };

    expect(dataFavorites(initialState, updateOffer(updatedOfferSameId)).favoriteOffers)
      .toEqual(expect.not.arrayContaining([randomOffer]));

    expect(dataFavorites(initialState, updateOffer(updatedOfferUniqeId)).favoriteOffers)
      .toEqual(expect.arrayContaining([updatedOfferUniqeId]));
  });
});

