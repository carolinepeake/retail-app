import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

export default function ScrollButton({
  visible,
  disabled,
  handleClick,
  position,
  status,
  overlay,
  background,
}) {
  return (
    <Buttons
      $visible={visible}
      onClick={handleClick}
      $position={position}
      disabled={disabled}
      status={status}
      $background={background}
      $overlay={overlay}
    >
      <ArrowBackground
        $background={background}
      />
      <ArrowIcon
        $position={position}
      />
    </Buttons>
  );
}

ScrollButton.propTypes = {
  visible: PropTypes.bool,
  disabled: PropTypes.bool,
  overlay: PropTypes.bool,
  background: PropTypes.bool,
  handleClick: PropTypes.func.isRequired,
  position: PropTypes.string.isRequired,
  status: PropTypes.string,
};

ScrollButton.defaultProps = {
  visible: true,
  disabled: false,
  overlay: false,
  background: false,
  status: '',
};

const Buttons = styled.button`
  display: none;
  position: absolute;
  z-index: 3;
  background-color: ${(props) => props.theme.navBgColor};
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.fontColor};
  padding: 0;
  border: none;
  line-height: 1;
  font-size: 1.17em;
  aspect-ratio: 1;

  ${(props) => props.$overlay && css`
    align-self: center;
   /* opacity: 0.8; */
    background-color: rgba(255,255,255,0.4);
    font-weight: 500;
    height: 2em;
    top: 50%;
    transform: translateY(-50%);

    &:hover {
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      opacity: 1;
    }

    @media (min-width: 600px) {
      display: ${props.$visible === true && 'block'};
      left: ${props.$position === 'left' && '0'};
      right: ${props.$position === 'right' && '0'};
    }
  `};

  @media (min-width: 700px) {
    font-size: 1.25em;
  }

  @media (min-width: 900px) {
    font-size: 1.5em;
  }

  ${(props) => props.$background && css`
    height: 1.5em;
    left: 42.5%;
    display: ${props.$visible && 'block'};
    display: none;
    top: ${props.$position === 'top' && '0'};
    bottom: ${props.$position === 'bottom' && '0'};
    transform: translateX(-50%);
    cursor: pointer;
    &:hover {
      background-color: rgba(225, 225, 225, 0.9);
    }
    &:disabled {
      opacity: 0.3;
      cursor: initial;
    }
    @media (min-width: 800px) {
      display: ${props.status === 'default' && 'flex'};
      display: ${props.$visible && 'block'};
    }
  `};
`;

const ArrowBackground = styled.span`
  aspect-ratio: 1;
  display: flex;
  position: relative;
  ${(props) => props.$background && css`
    height: 100%;
  `};
/*  height: ${(props) => props.$background && '100%'}; */
`;

const ArrowIcon = styled.span`
  ${(props) => props.$position === ('bottom' || 'top') && css`
    width: 100%;
    height: 100%;
  /*  position: absolute; */
  `};

  &::before {
    position: absolute;
   /* font-family: futura-pt, sans-serif; */

    ${(props) => props.$position === 'left' && css`
      content: '〈';
      right: 75%;
      width: 50%;
      transform: translate(50%,-50%);
      padding: 0 6.25%;
      top: 50%;
      height: 50%;
      /* position: relative;
      top: -75%;
      right: 18.75%; */
    `};

    ${(props) => props.$position === 'right' && css`
      content: ' 〉';
      left: 50%;
      width: 25%;
      transform: translate(-50%,-50%);
      top: 50%;
      height: 50%;
    `};

    ${(props) => props.$position === 'top' && css`
      content: '〈';
      right: 50%;
      top: 12.5%;
      width: max-content;
      transform: rotate(0.25turn) translate(-25%,-50%);
    `};

    ${(props) => props.$position === 'bottom' && css`
      top: 50%;
      content: '﹀';
      height: 25%;
      width: 100%;
      transform: translate(-50%,-50%);
    `};
  }
`;
