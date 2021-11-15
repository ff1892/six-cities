import { MouseEvent } from 'react';
import { Offer } from '../../../types/offer';
import { Cards } from '../../../types/cards';
import CardMain from '../card-main/card-main';

type CardsListProps = {
  offers: Offer[],
  onOfferHover: (id: number | null) => void;
  classes: Cards,
}

function CardsList({offers, onOfferHover, classes}: CardsListProps): JSX.Element {


  const handleMouseEnterEvent = (e: MouseEvent<HTMLElement>, id: number) => {
    e.preventDefault();
    onOfferHover(id);
  };

  const handleMouseLeaveEvent = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    onOfferHover(null);
  };

  return (
    <div className={classes.listClass}>
      {
        offers.map((offerValue) =>
          (
            <CardMain
              key={offerValue.id}
              offer={offerValue}
              articleClass={classes.articleClass}
              wrapperClass={classes.wrapperClass}
              onMouseEnter={handleMouseEnterEvent}
              onMouseLeave={handleMouseLeaveEvent}
            />
          ),
        )
      }
    </div>
  );
}

export default CardsList;
