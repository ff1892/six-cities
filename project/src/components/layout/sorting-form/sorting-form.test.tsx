import { render, screen } from '@testing-library/react';
import { SortingType } from '../../../const';
import SortingForm from './sorting-form';
import userEvent from '@testing-library/user-event';


describe('Component: SortingForm', () => {
  const onSortingChange = jest.fn();
  const fakeSortingForm = (
    <SortingForm
      currentSorting={SortingType.Popularity}
      onSortingChange={onSortingChange}
    />);

  it('should render correctly', () => {
    render(fakeSortingForm);
    expect(screen.getByTestId('form-header')).toBeInTheDocument();
    expect(screen.getByTestId('form-items')).toBeInTheDocument();
  });
  it('should toggle items block class by clicking on form header', () => {
    render(fakeSortingForm);
    expect(screen.getByTestId('form-items')).toHaveClass('places__options places__options--custom ');
    userEvent.click(screen.getByTestId('form-header'));
    expect(screen.getByTestId('form-items')).toHaveClass('places__options places__options--custom places__options--opened');
  });
  it('should run callback when user click on sorting item', () => {
    render(fakeSortingForm);
    userEvent.click(screen.getByText(SortingType.TopRated));
    expect(onSortingChange).toBeCalledTimes(1);
  });
});
