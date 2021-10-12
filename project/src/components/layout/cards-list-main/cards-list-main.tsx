import CardMain from '../card-main/card-main';
import { Offer } from '../../../types/offer';

type CardsListMainProps = {
  offers: Offer[],
}

function CardsListMain({offers}: CardsListMainProps): JSX.Element {
  return (
    <>
      {
        offers.map((offerValue) => <CardMain key={offerValue.id} offer={offerValue} />)
      }
    </>
  );
}

export default CardsListMain;
