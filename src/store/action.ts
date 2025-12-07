import {createAction} from '@reduxjs/toolkit';
import {FullOffer, Offers} from '../types/offer.ts';
import {AuthorizationStatus} from '../const.ts';
import {UserData} from '../types/user-data.ts';

export const changeCity = createAction<string>('city/change');
export const setOffers = createAction<Offers>('offers/set');
export const setCurrentOffer = createAction<FullOffer>('offers/setCurrent');
export const setOffersLoadingStatus = createAction<boolean>('data/setOffersLoadingStatus');
export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
export const setUser = createAction<UserData>('user/setUser');
export const logout = createAction<void>('user/logout');

