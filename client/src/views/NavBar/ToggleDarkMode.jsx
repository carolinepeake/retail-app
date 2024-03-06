import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

export default function ToggleDarkMode({ toggleTheme, isExpanded = false, secondary = false }) {
  console.log('[ToggleDarkMode] is running');

  return (
    <GridItem
      onClick={toggleTheme}
      secondary={secondary}
      isExpanded={isExpanded}
    >
      Toggle Dark Mode
    </GridItem>
  );
}

ToggleDarkMode.propTypes = {
  toggleTheme: PropTypes.func.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  secondary: PropTypes.bool,
};

ToggleDarkMode.defaultProps = {
  secondary: false,
};

const GridItem = styled.span`
  font-weight: 600;
  font-stretch: ultra-condensed;
  font-size: ${(props) => props.theme.input};
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: fit-content;
  padding: 0 0.25em;
  cursor: pointer;
  color: ${(props) => props.theme.navFontColor};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  &:active {
    color: ${(props) => props.theme.visitedColor};
  }

  @media (max-width: 50rem) {
    display: none;
    ${(props) => props.secondary && css`
      display: block;
      padding: 1em;
      width: 100%;
      text-align: left;
      font-size: 1em;
      line-height: 1em;
      font-weight: 300;
      background-color: ${props.theme.backgroundColor};
      border-radius: 3px;
      transition: transform 0.25s ease;

      &:hover {
        font-weight: 500;
        background-color: ${props.theme.submitButton};
        text-decoration: none;
      }
    `}
  };
`;
