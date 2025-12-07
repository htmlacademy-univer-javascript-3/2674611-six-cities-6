import {createReducer} from '@reduxjs/toolkit';

import {FullOffer, Offers} from '../types/offer.ts';
import {
  changeCity, logout,
  requireAuthorization,
  setCurrentOffer,
  setOffers,
  setOffersLoadingStatus,
  setUser
} from './action.ts';
import {AuthorizationStatus} from '../const.ts';
import {UserData} from '../types/user-data.ts';
import {dropToken} from '../services/token.ts';

export interface AppState {
  city: string;
  isLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  offers: Offers;
  currentOffer?: FullOffer;
  userData?: UserData;
}

const initialState: AppState = {
  city: 'Paris',
  isLoading: false,
  authorizationStatus: AuthorizationStatus.NoAuth,
  offers: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersLoadingStatus, (state, action) => {
      state.isLoading = action.payload;
    })
    .addCase(setCurrentOffer, (state, action) => {
      state.currentOffer = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUser, (state, action) => {
      state.userData = action.payload;
    })
    .addCase(logout, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      dropToken();
    });
});

export {reducer};
