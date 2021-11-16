import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AuthorizationStatus, City } from '../../../const';
import { makeFakeOffer } from '../../../utils/mocks';
import CardsListFavorite from './cards-list-favorite';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const fakeOffer = makeFakeOffer();

describe('Component: CardsListFavorite', () => {
  const store = mockStore({
    USER: {
      authorizationStatus: AuthorizationStatus.Auth,
    },
  });
  const FakeList = (
    <Provider store={store}>
      <Router history={history}>
        <CardsListFavorite
          offers={[fakeOffer]}
          city={City.Paris}
        />
      </Router>
    </Provider>);

  it('should render correctly', () => {
    const { price, title } = fakeOffer;
    render(FakeList);
    expect(screen.getByText(new RegExp(price.toString()))).toBeInTheDocument();
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(City.Paris)).toBeInTheDocument();
  });
});
