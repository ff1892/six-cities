import * as Redux from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createApi } from '../../../services/api';
import { AuthorizationStatus } from '../../../const';
import { State } from '../../../types/state';
import PropertyScreen from './property';
import { getFakeStore, makeFakeComment } from '../../../utils/mocks';
import { makeFakeOffer } from '../../../utils/mocks';


const onFakeUnathorized = jest.fn();
const api = createApi(onFakeUnathorized());
const middlewares = [thunk.withExtraArgument(api)];
const history = createMemoryHistory();

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const fakeOffer = makeFakeOffer();
const fakeComment = makeFakeComment();
const fakeStore = getFakeStore(AuthorizationStatus.Auth);
const fakeStoreNoAuth = getFakeStore(AuthorizationStatus.NoAuth);


describe('Component: PropertyScreen', () => {

  const baseFakeProperty = (
    <Provider store={mockStore(fakeStore)}>
      <Router history={history}>
        <PropertyScreen />
      </Router>
    </Provider>);

  it('should render correctly passed offer', () => {

    const baseStore: State = Object.assign(
      {},
      fakeStore,
      {
        DATA_CURRENT_OFFER: {
          currentOffer: fakeOffer,
          isCurrentOfferLoaded: true,
          isCurrentOfferError: false},
      },
    );

    const store = mockStore(baseStore);

    const fakeProperty = (
      <Provider store={store}>
        <Router history={history}>
          <PropertyScreen />
        </Router>
      </Provider>);

    render(fakeProperty);
    expect(screen.getByTestId('property page')).toBeInTheDocument();
    expect(screen.getByText(fakeOffer.title)).toBeInTheDocument();
    expect(screen.getByText(fakeOffer.description)).toBeInTheDocument();
  });

  it('should render correctly passed comments', () => {

    const baseStore: State = Object.assign(
      {},
      fakeStore,
      {
        DATA_COMMENTS: {
          currentOfferComments: [fakeComment],
          isCommentsLoaded: true,
          uploadCommentStatus: 'Unknown',
        },
      },
    );

    const store = mockStore(baseStore);

    const fakeProperty = (
      <Provider store={store}>
        <Router history={history}>
          <PropertyScreen />
        </Router>
      </Provider>);

    render(fakeProperty);
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(fakeComment.comment)).toBeInTheDocument();
    expect(screen.getByTestId('form review')).toBeInTheDocument();
  });

  it('should render correctly when unauthorized', () => {

    const fakeProperty = (
      <Provider store={mockStore(fakeStoreNoAuth)}>
        <Router history={history}>
          <PropertyScreen />
        </Router>
      </Provider>);

    render(fakeProperty);
    expect(screen.queryByTestId('form review')).not.toBeInTheDocument();
  });


  it('should render loader when data is loading', () => {
    const baseStore: State = Object.assign(
      {},
      fakeStore,
      {
        DATA_CURRENT_OFFER: {
          currentOffer: fakeOffer,
          isCurrentOfferLoaded: false,
          isCurrentOfferError: false }});

    const store = mockStore(baseStore);

    const fakeProperty = (
      <Provider store={store}>
        <Router history={history}>
          <PropertyScreen />
        </Router>
      </Provider>);

    render(fakeProperty);
    expect(screen.queryByTestId('loader')).toBeInTheDocument();
  });

  it('should dispach an actions when fetch data', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(baseFakeProperty);
    expect(dispatch).toBeCalledTimes(3);
  });

  it('should dispach an action by clicking on add/delete favorites', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(baseFakeProperty);

    expect(dispatch).toBeCalledTimes(3);
    userEvent.click(screen.getByTestId('favorites button'));
    expect(dispatch).toBeCalledTimes(4);
  });
});
