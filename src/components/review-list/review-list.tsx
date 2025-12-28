import {Review} from '../../types/review.ts';
import ReviewCard from '../review/review-card.tsx';

type ReviewListProps = {
  reviews: Review[];
}

function ReviewList({reviews} : ReviewListProps) : JSX.Element {
  return (
    <ul className="reviews__list">
      {reviews.map((review: Review) => (
        <ReviewCard
          key={review.id}
          review={review}
        />
      ))}
    </ul>
  );
}

export default ReviewList;
