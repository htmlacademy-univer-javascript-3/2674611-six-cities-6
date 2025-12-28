import {Review} from '../../types/review.ts';
import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const.ts';
import {fetchReviews} from '../api-actions/review.ts';


type ReviewsDataState = {
  reviews: Review[];
  isLoading: boolean;
}

const initialState: ReviewsDataState = {
  reviews: [],
  isLoading: false
};

export const reviewsData = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchReviews.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
