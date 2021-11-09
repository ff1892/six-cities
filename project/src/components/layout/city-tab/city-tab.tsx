import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const';

type CityTabProps = {
  selectedView?: boolean;
  city: string;
  selectedCity: string;
  onCityClick: (city: string) => void;
};

function CityTab ({selectedView=false, city, selectedCity, onCityClick}: CityTabProps): JSX.Element {

  const handleCityClick = (evt: MouseEvent<HTMLElement>) => {
    onCityClick(evt.currentTarget.innerText);
  };

  return (
    <Link to={AppRoute.Main}
      className={`locations__item-link tabs__item ${city === selectedCity || selectedView ? 'tabs__item--active' : ''}`}
      onClick={handleCityClick}
    >
      <span>{city}</span>
    </Link>
  );
}

export default CityTab;
