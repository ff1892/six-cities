import { DataComments } from '../../types/state';
import { createReducer } from '@reduxjs/toolkit';
import { loadCurrentOfferComments, uploadCommentsError, uploadCurrentOfferComment} from '../action';

const initialState: DataComments = {
  currentOfferComments: [],
  isCommentsLoaded: false,
  isCommentPosting: false,
  isCommentUploadedError: false,
};

const dataComments = createReducer(initialState, (builder) => {
  builder
    .addCase(loadCurrentOfferComments, (state, action) => {
      const { comments } = action.payload;
      state.currentOfferComments = comments;
      state.isCommentsLoaded = true;
      if (state.isCommentUploadedError) {
        state.isCommentUploadedError = false;
      }
    })
    .addCase(uploadCommentsError, (state) => {
      state.isCommentUploadedError = true;
    })
    .addCase(uploadCurrentOfferComment, (state, action) => {
      state.isCommentPosting = action.payload;
    });
});

export {dataComments};
