import { DataCurrentOffer } from '../../../types/state';
import { dataCurrentOffer } from './data-current-offer';
import { makeFakeOffer } from '../../../utils/mocks';

import {
  loadCurrentOffer,
  loadCurrentOfferError,
  updateOffer
} from '../../actions';

const state: DataCurrentOffer = {
  currentOffer: null,
  isCurrentOfferLoaded: false,
  isCurrentOfferError: false,
};

const offer = makeFakeOffer();
const anotherOfferSameId = Object.assign({}, offer, {id: offer.id});
const anotherOfferAnotherId = Object.assign({}, offer, { id: offer.id - 1});


describe('Reducer: dataCurrentOffer', () => {

  it('without additional parameters should return initial state', () => {
    expect(dataCurrentOffer(void 0, { type: 'UNKNOWN_TYPE' }))
      .toEqual(state);
  });

  it('should update current offer and loaded status by load offer', () => {
    expect(dataCurrentOffer(state, loadCurrentOffer(offer)))
      .toEqual({
        currentOffer: offer,
        isCurrentOfferLoaded: true,
        isCurrentOfferError: false,
      });
  });

  it('should update eror status when error loaded', () => {
    expect(dataCurrentOffer(state, loadCurrentOfferError))
      .toEqual({
        currentOffer: null,
        isCurrentOfferLoaded: false,
        isCurrentOfferError: true,
      });
  });

  it('should update current offer when updating launched', () => {
    const initialState = {
      currentOffer: offer,
      isCurrentOfferLoaded: true,
      isCurrentOfferError: false,
    };
    const updatedState = {
      currentOffer: anotherOfferSameId,
      isCurrentOfferLoaded: true,
      isCurrentOfferError: false,
    };
    expect(dataCurrentOffer(initialState, updateOffer(anotherOfferSameId)))
      .toEqual(updatedState);
    expect(dataCurrentOffer(initialState, updateOffer(anotherOfferAnotherId)))
      .toEqual(initialState);
  });
});
