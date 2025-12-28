import {Location, Offer} from '../../types/offer.ts';
import CitiesOffersList from '../../components/offers-lists/cities-offers-list/cities-offers-list.tsx';
import Map from '../../components/map/map.tsx';
import {useState} from 'react';
import {allCities, NameSpace} from '../../const.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeCity} from '../../store/action.ts';
import Header from '../../components/header/header.tsx';
import SortVariants from '../../components/sort-variants/sort-variants.tsx';
import {getDefaultSortName, offerSortingsMap} from '../../services/offers-sort.ts';


function MainPage(): JSX.Element {
  const [selectedPoint, serSelectedPoint] = useState<Location | null>(null);
  const [currentSort, setCurrentSort] = useState(getDefaultSortName());

  const dispatch = useAppDispatch();

  const currentCity = useAppSelector((state) => state[NameSpace.Other].city);
  const allOffers = useAppSelector((state) => state[NameSpace.Offers].offers);

  const filteredOffers = allOffers.filter((offer: Offer) => (offer.city.name === currentCity));
  const offersCount = filteredOffers.length;

  const sortedOffers = offerSortingsMap.has(currentSort)
    ? offerSortingsMap.get(currentSort)!(filteredOffers)
    : filteredOffers;
  const onSortChange = (sortName: string) => {
    setCurrentSort(sortName);
  };

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
              <SortVariants
                sortNames={Array.from(offerSortingsMap.keys())}
                onSortChange={onSortChange}
              />
              <CitiesOffersList offers={sortedOffers} onActiveOfferChange={
                (offer) => serSelectedPoint(offer ? offer.location : null)
              }
              />
            </section>
            <div className="cities__right-section">
              <Map locations={sortedOffers.map((of) => of.location)} selectedPoint={selectedPoint}/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
