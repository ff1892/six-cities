import { dataComments } from './data-comments';
import {
  loadCurrentOfferComments,
  uploadCommentsError,
  uploadCurrentOfferComment
} from '../action';
import { DataComments } from '../../types/state';
import { makeFakeComment } from '../../utils/mocks';

const state: DataComments = {
  currentOfferComments: [],
  isCommentsLoaded: false,
  isCommentPosting: false,
  isCommentUploadedError: false,
};

const comments = [makeFakeComment(), makeFakeComment()];

describe('Reducer: dataComments', () => {

  it('without additional parameters should return initial state', () => {
    expect(dataComments(void 0, {type: 'UNKNOWN_TYPE'}))
      .toEqual(state);
  });

  it('should update comments by load comments', () => {
    expect(dataComments(state, loadCurrentOfferComments(comments)))
      .toEqual({
        currentOfferComments: comments,
        isCommentsLoaded: true,
        isCommentPosting: false,
        isCommentUploadedError: false,
      });
  });


  it('should change error status when load comments', () => {
    const errorState = {
      currentOfferComments: [],
      isCommentsLoaded: false,
      isCommentPosting: false,
      isCommentUploadedError: true,
    };
    const updatedState = {
      currentOfferComments: comments,
      isCommentsLoaded: true,
      isCommentPosting: false,
      isCommentUploadedError: false,
    };
    expect(dataComments(errorState, loadCurrentOfferComments(comments)))
      .toEqual(updatedState);
  });

  it('should change error status when uploading error', () => {
    expect(dataComments(state, uploadCommentsError))
      .toEqual({
        currentOfferComments: [],
        isCommentsLoaded: false,
        isCommentPosting: false,
        isCommentUploadedError: true,
      });
  });

  it('should change posting status when upload comment', () => {
    expect(dataComments(state, uploadCurrentOfferComment(true)))
      .toEqual({
        currentOfferComments: [],
        isCommentsLoaded: false,
        isCommentPosting: true,
        isCommentUploadedError: false,
      });
    expect(dataComments(state, uploadCurrentOfferComment(false)))
      .toEqual({
        currentOfferComments: [],
        isCommentsLoaded: false,
        isCommentPosting: false,
        isCommentUploadedError: false,
      });
  });
});
