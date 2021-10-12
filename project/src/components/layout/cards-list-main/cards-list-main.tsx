import { useState, MouseEvent} from 'react';
import CardMain from '../card-main/card-main';
import { Offer } from '../../../types/offer';

type CardsListMainProps = {
  offers: Offer[],
}

function CardsListMain({offers}: CardsListMainProps): JSX.Element {
  const [isHovered, setIsHovered] = useState(0);
  return (
    <>
      {
        offers.map((offerValue) =>
          (
            <CardMain
              key={offerValue.id}
              offer={offerValue}
              onMouseEnter={({target}: MouseEvent<HTMLElement>) => {
                setIsHovered(offerValue.id);
              }}
              onMouseLeave={({target}: MouseEvent<HTMLElement>) => {
                setIsHovered(0);
              }}
            />
          ),
        )
      }
    </>
  );
}

export default CardsListMain;
