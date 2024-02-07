import { Album } from "interfaces/Albums";

export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
}

export interface PhotosProps {
  photos: Photo[];
  albums: Album[];
}
