import {
  APIRoute,
  ToastMessages,
  UploadStatus
} from '../../../const';
import { adaptCommentsGroupToClient} from '../../../services/adapter';
import { loadCurrentOfferComments, uploadCurrentOfferComment } from '../../actions';
import { ThunkActionResult } from '../../../types/action';
import { CommentGetResponse, CommentPost } from '../../../types/comment';
import { toast } from 'react-toastify';

export const fetchCurrentOfferCommentsAction = (id: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<CommentGetResponse[]>(`${APIRoute.Comments}/${id}`);
      const adaptedData = adaptCommentsGroupToClient(data);
      dispatch(loadCurrentOfferComments(adaptedData));
    } catch {
      toast(ToastMessages.CommentsError);
    }
  };

export const commentPostAction = (id: string, { comment, rating }: CommentPost): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    dispatch(uploadCurrentOfferComment(UploadStatus.Posting));
    try {
      await api.post((`${APIRoute.Comments}/${id}`), { comment, rating });
      dispatch(uploadCurrentOfferComment(UploadStatus.Completed));
    } catch {
      dispatch(uploadCurrentOfferComment(UploadStatus.Error));
      toast.info(ToastMessages.UploadingError);
    }
  };
