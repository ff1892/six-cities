export type CommentUser = {
  avatarUrl: string,
  id: number,
  isPro: boolean,
  name: string,
  email: string,
};

export type CommentUserResponse = {
  'avatar_url': string,
  'id': number,
  'is_pro': boolean,
  'name': string,
  'email': string,
};

export type UserInfo = CommentUser & {
  token: string;
};

export type UserInfoResponse = CommentUserResponse & {
  token: string;
};
