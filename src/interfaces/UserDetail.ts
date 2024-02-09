import { User } from "interfaces/User";
import { Post } from "interfaces/Post";

export interface UserDetailProps {
  currentUser: User;
  posts: Post[];
}
