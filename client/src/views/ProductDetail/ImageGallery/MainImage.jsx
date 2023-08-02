import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
// import useUnsplashUrl from '../../utils/useUnsplash';
import { StyledExitButton } from '../../../components/Button';

function MainImage({
  status,
  alt,
  fullsize,
  thumbnail,
  translation,
  handlePanImage,
  index,
  place,
}) {
  return (
    <StyledImage
      src={fullsize}
      // use url to store productName, selectedStyle and seq#
      alt={alt}
      status={status}
      translation={translation}
      onMouseMove={(e) => handlePanImage(e)}
      place={place}
      index={index}
      // translateY={translation.y}
      // translateX={translation.x}
    />
  );
}

// Image.propTypes = {
//   status: PropTypes.string.isRequired,
//   setStatus: PropTypes.func.isRequired,
//   alt: PropTypes.string.isRequired,
//   fullsize: PropTypes.string,
//   thumbnail: PropTypes.string,
//   translation: PropTypes.shape ,
// };

// Image.default.Props = {
//   fullsize: PropTypes.string,
//   thumbnail: ,
//   translation: {
//     x: '0',
//     y: '0',
//   };
// };

const StyledImage = styled.img`
  object-fit: cover;
  overflow: hidden;
  aspect-ratio: 4/6;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  z-index: 2;

  ${(props) => props.status === 'default' && css`
    max-width: 600px;
    transition: translate 0.25s smooth transform 0.25s ease;
    position: relative;
    cursor: zoom-in;
    @media (min-width: 600px) {
      max-height: 840px;
    }
    @media (min-height: 1200px) {
      max-width: 800px;
      max-height: 1200px;
    }
  `};

  ${(props) => props.status === 'expanded' && css`
    cursor: crosshair;
  `};

  ${(props) => props.index === props.place && css`
    ${props.status === 'zoomed' && css`
      transform: scale(2.5);
      transition: transform 0.25s ease;
      transform-origin: top left;
      transition: translate 0.25s smooth;
      position: relative;
    /* position: absolute; */
    /* translate: -${props.xPercent} -${props.yPercent}; */
      translate: -${props.translation.x} -${props.translation.y};
      cursor: zoom-out;
    `};
  `};
`;

export default MainImage;
