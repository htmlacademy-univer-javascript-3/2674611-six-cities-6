import { render, screen } from '@testing-library/react';
import ReviewCard from './review-card';
import { Review } from '../../types/review';
import { formatReviewDate, getRatingWidth } from '../../services/utils';

vi.mock('../../services/utils', () => ({
  formatReviewDate: vi.fn(),
  getRatingWidth: vi.fn(),
}));

const mockReview: Review = {
  id: '1',
  comment: 'Great place! Very clean and comfortable.',
  date: '2024-01-15T10:30:00.000Z',
  rating: 4.5,
  user: {
    name: 'John Doe',
    avatarUrl: 'https://example.com/avatar.jpg',
    isPro: true,
  },
};

describe('Component: ReviewCard', () => {
  beforeEach(() => {
    vi.mocked(formatReviewDate).mockReturnValue('January 2024');
    vi.mocked(getRatingWidth).mockReturnValue('90%');
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render review data correctly', () => {
    render(<ReviewCard review={mockReview} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Great place! Very clean and comfortable.')).toBeInTheDocument();
    expect(screen.getByAltText('John Doe avatar')).toBeInTheDocument();
  });

  it('should display user avatar with correct attributes', () => {
    render(<ReviewCard review={mockReview} />);

    const avatar = screen.getByAltText('John Doe avatar');
    expect(avatar).toHaveAttribute('src', 'https://example.com/avatar.jpg');
    expect(avatar).toHaveAttribute('width', '54');
    expect(avatar).toHaveAttribute('height', '54');
    expect(avatar).toHaveClass('reviews__avatar');
    expect(avatar).toHaveClass('user__avatar');
  });

  it('should call getRatingWidth with correct rating', () => {
    render(<ReviewCard review={mockReview} />);

    expect(getRatingWidth).toHaveBeenCalledTimes(1);
    expect(getRatingWidth).toHaveBeenCalledWith(4.5);
  });

  it('should apply rating width style from getRatingWidth', () => {
    vi.mocked(getRatingWidth).mockReturnValue('85%');

    render(<ReviewCard review={mockReview} />);

    const ratingSpan = screen.getByText('Rating: 4.5').previousSibling;
    expect(ratingSpan).toHaveStyle({ width: '85%' });
  });

  it('should call formatReviewDate with correct date', () => {
    render(<ReviewCard review={mockReview} />);

    expect(formatReviewDate).toHaveBeenCalledTimes(1);
    expect(formatReviewDate).toHaveBeenCalledWith('2024-01-15T10:30:00.000Z');
  });

  it('should display formatted date', () => {
    vi.mocked(formatReviewDate).mockReturnValue('15 January 2024');

    render(<ReviewCard review={mockReview} />);

    const timeElement = screen.getByText('15 January 2024');
    expect(timeElement).toBeInTheDocument();
    expect(timeElement).toHaveAttribute('datetime', '2024-01-15T10:30:00.000Z');
  });

  it('should have correct CSS classes', () => {
    const { container } = render(<ReviewCard review={mockReview} />);

    const listItem = container.querySelector('li');
    expect(listItem).toHaveClass('reviews__item');

    const userSection = container.querySelector('.reviews__user');
    expect(userSection).toBeInTheDocument();

    const infoSection = container.querySelector('.reviews__info');
    expect(infoSection).toBeInTheDocument();
  });

  it('should render visually hidden rating text', () => {
    render(<ReviewCard review={mockReview} />);

    const hiddenRating = screen.getByText('Rating: 4.5');
    expect(hiddenRating).toBeInTheDocument();
    expect(hiddenRating).toHaveClass('visually-hidden');
  });

  it('should render pro user correctly', () => {
    const proReview = {
      ...mockReview,
      user: { ...mockReview.user, isPro: true },
    };

    render(<ReviewCard review={proReview} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('should render non-pro user correctly', () => {
    const nonProReview = {
      ...mockReview,
      user: { ...mockReview.user, isPro: false },
    };

    render(<ReviewCard review={nonProReview} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});
