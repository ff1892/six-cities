import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createApi } from '../../../services/api';
import { State } from '../../../types/state';
import { APIRoute } from '../../../const';
import { fetchNearbyOffersAction } from './data-nearby';
import { loadNearbyOffers } from '../../actions';
import { makeFakeOffersResponse } from '../../../utils/mocks';
import { adaptOffersGroupToClient } from '../../../services/adapter';
import { datatype } from 'faker';

const fakeOffersResponse = makeFakeOffersResponse();
const fakeOffers = adaptOffersGroupToClient(fakeOffersResponse);
const fakeId = datatype.number().toString();


describe('Api actions: data nearby', () => {
  const onFakeUnathorized = jest.fn();
  const api = createApi(onFakeUnathorized());
  const mockApi = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should dispatch loadNearbyOffers when GET /offers', async () => {
    mockApi
      .onGet(`${APIRoute.Offers}/${fakeId}${APIRoute.Nearby}`)
      .reply(200, fakeOffersResponse);

    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchNearbyOffersAction(fakeId));
    expect(store.getActions()).toEqual([
      loadNearbyOffers(fakeOffers),
    ]);
  });
});
