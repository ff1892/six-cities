import { DataOffers } from '../../../types/state';
import { loadOffers, updateOffer } from '../../actions';
import { makeFakeOffer } from '../../../utils/mocks';
import { dataOffers } from './data-offers';
import { getRandomInteger } from '../../../utils/common';

const state: DataOffers = {
  offers: [],
  isOffersLoaded: false,
};

const offers = new Array(3).fill(null).map(makeFakeOffer);

describe('Reducer: dataNearby', () => {

  it('without additional parameters should return initial state', () => {
    expect(dataOffers(void 0, { type: 'UNKNOWN_TYPE' }))
      .toEqual(state);
  });
  it('should update nearby offers and loaded status by load offers', () => {
    expect(dataOffers(state, loadOffers(offers)))
      .toEqual({
        offers: offers,
        isOffersLoaded: true,
      });
  });
  it('should update favorites when updating launched', () => {
    const randomOffer = offers[getRandomInteger(0, offers.length - 1)];
    const uniqueId = offers.reduce((summ, current) => summ + current.id, 1);
    const updatedOfferSameId = Object.assign({}, makeFakeOffer(), { id: randomOffer.id });
    const updatedOfferUniqeId = Object.assign({}, makeFakeOffer(), { id: uniqueId });

    const initialState = {
      offers: offers,
      isOffersLoaded: true,
    };

    expect(dataOffers(initialState, updateOffer(updatedOfferSameId)).offers)
      .toEqual(expect.arrayContaining([updatedOfferSameId]));

    expect(dataOffers(initialState, updateOffer(updatedOfferSameId)).offers)
      .toEqual(expect.not.arrayContaining([randomOffer]));

    expect(dataOffers(initialState, updateOffer(updatedOfferUniqeId)))
      .toEqual(initialState);
  });
});


