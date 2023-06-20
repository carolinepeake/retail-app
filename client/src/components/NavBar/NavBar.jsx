import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Search from '../reusable/Search';
import Button from '../reusable/Button';
import LinksList from './LinksList';
// import ConditionalWrapper from '../reusable/ConditionalWrapper';

// TO-DO: add scroll event listener for nav sections
// TO-DO: add animation to make expanding nav smooth
// TO-DO: collapse nav when click away

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
    setIsExpanded((prev) => !prev);
    // console.log('toggling nav');
  };

  const toggleSearchBarVisibility = (e) => {
    e.preventDefault();
    setSearchClosed((prev) => !prev);
  };

  function closeModal(event) {
    event.preventDefault();
    if (event.target.id === 'appBackground') {
      console.log('closing nav');
      setIsExpanded(() => false);
    }
  }

  return (
    <Background id="navbar" searchClosed={searchClosed}>

      <Logo modal>&#10058;</Logo>

      <LinksList isExpanded={isExpanded} toggleTheme={toggleTheme} />

      {/* {navLinks.map((link) => (
        <GridItem
          key={link.label}
          href={`#${link.target}`}
          isExpanded={isExpanded}
        >
          {link.label}
        </GridItem>
      ))}

      <GridItem
        onClick={() => toggleTheme()}
        isExpanded={isExpanded}
      >
        Toggle Dark Mode
      </GridItem> */}

      <RightSide searchClosed={searchClosed}>
        <Search
          placeholder="Search..."
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searchClosed={searchClosed}
          clickHandler={toggleSearchBarVisibility}
        />

        <CollapsedNav
          type="button"
          id="navbar-toggle"
          aria-controls="navbar-menu"
          aria-label="Toggle menu"
          aria-expanded={isExpanded}
          onClick={() => toggleNavbarVisibility()}
          searchClosed={searchClosed}
        >
          <IconBar />
          <IconBar />
          <IconBar />
          {isExpanded
        && (
        <ExpandedNav>
          {/* {navLinks.map((link) => (
            <GridItem
              key={link.label}
              href={`#${link.target}`}
              secondary
              isExpanded={isExpanded}
            >
              {link.label}
            </GridItem>
          ))}

          <GridItem
            onClick={() => toggleTheme()}
            secondary
            isExpanded={isExpanded}
            className="last"
          >
            Toggle Dark Mode
          </GridItem> */}
          <LinksList isExpanded={isExpanded} toggleTheme={toggleTheme} secondary />
        </ExpandedNav>
        )}
        </CollapsedNav>
      </RightSide>

      {isExpanded
      && (
      <AppBackground
        id="appBackground"
        onClick={(event) => closeModal(event)}
        // onClick={(e) => toggleNavbarVisibility(e)}
      />
      )}

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

const GridItem = styled.a`
  font-family: futura-pt, sans-serif;
  font-style: normal;
  font-weight: 700;
  font-stretch: ultra-condensed;
  font-size: clamp(0.875rem, calc(0.5rem + 0.75vw), 1.25rem);
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: fit-content;
  padding: 0 0.25em;
  cursor: pointer;
  &:link {
    color: ${(props) => props.theme.navFontColor};
    text-decoration: none;
  };
  &:visited {
    color: ${(props) => props.theme.visitedColor};
  };
  &:hover {
    text-decoration: underline;
    color: ${(props) => props.theme.navActiveFontColor};
  };
  &:active {
    color: ${(props) => props.theme.visitedColor};
  };
  @media (max-width: 50rem) {
    display: ${(props) => (props.isExpanded ? 'block' : 'none')};
    font-size: calc(0.625em + 1vw);
    border-bottom: grey solid 1px;
    padding: 1em;
    width: 100%;
    text-align: left;
    background-color: ${(props) => props.theme.navBgColor};
    transition: transform 0.25s ease;
    &.last {
     border-bottom: none;
    }
    &:hover {
      transform: scale(1.025);
      background-color: ${(props) => props.theme.submitButton};
      text-decoration: none;
      border: ${(props) => props.theme.fontColor} solid 1px;
    }
  };
`;
// @media (max-width: 50rem) {

//   font-size: calc(0.625em + 1vw);
//   border-bottom: grey solid 1px;
//   padding: 1em;
//   width: 100%;
//   text-align: left;
//   background-color: ${(props) => props.theme.navBgColor};
//   transition: transform 0.25s ease;
//   &.last {
//    border-bottom: none;
//   }
//   &:hover {
//     transform: scale(1.025);
//     background-color: ${(props) => props.theme.submitButton};
//     text-decoration: none;
//     border: ${(props) => props.theme.fontColor} solid 1px;
//   }
// };

const Logo = styled(Button)`
  position: relative;
  z-index: 6;
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
// z-index: 49;
// position: relative;

const AppBackground = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  left: 0%;
  top: 0%;
  z-index: 4;
  background-color: rgba(0, 0, 0, 0);
`;

const ExpandedNav = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 5;
  right: 5%;
  top: 100%;
  width: 20em;
  max-width: 85vw;
  border-bottom: ${(props) => props.theme.fontColor} solid 1px;
  border-top: ${(props) => props.theme.fontColor} solid 1px;
  background-color: ${(props) => props.theme.navBgColor};
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-right: ${(props) => props.theme.fontColor} solid 1px;
  border-left: ${(props) => props.theme.fontColor} solid 1px;
  @media (min-width: 50rem) {
    display: none;
  }
`;
// @media (min-width: 50rem) {
//   flex-direction: row;
//   justify-content: space-evenly;
//   margin-left: 9.5px;
//   position: static;
//   width: 100%;
//   border: none;
//   box-shadow: none;
// }

// width: minmax(300px 20em 90vw);

const IconBar = styled.span`
  display: block;
  width: 2em;
  height: 0.25em;
  background-color: currentColor;
`;

export default NavBar;
