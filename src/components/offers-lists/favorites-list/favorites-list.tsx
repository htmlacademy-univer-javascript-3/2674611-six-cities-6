import {Offers} from '../../../types/offer.ts';
import OfferCard from '../../offer-card/offer-card.tsx';

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
              <OfferCard
                key={offer.id}
                offer={offer}
                cardType={'favorites'}
              />
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default FavoritesList;
