import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StyledExitButton } from '../Button';

export default function PhotoPreview({ photo, photos, setPhotos, resetFileInput, selectedFile }) {
  const handleClickDeleteFile = () => {
    // delete photo from photos
    const photosCopy = photos.slice();
    for (let i = 0; i < photos.length; i++) {
      if (photos[i].public_id === photo.public_id) {
        photosCopy.splice(i, 1);
      }
    }
    setPhotos(photosCopy);
    if (selectedFile.name === photo.original_filename) {
      resetFileInput();
    }
    // delete photo from cloudinary
    // TO-DO: use cloudinary delete method if using delete token fails
  };

  return (
    <ImageContainer>
      <ImagePreview
        src={photo.url}
        alt={photo.original_filename}
      />
      <DeleteButton
        type="button"
        onClick={handleClickDeleteFile}
      >
        &#10005;
      </DeleteButton>
    </ImageContainer>
  );
}

const ImageContainer = styled.div`
  width: 20%;
  height: 100%;
  position: relative;
  font-size: 0.5em;
  padding-right: 1.5em;
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
`;

const DeleteButton = styled(StyledExitButton)`
  font-size: 1.5em;
  top: -0.75em;
  right: 0;
  background-color: black;
  color: white;
`;
