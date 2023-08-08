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
  position: relative;
  height: 100%;
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
  cursor: pointer;
  height: 100%;
`;

export default CardImage;
