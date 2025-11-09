import {Offers} from '../../types/offer.ts';
import FavoritesCard from '../favorites-card/favorites-card.tsx';

type FavoritesListProps = {
  groupedOffers: Record<string, Offers>;
};

function FavoritesList({ groupedOffers }: FavoritesListProps): JSX.Element {
  return (
    <ul className="favorites__list">
      {Object.entries(groupedOffers).map(([city, cityOffers]) => (
        <li className="favorites__locations-items" key={city}>
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>{city}</span>
              </a>
            </div>
          </div>
          <div className="favorites__places">
            {cityOffers.map((offer) => (
              <article key={offer.id} className="favorites__card place-card">
                <FavoritesCard offer={offer} />
              </article>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default FavoritesList;
