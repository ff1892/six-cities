import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createApi } from '../../../services/api';
import { State } from '../../../types/state';
import { APIRoute } from '../../../const';
import { fetchOffersAction } from './data-offers';
import { loadOffers } from '../../actions';
import { makeFakeOffersResponse } from '../../../utils/mocks';
import { adaptOffersGroupToClient } from '../../../services/adapter';

const fakeOffersResponse = makeFakeOffersResponse();
const fakeOffers = adaptOffersGroupToClient(fakeOffersResponse);

describe('Api actions: data offers', () => {
  const onFakeUnathorized = jest.fn();
  const api = createApi(onFakeUnathorized());
  const mockApi = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should dispatch loadOffers when GET /offers', async () => {
    mockApi
      .onGet(APIRoute.Offers)
      .reply(200, fakeOffersResponse);

    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchOffersAction());
    expect(store.getActions()).toEqual([
      loadOffers(fakeOffers),
    ]);
  });
});
