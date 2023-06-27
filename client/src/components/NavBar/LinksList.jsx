import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

function LinksList({ toggleTheme, isExpanded = false, secondary = false }) {
  LinksList.propTypes = {
    toggleTheme: PropTypes.func.isRequired,
    isExpanded: PropTypes.bool.isRequired,
    secondary: PropTypes.bool,
  };

  LinksList.defaultProps = {
    secondary: false,
  };

  const navLinks = [{ target: 'product-details', label: 'Product Details' }, { target: 'related-items', label: 'Related Items' }, { target: 'question-and-answers', label: 'Questions & Answers' }, { target: 'ratings-and-reviews', label: 'Ratings & Reviews' }];

  // stop propagation?
  // https://www.aleksandrhovhannisyan.com/blog/responsive-navbar-tutorial/

  return (
    <>
      {navLinks.map((link) => (
        <GridItem
          key={link.label}
          href={`#${link.target}`}
          secondary={secondary}
          isExpanded={isExpanded}
        >
          {link.label}
        </GridItem>
      ))}

      <GridItem
        onClick={() => toggleTheme()}
        secondary={secondary}
        isExpanded={isExpanded}
        className="last"
      >
        Toggle Dark Mode
      </GridItem>
    </>
  );
}

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
      display: none;
    ${(props) => props.secondary && css`
      display: ${props.isExpanded ? 'block' : 'none'};
      font-size: calc(0.625em + 1vw);
      border-bottom: grey solid 1px;
      padding: 1em;
      width: 100%;
      text-align: left;
      background-color: ${props.theme.navBgColor};
      transition: transform 0.25s ease;
      &.last {
      border-bottom: none;
      }
      &:hover {
        transform: scale(1.025);
        background-color: ${props.theme.submitButton};
        text-decoration: none;
        border: ${props.theme.fontColor} solid 1px;
      }
    `}
  };
`;

export default LinksList;
