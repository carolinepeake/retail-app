import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ComparisonModal from './ComparisonModal';

function CardImage({ imageInfo, details }) {
  const [image, setImage] = useState(imageInfo);
  const [modal, setModal] = useState(false);
  // const [starType, setStarType] = useState('&#9734;');
  const defaultImage = 'https://www.escapeauthority.com/wp-content/uploads/2116/11/No-image-found.jpg';
  useEffect(() => {
    setImage(imageInfo);
  }, [imageInfo]);
  function openModal() {
    setModal(true);
  }
  function closeModal() {
    setModal(false);
  }

  // function handleMouseEnter(e) {
  //   e.preventDefault();
  //   setStarType('&#9733;');
  // }

  // function handleMouseLeave(e) {
  //   setStarType(&#9734);
  //   e.preventDefault();
  // }

  return (
    <Outline>
      <ImageCard src={image.results[0].photos[0].thumbnail_url ? image.results[0].photos[0].thumbnail_url : defaultImage} alt="RelatedProductImage" />
      <Button
        onClick={(e) => {
          e.stopPropagation();
          openModal();
        }}
        // onMouseEnter={(e) => handleMouseEnter(e)}
        // onMouseLeave={(e) => handleMouseLeave(e)}
      >
        {/* {starType} */}
        &#9733;
      </Button>
      {modal
      && (
        <div>
          <ComparisonModal onClick={(e) => { e.stopPropagation(); }} details={details} />
          <ModalBackground onClick={(e) => { e.stopPropagation(); closeModal(); }} />
        </div>
      )}
    </Outline>
  );
}

CardImage.propTypes = {
  imageInfo: PropTypes.shape({}).isRequired,
  details: PropTypes.shape({}).isRequired,
};

const Outline = styled.div`
  position: relative;
`;

const ImageCard = styled.img`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  object-fit: cover;
  &:hover {
    opacity: 0.80;
  }
  border-radius: 10px;
  cursor: pointer;
  aspect-ratio: 1;
`;

const Button = styled.button`
  position: absolute;
  top: 0px;
  right: 0px;
  color: black;
  background-color: transparent;
  border: none;
  font-size: 1.25rem;
  font-width: bold;
  &:hover {
    color: gold;
    opacity: 0.80;
  };
  cursor: pointer;
`;

const ModalBackground = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0%;
  top: 0%;
  z-index: 10;
`;

export default CardImage;
