// store/user-process/user-process.slice.test.ts
import { AuthorizationStatus } from '../../const';
import { checkAuthAction, loginAction } from '../api-actions/auth.ts';
import {logout, userProcess} from './user-process.ts';
import {UserData} from '../../types/user-data.ts';

describe('UserProcess Slice', () => {
  const mockUserData: UserData = {
    name: 'Oliver Conner',
    avatarUrl: 'https://url-to-image/image.png',
    isPro: false,
    email: 'Oliver.conner@gmail.com',
    token: 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20='
  };

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userData: null
    };

    const result = userProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "Auth" with user data on "checkAuthAction.fulfilled"', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      userData: null
    };

    const result = userProcess.reducer(
      initialState,
      checkAuthAction.fulfilled(mockUserData, '', undefined)
    );

    expect(result).toEqual({
      authorizationStatus: AuthorizationStatus.Auth,
      userData: mockUserData
    });
  });

  it('should set "NoAuth" and clear user data on "checkAuthAction.rejected"', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Auth,
      userData: mockUserData
    };

    const result = userProcess.reducer(
      initialState,
      checkAuthAction.rejected(new Error('401'), '', undefined)
    );

    expect(result).toEqual({
      authorizationStatus: AuthorizationStatus.NoAuth,
      userData: null
    });
  });

  it('should set "Auth" with user data on "loginAction.fulfilled"', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      userData: null
    };

    const result = userProcess.reducer(
      initialState,
      loginAction.fulfilled(mockUserData, '', {
        login: 'Oliver.conner@gmail.com',
        password: '123456'
      })
    );

    expect(result).toEqual({
      authorizationStatus: AuthorizationStatus.Auth,
      userData: mockUserData
    });
  });

  it('should set "NoAuth" and clear user data on "loginAction.rejected"', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Auth,
      userData: mockUserData
    };

    const result = userProcess.reducer(
      initialState,
      loginAction.rejected(new Error('401'), '', {
        login: 'Oliver.conner@gmail.com',
        password: 'wrong'
      })
    );

    expect(result).toEqual({
      authorizationStatus: AuthorizationStatus.NoAuth,
      userData: null
    });
  });

  it('should set "NoAuth" and clear user data on "logout" action', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Auth,
      userData: mockUserData
    };

    const result = userProcess.reducer(initialState, logout());

    expect(result).toEqual({
      authorizationStatus: AuthorizationStatus.NoAuth,
      userData: null
    });
  });

  it('should not change state for unknown action', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Auth,
      userData: mockUserData
    };

    const unknownAction = {
      type: 'UNKNOWN_ACTION',
      payload: undefined
    };

    const result = userProcess.reducer(initialState, unknownAction);

    expect(result).toEqual(initialState);
  });
  describe('logout action', () => {
    it('should reset state to NoAuth and null userData', () => {
      const initialState = {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: mockUserData,
      };

      const result = userProcess.reducer(initialState, userProcess.actions.logout());

      expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
      expect(result.userData).toBeNull();
    });

    it('should work from any authorization status', () => {
      const initialState = {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: mockUserData,
      };

      const result = userProcess.reducer(initialState, userProcess.actions.logout());

      expect(result).toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null,
      });
    });
  });
});
