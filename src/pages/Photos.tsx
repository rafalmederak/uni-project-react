import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";
import { PhotosProps } from "interfaces/Photo";
import { Album } from "interfaces/Albums";
import "styles/photos.css";

const Photos = ({ photos, albums }: PhotosProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(
    null
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(event.target.value.toLowerCase());

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

  const findAlbumName = (albumId: number): string => {
    const foundAlbum = albums.find((album) => album.id === albumId);
    return foundAlbum ? foundAlbum.title : "Unknown Album";
  };

  const filteredPhotos = photos.filter((photo) =>
    photo.title.toLowerCase().includes(searchTerm) ||
    findAlbumName(photo.albumId).toLowerCase().includes(searchTerm)
  );

  return (
    <div className="photos">
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search..."
        />
      </div>

      <div className="photos-container">
        {filteredPhotos.map((photo, index) => (
          <div className="photo-card" key={photo.id}>
            <div className="image-container" onClick={() => openModal(index)}>
              <img src={photo.url} alt={`${photo.title}`} />
              <div className="description-frame">
                <div className="album-name">Album: {findAlbumName(photo.albumId)}</div>
                <div className="description">{photo.title}</div>
                <div className="description-tooltip">{photo.title}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedPhotoIndex !== null && (
        <div className={`modal ${selectedPhotoIndex !== null && "show"}`}>
          <FaTimes className="modal-close" onClick={closeModal} />
          <div className="modal-navigation">
            <FaArrowLeft className="arrow-left" onClick={goToPreviousPhoto} />
            <FaArrowRight className="arrow-right" onClick={goToNextPhoto} />
          </div>
          <img
            src={filteredPhotos[selectedPhotoIndex].url}
            alt={filteredPhotos[selectedPhotoIndex].title}
          />
        </div>
      )}
    </div>
  );
};

export default Photos;
