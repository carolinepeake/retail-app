import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ComparisonModal from './ComparisonModal';

function StarButton({ details }) {
  const [modal, setModal] = useState(false);
  // const [starType, setStarType] = useState('&#9734;');

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
    <>
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
      {modal
      && (
        <div>
          <ComparisonModal onClick={(e) => { e.stopPropagation(); }} details={details} />
          <ModalBackground onClick={(e) => { e.stopPropagation(); closeModal(); }} />
        </div>
      )}
    </>
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

const ModalBackground = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0%;
  top: 0%;
  z-index: 10;
`;

export default StarButton;
