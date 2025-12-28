import {offersData} from './offers-data';
import {fetchOffers, fetchOfferById, fetchNearbyOffers} from '../api-actions/offers';

const mockOffer = {
  id: '1',
  title: 'Beautiful & luxurious apartment at great location',
  type: 'apartment',
  price: 120,
  city: {
    name: 'Amsterdam',
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8,
    },
  },
  location: {
    latitude: 52.35514938496378,
    longitude: 4.673877537499948,
    zoom: 8,
  },
  isFavorite: false,
  isPremium: true,
  rating: 4.8,
  previewImage: 'img/apartment-01.jpg',
};

const mockFullOffer = {
  ...mockOffer,
  description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
  bedrooms: 3,
  goods: ['Heating', 'Kitchen', 'Cable TV', 'Washing machine', 'Coffee machine', 'Dishwasher'],
  host: {
    name: 'Oliver Conner',
    avatarUrl: 'https://url-to-image/image.png',
    isPro: false,
  },
  images: ['img/apartment-01.jpg', 'img/apartment-02.jpg'],
  maxAdults: 4,
};

const mockOffers = [mockOffer, {
  ...mockOffer,
  id: '2',
  title: 'Another offer',
  isPremium: false,
  rating: 4.5,
}];

describe('Offers Data Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      offers: [],
      currentOffer: null,
      nearbyOffers: [],
      isLoading: false,
    };

    const result = offersData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  describe('fetchOffers', () => {
    it('should set isLoading to true on pending', () => {
      const initialState = {
        offers: [],
        currentOffer: null,
        nearbyOffers: [],
        isLoading: false,
      };

      const result = offersData.reducer(
        initialState,
        fetchOffers.pending('', undefined, { requestId: 'test-request-id' })
      );

      expect(result).toEqual({
        ...initialState,
        isLoading: true,
      });
    });

    it('should set offers and isLoading to false on fulfilled', () => {
      const initialState = {
        offers: [],
        currentOffer: null,
        nearbyOffers: [],
        isLoading: true,
      };

      const result = offersData.reducer(
        initialState,
        fetchOffers.fulfilled(mockOffers, 'request-id', undefined, { requestId: 'request-id' })
      );

      expect(result).toEqual({
        offers: mockOffers,
        currentOffer: null,
        nearbyOffers: [],
        isLoading: false,
      });
    });

    it('should set isLoading to false on rejected', () => {
      const initialState = {
        offers: mockOffers,
        currentOffer: null,
        nearbyOffers: [],
        isLoading: true,
      };

      const result = offersData.reducer(
        initialState,
        fetchOffers.rejected(new Error('Error'), 'request-id', undefined, { requestId: 'request-id' })
      );

      expect(result).toEqual({
        ...initialState,
        isLoading: false,
      });
    });

    it('should replace existing offers with new ones on fulfilled', () => {
      const initialState = {
        offers: [{...mockOffer, id: 'old-id'}],
        currentOffer: null,
        nearbyOffers: [],
        isLoading: true,
      };

      const result = offersData.reducer(
        initialState,
        fetchOffers.fulfilled(mockOffers, 'request-id', undefined, { requestId: 'request-id' })
      );

      expect(result.offers).toEqual(mockOffers);
      expect(result.offers).toHaveLength(2);
      expect(result.isLoading).toBe(false);
    });
  });

  describe('fetchOfferById', () => {
    it('should set currentOffer on fulfilled', () => {
      const initialState = {
        offers: mockOffers,
        currentOffer: null,
        nearbyOffers: [],
        isLoading: false,
      };

      const result = offersData.reducer(
        initialState,
        fetchOfferById.fulfilled(mockFullOffer, 'request-id', '1', { requestId: 'request-id' })
      );

      expect(result).toEqual({
        offers: mockOffers,
        currentOffer: mockFullOffer,
        nearbyOffers: [],
        isLoading: false,
      });
    });

    it('should replace existing currentOffer with new one on fulfilled', () => {
      const oldOffer = {...mockFullOffer, id: 'old-id'};
      const initialState = {
        offers: mockOffers,
        currentOffer: oldOffer,
        nearbyOffers: [],
        isLoading: false,
      };

      const result = offersData.reducer(
        initialState,
        fetchOfferById.fulfilled(mockFullOffer, 'request-id', '1', { requestId: 'request-id' })
      );

      expect(result.currentOffer).toEqual(mockFullOffer);
      expect(result.currentOffer?.id).toBe('1');
    });

    it('should not affect other state properties on fulfilled', () => {
      const initialState = {
        offers: mockOffers,
        currentOffer: null,
        nearbyOffers: [{...mockOffer, id: 'nearby'}],
        isLoading: true,
      };

      const result = offersData.reducer(
        initialState,
        fetchOfferById.fulfilled(mockFullOffer, 'request-id', '1', { requestId: 'request-id' })
      );

      expect(result.offers).toEqual(initialState.offers);
      expect(result.nearbyOffers).toEqual(initialState.nearbyOffers);
      expect(result.isLoading).toEqual(initialState.isLoading);
    });
  });

  describe('fetchNearbyOffers', () => {
    it('should set nearbyOffers on fulfilled', () => {
      const initialState = {
        offers: mockOffers,
        currentOffer: mockFullOffer,
        nearbyOffers: [],
        isLoading: false,
      };

      const nearbyOffers = [{
        ...mockOffer,
        id: 'nearby-1',
      }, {
        ...mockOffer,
        id: 'nearby-2',
      }];

      const result = offersData.reducer(
        initialState,
        fetchNearbyOffers.fulfilled(nearbyOffers, 'request-id', '1', { requestId: 'request-id' })
      );

      expect(result).toEqual({
        offers: mockOffers,
        currentOffer: mockFullOffer,
        nearbyOffers,
        isLoading: false,
      });
    });

    it('should replace existing nearbyOffers with new ones on fulfilled', () => {
      const initialState = {
        offers: mockOffers,
        currentOffer: mockFullOffer,
        nearbyOffers: [{...mockOffer, id: 'old-nearby'}],
        isLoading: false,
      };

      const newNearbyOffers = [{...mockOffer, id: 'new-nearby'}];

      const result = offersData.reducer(
        initialState,
        fetchNearbyOffers.fulfilled(newNearbyOffers, 'request-id', '1', { requestId: 'request-id' })
      );

      expect(result.nearbyOffers).toEqual(newNearbyOffers);
      expect(result.nearbyOffers).toHaveLength(1);
      expect(result.nearbyOffers[0].id).toBe('new-nearby');
    });

    it('should not affect other state properties on fulfilled', () => {
      const initialState = {
        offers: mockOffers,
        currentOffer: mockFullOffer,
        nearbyOffers: [],
        isLoading: false,
      };

      const result = offersData.reducer(
        initialState,
        fetchNearbyOffers.fulfilled(
          [{...mockOffer, id: 'nearby'}],
          'request-id',
          '1',
          { requestId: 'request-id' }
        )
      );

      expect(result.offers).toEqual(initialState.offers);
      expect(result.currentOffer).toEqual(initialState.currentOffer);
      expect(result.isLoading).toEqual(initialState.isLoading);
    });
  });
});
