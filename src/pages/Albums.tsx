import React, { useEffect, useState, useRef } from "react";
import { AlbumsProps } from "interfaces/Albums";
import { User } from "interfaces/User";
import { Photo } from "interfaces/Photo";
import "styles/albums.css";

interface AlbumsWithUsersProps extends AlbumsProps {
  users: User[];
}

const Albums: React.FC<AlbumsWithUsersProps> = ({ albums, users }) => {
  const [selectedAlbum, setSelectedAlbum] = useState<number | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(true);
  const albumsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${selectedAlbum}`);
        const data = await response.json();
        setPhotos(data);
      } catch (error) {
        console.error("Error fetching photos", error);
      }
    };

    if (selectedAlbum !== null) {
      fetchPhotos();
      window.scrollTo({ top: 0, behavior: "smooth" });
      setIsSearching(false);
    }
  }, [selectedAlbum]);

  const handleAlbumClick = (albumId: number) => {
    setSelectedAlbum(albumId);
    setSelectedPhotoIndex(null);
  };

  const handleBackToAlbums = () => {
    setSelectedAlbum(null);
    setSelectedPhotoIndex(null);
    setIsSearching(true);
  };

  const openModal = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const closeModal = () => {
    setSelectedPhotoIndex(null);
  };

  const goToPreviousPhoto = () => {
    if (selectedPhotoIndex !== null && selectedPhotoIndex > 0) {
      setSelectedPhotoIndex(selectedPhotoIndex - 1);
    }
  };

  const goToNextPhoto = () => {
    if (selectedPhotoIndex !== null && selectedPhotoIndex < photos.length - 1) {
      setSelectedPhotoIndex(selectedPhotoIndex + 1);
    }
  };

  const filteredAlbums = albums.filter((album) =>
    album.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    users.find((user) => user.id === album.userId)?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div ref={albumsContainerRef} className="albums">
      {isSearching && (
        <div className="search-container">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
          />
        </div>
      )}

      {selectedAlbum === null ? (
        // Renderowanie widoku wszystkich albumów
        filteredAlbums.map((album) => (
          <div key={album.id} className="album-card" onClick={() => handleAlbumClick(album.id)}>
            <div className="album-title">{album.title}</div>
            <div className="album-user">
              User: {users.find((user) => user.id === album.userId)?.name || "Unknown User"}
            </div>
          </div>
        ))
      ) : (
        // Renderowanie widoku zdjęć z danego albumu
        <div className="album-photos">
          <div className="album-details">
            <div className="album-name">{filteredAlbums.find((album) => album.id === selectedAlbum)?.title}</div>
          </div>
          <div className="album-details">
          <button onClick={handleBackToAlbums}>Back To Albums</button>
          </div>
          <div className="photos-container">
            {photos.map((photo, index) => (
              <div key={photo.id} className="photo-card">
                <div className="image-container" onClick={() => openModal(index)}>
                  <img src={photo.url} alt={`${photo.title}`} />
                  <div className="description-frame">
                    <div className="description">{photo.title}</div>
                    <div className="description-tooltip">{photo.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selectedPhotoIndex !== null && (
            <div className={`modal ${selectedPhotoIndex !== null && "show"}`}>
              <div className="modal-close" onClick={closeModal}>✕</div>
              <div className="modal-navigation">
                <div className="arrow-left" onClick={goToPreviousPhoto}>{"<"}</div>
                <div className="arrow-right" onClick={goToNextPhoto}>{">"}</div>
              </div>
              <img
                src={photos[selectedPhotoIndex].url}
                alt={photos[selectedPhotoIndex].title}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Albums;
