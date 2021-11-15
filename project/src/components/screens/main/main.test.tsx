import * as Redux from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import { Action } from 'redux';
import { AuthorizationStatus } from '../../../const';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { makeFakeOffer } from '../../../utils/mocks';
import { createApi } from '../../../services/api';
import { SortingType, City } from '../../../const';
import { State } from '../../../types/state';
import MainScreen from './main';

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

describe('Component: MainScreen', () => {

  const store = mockStore({
    DATA_OFFERS: {
      offers: [fakeOffer],
      isOffersLoaded: true,
    },
    STATE: {
      selectedCity: fakeOffer.city.name,
      currentSorting: SortingType.Popularity,
    },
    USER: {
      authorizationStatus: AuthorizationStatus.Auth,
    },
  });

  const fakeMain = (
    <Provider store={store}>
      <Router history={history}>
        <MainScreen />
      </Router>
    </Provider>);

  it('should render correctly passed offers', () => {
    render(fakeMain);
    expect(screen.getByTestId('root page')).toBeInTheDocument();
    expect(screen.getByText(fakeOffer.title)).toBeInTheDocument();
  });
  it('should render loader when data is loading', () => {
    const loadingStore = mockStore({
      DATA_OFFERS: {
        offers: [fakeOffer],
        isOffersLoaded: false,
      },
      STATE: {
        selectedCity: fakeOffer.city.name,
        currentSorting: SortingType.Popularity,
      },
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
    });

    const loadingMain = (
      <Provider store={loadingStore}>
        <Router history={history}>
          <MainScreen />
        </Router>
      </Provider>);

    render(loadingMain);
    expect(screen.queryByTestId('loader')).toBeInTheDocument();
  });

  it('should show no offers message when no offers finded', () => {
    const emptyStore = mockStore({
      DATA_OFFERS: {
        offers: [fakeOffer],
        isOffersLoaded: true,
      },
      STATE: {
        selectedCity: 'FakeCity',
        currentSorting: SortingType.Popularity,
      },
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
    });

    const emptyMain = (
      <Provider store={emptyStore}>
        <Router history={history}>
          <MainScreen />
        </Router>
      </Provider>);

    render(emptyMain);
    expect(screen.getByText('We could not find any property available at the moment in FakeCity')).toBeInTheDocument();
  });

  it('should dispach an action when fetch offers', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(fakeMain);
    expect(dispatch).toBeCalledTimes(1);
  });

  it('should dispach an action by clicking on city', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(fakeMain);

    userEvent.click(screen.getByText(City.Amsterdam));
    expect(dispatch).toBeCalledTimes(2);
  });

  it('should dispach an action by clicking on sortting', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(fakeMain);

    userEvent.click(screen.getByText(SortingType.TopRated));
    expect(dispatch).toBeCalledTimes(2);
  });
});
