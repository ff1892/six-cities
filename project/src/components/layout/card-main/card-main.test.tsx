import * as Redux from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import { AuthorizationStatus } from '../../../const';
import { makeFakeOffer } from '../../../utils/mocks';
import Card from './card-main';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const fakeOffer = makeFakeOffer();

describe('Component: Card', () => {
  const store = mockStore({
    USER: {
      authorizationStatus: AuthorizationStatus.Auth,
    },
  });
  const onHoverCallback = jest.fn();
  const onUnhoverCallback = jest.fn();
  const fakeCard = (
    <Provider store={store}>
      <Router history={history}>
        <Card
          offer={fakeOffer}
          articleClass='fake-class'
          wrapperClass='fake-class'
          onMouseEnter={onHoverCallback}
          onMouseLeave={onUnhoverCallback}
        />
      </Router>
    </Provider>);

  it('should render correctly', () => {
    const { price, title } = fakeOffer;
    render(fakeCard);
    expect(screen.getByText(new RegExp(price.toString()))).toBeInTheDocument();
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('should run callback when user hovers and unhovers card', () => {
    render(fakeCard);
    userEvent.hover(screen.getByTestId('offer-card'));
    expect(onHoverCallback).toBeCalledTimes(1);
    userEvent.unhover(screen.getByTestId('offer-card'));
    expect(onUnhoverCallback).toBeCalledTimes(1);
  });

  it('should dispach an action when users clicks add/remove favorites', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(fakeCard);

    userEvent.click(screen.getByRole('button'));
    expect(dispatch).toBeCalledTimes(1);
  });

  it('should not dispatch an action when unauthorized user clicks add/remove favorites', () => {

    const storeNoAuth = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
    });

    const fakeCardNoAuth = (
      <Provider store={storeNoAuth}>
        <Router history={history}>
          <Card
            offer={fakeOffer}
            articleClass='fake-class'
            wrapperClass='fake-class'
            onMouseEnter={onHoverCallback}
            onMouseLeave={onUnhoverCallback}
          />
        </Router>
      </Provider>);

    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(fakeCardNoAuth);
    userEvent.click(screen.getByRole('button'));
    expect(dispatch).not.toBeCalled();
  });
});
