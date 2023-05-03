import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Search from './reusable/Search';
import Button from './reusable/Button';

function NavBar({ toggleTheme }) {
  NavBar.propTypes = {
    toggleTheme: PropTypes.func.isRequired,
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [searchClosed, setSearchClosed] = useState(true);

  const [isExpanded, setIsExpanded] = useState(false);
  const navLinks = [{ target: 'product-details', label: 'Product Details' }, { target: 'related-items', label: 'Related Items' }, { target: 'question-and-answers', label: 'Questions & Answers' }, { target: 'ratings-and-reviews', label: 'Ratings & Reviews' }];

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

  const clickHandler = (e) => {
    setSearchClosed((prev) => !prev);
    e.preventDefault();
  };

  return (
    <Background id="navbar">

      <Logo modal>&#10058;</Logo>

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

      <RightSide searchClosed={searchClosed}>
        <Search placeholder="Search..." searchTerm={searchTerm} setSearchTerm={setSearchTerm} searchClosed={searchClosed} setSearchClosed={setSearchClosed} clickHandler={clickHandler} />

        <CollapsedNav
          type="button"
          id="navbar-toggle"
          aria-controls="navbar-menu"
          aria-label="Toggle menu"
          aria-expanded="false"
          onClick={() => toggleNavbarVisibility()}
          searchClosed={searchClosed}
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
      </RightSide>

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
  height: auto;

  padding: 0.5rem 5%;

  display: flex;
    justify-content: space-between;
    align-content: center;
    align-items: center;
    font-weight: bold;

  @media (min-width: 700px) {
    padding: 0.75rem 2.5%;
  };

  @media (min-width: 900px) {
    padding: 0.75rem 5%;
  };
`;

const Logo = styled(Button)`
    border: none;
    border-radius: 50px;
    padding: 0px calc(4px + 0.25vw);
    margin: 0;
    font-size: calc(24px + 1.2vw);
    &:hover {
      background-color: ${(props) => props.theme.submitButton};
      color: ${(props) => props.theme.submitButtonFont};
      box-shadow: initial;
    };
    background-color: ${(props) => props.theme.submitButtonHoverFont};
    color:  ${(props) => props.theme.submitButtonHover};

    @media (min-width: 900px) {
      padding: calc(1px + 0.5vw) calc(4px + 0.5vw);
      font-size: calc(10px + 1.2vw);
      margin: initial;
    };

`;
// font-size: calc(28px + 1.2vw);

// breakpoint was previously 992 px
const GridItem = styled.div`
  @media (max-width: 700px) {
    display: ${(props) => (props.isExpanded ? 'block' : 'none')};
  };
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  };
  &:visited {
    text-decoration: ${(props) => props.theme.visitedColor}
  };
  font-size: calc(8px + .75vw);
  ${(props) => props.secondary && css`
    font-size: calc(10px + 1vw);
    border-bottom: currentColor solid 2px;
    padding: 5%;
    background-color: ${(props) => props.theme.navColor};
    transition: transform 0.25s ease;
    border-radius: ${(props) => props.i === props.navLinksLength - 1 && '0 0 5px 5px'};
    border-radius: ${(props) => props.first && '5px 5px 0 0'};
    &:hover {
      transform: scale(1.025);
      border-radius: 5px;
      border: currentColor solid 2px;
      border-top: currentColor solid 1px;
    };
  `};
`;

const RightSide = styled.div`
  width: fit-content;
  ${(props) => !props.searchClosed && css`
    width: 100%;
  `};
  display: flex;
  align-items: flex-end;
  margin-left: 1em;

  @media (min-width: 700px) {
    width: 150px;
    margin-left: 0px;
    ${(props) => props.searchClosed && css`
      margin-left: 0px;
      width: fit-content;
  `};
  };

  @media (min-width: 900px) {
    width: fit-content;
  };

`;
// width: 150px;
// @media (min-width: 700px) {
//   display: none;
// };
// positioning is a little off - change background color to see
const CollapsedNav = styled.button`
  @media (min-width: 700px) {
    display: none;
  };
  width: 25px;
  border: none;
  background-color: ${(props) => props.theme.submitButtonHoverFont};
  align-self: center;
  padding-left: 0;
  padding-right: 0px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  height: 20px;
  margin-left: 1.0em;

  ${(props) => props.searchClosed && css`
    margin-left: 0px;
  `};

`;
// margin-left: 2px;

const ExpandedNav = styled.div`
  position: absolute;
  z-index: 1;
  display: flex;
  right: 5%;
  top: 40px;
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
  background-color: ${(props) => props.theme.submitButtonHover};
`;

// text-indent: -999px;

export default NavBar;
