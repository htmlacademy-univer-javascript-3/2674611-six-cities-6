import {createSlice} from '@reduxjs/toolkit';
import {FullOffer, Offers} from '../../types/offer.ts';
import {fetchNearbyOffers, fetchOfferById, fetchOffers} from '../api-actions/offers.ts';
import {NameSpace} from '../../const.ts';

type OffersDataState = {
  offers: Offers;
  currentOffer: FullOffer | null;
  nearbyOffers: Offers;
  isLoading: boolean;
}

const initialState: OffersDataState = {
  offers: [],
  currentOffer: null,
  nearbyOffers: [],
  isLoading: false,
};

export const offersData = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchOffers.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchOfferById.fulfilled, (state, action) => {
        state.currentOffer = action.payload;
      })
      .addCase(fetchNearbyOffers.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
      });
  },
});

