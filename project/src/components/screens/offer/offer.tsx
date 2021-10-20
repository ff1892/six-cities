import { useState } from 'react';
import Header from '../../layout/header/header';
import FormReview from './form-review/form-review';
import ReviewsList from './reviews-list/reviews-list';
import CardsList from '../../layout/cards-list/cards-list';
import Map from '../../layout/map/map';
import { comments } from '../../../mock/comments';
import { Offer } from '../../../types/offer';
import { useParams } from 'react-router';
import { getStarsRatingStyle } from '../../../util';

type OfferType = {
  offers: Offer[];
};

const MAX_IMAGES_GALLERY = 6;

const CardClasses = {
  listClass: 'near-places__list places__list',
  articleClass: 'near-places__card',
  wrapperClass: 'near-places__image-wrapper',
};

function Property ({offers}: OfferType): JSX.Element {

  const { offerId } = useParams<{ offerId: string }>();
  const currentOffer = offers.find((offer) => offerId === offer.id.toString()) as Offer;
  const offersNearby = offers.filter((offer) => currentOffer.id !== offer.id);

  const [selectedOffer, setSelectedOffer] = useState<number | null>(currentOffer.id);

  const onHoverOffer = (id: number | null) => {
    setSelectedOffer(id);
  };

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
      <Header isHeaderNavigation />

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
                <ReviewsList reviews={comments}/>
                <FormReview />
              </section>
            </div>
          </div>
          <section className="property__map map"
            style={{
              maxWidth: '1200px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <Map offers={offersNearby} selectedOffer={selectedOffer}/>
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <CardsList offers={offersNearby} onHoverOffer={onHoverOffer} classes={CardClasses} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default Property;
