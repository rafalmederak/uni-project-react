import { User } from "./User";

export interface ILayoutProps {
  children: JSX.Element;
  currentUser?: User;
}
