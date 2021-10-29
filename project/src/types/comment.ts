import { CommentUser, CommentUserResponse } from './user';

export type CommentGet = {
  comment: string,
  date: string,
  id: number,
  rating: number,
  user: CommentUser,
};

export type CommentPost = {
  comment: string,
  rating: number,
};

export type CommentGetResponse = Omit<CommentGet, 'user'> & {
  user: CommentUserResponse;
};
