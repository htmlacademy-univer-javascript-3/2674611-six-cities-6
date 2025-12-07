import {Location, Offer} from '../../types/offer.ts';
import CitiesOffersList from '../../components/offers-lists/cities-offers-list/cities-offers-list.tsx';
import Map from '../../components/map/map.tsx';
import {useState} from 'react';
import {allCities} from '../../const.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeCity} from '../../store/action.ts';
import Header from '../../components/header/header.tsx';


function MainPage(): JSX.Element {
  const [selectedPoint, serSelectedPoint] = useState<Location | null>(null);

  const dispatch = useAppDispatch();

  const currentCity = useAppSelector((state) => state.city);
  const allOffers = useAppSelector((state) => state.offers);

  const filteredOffers = allOffers.filter((offer: Offer) => (offer.city.name === currentCity));
  const offersCount = filteredOffers.length;

  return (
    <div className="page page--gray page--main">
      <Header/>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {allCities.map((city) => (
                <li key={city} className="locations__item">
                  <a
                    className={`locations__item-link tabs__item ${currentCity === city ? 'tabs__item--active' : ''}`}
                    href="#"
                    onClick={(evt) => {
                      evt.preventDefault();
                      dispatch(changeCity(city));
                    }}
                  >
                    <span>{city}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offersCount} places to stay in {currentCity}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <CitiesOffersList offers={filteredOffers} onActiveOfferChange={
                (offer) => serSelectedPoint(offer ? offer.location : null)
              }
              />
            </section>
            <div className="cities__right-section">
              <Map locations={filteredOffers.map((of) => of.location)} selectedPoint={selectedPoint}/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
