import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

export default function ScrollButton({ visible, handleClick, position }) {
  return (
    <Buttons
      $visible={visible}
      onClick={handleClick}
      $position={position}
    >
      <ArrowBackground />
      <ArrowIcon
        $position={position}
      />
    </Buttons>
  );
}

ScrollButton.propTypes = {
  visible: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  position: PropTypes.string.isRequired,
};

const Buttons = styled.button`
  display: none;
  @media (min-width: 600px) {
    display: ${(props) => (props.$visible ? 'block' : 'none')};
    left: ${(props) => props.$position === 'left' && '0'};
    right: ${(props) => props.$position === 'right' && '0'};
  }
  z-index: 3;
  align-self: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: ${(props) => props.theme.navBgColor};
  opacity: 0.8;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    opacity: 1;
  }
  font-weight: 500;
  padding: 0;
  color: ${(props) => props.theme.fontColor};
  border: none;
  line-height: 1;
  font-size: 1em;
  aspect-ratio: 1;
  height: 2em;
  @media (min-width: 700px) {
    font-size: 1.17em;
  }
  @media (min-width: 900px) {
    font-size: 1.5em;
  }
`;

const ArrowBackground = styled.span`
  aspect-ratio: 1;
  display: flex;
  position: relative;
`;

const ArrowIcon = styled.span`
  &::before {
    position: absolute;
    top: 50%;
    height: 50%;
    font-family: futura-pt, sans-serif;
    ${(props) => props.$position === 'left' && css`
      content: '〈';
      right: 75%;
      width: 50%;
      transform: translate(50%,-50%);
      padding: 0 6.25%;
    `};
    ${(props) => props.$position === 'right' && css`
      content: ' 〉';
      left: 50%;
      width: 25%;
      transform: translate(-50%,-50%);
    `};
  }
`;
