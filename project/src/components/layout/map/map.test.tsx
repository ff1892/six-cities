import { render, screen } from '@testing-library/react';
import Map from './map';
import { makeFakeOffer } from '../../../utils/mocks';

describe('Component: Map', () => {
  it('should render correctly', () => {
    const fakeOffer = makeFakeOffer();
    render(<Map offers={[fakeOffer]} selectedOffer={null}/>);

    expect(screen.getByTestId('map component')).toBeInTheDocument();
    expect(screen.getByText(/Leaflet/i)).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(3);
  });
});
