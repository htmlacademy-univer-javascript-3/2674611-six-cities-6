import {createSlice} from '@reduxjs/toolkit';
import {AuthorizationStatus, NameSpace} from '../../const';
import {UserData} from '../../types/user-data';
import {checkAuthAction, loginAction} from '../api-actions/auth.ts';
import {dropToken} from '../../services/token.ts';

type UserProcessState = {
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
}

const initialState: UserProcessState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: null,
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    logout: (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      state.userData = null;
      dropToken();
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.userData = null;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(loginAction.rejected, (state) => {
        state.userData = null;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  },
});

export const {logout} = userProcess.actions;
