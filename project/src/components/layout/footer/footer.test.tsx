import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router, Switch, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Footer from './footer';

const history = createMemoryHistory();

describe('Component: Footer', () => {
  it('should render correctly', () => {
    const component = render(
      <Router history={history}>
        <Footer isContainer />
      </Router>,
    );

    expect(component.getByAltText(/6 cities logo/i)).toBeInTheDocument();
  });

  it('should redirect to root url when user clicked to link', () => {
    history.push('/fake');
    const component = render(
      <Router history={history}>
        <Switch>
          <Route path='/' exact>
            <h1>This is a main page</h1>
          </Route>
          <Route>
            <Footer isContainer />
          </Route>
        </Switch>
      </Router>,
    );

    expect(component.queryByText(/This is a main page/i)).not.toBeInTheDocument();
    userEvent.click(component.getByAltText(/6 cities logo/i));
    expect(component.queryByText(/This is a main page/i)).toBeInTheDocument();
  });
});
