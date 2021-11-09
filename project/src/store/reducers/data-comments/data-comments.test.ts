import { dataComments } from './data-comments';
import { loadCurrentOfferComments, uploadCurrentOfferComment } from '../../actions';
import { DataComments } from '../../../types/state';
import { makeFakeComment } from '../../../utils/mocks';
import { UploadStatus } from '../../../const';
import { datatype } from 'faker';


const state: DataComments = {
  currentOfferComments: [],
  isCommentsLoaded: false,
  uploadCommentStatus: UploadStatus.Unknown,
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
        uploadCommentStatus: UploadStatus.Unknown,
      });
  });

  it('should reset upload status by load comments', () => {
    const initialState = {
      currentOfferComments: [],
      isCommentsLoaded: false,
      uploadCommentStatus: UploadStatus.Error,
    };
    expect(dataComments(initialState, loadCurrentOfferComments(comments)))
      .toEqual({
        currentOfferComments: comments,
        isCommentsLoaded: true,
        uploadCommentStatus: UploadStatus.Unknown,
      });
  });

  it('should update upload status by upload comment', () => {
    const uploadStatus = datatype.string();
    const initialState = {
      currentOfferComments: comments,
      isCommentsLoaded: true,
      uploadCommentStatus: UploadStatus.Completed,
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
