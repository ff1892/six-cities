import { useState } from 'react';
import Header from '../../layout/header/header';
import CardsList from '../../layout/cards-list/cards-list';
import Map from '../../layout/map/map';
import { Offer } from '../../../types/offer';
import CitiesList from '../../layout/cities-list/cities-list';

const CardClasses = {
  listClass: 'cities__places-list places__list tabs__content',
  articleClass: 'cities__place-card',
  wrapperClass: 'cities__image-wrapper',
};


type MainScreenProps = {
  offers: Offer[],
}

function MainScreen({offers}: MainScreenProps): JSX.Element {

  const [selectedOffer, setSelectedOffer] = useState<number | null>(null);

  const onHoverOffer = (id: number | null) => {
    setSelectedOffer(id);
  };

  return (
    <div className="page page--gray page--main">
      <Header isHeaderNavigation />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">312 places to stay in Amsterdam</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex="0">
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex="0">Popular</li>
                  <li className="places__option" tabIndex="0">Price: low to high</li>
                  <li className="places__option" tabIndex="0">Price: high to low</li>
                  <li className="places__option" tabIndex="0">Top rated first</li>
                </ul>
              </form>
              <CardsList offers={offers} onHoverOffer={onHoverOffer} classes={CardClasses}/>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map offers={offers} selectedOffer={selectedOffer}/>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
