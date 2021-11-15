import { render, screen } from '@testing-library/react';
import { makeFakeComment } from '../../../utils/mocks';
import Review from './review';

describe('Component: Review', () => {
  const fakeComment = makeFakeComment();

  it('should render correctly', () => {
    render(<Review review={fakeComment}/>);
    expect(screen.getByText(fakeComment.comment)).toBeInTheDocument();
    expect(screen.getByText(fakeComment.user.name)).toBeInTheDocument();
    expect(screen.getByAltText(`${fakeComment.user.name} avatar`)).toBeInTheDocument();
  });
});
