import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const DEFAULT_IMAGE = 'https://www.escapeauthority.com/wp-content/uploads/2116/11/No-image-found.jpg';

function CardImage({ imageUrl }) {
  return (
    <Outline>
      <ImageCard src={imageUrl || DEFAULT_IMAGE} alt="RelatedProductImage" />
    </Outline>
  );
}

CardImage.propTypes = {
  imageUrl: PropTypes.string,
};

CardImage.defaultProps = {
  imageUrl: 'https://www.escapeauthority.com/wp-content/uploads/2116/11/No-image-found.jpg',
};

const Outline = styled.div`
  /* height: 100%; */
  aspect-ratio: 4/5;
  overflow: hidden;
`;

const ImageCard = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
 /* cursor: pointer;

  &:hover {
    opacity: 0.80;
  } */
`;

export default CardImage;
