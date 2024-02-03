import { User } from "./User";

export interface LoginProps {
  users: User[];
  setCurrentUser: (user: User) => void;
}
