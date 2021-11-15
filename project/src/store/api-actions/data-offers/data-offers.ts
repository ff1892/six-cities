import { adaptOffersGroupToClient } from '../../../services/adapter';
import { loadOffers } from '../../actions';
import { APIRoute, ToastMessages } from '../../../const';
import { ThunkActionResult } from '../../../types/action';
import { OfferResponse } from '../../../types/offer';
import { toast } from 'react-toastify';

export const fetchOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<OfferResponse[]>(APIRoute.Offers);
      const adaptedData = adaptOffersGroupToClient(data);
      dispatch(loadOffers(adaptedData));
    } catch {
      toast(ToastMessages.OffersError);
    }
  };
