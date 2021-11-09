import { DataNearby } from '../../../types/state';
import { loadNearbyOffers, updateOffer } from '../../actions';
import { makeFakeOffer } from '../../../utils/mocks';
import { dataNearby } from './data-nearby';
import { getRandomInteger } from '../../../utils/common';

const state: DataNearby = {
  nearbyOffers: [],
  isNearbyOffersLoaded: false,
};

const offers = new Array(3).fill(null).map(makeFakeOffer);

describe('Reducer: dataNearby', () => {

  it('without additional parameters should return initial state', () => {
    expect(dataNearby(void 0, { type: 'UNKNOWN_TYPE' }))
      .toEqual(state);
  });
  it('should update nearby offers and loaded status by load offers', () => {
    expect(dataNearby(state, loadNearbyOffers(offers)))
      .toEqual({
        nearbyOffers: offers,
        isNearbyOffersLoaded: true,
      });
  });
  it('should update favorites when updating launched', () => {
    const randomOffer = offers[getRandomInteger(0, offers.length - 1)];
    const uniqueId = offers.reduce((summ, current) => summ + current.id, 1);
    const updatedOfferSameId = Object.assign({}, makeFakeOffer(), { id: randomOffer.id });
    const updatedOfferUniqeId = Object.assign({}, makeFakeOffer(), { id: uniqueId });

    const initialState = {
      nearbyOffers: offers,
      isNearbyOffersLoaded: true,
    };

    expect(dataNearby(initialState, updateOffer(updatedOfferSameId)).nearbyOffers)
      .toEqual(expect.arrayContaining([updatedOfferSameId]));

    expect(dataNearby(initialState, updateOffer(updatedOfferSameId)).nearbyOffers)
      .toEqual(expect.not.arrayContaining([randomOffer]));

    expect(dataNearby(initialState, updateOffer(updatedOfferUniqeId)))
      .toEqual(initialState);
  });
});
