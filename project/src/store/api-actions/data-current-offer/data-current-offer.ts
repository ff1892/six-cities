import { adaptOfferToClient } from '../../../services/adapter';
import { loadCurrentOffer, loadCurrentOfferError } from '../../actions';
import { APIRoute } from '../../../const';
import { ThunkActionResult } from '../../../types/action';
import { OfferResponse } from '../../../types/offer';


export const fetchCurrentOfferAction = (id: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<OfferResponse>(`${APIRoute.Offers}/${id}`);
      const adaptedData = adaptOfferToClient(data);
      dispatch(loadCurrentOffer(adaptedData));
    } catch {
      dispatch(loadCurrentOfferError());
    }
  };
