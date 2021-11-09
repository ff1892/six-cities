import { CommentGet } from '../../../types/comment';
import { State } from '../../../types/state';
import { NameSpace } from '../root-reducer';

export const getOfferComments = (state: State): CommentGet[] => (
  state[NameSpace.comments].currentOfferComments
);

export const getLoadedCommentsStatus = (state: State): boolean => (
  state[NameSpace.comments].isCommentsLoaded
);

export const getUploadedCommentStatus = (state: State): string => (
  state[NameSpace.comments].uploadCommentStatus
);
