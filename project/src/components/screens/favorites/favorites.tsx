import Header from '../../layout/header/header';
import { Offer } from '../../../types/offer';
import CardListFavorite from './card-list-favorite/cardlist-favorite';
import Footer from '../../layout/footer/footer';

type FavoriteScreenProps = {
  offers: Offer[],
}

function Favorites({ offers}: FavoriteScreenProps): JSX.Element {
  const availableCities: string[] = [...new Set(offers.map((offer) => offer.city.name))];
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);

  return (
    <div className="page">
      <Header isHeaderNavigation />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {
                availableCities.map((currentCity) =>
                  (
                    <CardListFavorite
                      offers={favoriteOffers.filter((offer) =>
                        offer.city.name === currentCity)}
                      key={currentCity}
                      city={currentCity}
                    />
                  ),
                )
              }
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Favorites;
