import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import HeaderNavigation from './header-navigation';
import { AuthorizationStatus } from '../../../const';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: HeaderNavigation', () => {
  it('should render correctly when user is authorized', () => {

    const store = mockStore(
      {
        USER: {
          authorizationStatus: AuthorizationStatus.Auth },
      },
    );

    render(
      <Provider store={store}>
        <Router history={history}>
          <HeaderNavigation />
        </Router>
      </Provider>,
    );

    expect(screen.queryByText(/Sign out/i)).toBeInTheDocument();
    expect(screen.queryByText(/Sign in/i)).not.toBeInTheDocument();
  });

  it('should render correctly when user is unauthorized', () => {

    const store = mockStore(
      {
        USER: {
          authorizationStatus: AuthorizationStatus.NoAuth },
      },
    );

    render(
      <Provider store={store}>
        <Router history={history}>
          <HeaderNavigation />
        </Router>
      </Provider>,
    );

    expect(screen.queryByText(/Sign out/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Sign in/i)).toBeInTheDocument();
  });
});
