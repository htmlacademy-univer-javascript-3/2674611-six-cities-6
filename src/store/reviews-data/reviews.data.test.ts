
import { fetchReviews, sendReview } from '../api-actions/review.ts';
import { Review } from '../../types/review.ts';
import {reviewsData} from './reviews-data.ts';

describe('ReviewsData Slice', () => {
  const mockReviews: Review[] = [
    {
      id: 'b67ddfd5-b953-4a30-8c8d-bd083cd6b62a',
      date: '2019-05-08T14:13:56.569Z',
      user: {
        name: 'Oliver Conner',
        avatarUrl: 'https://url-to-image/image.png',
        isPro: false
      },
      comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
      rating: 4
    },
    {
      id: 'b67ddfd5-b953-4a30-8c8d-bd083cd6b62b',
      date: '2019-05-09T14:13:56.569Z',
      user: {
        name: 'Max',
        avatarUrl: 'https://url-to-image/image2.png',
        isPro: true
      },
      comment: 'Great place!',
      rating: 5
    }
  ];

  const mockNewReview: Review = {
    id: 'new-review-id',
    date: '2024-01-01T00:00:00.000Z',
    user: {
      name: 'New User',
      avatarUrl: 'https://url-to-image/new.png',
      isPro: false
    },
    comment: 'New comment',
    rating: 3
  };

  describe('Initial State', () => {
    it('should return initial state with empty action', () => {
      const emptyAction = { type: '' };
      const expectedState = {
        reviews: [],
        isLoading: false
      };

      const result = reviewsData.reducer(undefined, emptyAction);

      expect(result).toEqual(expectedState);
    });
  });

  describe('fetchReviews', () => {
    it('should set isLoading to true on pending', () => {
      const initialState = {
        reviews: [],
        isLoading: false
      };

      const result = reviewsData.reducer(
        initialState,
        fetchReviews.pending('', 'offer-id')
      );

      expect(result).toEqual({
        reviews: [],
        isLoading: true
      });
    });

    it('should set reviews and isLoading to false on fulfilled', () => {
      const initialState = {
        reviews: [],
        isLoading: true
      };

      const result = reviewsData.reducer(
        initialState,
        fetchReviews.fulfilled(mockReviews, '', 'offer-id')
      );

      expect(result).toEqual({
        reviews: mockReviews,
        isLoading: false
      });
    });

    it('should set isLoading to false on rejected', () => {
      const initialState = {
        reviews: [],
        isLoading: true
      };

      const result = reviewsData.reducer(
        initialState,
        fetchReviews.rejected(new Error('Failed'), '', 'offer-id')
      );

      expect(result).toEqual({
        reviews: [],
        isLoading: false
      });
    });
  });

  describe('sendReview', () => {
    it('should add new review to the beginning of array on fulfilled', () => {
      const initialState = {
        reviews: [mockReviews[0]],
        isLoading: false
      };

      const result = reviewsData.reducer(
        initialState,
        sendReview.fulfilled(
          mockNewReview,
          '',
          { offerId: 'offer-id', comment: 'New comment', rating: 3 }
        )
      );

      expect(result).toEqual({
        reviews: [mockReviews[0], mockNewReview, ],
        isLoading: false
      });
    });

    it('should not change state on sendReview pending or rejected', () => {
      const initialState = {
        reviews: mockReviews,
        isLoading: false
      };

      const pendingResult = reviewsData.reducer(
        initialState,
        sendReview.pending('', { offerId: 'offer-id', comment: 'test', rating: 5 })
      );

      expect(pendingResult).toEqual(initialState);

      const rejectedResult = reviewsData.reducer(
        initialState,
        sendReview.rejected(new Error('Failed'), '', { offerId: 'offer-id', comment: 'test', rating: 5 })
      );

      expect(rejectedResult).toEqual(initialState);
    });
  });

  describe('State Preservation', () => {
    it('should preserve existing reviews when loading new ones', () => {
      const initialState = {
        reviews: mockReviews,
        isLoading: false
      };

      const newReviews = [mockNewReview];

      const result = reviewsData.reducer(
        initialState,
        fetchReviews.fulfilled(newReviews, '', 'different-offer-id')
      );

      expect(result).toEqual({
        reviews: newReviews,
        isLoading: false
      });
    });
  });
});
