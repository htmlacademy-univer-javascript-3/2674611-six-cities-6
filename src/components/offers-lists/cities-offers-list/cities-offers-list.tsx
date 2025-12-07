import OfferCard from '../../offer-card/offer-card.tsx';
import {Offer, Offers} from '../../../types/offer.ts';

type OffersListProps = {
  offers: Offers;
  onActiveOfferChange: (offer: Offer | null) => void;
}

function CitiesOffersList({ offers, onActiveOfferChange }: OffersListProps): JSX.Element {
  const handleMouseEnter = (offer: Offer) => {
    onActiveOfferChange(offer);
  };

  const handleMouseLeave = () => {
    onActiveOfferChange(null);
  };
  return (
    <div className={'cities__places-list places__list tabs__content'}>
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          cardType={'cities'}
          onMouseEnter={() => handleMouseEnter(offer)}
          onMouseLeave={handleMouseLeave}
        />
      ))}
    </div>
  );
}

export default CitiesOffersList;
