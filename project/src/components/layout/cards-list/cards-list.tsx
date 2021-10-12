import Card from '../../layout/card/card';
import { Offer } from '../../../types/offer';

type CardsListProps = {
  offers: Offer[],
}

function CardsList({offers}: CardsListProps): JSX.Element {
  return (
    <>
      {
        offers.map((offerValue) => <Card key={offerValue.id} offer={offerValue} />)
      }
    </>
  );
}

export default CardsList;
