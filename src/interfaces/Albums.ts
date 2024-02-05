import { User } from "interfaces/User";

export interface Album {
    userId: number;
    id: number;
    title: string;
}

export interface AlbumsProps {
    albums: Album[];
    users: User[];
}