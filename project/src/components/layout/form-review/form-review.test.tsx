import * as Redux from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import { UploadStatus } from '../../../const';
import FormReview from './form-review';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const message = 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.';

describe('Component: FormReview', () => {
  const store = mockStore({
    DATA_COMMENTS: {
      uploadCommentStatus: UploadStatus.Unknown,
    },
  });
  const fakeForm = (
    <Provider store={store}>
      <Router history={history}>
        <FormReview />
      </Router>
    </Provider>);

  it('should render correctly', () => {
    render(fakeForm);
    expect(screen.getByLabelText(/Your review/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should set disabled button when incorrect input', () => {
    render(fakeForm);
    userEvent.click(screen.getByTitle('good'));
    expect(screen.getByRole('button')).toBeDisabled();
    userEvent.type(screen.getByRole('textbox'), 'Some text');
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should not dispach actions when user clicks submit on empty form', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(fakeForm);
    userEvent.click(screen.getByRole('button'));
    expect(dispatch).not.toBeCalled();
  });

  it('should dispach actions when user fills from and clicks submit', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(fakeForm);
    userEvent.type(screen.getByRole('textbox'), message);
    userEvent.click(screen.getByTitle('good'));
    userEvent.click(screen.getByRole('button'));
    expect(dispatch).toBeCalledTimes(2);
  });

  it('should be disabled when has is posting status', () => {
    const isPostingStore = mockStore({
      DATA_COMMENTS: {
        uploadCommentStatus: UploadStatus.Posting,
      },
    });
    const isPostingFakeForm = (
      <Provider store={isPostingStore}>
        <Router history={history}>
          <FormReview />
        </Router>
      </Provider>);

    render(isPostingFakeForm);

    const radioButtons = screen.getAllByRole('radio');
    radioButtons.map((button) => expect(button).toBeDisabled());
    expect(screen.getByRole('textbox')).toBeDisabled();
    expect(screen.getByRole('button')).toBeDisabled();

  });

});
