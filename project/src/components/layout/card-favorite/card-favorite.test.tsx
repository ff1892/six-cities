import * as Redux from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import { AuthorizationStatus } from '../../../const';
import { makeFakeOffer } from '../../../utils/mocks';
import CardFavorite from './card-favorite';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const fakeOffer = makeFakeOffer();

describe('Component: CardFavorite', () => {
  const store = mockStore({
    USER: {
      authorizationStatus: AuthorizationStatus.Auth,
    },
  });

  const fakeCard = (
    <Provider store={store}>
      <Router history={history}>
        <CardFavorite
          offer={fakeOffer}
        />
      </Router>
    </Provider>);

  it('should render correctly', () => {
    const { price, title } = fakeOffer;
    render(fakeCard);
    expect(screen.getByText(new RegExp(price.toString()))).toBeInTheDocument();
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('should dispach an action when users clicks add/remove favorites', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(fakeCard);

    userEvent.click(screen.getByRole('button'));
    expect(dispatch).toBeCalledTimes(1);
  });
});
