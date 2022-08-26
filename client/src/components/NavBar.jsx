import React from 'react';
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';
import styled from 'styled-components';

function NavBar({ toggleTheme }) {
  NavBar.propTypes = {
    toggleTheme: PropTypes.func.isRequired,
  };

  function scrollTo(event) {
    const scrollTarget = event.target.getAttribute('data-target');
    const target = document.getElementById(scrollTarget);
    target.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }

  return (
    <Background id="navbar">
      <GridItem onClick={() => toggleTheme()}>
        Toggle Dark Mode
      </GridItem>
      <GridItem
        data-target="product-details"
        onClick={(event) => scrollTo(event)}
        value="ProductDetails"
      >
        Product Details
      </GridItem>
      <GridItem
        data-target="related-items"
        onClick={(event) => scrollTo(event)}
      >
        Related Items
      </GridItem>
      <GridItem
        data-target="question-and-answers"
        onClick={(event) => scrollTo(event)}
      >
        Questions & Answers
      </GridItem>
      <GridItem
        data-target="ratings-and-reviews"
        onClick={(event) => scrollTo(event)}
      >
        Ratings & Reviews
      </GridItem>
      <GridItem>
        <Input />
        <FaSearch />
      </GridItem>
    </Background>
  );
}

// navColor: '#3a4b53',
// navBarFont: '#fff',

const Background = styled.div`
  z-index: 1;
  position: sticky;
  top: 0;
  background-color: ${(props) => props.theme.navColor};
  color: ${(props) => props.theme.navBarFont};
  background-size: 100% 100%;
  background-repeat: no-repeat;
  grid-column: 1/13;
  display: grid;
  grid-template-columns: 14% 18% 18% 18% 18% 14%;
  justify-content: center;
  height: auto;
  // margin-bottom: 10px;
`;

const GridItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  cursor: pointer;
  &:hover {
    font-weight: bold;
  }
`;

const Input = styled.input`
  background-color: ${(props) => props.theme.secondaryColor};
  color: ${(props) => props.theme.fontColor};
  border: 2 px solid;
  &:focus {
    outline: none;
  }
  width: 60%;
`;

export default NavBar;
