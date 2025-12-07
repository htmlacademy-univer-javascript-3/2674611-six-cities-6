import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {FullOffer, Offers} from '../../types/offer.ts';
import {AppDispatch, State} from '../../types/state.ts';

export const fetchOffers = createAsyncThunk<
  Offers,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('offers/fetchOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offers>('/offers');
    return data;
  });

export const fetchOfferById = createAsyncThunk<
  FullOffer,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('offers/fetchOfferById',
  async (offerId, {extra: api}) => {
    const {data} = await api.get<FullOffer>(`/offers/${offerId}`);
    return data;
  });

export const fetchNearbyOffers = createAsyncThunk<
  Offers,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('offers/fetchNearbyOffers',
  async (offerId, {extra: api}) => {
    const {data} = await api.get<Offers>(`/offers/${offerId}/nearby`);
    return data;
  });


