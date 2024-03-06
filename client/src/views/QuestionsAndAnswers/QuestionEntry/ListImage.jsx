import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ExpandedImageModal from '../../../components/ExpandedImageModal';

export default function ListImage({ photo }) {
  console.log('[ListImage] is running');
  ListImage.propTypes = {
    photo: PropTypes.string.isRequired,
  };
  const [showModal, setShowModal] = useState(false);

  const handlePhotoClick = () => {
    setShowModal(true);
  };

  return (
    <>
      <StyledImage
        src={photo}
        alt="Image preview"
        onClick={handlePhotoClick}
      />
      {showModal && (
        <ExpandedImageModal
          src={photo}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
}

const StyledImage = styled.img`
 /* max-height: 8em;
  max-width: 8em; */
  max-height: 4em;
  max-width: 4em;
  /* padding: .5em; */
  /* padding: 0 0.5em; */
  cursor: pointer;
  object-fit: scale-down;
`;
