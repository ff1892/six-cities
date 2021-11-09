import { dataComments } from './data-comments';
import { loadCurrentOfferComments, uploadCurrentOfferComment } from '../../actions';
import { DataComments } from '../../../types/state';
import { makeFakeComment } from '../../../utils/mocks';
import { UploadCommentStatus } from '../../../const';
import { datatype } from 'faker';


const state: DataComments = {
  currentOfferComments: [],
  isCommentsLoaded: false,
  uploadCommentStatus: UploadCommentStatus.Unknown,
};

const comments = [makeFakeComment(), makeFakeComment()];

describe('Reducer: dataComments', () => {

  it('without additional parameters should return initial state', () => {
    expect(dataComments(void 0, {type: 'UNKNOWN_TYPE'}))
      .toEqual(state);
  });

  it('should update comments and loaded status by load comments', () => {
    expect(dataComments(state, loadCurrentOfferComments(comments)))
      .toEqual({
        currentOfferComments: comments,
        isCommentsLoaded: true,
        uploadCommentStatus: UploadCommentStatus.Unknown,
      });
  });

  it('should reset upload status by load comments', () => {
    const initialState = {
      currentOfferComments: [],
      isCommentsLoaded: false,
      uploadCommentStatus: UploadCommentStatus.Error,
    };
    expect(dataComments(initialState, loadCurrentOfferComments(comments)))
      .toEqual({
        currentOfferComments: comments,
        isCommentsLoaded: true,
        uploadCommentStatus: UploadCommentStatus.Unknown,
      });
  });

  it('should update upload status by upload comment', () => {
    const uploadStatus = datatype.string();
    const initialState = {
      currentOfferComments: comments,
      isCommentsLoaded: true,
      uploadCommentStatus: UploadCommentStatus.Completed,
    };
    const updatedState = {
      currentOfferComments: comments,
      isCommentsLoaded: true,
      uploadCommentStatus: uploadStatus,
    };
    expect(dataComments(initialState, uploadCurrentOfferComment(uploadStatus)))
      .toEqual(updatedState);
  });
});
