import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';
import styled, { css } from 'styled-components';

function NavBar({ toggleTheme }) {
  NavBar.propTypes = {
    toggleTheme: PropTypes.func.isRequired,
  };

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
        <Input type="search" placeholder="Search..." />
        <SearchIcon type="submit">Search</SearchIcon>
        {/* <FaSearch style={{ position: 'absolute', marginTop: '0.3%', marginLeft: '0.3%' }} /> */}
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
  height: auto;
  padding: 0.75rem;
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  font-weight: bold;
`;

// breakpoint was previously 992 px
const GridItem = styled.div`
  @media (max-width: 900px) {
    display: ${(props) => (props.isExpanded ? 'block' : 'none')};
  };
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
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

// positioning is a little off - change background color to see
const CollapsedNav = styled.button`
  @media (min-width: 900px) {
    display: none;
  };
  width: 25px;
  height: 20px;
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

const Search = styled.form`
  display: flex;
  padding: 2px;
  border: 1px solid currentColor;
  border-radius: 5px;
  color: #555;
`;
// cursor: pointer;
// &:hover {
//   font-weight: bold;
// };
// font-size: calc(10px + 1vw);
// align-self: center;

// TO-DO: make bigger on focus (for mobile)
// const Input = styled.input`
//   background-color: ${(props) => props.theme.secondaryColor};
//   color: ${(props) => props.theme.fontColor};
//   border: ${(props) => props.theme.fontColor} 1px solid;
//   border-radius: 2.5%;
//   &:focus {
//     outline: none;
//   }
//   width: 70%;
//   font-size: large;
// `;

const Input = styled.input`
  border: none;
  background: transparent;
  margin: 0;
  padding: 7px 8px;
  font-size: 14px;
  color: inherit;
  border: 1px solid transparent;
  border-radius: inherit;
`;

// input[type="search"]::placeholder {
//   color: #bbb;
// }

// button[type="submit"] {

// }

// button[type="submit"]:hover {
//   opacity: 1;
// }

const SearchIcon = styled.button`
  text-indent: -999px;
  overflow: hidden;
  width: 40px;
  padding: 0;
  margin: 0;
  border: 1px solid transparent;
  border-radius: inherit;
  background: transparent url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E") no-repeat center;
  cursor: pointer;
  opacity: 0.7;
`;

export default NavBar;
