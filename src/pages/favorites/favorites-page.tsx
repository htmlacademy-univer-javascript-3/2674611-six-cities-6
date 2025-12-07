import {Offers} from '../../types/offer.ts';
import FavoritesList from '../../components/offers-lists/favorites-list/favorites-list.tsx';
import Header from '../../components/header/header.tsx';
import {useMemo} from 'react';
import {useAppSelector} from '../../hooks';
import {NameSpace} from '../../const.ts';

function Favorites(): JSX.Element {
  const allOffers = useAppSelector((state) => state[NameSpace.Offers].offers);

  const favoriteOffers = useMemo(() =>
    allOffers.filter((offer) => offer.isFavorite),
  [allOffers]
  );

  const groupedOffers = useMemo(() => favoriteOffers.reduce<Record<string, Offers>>((acc, offer) => {
    const cityName = offer.city.name;
    if (!acc[cityName]) {
      acc[cityName] = [];
    }
    acc[cityName].push(offer);
    return acc;
  }, {}), [favoriteOffers]);

  const hasFavorites = favoriteOffers.length > 0;

  return (
    <div className="page">
      <Header/>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {hasFavorites ? (
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <FavoritesList groupedOffers={groupedOffers}/>
            </section>
          ) : (
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">
                  Save properties to narrow down search or plan your future trips.
                </p>
              </div>
            </section>
          )}
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </div>
  );
}

export default Favorites;
