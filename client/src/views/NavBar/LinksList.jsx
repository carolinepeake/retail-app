import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

function LinksList({ isExpanded = false, secondary = false }) {
  console.log('[LinksList] is running');

  LinksList.defaultProps = {
    secondary: false,
  };

  const NAV_LINKS = [{ target: 'product-details', label: 'Product Details' }, { target: 'related-items', label: 'Related Items' }, { target: 'question-and-answers', label: 'Questions & Answers' }, { target: 'ratings-and-reviews', label: 'Ratings & Reviews' }];

  return (
    <>
      {NAV_LINKS.map((link) => (
        <GridItem
          key={link.label}
          href={`#${link.target}`}
          secondary={secondary}
          isExpanded={isExpanded}
        >
          {link.label}
        </GridItem>
      ))}
    </>
  );
}

LinksList.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
  secondary: PropTypes.bool,
};

const GridItem = styled.a`
 /* font-family: futura-pt, sans-serif; */
  font-style: normal;
 /* font-weight: 700; */
  font-weight: 600;
  font-stretch: ultra-condensed;
  /* font-size: clamp(0.875rem, calc(0.5rem + 0.75vw), 1.25rem); */
  font-size: ${(props) => props.theme.body};
  font-size: ${(props) => props.theme.input};
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: fit-content;
  padding: 0 0.25em;
  cursor: pointer;
  &:link {
    color: ${(props) => props.theme.navFontColor};
   /* color:  ${(props) => props.theme.blue[5]}; */
    text-decoration: none;
  }
  &:visited {
    color: ${(props) => props.theme.visitedColor}; */
  }
  &:hover {
    text-decoration: underline;
   /* color: ${(props) => props.theme.navActiveFontColor}; */
  }
  &:active {
    color: ${(props) => props.theme.visitedColor}; */
  }
  @media (max-width: 50rem) {
      display: none;
    ${(props) => props.secondary && css`
    /*  display: ${props.isExpanded ? 'block' : 'none'}; */
      display: block;
   /*   font-size: calc(0.625em + 1vw); */
    /*  border-bottom: lightgrey solid 1px; */
      padding: 1em;
      width: 100%;
      text-align: left;
      font-size: 1em;
      line-height: 1em;
      font-weight: 300;
     /* background-color: ${props.theme.navBgColor}; */
      background-color: ${props.theme.backgroundColor};
     /* background-color: ${props.theme.blue[0]}; */
     border-radius: 3px;
      transition: transform 0.25s ease;
     /* &.last {
        border-bottom: none;
      } */

      &:hover {
      /*  transform: scale(1.025); */
      font-weight: 500;
        background-color: ${props.theme.submitButton};
       /* background-color: ${props.theme.blue[3]}; */
        text-decoration: none;
       /* border: ${props.theme.fontColor} solid 1px; */
      }
    `}
  };
`;

export default LinksList;
