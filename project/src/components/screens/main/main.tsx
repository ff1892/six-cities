import { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Header from '../../layout/header/header';
import CitiesList from './cities-list/cities-list';
import SortingForm from './sorting-form/sorting-form';
import CardsList from '../../layout/cards-list/cards-list';
import Map from '../../layout/map/map';
import NoOffersMain from './no-offers-main/no-offers-main';
import { State } from '../../../types/state';
import { changeCity, changeSorting } from '../../../store/action';
import { filterOffersByCity, sortOffers } from '../../../util';
import { ThunkAppDispatch } from '../../../types/action';
import { fetchOffersAction } from '../../../store/api-actions';
import LoadWrapper from '../../layout/loader-wrapper/loader-wrapper';

const CardClasses = {
  listClass: 'cities__places-list places__list tabs__content',
  articleClass: 'cities__place-card',
  wrapperClass: 'cities__image-wrapper',
};

const mapStateToProps = ({
  selectedCity,
  offers,
  currentSorting,
  isOffersLoaded,
}: State) => ({
  selectedCity,
  offers,
  currentSorting,
  isOffersLoaded,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onCityClick(selectedCity: string) {
    dispatch(changeCity(selectedCity));
  },
  onSortingChange(currentSorting: string) {
    dispatch(changeSorting(currentSorting));
  },
  fetchOffers() {
    dispatch(fetchOffersAction());
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function MainScreen({
  offers,
  selectedCity,
  currentSorting,
  isOffersLoaded,
  onCityClick,
  onSortingChange,
  fetchOffers,
}: PropsFromRedux): JSX.Element {

  useEffect(() => {
    fetchOffers();
  }, [fetchOffers]);

  const [selectedOffer, setSelectedOffer] = useState<number | null>(null);

  const onOfferHover = (id: number | null) => {
    setSelectedOffer(id);
  };

  const filteredOffers = filterOffersByCity(offers, selectedCity);
  const sortedOffers = sortOffers(currentSorting, filteredOffers);
  const offersCount = filteredOffers.length;
  const hasOffers = !!filteredOffers.length;

  return (
    <LoadWrapper isLoad={isOffersLoaded}>
      <div className="page page--gray page--main">
        <Header />

        <main className={`page__main page__main--index ${hasOffers ? '' : 'page__main--index-empty'}`}>
          <h1 className="visually-hidden">Cities</h1>
          <CitiesList selectedCity={selectedCity} onCityClick={onCityClick} />
          <div className="cities">
            {
              hasOffers &&
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{offersCount} {offersCount === 1 ? 'place': 'places'} to stay in {selectedCity}</b>
                <SortingForm currentSorting={currentSorting} onSortingChange={onSortingChange}/>
                <CardsList offers={sortedOffers} onOfferHover={onOfferHover} classes={CardClasses}/>
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map offers={filteredOffers} selectedOffer={selectedOffer}/>
                </section>
              </div>
            </div>
            }
            {
              !hasOffers && <NoOffersMain selectedCity={selectedCity} />
            }
          </div>
        </main>
      </div>
    </LoadWrapper>
  );
}

export {MainScreen};
export default connector(MainScreen);
