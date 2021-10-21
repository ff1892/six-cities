import {MouseEvent} from 'react';
import {CITIES} from '../../../../const';

type CitiesListProps = {
  selectedCity: string,
  onCityClick: (city: string) => void,
};

function CitiesList({selectedCity, onCityClick}: CitiesListProps): JSX.Element {

  const handleCityClick = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    onCityClick(evt.currentTarget.innerText);
  };

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {
            CITIES.map((value) => (
              <li className="locations__item" key={value}>
                <a
                  className={`locations__item-link tabs__item ${value === selectedCity ? 'tabs__item--active' : ''}`}
                  href="/"
                  onClick={(evt) => handleCityClick(evt)}
                >
                  <span>{value}</span>
                </a>
              </li>),
            )
          }
        </ul>
      </section>
    </div>
  );
}

export default CitiesList;
