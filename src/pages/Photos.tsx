import React, { useState } from 'react';
import 'styles/photos.css';
import { FaArrowLeft, FaArrowRight, FaTimes } from 'react-icons/fa';

interface Photo {
  id: number;
  imageUrl: string;
  description: string;
}

const photosData: Photo[] = [
  {
    id: 1,
    imageUrl: 'https://images.unsplash.com/photo-1682687219573-3fd75f982217?q=80&w=1375&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'This description of photo 1 is tooooooooooo long',
  },
  {
    id: 2,
    imageUrl: 'https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-nature-mountain-scenery-with-flowers-free-photo.jpg?w=600&quality=80',
    description: 'Picture description 2',
  },
  {
    id: 3,
    imageUrl: 'https://www.bsr.org/images/heroes/bsr-focus-nature-hero.jpg',
    description: 'Picture description 3',
  },
  { id: 4, imageUrl: 'http://picsum.photos/id/240/600/500', description: 'Picture description 4' },
  { id: 5, imageUrl: 'http://picsum.photos/id/241/600/500', description: 'Picture description 5' },
  { id: 6, imageUrl: 'http://picsum.photos/id/242/600/500', description: 'Picture description 6' },
];

const Photos = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

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
    if (
      selectedPhotoIndex !== null &&
      selectedPhotoIndex < photosData.length - 1
    ) {
      setSelectedPhotoIndex(selectedPhotoIndex + 1);
    }
  };

  const filteredPhotos = photosData.filter((photo) =>
    photo.description.toLowerCase().includes(searchTerm)
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
            <img src={photo.imageUrl} alt={`${photo.description}`} />
              <div className="description-frame">
                <div className="description">{photo.description}</div>
                <div className="description-tooltip">{photo.description}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedPhotoIndex !== null && (
        <div className={`modal ${selectedPhotoIndex !== null && 'show'}`}>
          <FaTimes className="modal-close" onClick={closeModal} />
          <div className="modal-navigation">
            <FaArrowLeft
              className="arrow-left"
              onClick={goToPreviousPhoto}
            />
            <FaArrowRight
              className="arrow-right"
              onClick={goToNextPhoto}
            />
          </div>
          <img
            src={filteredPhotos[selectedPhotoIndex].imageUrl}
            alt={filteredPhotos[selectedPhotoIndex].description}
        />    
        </div>
      )}
    </div>
  );
};

export default Photos;
