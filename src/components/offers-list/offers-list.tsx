import OfferCard from '../offer-card/offer-card.tsx';
import {Offer, Offers} from '../../types/offer.ts';
import {useState} from 'react';

type OffersListProps = {
  offers: Offers;
}

function OffersList({ offers }: OffersListProps): JSX.Element {
  const [activeOffer, setActiveOffer] = useState<Offer | null>(null);
  const handleMouseEnter = (offer: Offer) => {
    setActiveOffer(offer);
  };

  const handleMouseLeave = () => {
    setActiveOffer(null);
  };
  return (
    <div className={'cities__places-list places__list tabs__content'}>
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          onMouseEnter={() => handleMouseEnter(offer)}
          onMouseLeave={handleMouseLeave}
        />
      ))}
    </div>
  );
}

export default OffersList;
