// import { useState } from 'react';
import { CITIES } from '../../../const';

function CitiesList(): JSX.Element {

  // const [selectedCity, selectedCity] = useState('Amsterdam');
  const selectedCity = 'Amsterdam';

  return (
    <ul className="locations__list tabs__list">
      {
        CITIES.map((value) => (
          <li className="locations__item" key={value}>
            <a
              className={`locations__item-link tabs__item ${value === selectedCity ? 'tabs__item--active' : ''}`}
              href="/"
            >
              <span>{value}</span>
            </a>
          </li>),
        )
      }
    </ul>
  );
}

export default CitiesList;
