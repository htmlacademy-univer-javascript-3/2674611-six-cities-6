import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import {PayloadAction, ThunkDispatch} from '@reduxjs/toolkit';
import { State } from '../../types/state';
import {APIRoute, AuthorizationStatus} from '../../const';
import * as tokenStorage from '../../services/token';
import {checkAuthAction, loginAction} from './auth.ts';
import {UserData} from '../../types/user-data.ts';
import {AuthData} from '../../types/auth-data.ts';


const extractActionsTypes = (actions: Action<string>[]): string[] =>
  actions.map(({ type }) => type);

const mockUserData: UserData = {
  email: 'test@test.com',
  token: 'secret-token',
  name: 'Test User',
  avatarUrl: 'https://url-to-image/avatar.png',
  isPro: false
};

const mockAuthData: AuthData = {
  login: 'test@test.com',
  password: 'password123'
};

type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action<string>>;

describe('Async actions for user', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];

  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      USER: {
        userData: null,
        authorizationStatus: AuthorizationStatus.Unknown
      }
    });
    mockAxiosAdapter.reset();
  });

  describe('checkAuthAction', () => {
    it('should dispatch pending and fulfilled when check auth is successful', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200, mockUserData);

      await store.dispatch(checkAuthAction());

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.fulfilled.type,
      ]);
    });

    it('should dispatch pending and rejected when server response 401', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(401);

      await store.dispatch(checkAuthAction());

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type,
      ]);
    });

    it('should return user data without token on success', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200, mockUserData);

      await store.dispatch(checkAuthAction());

      const actions = store.getActions();
      const fulfilledAction = actions.find((action) => action.type === checkAuthAction.fulfilled.type) as PayloadAction<UserData>;
      expect(fulfilledAction?.payload).toEqual({
        email: mockUserData.email,
        name: mockUserData.name,
        avatarUrl: mockUserData.avatarUrl,
        isPro: mockUserData.isPro
      });
      expect(fulfilledAction?.payload.token).toBeUndefined();
    });
  });

  describe('loginAction', () => {
    it('should dispatch pending and fulfilled when login is successful', async () => {
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, mockUserData);

      await store.dispatch(loginAction(mockAuthData));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        loginAction.fulfilled.type,
      ]);
    });

    it('should call saveToken with the received token', async () => {
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, mockUserData);

      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

      await store.dispatch(loginAction(mockAuthData));

      expect(mockSaveToken).toHaveBeenCalledTimes(1);
      expect(mockSaveToken).toHaveBeenCalledWith(mockUserData.token);

      mockSaveToken.mockRestore();
    });

    it('should dispatch pending and rejected when login fails', async () => {
      mockAxiosAdapter.onPost(APIRoute.Login).reply(400);

      await store.dispatch(loginAction(mockAuthData));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        loginAction.rejected.type,
      ]);
    });

    it('should not call saveToken when login fails', async () => {
      mockAxiosAdapter.onPost(APIRoute.Login).reply(400);

      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

      await store.dispatch(loginAction(mockAuthData));

      expect(mockSaveToken).not.toHaveBeenCalled();

      mockSaveToken.mockRestore();
    });

    it('should make correct API call with email and password', async () => {
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, mockUserData);

      await store.dispatch(loginAction(mockAuthData));

      expect(mockAxiosAdapter.history.post.length).toBe(1);
      expect(mockAxiosAdapter.history.post[0].data).toBe(JSON.stringify({
        email: mockAuthData.login,
        password: mockAuthData.password
      }));
    });

    it('should return user data without token on successful login', async () => {
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, mockUserData);

      await store.dispatch(loginAction(mockAuthData));

      const actions = store.getActions();

      const fulfilledAction = actions.find(
        (action) => action.type === loginAction.fulfilled.type
      ) as PayloadAction<UserData>;

      expect(fulfilledAction?.payload).toEqual({
        email: mockUserData.email,
        name: mockUserData.name,
        avatarUrl: mockUserData.avatarUrl,
        isPro: mockUserData.isPro
      });
      expect(fulfilledAction?.payload.token).toBeUndefined();
    });
  });

});

