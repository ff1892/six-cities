import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import { AuthorizationStatus } from '../../../const';
import { makeFakeOffer } from '../../../utils/mocks';
import CardsList from './cards-list';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const fakeOffer = makeFakeOffer();

describe('Component: CardsList', () => {
  const store = mockStore({
    USER: {
      authorizationStatus: AuthorizationStatus.Auth,
    },
  });
  const onHoverCallback = jest.fn();
  const FakeList = (
    <Provider store={store}>
      <Router history={history}>
        <CardsList
          offers={[fakeOffer]}
          classes={{
            listClass: 'class',
            articleClass: 'class',
            wrapperClass: 'class',
          }}
          onOfferHover={onHoverCallback}
        />
      </Router>
    </Provider>);

  it('should render correctly', () => {
    const { price, title } = fakeOffer;
    render(FakeList);
    expect(screen.getByText(new RegExp(price.toString()))).toBeInTheDocument();
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('should run callback when user hovers and unhovers card', () => {
    render(FakeList);
    userEvent.hover(screen.getByTestId('offer-card'));
    expect(onHoverCallback).toBeCalledWith(fakeOffer.id);
    userEvent.unhover(screen.getByTestId('offer-card'));
    expect(onHoverCallback).toBeCalledWith(null);
  });
});
