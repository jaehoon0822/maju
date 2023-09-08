export interface followers {}

export interface followers {}

export interface Hashtag extends Dates {
  title: string;
  id: string;
}

export interface Like extends Dates {
  id: string;
  userId: string;
  postId: string;
}

export interface Dates {
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Img {
  id: string;
  img: string;
}

export interface User extends Dates {
  id: string;
  email: string;
  nick: string;
  img: string | null;
  provider: string | null;
  snsId: string | null;
}

export interface Post extends Dates {
  id: string;
  content: string;
  img: Img[];
  likes: Like[];
  user: User;
  hashtag: Hashtag[];
  likeCount?: number;
  commentCount?: number;
}

export interface Comment extends Dates {
  id: string;
  content: string;
  user: User;
  post: Post;
}
