import { render, screen } from '@testing-library/react';
import NoOffersMain from './no-offers-main';
import { City } from '../../../../const';

describe('Component: NoOffersMain', () => {
  it('should render correctly', () => {
    render (<NoOffersMain selectedCity={City.Amsterdam} />);
    expect(screen.getByText(`We could not find any property available at the moment in ${City.Amsterdam}`)).toBeInTheDocument();
  });
});
