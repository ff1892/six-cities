import { Offer } from '../../../types/offer';
import CardFavorite from '../card-favorite/card-favorite';

type CardsListFavoriteProps = {
  offers: Offer[],
  city: string,
}

function CardsListFavorite({ offers, city }: CardsListFavoriteProps): JSX.Element {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="/">
            <span>{city}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {
          offers.map((offerValue) => <CardFavorite key={offerValue.id} offer={offerValue} />)
        }
      </div>
    </li>
  );
}

export default CardsListFavorite;
