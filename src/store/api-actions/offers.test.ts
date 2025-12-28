import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { State } from '../../types/state';
import { APIRoute } from '../../const';
import { FullOffer, Offer } from '../../types/offer';
import { ThunkDispatch } from '@reduxjs/toolkit';
import {fetchNearbyOffers, fetchOfferById, fetchOffers} from './offers.ts';

const extractActionsTypes = (actions: Action<string>[]): string[] =>
  actions.map(({ type }) => type);

const mockOffer: Offer = {
  id: '1',
  title: 'Test Offer',
  type: 'apartment',
  price: 100,
  city: { name: 'Paris', location: { latitude: 0, longitude: 0, zoom: 10 } },
  location: { latitude: 0, longitude: 0, zoom: 10 },
  isFavorite: false,
  isPremium: true,
  rating: 4.5,
  previewImage: 'img.jpg'
};

const mockFullOffer: FullOffer = {
  ...mockOffer,
  description: 'Test description',
  bedrooms: 2,
  goods: ['TV', 'WiFi'],
  host: { name: 'Host', avatarUrl: 'avatar.jpg', isPro: true },
  images: ['img1.jpg', 'img2.jpg'],
  maxAdults: 3
};

const mockOffers = [mockOffer, { ...mockOffer, id: '2' }];

type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action<string>>;

describe('Offers async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({});
    mockAxiosAdapter.reset();
  });

  describe('fetchOffers', () => {
    it('should dispatch pending and fulfilled when server response 200', async () => {
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(200, mockOffers);

      await store.dispatch(fetchOffers());

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffers.pending.type,
        fetchOffers.fulfilled.type,
      ]);
    });

    it('should dispatch pending and rejected when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(400);

      await store.dispatch(fetchOffers());

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffers.pending.type,
        fetchOffers.rejected.type,
      ]);
    });
  });

  describe('fetchOfferById', () => {
    it('should dispatch pending and fulfilled when server response 200', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/1`).reply(200, mockFullOffer);

      await store.dispatch(fetchOfferById('1'));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOfferById.pending.type,
        fetchOfferById.fulfilled.type,
      ]);
    });

    it('should make correct API call with offerId', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/test-id`).reply(200, mockFullOffer);

      await store.dispatch(fetchOfferById('test-id'));

      expect(mockAxiosAdapter.history.get.length).toBe(1);
      expect(mockAxiosAdapter.history.get[0].url).toBe('offers/test-id');
    });
  });

  describe('fetchNearbyOffers', () => {
    it('should dispatch pending and fulfilled when server response 200', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/1/nearby`).reply(200, mockOffers);

      await store.dispatch(fetchNearbyOffers('1'));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchNearbyOffers.pending.type,
        fetchNearbyOffers.fulfilled.type,
      ]);
    });

    it('should make correct API call with offerId', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/123/nearby`).reply(200, mockOffers);

      await store.dispatch(fetchNearbyOffers('123'));

      expect(mockAxiosAdapter.history.get.length).toBe(1);
      expect(mockAxiosAdapter.history.get[0].url).toBe('offers/123/nearby');
    });
  });
});
