import { render, screen } from '@testing-library/react';
import LoaderWrapper from './loader-wrapper';

describe('Component: LoaderWrapper', () => {
  it('should render correctly when data is loading', () => {
    render(
      <LoaderWrapper isLoad={false}>
        <p>Child element</p>
      </LoaderWrapper>,
    );
    expect(screen.queryByTestId('loader')).toBeInTheDocument();
    expect(screen.queryByText('Child element')).not.toBeInTheDocument();
  });

  it('should render correctly if data has been loaded', () => {
    render(
      <LoaderWrapper isLoad>
        <p>Child element</p>
      </LoaderWrapper>,
    );
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    expect(screen.queryByText('Child element')).toBeInTheDocument();
  });
});
