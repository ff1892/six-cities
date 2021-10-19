type CommentUser = {
  avatarUrl: string,
  id: number,
  isPro: boolean,
  name: string,
};

export type CommentGet = {
  comment: string,
  date: string,
  id: number,
  rating: number,
  user: CommentUser,
};
