import OfferCard from '../../offer-card/offer-card.tsx';
import {Offers} from '../../../types/offer.ts';

type OffersListProps = {
  offers: Offers;
}

function NearPlacesOffersList({ offers}: OffersListProps): JSX.Element {
  return (
    <div className={'near-places__list places__list'}>
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          cardType={'near-places'}
        />
      ))}
    </div>
  );
}

export default NearPlacesOffersList;
