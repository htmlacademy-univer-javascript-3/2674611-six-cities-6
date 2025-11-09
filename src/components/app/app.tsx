import {BrowserRouter, Route, Routes} from 'react-router-dom';
import MainPage from '../../pages/main/main-page.tsx';
import LoginPage from '../../pages/login/login-page.tsx';
import OfferPage from '../../pages/offer/offer-page.tsx';
import FavoritesPage from '../../pages/favorites/favorites-page.tsx';
import NotFoundPage from '../../pages/not-found/not-found-page.tsx';
import PrivateRoute from '../private-route/private-route.tsx';
import {Offers} from '../../types/offer.ts';

type AppProps = {
  offersCount: number;
  offers: Offers;
}

function App({offersCount, offers}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage offersCount={offersCount} offers={offers}/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/offer/:id" element={<OfferPage offer={offers[0]} otherOffers={offers}/>}/>
        <Route
          path="/favorites"
          element={
            <PrivateRoute isAuthorized>
              <FavoritesPage offers={offers}/>
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
