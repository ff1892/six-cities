import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createApi } from '../../../services/api';
import { State } from '../../../types/state';
import { APIRoute } from '../../../const';
import { fetchFavoriteOffersAction, switchIsFavoriteAction } from './data-favorites';
import { loadFavoriteOffers, updateOffer } from '../../actions';
import { makeFakeOfferResponse, makeFakeOffersResponse } from '../../../utils/mocks';
import { adaptOfferToClient, adaptOffersGroupToClient } from '../../../services/adapter';
import { datatype } from 'faker';

const fakeOfferResponse = makeFakeOfferResponse();
const fakeOffer = adaptOfferToClient(fakeOfferResponse);

const fakeOffersResponse = makeFakeOffersResponse();
const fakeOffers = adaptOffersGroupToClient(fakeOffersResponse);
const fakeId = datatype.number();
const fakeStatus = datatype.number();

describe('Api actions: data favorites', () => {
  const onFakeUnathorized = jest.fn();
  const api = createApi(onFakeUnathorized());
  const mockApi = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should dispatch loadFavoriteOffers when GET /favorites', async () => {
    mockApi
      .onGet(APIRoute.Favorite)
      .reply(200, fakeOffersResponse);

    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchFavoriteOffersAction());
    expect(store.getActions()).toEqual([
      loadFavoriteOffers(fakeOffers),
    ]);
  });

  it('should dispatch switchIsFavoriteAction when POST /favorites', async () => {
    mockApi
      .onPost((`${APIRoute.Favorite}/${fakeId}/${fakeStatus}`))
      .reply(200, fakeOfferResponse);

    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    await store.dispatch(switchIsFavoriteAction(fakeId, fakeStatus));
    expect(store.getActions()).toEqual([
      updateOffer(fakeOffer),
    ]);
  });
});
