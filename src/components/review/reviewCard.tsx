import {formatReviewDate, getRatingWidth} from '../../services/utils.ts';
import {Review} from '../../types/review.ts';

type ReviewProps = {
  review: Review;
}

function ReviewCard({review}: ReviewProps): JSX.Element {
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={review.user.avatarUrl}
            width="54"
            height="54"
            alt={`${review.user.name} avatar`}
          />
        </div>
        <span className="reviews__user-name">
          {review.user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: getRatingWidth(review.rating) }}></span>
            <span className="visually-hidden">Rating: {review.rating}</span>
          </div>
        </div>
        <p className="reviews__text">
          {review.comment}
        </p>
        <time className="reviews__time" dateTime={review.date}>
          {formatReviewDate(review.date)}
        </time>
      </div>
    </li>
  );
}

export default ReviewCard;
