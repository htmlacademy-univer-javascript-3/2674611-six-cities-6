import {Link} from 'react-router-dom';
import {Offer} from '../../types/offer.ts';
import {memo} from 'react';
import {getRatingWidth} from '../../services/utils.ts';

type OfferCardProps = {
  offer: Offer;
  cardType: 'cities' | 'near-places' | 'favorites';
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

function OfferCardComponent(props: OfferCardProps): JSX.Element {
  const offer = props.offer;
  const cardType = props.cardType;

  return (
    <article
      className={`${cardType}__card place-card`}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    >
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${cardType}__image-wrapper place-card__image-wrapper`}>
        <a href="#">
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={cardType === 'favorites' ? 150 : 260}
            height={cardType === 'favorites' ? 110 : 200}
            alt="Place image"
          />
        </a>
      </div>
      <div className={`place-card__info ${cardType === 'favorites' ? 'favorites__card-info' : ''}`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button ${
              offer.isFavorite ? 'place-card__bookmark-button--active' : ''
            }`}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">
              {offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}
            </span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: getRatingWidth(offer.rating)}}></span>
            <span className="visually-hidden">Rating {offer.rating}</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}
export const OfferCard = memo(OfferCardComponent);
export default OfferCard;
