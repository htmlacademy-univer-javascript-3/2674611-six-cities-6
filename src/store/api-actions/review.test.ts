import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { State } from '../../types/state';
import { APIRoute } from '../../const';
import { Review } from '../../types/review';
import { ThunkDispatch } from '@reduxjs/toolkit';
import {fetchReviews, sendReview} from './review.ts';

const extractActionsTypes = (actions: Action<string>[]): string[] =>
  actions.map(({ type }) => type);

const mockReview: Review = {
  id: '1',
  comment: 'Great!',
  date: '2024-01-01T00:00:00.000Z',
  rating: 5,
  user: {
    name: 'User',
    avatarUrl: 'avatar.jpg',
    isPro: true
  }
};

type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action<string>>;

describe('Reviews async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({});
    mockAxiosAdapter.reset();
  });

  describe('fetchReviews', () => {
    it('should dispatch pending and fulfilled when server response 200', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/offer-123`).reply(200, [mockReview]);

      await store.dispatch(fetchReviews('offer-123'));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchReviews.pending.type,
        fetchReviews.fulfilled.type,
      ]);
    });

    it('should make correct API call with offerId', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/test-id`).reply(200, []);

      await store.dispatch(fetchReviews('test-id'));

      expect(mockAxiosAdapter.history.get.length).toBe(1);
      expect(mockAxiosAdapter.history.get[0].url).toBe('comments/test-id');
    });

    it('should dispatch pending and rejected when server response 400', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/offer-123`).reply(400);

      await store.dispatch(fetchReviews('offer-123'));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchReviews.pending.type,
        fetchReviews.rejected.type,
      ]);
    });
  });

  describe('sendReview', () => {
    it('should dispatch pending and fulfilled when server response 200', async () => {
      mockAxiosAdapter.onPost(`${APIRoute.Comments}/offer-123`).reply(200, mockReview);

      await store.dispatch(sendReview({
        offerId: 'offer-123',
        comment: 'Great!',
        rating: 5
      }));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        sendReview.pending.type,
        sendReview.fulfilled.type,
      ]);
    });

    it('should make correct POST request with review data', async () => {
      mockAxiosAdapter.onPost(`${APIRoute.Comments}/test-id`).reply(200, mockReview);

      const reviewData = {
        offerId: 'test-id',
        comment: 'Test comment',
        rating: 4
      };

      await store.dispatch(sendReview(reviewData));

      expect(mockAxiosAdapter.history.post.length).toBe(1);
      expect(mockAxiosAdapter.history.post[0].url).toBe('comments/test-id');
      const postRequest = mockAxiosAdapter.history.post[0];
      const requestData: string = postRequest.data as string;
      expect(JSON.parse(requestData)).toEqual({
        comment: 'Test comment',
        rating: 4
      });
    });

    it('should dispatch pending and rejected when server response 400', async () => {
      mockAxiosAdapter.onPost(`${APIRoute.Comments}/offer-123`).reply(400);

      await store.dispatch(sendReview({
        offerId: 'offer-123',
        comment: 'Bad',
        rating: 1
      }));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        sendReview.pending.type,
        sendReview.rejected.type,
      ]);
    });
  });
});
