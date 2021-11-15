import { render } from '@testing-library/react';
import { Router, Switch, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import Header from './header';
import { AuthorizationStatus } from '../../../const';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore(
  {
    USER: {
      authorizationStatus: AuthorizationStatus.Unknown,
    },
  },
);

describe('Component: Header', () => {
  it('should render correctly', () => {
    const component = render(
      <Provider store={store}>
        <Router history={history}>
          <Header />
        </Router>,
      </Provider>,
    );

    expect(component.getByAltText(/6 cities logo/i)).toBeInTheDocument();
  });

  it('should redirect to root url when user clicked to link', () => {
    history.push('/fake');
    const component = render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path='/' exact>
              <h1>This is a main page</h1>
            </Route>
            <Route>
              <Header />
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    expect(component.queryByText(/This is a main page/i)).not.toBeInTheDocument();
    userEvent.click(component.getByAltText(/6 cities logo/i));
    expect(component.queryByText(/This is a main page/i)).toBeInTheDocument();
  });
});
