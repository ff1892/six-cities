import { adaptOfferToClient, adaptOffersGroupToClient } from '../../services/adapter';
import { loadFavoriteOffers, updateOffer } from '../actions';
import { APIRoute } from '../../const';
import { ThunkActionResult } from '../../types/action';
import { OfferResponse } from '../../types/offer';

export const fetchFavoriteOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<OfferResponse[]>(APIRoute.Favorite);
    const adaptedData = adaptOffersGroupToClient(data);
    dispatch(loadFavoriteOffers(adaptedData));
  };

export const switchIsFavoriteAction = (id: number, status: number): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const { data } = await api.post<OfferResponse>((`${APIRoute.Favorite}/${id}/${status}`));
    const adaptedData = adaptOfferToClient(data);
    dispatch(updateOffer(adaptedData));
  };
