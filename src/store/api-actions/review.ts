import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../../types/state.ts';
import {AxiosInstance} from 'axios';
import {Review, SendReviewData} from '../../types/review.ts';

export const fetchReviews = createAsyncThunk<
  Review[],
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('reviews/fetchReviewsByOfferId',
  async (offerId, {extra: api}) => {
    const {data} = await api.get<Review[]>(`/comments/${offerId}`);
    return data;
  });

export const sendReview = createAsyncThunk<
  Review,
  SendReviewData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('reviews/sendReviewByOfferId',
  async ({offerId, comment, rating}, {extra: api}) => {
    const {data} = await api.post<Review>(`/comments/${offerId}`,
      { rating, comment });
    return data;
  });
