import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router, Switch, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import NotFoundScreen from './not-found';

const history = createMemoryHistory();

describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    const component = render(
      <Router history={history}>
        <NotFoundScreen />
      </Router>,
    );

    expect(component.getByText(/Page not found/i)).toBeInTheDocument();
    expect(component.getByText(/Go to main page/i)).toBeInTheDocument();
  });

  it('should redirect to root url when user clicked to link', () => {
    history.push('/fake');
    render(
      <Router history={history}>
        <Switch>
          <Route path='/' exact>
            <h1>This is a main page</h1>
          </Route>
          <Route>
            <NotFoundScreen />
          </Route>
        </Switch>
      </Router>,
    );

    expect(screen.queryByText(/This is a main page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('link'));
    expect(screen.queryByText(/This is a main page/i)).toBeInTheDocument();
  });
});
