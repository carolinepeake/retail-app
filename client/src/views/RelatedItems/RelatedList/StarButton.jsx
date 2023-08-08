import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function StarButton({ setModal, i }) {
  console.log('[StarButton] is running');
  const openModal = () => {
    setModal(i);
  };

  return (
    <Button
      onClick={(e) => {
        e.stopPropagation();
        openModal();
      }}
    >
      &#9733;
    </Button>
  );
}

StarButton.propTypes = {
  setModal: PropTypes.func.isRequired,
  i: PropTypes.number.isRequired,
};

const Button = styled.button`
  position: absolute;
  top: 0px;
  right: 0px;
  color: black;
  background-color: transparent;
  border: none;
  font-size: calc(12.5px + 1.25vw);
  font-weight: bold;
  &:hover {
    color: ${(props) => props.theme.starFilled};
    opacity: 0.80;
  }
  cursor: pointer;
  z-index: 1;
`;

export default StarButton;
