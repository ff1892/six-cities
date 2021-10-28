import { useEffect, useState } from 'react';
import Header from '../../layout/header/header';
import FormReview from './form-review/form-review';
import ReviewsList from './reviews-list/reviews-list';
import CardsList from '../../layout/cards-list/cards-list';
import Map from '../../layout/map/map';
import { useParams } from 'react-router';
import { getStarsRatingStyle } from '../../../util';
import { State } from '../../../types/state';
import { ThunkAppDispatch } from '../../../types/action';
import { connect, ConnectedProps } from 'react-redux';
import Loader from '../../layout/loader/loader';
import LoadWrapper from '../../layout/loader-wrapper/loader-wrapper';
import NotFound from '../not-found/not-found';
import { AuthorizationStatus } from '../../../const';

import {
  fetchCurrentOfferAction,
  fetchNearbyOffersAction,
  fetchCurrentOfferCommentsAction
} from '../../../store/api-actions';

const MAX_IMAGES_GALLERY = 6;

const CardClasses = {
  listClass: 'near-places__list places__list',
  articleClass: 'near-places__card',
  wrapperClass: 'near-places__image-wrapper',
};

const mapStateToProps = ({
  currentOffer,
  isCurrentOfferLoaded,
  nearbyOffers,
  isCurrentOfferError,
  currentOfferComments,
  isCommentsLoaded,
  isNearbyOffersLoaded,
  authorizationStatus,
}: State) => ({
  currentOffer,
  isCurrentOfferLoaded,
  isCurrentOfferError,
  currentOfferComments,
  isCommentsLoaded,
  nearbyOffers,
  isNearbyOffersLoaded,
  authorizationStatus,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  fetchCurrentOffer(id: string) {
    dispatch(fetchCurrentOfferAction(id));
  },
  fetchNearbyOffers(id: string) {
    dispatch(fetchNearbyOffersAction(id));
  },
  fetchCurrentOfferComments(id: string) {
    dispatch(fetchCurrentOfferCommentsAction(id));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function Property({
  currentOffer,
  isCurrentOfferLoaded,
  isCurrentOfferError,
  currentOfferComments,
  isCommentsLoaded,
  nearbyOffers,
  isNearbyOffersLoaded,
  authorizationStatus,
  fetchCurrentOffer,
  fetchNearbyOffers,
  fetchCurrentOfferComments,
}: PropsFromRedux): JSX.Element {

  const [selectedOffer, setSelectedOffer] = useState<number | null>(null);

  const { offerId } = useParams<{ offerId: string }>();
  const isAuthorized = authorizationStatus === AuthorizationStatus.Auth;

  useEffect(() => {
    fetchCurrentOffer(offerId);
    fetchNearbyOffers(offerId);
    fetchCurrentOfferComments(offerId);
  }, [fetchCurrentOffer, fetchNearbyOffers, fetchCurrentOfferComments, offerId]);

  const onOfferHover = (id: number | null) => {
    setSelectedOffer(id);
  };

  if (isCurrentOfferError) {
    return <NotFound />;
  }

  if (!currentOffer || !isCurrentOfferLoaded) {
    return <Loader />;
  }

  const {
    images,
    type,
    isPremium,
    title,
    description,
    rating,
    isFavorite,
    bedrooms,
    maxAdults,
    price,
    goods,
    host,
  } = currentOffer;

  const {
    avatarUrl,
    isPro,
    name,
  } = host;

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {
                images.slice(0, MAX_IMAGES_GALLERY).map((image) => (
                  <div className="property__image-wrapper" key={image}>
                    <img
                      className="property__image"
                      src={image}
                      alt={`${type}`}
                    />
                  </div>
                ),
                )
              }
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium &&
                <div className="property__mark">
                  <span>Premium</span>
                </div>}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>
                <button
                  className={
                    isFavorite
                      ? 'property__bookmark-button property__bookmark-button--active button'
                      : 'property__bookmark-button button'
                  }
                  type="button"
                >
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span
                    style={{
                      width: `${getStarsRatingStyle(rating)}`,
                    }}
                  >
                  </span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {`${type[0].toUpperCase()}${type.slice(1)}`}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {
                    goods.map((good) => (
                      <li className="property__inside-item" key={good}>
                        {good}
                      </li>
                    ),
                    )
                  }
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className=
                    {
                      isPro
                        ? 'property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper'
                        : 'property__avatar-wrapper property__avatar-wrapper user__avatar-wrapper'
                    }
                  >
                    <img className="property__avatar user__avatar" src={avatarUrl} width="74" height="74" alt={`${name} avatar`} />
                  </div>
                  <span className="property__user-name">
                    {name}
                  </span>
                  {isPro &&
                  <span className="property__user-status">
                    Pro
                  </span>}
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <LoadWrapper isLoad={isCommentsLoaded}>
                  <ReviewsList reviews={currentOfferComments}/>
                </LoadWrapper>
                {isAuthorized && <FormReview />}
              </section>
            </div>
          </div>
          <LoadWrapper isLoad={isNearbyOffersLoaded}>
            <section className="property__map map"
              style={{
                maxWidth: '1200px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              <Map offers={nearbyOffers} selectedOffer={selectedOffer}/>
            </section>
          </LoadWrapper>
        </section>
        <LoadWrapper isLoad={isNearbyOffersLoaded}>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <CardsList offers={nearbyOffers} onOfferHover={onOfferHover} classes={CardClasses} />
            </section>
          </div>
        </LoadWrapper>
      </main>
    </div>
  );
}

export {Property};
export default connector(Property);
