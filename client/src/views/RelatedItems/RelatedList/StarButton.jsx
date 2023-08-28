import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function StarButton({
  onClickRightButton,
  i,
  icon,
}) {
  console.log('[StarButton] is running');

  const handleClickButton = (e) => {
    e.stopPropagation();
    onClickRightButton(i);
  };

  return (
    <Button
      type="button"
      onClick={handleClickButton}
      $icon={icon}
    />
  );
}

StarButton.propTypes = {
  onClickRightButton: PropTypes.func.isRequired,
  i: PropTypes.number.isRequired,
  icon: PropTypes.string.isRequired,
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
    ${(props) => props.$icon === 'remove' && 'content: "✕"'};
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &:hover {
  /*  opacity: 0.80; */
    &::after {
      ${(props) => props.$icon === 'star' && 'content: "★"'};
      ${(props) => props.$icon === 'remove' && 'content: "✕"'};
   /*   content: '★'; */
     /* color: ${(props) => props.theme.starFilled}; */
    }
  }
`;

export default StarButton;
