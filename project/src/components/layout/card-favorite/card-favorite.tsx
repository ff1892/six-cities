import { MouseEvent } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Offer } from '../../../types/offer';
import { AppRoute, AuthorizationStatus } from '../../../const';
import { getAuthorizationStatus } from '../../../store/reducers/user-data/selectors';
import { switchIsFavoriteAction } from '../../../store/api-actions/data-favorites';

type CardProps = {
  offer: Offer,
}

function CardFavorite({ offer }: CardProps): JSX.Element {

  const authorizationStatus = useSelector(getAuthorizationStatus);
  const dispatch = useDispatch();

  const {
    id,
    title,
    previewImage,
    price,
    isFavorite,
    rating,
    type,
  } = offer;

  const history = useHistory();

  const handleOfferFavoritesClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      history.push(AppRoute.SignIn);
      return;
    }
    const status = Number(!isFavorite);
    dispatch(switchIsFavoriteAction(id, status));
  };

  return (
    <article className="favorites__card place-card">
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={`${AppRoute.Offers}/${id}`}>
          <img className="place-card__image" src={previewImage} width="150" height="110" alt="Place" />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={
              isFavorite
                ? 'place-card__bookmark-button place-card__bookmark-button--active button'
                : 'place-card__bookmark-button button'
            }
            type="button"
            onClick={handleOfferFavoritesClick}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">
              {authorizationStatus ? 'In bookmarks' : 'To bookmarks'}
            </span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span
              style={{
                width: `${(Math.round(rating) * 20).toString()}%`,
              }}
            >
            </span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offers}/${id}`}>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{`${type[0].toUpperCase()}${type.slice(1)}`}</p>
      </div>
    </article>
  );
}

export default CardFavorite;
