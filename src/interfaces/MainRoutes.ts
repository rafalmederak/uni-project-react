import { User } from "./User";

export interface MainRoutesProps {
  currentUser?: User;
  setCurrentUser: (user: User) => void;
}
