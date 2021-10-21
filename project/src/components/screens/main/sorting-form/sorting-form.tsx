import { useState } from 'react';

const sortingTypes = ['Popular', 'Price: low to high', 'Price: high to low', 'Top rated first'];

function SortingForm(): JSX.Element {
  const [isActive, setIsActive] = useState(false);

  // setIsActive((prevState) => prevState = !prevState);

  const handleFormHeaderClick = () => {
    setIsActive((prevState) => !prevState);
  };

  return(
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by {' '}</span>
      <span
        className="places__sorting-type"
        tabIndex="0"
        onClick={() => handleFormHeaderClick()}
      >
        Popular
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${isActive ? 'places__options--opened' : ''}`}
        onClick={() => handleFormHeaderClick()}
      >
        {
          sortingTypes.map((value) => (
            <li
              key={value}
              className="places__option"
              tabIndex="0"
            >
              {value}
            </li>
          ))
        }
        {/* <li className="places__option places__option--active" tabIndex="0">Popular</li> */}
      </ul>
    </form>
  );
}

export default SortingForm;
