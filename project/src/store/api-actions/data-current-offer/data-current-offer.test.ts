import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createApi } from '../../../services/api';
import { State } from '../../../types/state';
import { APIRoute } from '../../../const';
import { fetchCurrentOfferAction } from './data-current-offer';
import { loadCurrentOffer, loadCurrentOfferError } from '../../actions';
import { makeFakeOfferResponse } from '../../../utils/mocks';
import { adaptOfferToClient } from '../../../services/adapter';
import { datatype } from 'faker';

const fakeOfferResponse = makeFakeOfferResponse();
const fakeOffer = adaptOfferToClient(fakeOfferResponse);
const fakeId = datatype.number().toString();

describe('Api actions: data current offer', () => {
  const onFakeUnathorized = jest.fn();
  const api = createApi(onFakeUnathorized());
  const mockApi = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should dispatch loadCurrentOffer when GET /offer', async () => {
    mockApi
      .onGet(`${APIRoute.Offers}/${fakeId}`)
      .reply(200, fakeOfferResponse);

    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchCurrentOfferAction(fakeId));
    expect(store.getActions()).toEqual([
      loadCurrentOffer(fakeOffer),
    ]);
  });

  it('should dispatch loadCurrentOfferError when cannot GET /offer', async () => {
    mockApi
      .onGet(`${APIRoute.Offers}/${fakeId}`)
      .reply(404, []);

    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchCurrentOfferAction(fakeId));
    expect(store.getActions()).toEqual([
      loadCurrentOfferError(),
    ]);
  });
});
