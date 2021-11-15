import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import { City } from '../../../const';
import CitiesList from './cities-list';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: CitiesList', () => {
  const store = mockStore({});
  const onCityClick = jest.fn();
  const fakeCitiesTabs = (
    <Provider store={store}>
      <Router history={history}>
        <CitiesList
          selectedCity={City.Paris}
          onCityClick={onCityClick}
        />
      </Router>
    </Provider>
  );

  it('should render correctly', () => {
    render(fakeCitiesTabs);
    expect(screen.getByText(City.Paris)).toBeInTheDocument();
    expect(screen.getByText(City.Dusseldorf)).toBeInTheDocument();
  });

  it('should run callback function when user click tab', () => {
    render(fakeCitiesTabs);
    userEvent.click(screen.getByText(City.Amsterdam));
    expect(onCityClick).toBeCalledTimes(1);
  });
});
