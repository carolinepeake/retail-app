import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

export default function Icon({
  clickThumbnail,
  index,
  selected,
}) {
  const handleClickThumbnail = (i) => {
    clickThumbnail(i);
  };
  return (
    <ThumbnailContainer
      href={`#seq${index}`}
      onClick={() => handleClickThumbnail(index)}
      type="button"
    >
      <ThumbnailIcon
        $selected={selected}
      />
    </ThumbnailContainer>
  );
}

Icon.propTypes = {
  // alternative: PropTypes.string.isRequired,
  clickThumbnail: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  selected: PropTypes.bool.isRequired,
};

const ThumbnailContainer = styled.a`
    display: flex;
    background-color: transparent;
    border: none;
    color: ${(props) => props.theme.submitButton};
    justify-content: center;
    align-items: center;
    margin: 0.5em 0;
    border-radius: 50px;
    color: ${(props) => props.theme.submitButton};

  /* &:focus {
    color: ${(props) => props.theme.submitButtonHover};
    border: black solid 1.5px;
    transform: scale(1.05) ease;
    padding: 1.5px;
  }

    &:link {
      border: none;
    }

    &:visited {
      color: ${(props) => props.theme.submitButtonHover};
      border: black solid 1.5px;
      transform: scale(1.05) ease;
      padding: 1.5px;
    }

    &:hover {
      box-shadow: box-shadow: 5px 5px 5px #727272;
      transform: transform: scale(1.05) ease;
    }

    &:active {
      color: ${(props) => props.theme.submitButtonHover};
      border: black solid 1.5px;
      transform: scale(1.05) ease;
      padding: 1.5px;
    }

    &:target {
      color: ${(props) => props.theme.submitButtonHover};
      border: black solid 1.5px;
      transform: scale(1.05) ease;
      padding: 1.5px;
    } */
`;

const ThumbnailIcon = styled.span`
  border-radius: 50px;
  background-color: currentColor;
  aspect-ratio: 1/1;
  height: 2vh;
  height: minmax(8px, 2vh);
  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.darkBlueHover};
  }

  ${(props) => props.$selected && css`
    background-color: ${props.theme.submitButtonHover};
  `};

  &::active {
    color: ${(props) => props.theme.submitButtonHover};
  }
`;
