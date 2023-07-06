import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function StarButton({ setModal }) {
  function openModal() {
    setModal(true);
  }
  function closeModal() {
    setModal(false);
  }

  // function handleMouseEnter(e) {
  //   e.preventDefault();
  //   setStarType('&#9733;');
  // }

  // function handleMouseLeave(e) {
  //   setStarType(&#9734);
  //   e.preventDefault();
  // }

  return (
      <Button
        onClick={(e) => {
          e.stopPropagation();
          openModal();
        }}
        // onMouseEnter={(e) => handleMouseEnter(e)}
        // onMouseLeave={(e) => handleMouseLeave(e)}
      >
        {/* {starType} */}
        &#9733;
      </Button>
  );
}

StarButton.propTypes = {
  details: PropTypes.shape({
    name: PropTypes.string,
    category: PropTypes.string,
    id: PropTypes.number,
    price: PropTypes.string,
    features: PropTypes.arrayOf(
      PropTypes.shape({
        feature: PropTypes.string,
        value: PropTypes.string,
      }),
    ),
  }).isRequired,
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
  };
  cursor: pointer;
  z-index: 1;
`;

export default StarButton;
