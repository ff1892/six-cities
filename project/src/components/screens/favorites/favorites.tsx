import Header from '../../layout/header/header';
import { useCallback, useEffect } from 'react';
import CardListFavorite from './card-list-favorite/cardlist-favorite';
import Footer from '../../layout/footer/footer';
import { getFavoriteOffers, getLoadedFavoriteOffersStatus } from '../../../store/data-favorites/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavoriteOffersAction } from '../../../store/api-actions';
import NoFavorites from './no-favorites/no-favorites';
import LoadWrapper from '../../layout/loader-wrapper/loader-wrapper';


function Favorites(): JSX.Element {
  const favoriteOffers = useSelector(getFavoriteOffers);
  const isFavoritesLoaded = useSelector(getLoadedFavoriteOffersStatus);
  const hasFavorites = favoriteOffers.length !== 0;
  const availableCities: string[] = [...new Set(favoriteOffers.map((offer) => offer.city.name))];

  const dispatch = useDispatch();
  const fetchFavoriteOffers = useCallback(() => dispatch(fetchFavoriteOffersAction()), [dispatch]);

  useEffect(() => {
    fetchFavoriteOffers();
  }, [fetchFavoriteOffers]);

  return (
    <LoadWrapper isLoad={isFavoritesLoaded}>
      <div
        className={`page ${hasFavorites ? '' : 'page--favorites-empty'}`}
      >
        <Header />
        <main
          className={`page__main page__main--favorites ${hasFavorites ? '' : 'page__main--favorites-empty'}`}
        >
          <div className="page__favorites-container container">
            { hasFavorites
              ?
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
              : <NoFavorites /> }
          </div>
        </main>
        <Footer isContainer={hasFavorites}/>
      </div>
    </LoadWrapper>
  );
}

export default Favorites;
