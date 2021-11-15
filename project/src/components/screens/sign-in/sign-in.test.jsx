import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import SignInScreen from './sign-in';
import { AppRoute } from '../../../const';
import { AuthorizationStatus } from '../../../const';

const mockStore = configureMockStore();
const store = mockStore(
  {
    USER: {
      authorizationStatus: AuthorizationStatus.Unknown,
    },
  },
);

describe('Component: SignInScreen', () => {
  it('should render SignInScreen when when user navigates to "login" url', () => {
    const history = createMemoryHistory();
    history.push(AppRoute.SignIn);

    render(
      <Provider store={store}>
        <Router history={history}>
          <SignInScreen />
        </Router>
      </Provider>,
    );

    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();

    userEvent.type(screen.getByTestId('login'), 'user@test.com');
    userEvent.type(screen.getByTestId('password'), 'pass01');

    expect(screen.getByDisplayValue(/user@test.com/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/pass01/i)).toBeInTheDocument();
  });
});
