import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../../types/state.ts';
import {AxiosInstance} from 'axios';
import {Review} from '../../types/review.ts';

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
  void,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('reviews/sendReviewByOfferId',
  async (offerId, {extra: api}) => {
    await api.post(`/comments/${offerId}`);
  });
