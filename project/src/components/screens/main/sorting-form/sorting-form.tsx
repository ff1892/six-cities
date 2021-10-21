import { useState } from 'react';
import { SortingTypes } from '../../../../const';

type SortingFormProps = {
  currentSorting: string,
  onSortingChange: (sortingType: string) => void,
};

function SortingForm({currentSorting, onSortingChange}: SortingFormProps ): JSX.Element {
  const [isActive, setIsActive] = useState(false);

  const handleFormHeaderClick = (): void => {
    setIsActive((prevState) => !prevState);
  };

  const handleFormItemClick = (sortingType: string) : void => {
    setIsActive((prevState) => !prevState);
    onSortingChange(sortingType);
  };

  return(
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by {' '}</span>
      <span
        className="places__sorting-type"
        tabIndex="0"
        onClick={() => handleFormHeaderClick()}
      >
        {currentSorting}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isActive ? 'places__options--opened' : ''}`}>
        {
          SortingTypes.map((value) => (
            <li
              key={value}
              className={`places__option ${currentSorting === value ? 'places__option--active' : ''}`}
              tabIndex="0"
              onClick={(evt) => handleFormItemClick(value)}
            >
              {value}
            </li>
          ))
        }
      </ul>
    </form>
  );
}

export default SortingForm;
