import { CITIES } from '../../../../const';
import CityTab from '../../../layout/city-tab/city-tab';

type CitiesListProps = {
  selectedCity: string,
  onCityClick: (city: string) => void,
};

function CitiesList({selectedCity, onCityClick}: CitiesListProps): JSX.Element {

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {
            CITIES.map((value) => (
              <li className="locations__item" key={value}>
                <CityTab
                  selectedCity={selectedCity}
                  onCityClick={onCityClick}
                  city={value}
                />
              </li>),
            )
          }
        </ul>
      </section>
    </div>
  );
}

export default CitiesList;
