import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import { City } from '../../../const';
import CityTab from './city-tab';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: CityTab', () => {
  const store = mockStore({});
  const handleCityClick = jest.fn();
  const fakeTab = (
    <Provider store={store}>
      <Router history={history}>
        <CityTab
          city={City.Paris}
          onCityClick={handleCityClick}
        />
      </Router>
    </Provider>
  );

  it('should render correctly', () => {
    render(fakeTab);
    expect(screen.getByText(City.Paris)).toBeInTheDocument();
  });

  it('should run callback function when user click tab', () => {
    render(fakeTab);

    userEvent.click(screen.getByRole('link'));
    expect(handleCityClick).toBeCalledTimes(1);
  });
});
