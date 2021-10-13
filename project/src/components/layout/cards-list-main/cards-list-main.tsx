import { useState, MouseEvent} from 'react';
import CardMain from '../card-main/card-main';
import { Offer } from '../../../types/offer';

type CardsListMainProps = {
  offers: Offer[],
}

function CardsListMain({offers}: CardsListMainProps): JSX.Element {
  const [isHovered, setIsHovered] = useState(0);

  const handleMouseEnterEvent = (e: MouseEvent<HTMLElement>, id: number) => {
    e.preventDefault();
    setIsHovered(isHovered * 0 + id);
  };

  const handleMouseLeaveEvent = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsHovered(0);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offers.map((offerValue) =>
          (
            <CardMain
              key={offerValue.id}
              offer={offerValue}
              onMouseEnter={(e) => handleMouseEnterEvent(e, offerValue.id)}
              onMouseLeave={(e) => handleMouseLeaveEvent(e)}
            />
          ),
        )
      }
    </div>
  );
}

export default CardsListMain;
