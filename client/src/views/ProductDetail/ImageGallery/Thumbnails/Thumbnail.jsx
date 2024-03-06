import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

export default function Thumbnail({
  alternative,
  photo,
  clickThumbnail,
  length,
  index,
  selected,
}) {
  const handleClickThumbnail = (i) => {
    clickThumbnail(i);
  };

  return (
    <ThumbnailContainer
      // href={`#seq${index}`}
      onClick={() => handleClickThumbnail(index)}
      type="button"
      length={length}
    >
      <ThumbnailImage
        src={photo}
        $selected={selected}
        alt={alternative}
      />
    </ThumbnailContainer>
  );
}

Thumbnail.propTypes = {
  alternative: PropTypes.string.isRequired,
  // photo: PropTypes.string,
  clickThumbnail: PropTypes.func.isRequired,
  length: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  selected: PropTypes.bool.isRequired,
};

const ThumbnailContainer = styled.a`
    display: flex;
    background-color: transparent;
    border: none;
    padding-right: 15%;
    padding-top: 15%;
    height: calc(100% / ${(props) => props.length});
    &:hover {
      /* box-shadow: box-shadow: 5px 5px 5px #727272;
      transform: transform: scale(1.05) ease; */
    }
`;

const ThumbnailImage = styled.img`
  aspect-ratio: 4/5;
  max-width: 100%;
  justify-content: center;
  object-fit: cover;
  margin: 0 auto;
  padding: 1.5px;

  ${(props) => props.$selected && css`
    border: black solid 1.5px;
  `};
`;
