import { adaptOffersGroupToClient } from '../../services/adapter';
import { loadNearbyOffers } from '../actions';
import { APIRoute, ToastMessages} from '../../const';
import { ThunkActionResult } from '../../types/action';
import { OfferResponse } from '../../types/offer';
import { toast } from 'react-toastify';

export const fetchNearbyOffersAction = (id: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<OfferResponse[]>(`${APIRoute.Offers}/${id}${APIRoute.Nearby}`);
      const adaptedData = adaptOffersGroupToClient(data);
      dispatch(loadNearbyOffers(adaptedData));
    } catch {
      toast.info(ToastMessages.NearbyOffersError);
    }
  };

