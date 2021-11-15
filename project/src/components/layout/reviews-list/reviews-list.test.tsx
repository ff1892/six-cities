import { render, screen } from '@testing-library/react';
import { makeFakeComment } from '../../../utils/mocks';
import ReviewsList from './reviews-list';

describe('Component: ReviewsList', () => {
  const fakeComment = makeFakeComment();

  it('should render correctly', () => {
    render(<ReviewsList reviews={[fakeComment]} />);
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(`${[fakeComment].length.toString()}`)).toBeInTheDocument();
    expect(screen.getByText(fakeComment.comment)).toBeInTheDocument();
    expect(screen.getByText(fakeComment.user.name)).toBeInTheDocument();
    expect(screen.getByAltText(`${fakeComment.user.name} avatar`)).toBeInTheDocument();
  });
});
