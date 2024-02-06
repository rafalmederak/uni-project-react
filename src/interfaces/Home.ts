import { Post } from "./Post";
import { User } from "./User";

export interface HomeProps {
  posts: Post[];
  users: User[];
}
