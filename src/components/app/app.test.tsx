import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import App from './app';
import {AuthorizationStatus, NameSpace} from '../../const';
import React from 'react';

vi.mock('../../pages/main/main-page', () => ({ default: () => <div>MainPage</div> }));
vi.mock('../../pages/login/login-page', () => ({ default: () => <div>LoginPage</div> }));
vi.mock('../../pages/offer/offer-page', () => ({ default: () => <div>OfferPage</div> }));
vi.mock('../../pages/favorites/favorites-page', () => ({ default: () => <div>FavoritesPage</div> }));
vi.mock('../../pages/not-found/not-found-page', () => ({ default: () => <div>NotFoundPage</div> }));
vi.mock('../loading-screen/loading-screen', () => ({ default: () => <div>LoadingScreen</div> }));
vi.mock('../private-route/private-route', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual as object,
    BrowserRouter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  };
});

const mockStore = configureMockStore();

describe('App Routing', () => {
  const renderApp = (authStatus: AuthorizationStatus, isLoading = false, initialRoute = '/') => {
    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: authStatus,
        userData: null
      },
      [NameSpace.Offers]: {
        offers: [],
        currentOffer: null,
        nearbyOffers: [],
        isLoading
      },
      [NameSpace.Other]: {}, // если есть
    });

    const router = createMemoryRouter([{ path: '*', element: <App /> }], {
      initialEntries: [initialRoute],
    });

    return render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );
  };

  it('should show MainPage on "/"', () => {
    renderApp(AuthorizationStatus.Auth, false, '/');
    expect(screen.getByText('MainPage')).toBeInTheDocument();
  });

  it('should show LoginPage on "/login"', () => {
    renderApp(AuthorizationStatus.NoAuth, false, '/login');
    expect(screen.getByText('LoginPage')).toBeInTheDocument();
  });

  it('should show OfferPage on "/offer/:id"', () => {
    renderApp(AuthorizationStatus.Auth, false, '/offer/123');
    expect(screen.getByText('OfferPage')).toBeInTheDocument();
  });

  it('should show FavoritesPage on "/favorites"', () => {
    renderApp(AuthorizationStatus.Auth, false, '/favorites');
    expect(screen.getByText('FavoritesPage')).toBeInTheDocument();
  });


  it('should show NotFoundPage on unknown route', () => {
    renderApp(AuthorizationStatus.Auth, false, '/unknown');
    expect(screen.getByText('NotFoundPage')).toBeInTheDocument();
  });

  it('should show LoadingScreen when loading', () => {
    renderApp(AuthorizationStatus.Auth, true, '/');
    expect(screen.getByText('LoadingScreen')).toBeInTheDocument();
  });

  it('should show LoadingScreen when auth unknown', () => {
    renderApp(AuthorizationStatus.Unknown, false, '/');
    expect(screen.getByText('LoadingScreen')).toBeInTheDocument();
  });
});
