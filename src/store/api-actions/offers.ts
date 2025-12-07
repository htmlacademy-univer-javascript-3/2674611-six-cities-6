import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {FullOffer, Offers} from '../../types/offer.ts';
import {AppDispatch, State} from '../../types/state.ts';
import {setCurrentOffer, setOffers, setOffersLoadingStatus} from '../action.ts';

export const fetchOffers = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('offers/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersLoadingStatus(true));
    const {data} = await api.get<Offers>('/offers');
    dispatch(setOffersLoadingStatus(false));
    dispatch(setOffers(data));
  });

export const fetchOfferById = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('offers/fetchOffers',
  async (offerId, {dispatch, extra: api}) => {
    dispatch(setOffersLoadingStatus(true));
    const {data} = await api.get<FullOffer>(`/offers/${offerId}`);
    dispatch(setOffersLoadingStatus(false));
    dispatch(setCurrentOffer(data));
  });

export const fetchNearbyOffers = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('offers/fetchOffers',
  async (offerId, {dispatch, extra: api}) => {
    dispatch(setOffersLoadingStatus(true));
    const {data} = await api.get<Offers>(`/offers/${offerId}/nearby`);
    dispatch(setOffersLoadingStatus(false));
    dispatch(setOffers(data));
  });


