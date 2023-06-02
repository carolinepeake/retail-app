import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Search from './reusable/Search';
import Button from './reusable/Button';

//TO-DO: add scroll event listener for nav sections

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
    <Background id="navbar" searchClosed={searchClosed}>

      <Logo modal>&#10058;</Logo>

      <GridItem onClick={() => toggleTheme()}>
        Toggle Dark Mode
      </GridItem>

      {navLinks.map((link) => (
        <GridItem
          key={link.label}
          data-target={link.target}
          onClick={(event) => scrollTo(event)}
          // href={`#${link.target}`}
        >
          {link.label}
        </GridItem>
      ))}

      <RightSide searchClosed={searchClosed}>
        <Search
          placeholder="Search..."
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searchClosed={searchClosed}
          clickHandler={clickHandler}
        />

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
          <GridItem secondary first onClick={() => toggleTheme()} isExpanded={isExpanded} style={{ borderTop: 'black solid 1px' }}>
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
              // href={`#${link.target}`}
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

const Background = styled.div`
  z-index: 50;
  position: sticky;
  top: 0;
  background-color: ${(props) => props.theme.navBgColor};
  color: ${(props) => props.theme.navFontColor};
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  font-weight: 700;
  font-stretch: ultra-condensed;
  font-size: clamp(0.875rem, calc(0.5rem + 0.75vw), 1.25rem);
  padding: 0.5em 5%;

  @media (min-width: 50rem) {
    padding: 0.75em 2.5%;
    flex-wrap: ${(props) => (props.searchClosed ? 'nowrap' : 'wrap')};
  };

  @media (min-width: 57rem) {
    flex-wrap: nowrap;
  };

  @media (min-width: 62rem) {
    padding: 0.75em 5%;
  };
`;

const Logo = styled(Button)`
    border: none;
    border-radius: 50px;
    margin: 0;
    background-color: ${(props) => props.theme.backgroundColor};
    color:  ${(props) => props.theme.navFontColor};
    &:hover {
      background-color: ${(props) => props.theme.secondaryBackgroundColor};
      color: ${(props) => props.theme.navActiveFontColor};
      box-shadow: initial;
    };
    font-size: calc(24px + 1.2vw);
    padding: 0px calc(4px + 0.25vw);

    @media (min-width: 900px) {
      padding: calc(1px + 0.5vw) calc(4px + 0.5vw);
      font-size: calc(10px + 1.2vw);
    };
`;

const GridItem = styled.div`
  @media (max-width: 50rem) {
    display: ${(props) => (props.isExpanded ? 'block' : 'none')};
  };
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: fit-content;
  padding: 0 0.25em;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
    color: ${(props) => props.theme.navActiveFontColor};
  };
  &:visited {
    color: ${(props) => props.theme.visitedColor};
  };

  ${(props) => props.secondary && css`
    font-size: calc(0.625em + 1vw);
    border-top: grey solid 1px;
    border-right: ${props.theme.fontColor} solid 1px;
    border-left: ${props.theme.fontColor} solid 1px;
    box-sizing: border-box;
    padding: 1em;
    width: 100%;
    text-align: left;
    background-color: ${props.theme.navBgColor};
    transition: transform 0.25s ease;
    &:hover {
      transform: scale(1.025);
      background-color: ${props.theme.submitButton};
      text-decoration: none;
      border: ${props.theme.fontColor} solid 1px;
    };
  `};
`;

const RightSide = styled.div`
  display: flex;
  align-items: flex-end;
  margin-left: 1em;
  width: fit-content;
  padding-top: 0.25em;
  padding-bottom: 0.25em;
  ${(props) => !props.searchClosed && css`
    width: 100%;
  `};

  @media (min-width: 50rem) {
    margin-left: 0.25em;
    width: 100%;
    padding-top: 0.75em;
    ${(props) => props.searchClosed && css`
      width: fit-content;
      padding-top: 0.25em;
    `};
  };

  @media (min-width: 57rem) {
    width: 10em;
    padding-top: 0.25em;
    ${(props) => props.searchClosed && css`
      width: fit-content;
    `};
  };

  @media (min-width: 65em) {
    width: 11em;
  };

  @media (min-width: 69em) {
    width: initial;
  };
`;

// positioning is a little off - change background color to see
const CollapsedNav = styled.button`
  border: none;
  border-radius: 5px;
  height: 2em;
  width: 2.5em;
  aspect-ratio: 1/1;
  background-color: transparent;
  align-self: center;
  padding: 0.25em;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-left: 1.0em;
  color: ${(props) => props.theme.navFontColor};
  opacity: 1.0;
  &:hover {
    opacity: 1.0;
    color: ${(props) => props.theme.navActiveFontColor};
  };
  ${(props) => props.searchClosed && css`
    margin-left: 0.5em;
  `};

  @media (min-width: 50rem) {
    display: none;
  };
`;
//color: ${(props) => props.theme.secondaryBackgroundColor};

// TO-DO: add animation to make expanding nav smooth
// TO-DO: collapse nav when click away

const ExpandedNav = styled.div`
  position: absolute;
  z-index: 5;
  display: flex;
  right: 5%;
  top: 40px;
  flex-direction: column;
  margin-top: 0.5%;
  border-bottom: ${(props) => props.theme.fontColor} solid 1px;
`;

const IconBar = styled.span`
  display: block;
  width: 2em;
  height: 0.25em;
  background-color: currentColor;
`;

export default NavBar;
