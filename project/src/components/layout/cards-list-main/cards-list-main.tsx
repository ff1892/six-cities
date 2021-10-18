import { MouseEvent } from 'react';
import CardMain from '../card-main/card-main';
import { Offer } from '../../../types/offer';

type CardsListMainProps = {
  offers: Offer[],
  onHoverOffer: (id: number | null) => void;
}

function CardsListMain({offers, onHoverOffer}: CardsListMainProps): JSX.Element {


  const handleMouseEnterEvent = (e: MouseEvent<HTMLElement>, id: number) => {
    e.preventDefault();
    onHoverOffer(id);
  };

  const handleMouseLeaveEvent = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    onHoverOffer(null);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offers.map((offerValue) =>
          (
            <CardMain
              key={offerValue.id}
              offer={offerValue}
              onMouseEnter={handleMouseEnterEvent}
              onMouseLeave={handleMouseLeaveEvent}
            />
          ),
        )
      }
    </div>
  );
}

export default CardsListMain;
