import { User } from "interfaces/User";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PostsProps {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  users: User[];
}
