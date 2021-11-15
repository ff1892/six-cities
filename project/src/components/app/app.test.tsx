import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { getFakeStore } from '../../utils/mocks';
import { createApi } from '../../services/api';
import { State } from '../../types/state';
import { AppRoute, AuthorizationStatus } from '../../const';
import App from './app';


const onFakeUnathorized = jest.fn();
const api = createApi(onFakeUnathorized());
const middlewares = [thunk.withExtraArgument(api)];
const history = createMemoryHistory();

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);


function getFakeApp (authStatus: AuthorizationStatus): JSX.Element {
  const fakeStore = getFakeStore(authStatus);
  const store = mockStore(fakeStore);
  return (
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  );
}

describe('Application routing', () => {
  it('should render MainScreen when user navigate to "/"', () => {
    history.push(AppRoute.Main);
    render(getFakeApp(AuthorizationStatus.Unknown));

    expect(screen.getByTestId(/root page/i)).toBeInTheDocument();
  });

  it('should render SignInScreen when user navigate to "/login"', () => {
    history.push(AppRoute.SignIn);
    render(getFakeApp(AuthorizationStatus.NoAuth));

    expect(screen.getByTestId(/login/i)).toBeInTheDocument();
    expect(screen.getByTestId(/password/i)).toBeInTheDocument();
  });

  it('should render FavoritesScreen when user navigate to "/favorites"', () => {
    history.push(AppRoute.Favorites);
    render(getFakeApp(AuthorizationStatus.Auth));

    expect(screen.getByTestId(/favorites page/i)).toBeInTheDocument();
  });

  it('should render PropertyScreen when user navigate to "/offer/:id"', () => {
    history.push(`${AppRoute.Offers}/1`);
    render(getFakeApp(AuthorizationStatus.Auth));

    expect(screen.getByTestId(/property page/i)).toBeInTheDocument();
  });

  it('should render NotFoundScreen when user navigate to incorrect route', () => {
    history.push('/incorrect');
    render(getFakeApp(AuthorizationStatus.Auth));

    expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
    expect(screen.getByText(/Go to main page/i)).toBeInTheDocument();
  });
});
