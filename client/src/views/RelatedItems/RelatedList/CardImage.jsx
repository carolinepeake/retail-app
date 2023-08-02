import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function CardImage({ imageUrl }) {
  // const [image, setImage] = useState(imageInfo);

  const defaultImage = 'https://www.escapeauthority.com/wp-content/uploads/2116/11/No-image-found.jpg';
  // useEffect(() => {
  //   setImage(imageInfo);
  // }, [imageInfo]);

  // src={imageInfo[0].photos[0].thumbnail_url ? image.results[0].photos[0].thumbnail_url

  return (
    <Outline>
      <ImageCard src={imageUrl || defaultImage} alt="RelatedProductImage" />
    </Outline>
  );
}

// CardImage.propTypes = {
//   imageInfo: PropTypes.arrayOf().isRequired,
// };

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
// aspect-ratio: 4/5;
  // border-radius: 10px;
  // aspect-ratio: 1;

export default CardImage;
