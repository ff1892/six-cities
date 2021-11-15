import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createApi } from '../../../services/api';
import { State } from '../../../types/state';
import { APIRoute, UploadStatus } from '../../../const';
import { fetchCurrentOfferCommentsAction, commentPostAction } from './data-comments';
import { loadCurrentOfferComments, uploadCurrentOfferComment } from '../../actions';
import { makeFakeCommentsResponse, makeFakeComment } from '../../../utils/mocks';
import { adaptCommentsGroupToClient } from '../../../services/adapter';
import { datatype } from 'faker';


const fakeCommentsResponse = makeFakeCommentsResponse();
const fakeComments = adaptCommentsGroupToClient(fakeCommentsResponse);
const fakeComment = makeFakeComment();
const fakeId = datatype.number().toString();

describe('Api actions: data-comments', () => {
  const onFakeUnathorized = jest.fn();
  const api = createApi(onFakeUnathorized());
  const mockApi = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should dispatch loadCurrentOfferComments when GET /comments', async () => {
    mockApi
      .onGet(`${APIRoute.Comments}/${fakeId}`)
      .reply(200, fakeCommentsResponse);

    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchCurrentOfferCommentsAction(fakeId));
    expect(store.getActions()).toEqual([
      loadCurrentOfferComments(fakeComments),
    ]);
  });

  it('should change loading status when success POST /comments', async () => {
    mockApi
      .onPost(`${APIRoute.Comments}/${fakeId}`)
      .reply(200);

    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    await store.dispatch(commentPostAction(fakeId, fakeComment));
    expect(store.getActions()).toEqual([
      uploadCurrentOfferComment(UploadStatus.Posting),
      uploadCurrentOfferComment(UploadStatus.Completed),
    ]);
  });

  it('should change loading status when error POST /comments', async () => {
    mockApi
      .onPost(`${APIRoute.Comments}/${fakeId}`)
      .reply(400);

    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    await store.dispatch(commentPostAction(fakeId, fakeComment));
    expect(store.getActions()).toEqual([
      uploadCurrentOfferComment(UploadStatus.Posting),
      uploadCurrentOfferComment(UploadStatus.Error),
    ]);
  });
});
