import { render, screen } from '@testing-library/react';
import ReviewList from './review-list';
import { Review } from '../../types/review';

const mockReviews: Review[] = [
  {
    id: '1',
    comment: 'Great place!',
    date: '2024-01-15T10:30:00.000Z',
    rating: 5,
    user: {
      name: 'Alice',
      avatarUrl: 'avatar1.jpg',
      isPro: true,
    },
  },
  {
    id: '2',
    comment: 'Very comfortable',
    date: '2024-01-14T09:15:00.000Z',
    rating: 4,
    user: {
      name: 'Bob',
      avatarUrl: 'avatar2.jpg',
      isPro: false,
    },
  },
  {
    id: '3',
    comment: 'Could be better',
    date: '2024-01-13T14:45:00.000Z',
    rating: 3,
    user: {
      name: 'Charlie',
      avatarUrl: 'avatar3.jpg',
      isPro: true,
    },
  },
];

describe('Component: ReviewList', () => {
  it('should render list of reviews', () => {
    render(<ReviewList reviews={mockReviews} />);

    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Charlie')).toBeInTheDocument();
    expect(screen.getByText('Great place!')).toBeInTheDocument();
    expect(screen.getByText('Very comfortable')).toBeInTheDocument();
    expect(screen.getByText('Could be better')).toBeInTheDocument();
  });

  it('should render empty list when no reviews', () => {
    render(<ReviewList reviews={[]} />);

    expect(screen.queryByText('Alice')).not.toBeInTheDocument();
    expect(screen.queryByText('Bob')).not.toBeInTheDocument();
    expect(screen.queryByText('Charlie')).not.toBeInTheDocument();
  });

  it('should render correct number of review items', () => {
    render(<ReviewList reviews={mockReviews} />);

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(3);
  });

  it('should have correct CSS classes', () => {
    const { container } = render(<ReviewList reviews={mockReviews} />);

    const list = container.querySelector('.reviews__list');
    expect(list).toBeInTheDocument();
  });

  it('should pass reviews as props to ReviewCard components', () => {
    const { container } = render(<ReviewList reviews={mockReviews} />);

    const reviewCards = container.querySelectorAll('li.reviews__item');
    expect(reviewCards).toHaveLength(3);
  });

  it('should use review id as key for each ReviewCard', () => {
    const { container } = render(<ReviewList reviews={mockReviews} />);

    const firstReviewItem = container.querySelector('li');
    expect(firstReviewItem).toBeInTheDocument();
    const allNames = screen.getAllByText(/Alice|Bob|Charlie/);
    expect(allNames[0]).toHaveTextContent('Alice');
    expect(allNames[1]).toHaveTextContent('Bob');
    expect(allNames[2]).toHaveTextContent('Charlie');
  });

  it('should render single review correctly', () => {
    const singleReview = [mockReviews[0]];

    render(<ReviewList reviews={singleReview} />);

    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Great place!')).toBeInTheDocument();
    expect(screen.queryByText('Bob')).not.toBeInTheDocument();

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(1);
  });
});
