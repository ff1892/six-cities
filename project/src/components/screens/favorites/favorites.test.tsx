import * as Redux from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from 'redux';
import { AuthorizationStatus } from '../../../const';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { makeFakeOffer } from '../../../utils/mocks';
import { createApi } from '../../../services/api';
import { State } from '../../../types/state';
import FavoritesScreen from './favorites';

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

describe('Component: FavoritesScreen', () => {

  const store = mockStore({
    DATA_FAVORITES: {
      favoriteOffers: [fakeOffer],
      isFavoriteOffersLoaded: true,
    },
    USER: {
      authorizationStatus: AuthorizationStatus.Auth,
    },
  });

  const fakeFavorites = (
    <Provider store={store}>
      <Router history={history}>
        <FavoritesScreen />
      </Router>
    </Provider>);

  it('should render correctly passed favorites offers', () => {
    render(fakeFavorites);
    expect(screen.getByTestId('favorites page')).toBeInTheDocument();
    expect(screen.getByText(fakeOffer.title)).toBeInTheDocument();
    expect(screen.getByText(fakeOffer.city.name)).toBeInTheDocument();
  });
  it('should render loader when data is loading', () => {
    const loadingStore = mockStore({
      DATA_FAVORITES: {
        favoriteOffers: [],
        isFavoriteOffersLoaded: false,
      },
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
    });

    const loadingFavorites = (
      <Provider store={loadingStore}>
        <Router history={history}>
          <FavoritesScreen />
        </Router>
      </Provider>);

    render(loadingFavorites);
    expect(screen.queryByTestId('loader')).toBeInTheDocument();
  });

  it('should show no favorites message when no favorites saved', () => {
    const emptyStore = mockStore({
      DATA_FAVORITES: {
        favoriteOffers: [],
        isFavoriteOffersLoaded: true,
      },
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
    });

    const emptyFavorites = (
      <Provider store={emptyStore}>
        <Router history={history}>
          <FavoritesScreen />
        </Router>
      </Provider>);

    render(emptyFavorites);
    expect(screen.getByText('Nothing yet saved.')).toBeInTheDocument();
  });

  it('should dispach an action when fetch favorites', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(fakeFavorites);
    expect(dispatch).toBeCalledTimes(1);
  });
});
