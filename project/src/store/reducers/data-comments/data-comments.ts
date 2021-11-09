import { DataComments } from '../../../types/state';
import { createReducer } from '@reduxjs/toolkit';
import { loadCurrentOfferComments, uploadCurrentOfferComment} from '../../actions';
import { UploadStatus } from '../../../const';

const initialState: DataComments = {
  currentOfferComments: [],
  isCommentsLoaded: false,
  uploadCommentStatus: UploadStatus.Unknown,
};

const dataComments = createReducer(initialState, (builder) => {
  builder
    .addCase(loadCurrentOfferComments, (state, action) => {
      const { comments } = action.payload;
      state.currentOfferComments = comments;
      state.isCommentsLoaded = true;
      state.uploadCommentStatus = UploadStatus.Unknown;
    })
    .addCase(uploadCurrentOfferComment, (state, action) => {
      state.uploadCommentStatus = action.payload;
    });
});

export {dataComments};
