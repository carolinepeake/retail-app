import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';
import styled, { css } from 'styled-components';

function NavBar({ toggleTheme }) {
  NavBar.propTypes = {
    toggleTheme: PropTypes.func.isRequired,
  };

  const [isExpanded, setIsExpanded] = useState(false);
  const navLinks = [{ target: 'product-details', label: 'Product Details' }, { target: 'related-items', label: 'Related Items' }, { target: 'question-and-answers', label: 'Questions and Answers' }, { target: 'ratings-and-reviews', label: 'Ratings and Reviews' }];

  // stop propagation?
  // https://www.aleksandrhovhannisyan.com/blog/responsive-navbar-tutorial/

  const toggleNavbarVisibility = () => {
    const isNavBarExpanded = !isExpanded;
    setIsExpanded(isNavBarExpanded);
    // navbarToggle.setAttribute("aria-expanded", isNavBarExpanded);
  };

  function scrollTo(event) {
    const scrollTarget = event.target.getAttribute('data-target');
    const target = document.getElementById(scrollTarget);
    target.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }

  return (
    <Background id="navbar">
      <CollapsedNav
        type="button"
        id="navbar-toggle"
        aria-controls="navbar-menu"
        aria-label="Toggle menu"
        aria-expanded="false"
        onClick={() => toggleNavbarVisibility()}
      >
        <IconBar />
        <IconBar />
        <IconBar />
        {isExpanded
        && (
        <ExpandedNav>
          <GridItem secondary first onClick={() => toggleTheme()} isExpanded={isExpanded} style={{ borderTop: 'black solid 2px' }}>
            Toggle Dark Mode
          </GridItem>
          {navLinks.map((link, i) => (
            <GridItem
              data-target={link.target}
              onClick={(event) => scrollTo(event)}
              isExpanded={isExpanded}
              secondary
              i={i}
              navLinksLength={navLinks.length}
            >
              {link.label}
            </GridItem>
          ))}
        </ExpandedNav>
        )}
      </CollapsedNav>
      <GridItem onClick={() => toggleTheme()}>
        Toggle Dark Mode
      </GridItem>
      {navLinks.map((link) => (
        <GridItem
          key={link.label}
          data-target={link.target}
          onClick={(event) => scrollTo(event)}
        >
          {link.label}
        </GridItem>
      ))}
      <Search>
        <Input />
        <FaSearch style={{ position: 'absolute', marginTop: '0.3%', marginLeft: '0.3%' }} />
      </Search>
    </Background>
  );
}

// navColor: '#3a4b53',
// navBarFont: '#fff',

const Background = styled.div`
  z-index: 5;
  position: sticky;
  top: 0;
  background-color: ${(props) => props.theme.navColor};
  color: ${(props) => props.theme.navBarFont};
  background-size: 100% 100%;
  background-repeat: no-repeat;
  display: grid;
  grid-template-columns: 14% 18% 18% 18% 18% 14%;
  justify-content: center;
  height: auto;

  @media (min-width: 600px) {
    grid-column: 1/4;
  }
`;

// TO-DO: decide grid or flex for x-large screens

const GridItem = styled.div`
  @media (max-width: 992px) {
    display: ${(props) => (props.isExpanded ? 'block' : 'none')};
  };
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  cursor: pointer;
  &:hover {
    font-weight: bold;
  };
  font-size: calc(8px + .75vw);
  ${(props) => props.secondary && css`
    font-size: calc(10px + 1vw);
    border-bottom: black solid 2px;
    padding: 5%;
    background-color: ${(props) => props.theme.navColor};
    transition: transform 0.25s ease;
    border-radius: ${(props) => props.i === props.navLinksLength - 1 && '0 0 5px 5px'};
    border-radius: ${(props) => props.first && '5px 5px 0 0'};
    &:hover {
      transform: scale(1.025);
      border-radius: 5px;
      border: black solid 2px;
      border-top: black solid 1px;
    };
  `};
`;

const Search = styled.div`
  display: block;
  cursor: pointer;
  &:hover {
    font-weight: bold;
  };
  font-size: calc(10px + 1vw);
  grid-column: 6/7;
  align-self: center;
  padding-right: 8px;
  padding-bottom: 3%;
`;

// positioning is a little off - change background color to see
const CollapsedNav = styled.button`
  @media (min-width: 992px) {
    display: none;
  };
  margin-bottom: 6%;
  width: 25px;
  height: 20px;
  margin-top: 3%;
  border: none;
  background-color: ${(props) => props.theme.navColor};
  align-self: center;
  padding-left: 6px;
`;
// margin-left: 2px;

const ExpandedNav = styled.div`
  position: absolute;
  z-index: 1;
  display: flex;
  left: 0.5%;
  flex-direction: column;
  margin-top: 0.5%;
  width: calc(250px + 0.5vw);
  border-radius: 5px;
  border-right: black solid 2px;
  border-left: black solid 2px;
`;

const IconBar = styled.span`
  display: block;
  width: 25px;
  height: 4px;
  margin: 2px 0px;
  background-color: ${(props) => props.theme.fontColor};
`;

// TO-DO: make bigger on focus (for mobile)
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
