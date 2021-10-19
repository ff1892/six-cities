import { MouseEvent } from 'react';
import CardMain from '../card/card';
import { Offer } from '../../../types/offer';
import { Cards } from '../../../types/cards';

type CardsListProps = {
  offers: Offer[],
  onHoverOffer: (id: number | null) => void;
  classes: Cards,
}

function CardsList({offers, onHoverOffer, classes}: CardsListProps): JSX.Element {


  const handleMouseEnterEvent = (e: MouseEvent<HTMLElement>, id: number) => {
    e.preventDefault();
    onHoverOffer(id);
  };

  const handleMouseLeaveEvent = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    onHoverOffer(null);
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
