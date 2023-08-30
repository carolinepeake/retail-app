import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default function CardButton({
  handleClickIconBtn,
  icon,
  active,
}) {
  console.log('[StarButton] is running');

  return (
    <Button
      type="button"
      onClick={handleClickIconBtn}
      $icon={icon}
      $active={active}
    />
  );
}

CardButton.propTypes = {
  handleClickIconBtn: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  active: PropTypes.bool,
};

CardButton.defaultProps = {
  active: false,
};

const Button = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 2.5%;
  margin-right: 2.5%;
  display: flex;
  align-items: center;
  padding-top: 0;
  padding-bottom: 0;
  color: currentColor;
  aspect-ratio: 1;
  background-color: ${(props) => props.theme.backgroundColor};
  border: none;
  border-radius: 50px;
  font-size: 1em;
  font-weight: bold;
  cursor: pointer;
  z-index: 1;
  &: after {
    ${(props) => props.$icon === 'star' && 'content: "☆"'};
    ${(props) => props.$active && 'content: "★"'};
    ${(props) => props.$icon === 'remove' && 'content: "✕"'};
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &:hover {
   opacity: 0.80;
    &::after {
      ${(props) => props.$icon === 'star' && 'content: "★"'};
    }
  }
`;
