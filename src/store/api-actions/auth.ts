import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../../types/state.ts';
import {AxiosInstance} from 'axios';
import {requireAuthorization, setUser} from '../action.ts';
import {AuthorizationStatus} from '../../const.ts';
import {AuthData} from '../../types/auth-data.ts';
import {UserData} from '../../types/user-data.ts';
import {saveToken} from '../../services/token.ts';

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<UserData>('/login');
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(setUser({...data, token: undefined}));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>('/login', {email, password});
    saveToken(data.token!);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(setUser({...data, token: undefined}));
  },
);

