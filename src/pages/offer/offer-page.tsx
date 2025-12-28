import ReviewForm from '../../components/review-form/review-form.tsx';
import Map from '../../components/map/map.tsx';
import NearPlacesOffersList from '../../components/offers-lists/near-places-offers-list/near-places-offers-list.tsx';
import {useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {useEffect} from 'react';
import {fetchNearbyOffers, fetchOfferById} from '../../store/api-actions/offers.ts';
import LoadingScreen from '../../components/loading-screen/loading-screen.tsx';
import Header from '../../components/header/header.tsx';
import {NameSpace} from '../../const.ts';
import ReviewList from '../../components/review-list/review-list.tsx';
import {fetchReviews} from '../../store/api-actions/review.ts';

function OfferPage(): JSX.Element {
  const {id} = useParams();
  const dispatch = useAppDispatch();

  const offer = useAppSelector((state) => state[NameSpace.Offers].currentOffer);
  const nearbyOffers = useAppSelector((state) => state[NameSpace.Offers].offers);
  const isOfferLoading = useAppSelector((state) => state[NameSpace.Offers].isLoading);

  const reviews = useAppSelector((state) => state[NameSpace.Reviews].reviews);

  useEffect(() => {
    if (id && (!offer || offer.id !== id)) {
      dispatch(fetchOfferById(id));
      dispatch(fetchNearbyOffers(id));
      window.scrollTo(0, 0);
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id) {
      dispatch(fetchReviews(id));
    }
  }, [dispatch, id]);

  if (isOfferLoading) {
    return <LoadingScreen/>;
  }

  if (!offer) {
    return <div>Offer not found</div>;
  }

  return (
    <div className="page">
      <Header/>
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {offer.images.map((image) => (
                <div className="offer__image-wrapper" key={image}>
                  <img className="offer__image" src={image} alt="Photo studio"/>
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {offer.title}
                </h1>
                <button
                  className={`offer__bookmark-button button ${offer.isFavorite ? 'offer__bookmark-button--active' : ''}`}
                  type="button"
                >
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">
                    {offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}
                  </span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: `${(offer.rating / 5) * 100}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {offer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offer.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {offer.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {offer.goods.map((good) => (
                    <li className="offer__inside-item" key={good}>
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={`offer__avatar-wrapper
                  ${offer.host.isPro ? 'offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}
                  >
                    <img className="offer__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">
                    {offer.host.name}
                  </span>
                  <span className="offer__user-status">
                    {offer.host.isPro ? 'Pro' : ''}
                  </span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {offer.description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
                <ReviewList reviews={reviews}/>
                <ReviewForm offerId={id!}/>
              </section>
            </div>
          </div>
          <Map
            locations={nearbyOffers.map((of) => of.location)}
            selectedPoint={null}
            mapType={'offer'}
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <NearPlacesOffersList
              offers={nearbyOffers}
            />
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
