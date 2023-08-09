// import React from 'react';
import styled, { css } from 'styled-components';

export const Button = styled.button`
  border: currentColor thin solid;
  margin: 0.5em 0;
  padding: 1em;
  font-size: ${(props) => props.theme.body};
  font-weight: 500;
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.fontColor};
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }

  ${(props) => props.disabled && css`
    cursor: default;
    background-color: ${props.theme.disabledButton};
    &:hover {
      box-shadow: initial;
    }
  `};

  ${(props) => props.$primary && css`
    background-color: ${props.theme.submitButton};
    color: ${props.theme.submitButtonFont};
    &:hover {
      background-color: ${props.theme.submitButtonHover};
      color: ${props.theme.submitButtonHoverFont};
      box-shadow: initial;
    }
  `};
`;

export const CloseButton = styled.button.attrs(() => ({
  type: 'text',
}))`
  position: absolute;
  right: 0.5em;
  top: 0.5em;
  z-index: 3;
  border: none;
  aspect-ratio: 1;
 ${(props) => props.$round && css`
    color: black;
    background-color: white;
    opacity: 0.8;
    display: block;
    border-radius: 50px;
    padding: 0;
    line-height: 1;
    font-size: 1em;
    height: 2em;
    align-self: center;

    &:hover {
      opacity: 1;
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }

    @media (min-width: 700px) {
      font-size: 1.17em;
    }

    @media (min-width: 800px) {
      font-size: 1.5em;
    }
  `};

  ${(props) => props.$square && css`
    color: ${props.theme.darkBlueHover};
    background-color: transparent;
    display: inline-flex;
    font-size: 1.5em;
    font-weight: 500;
    width: 1.5em;
    height: 1.5em;
    line-height: 1.5em;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0.5em;

    &:hover {
      box-shadow: none;
      transform: scale(1.05);
      transition: scale 0.2s ease;
      font-weight: 600;
      background-color: rgba(190,203,210,0.3);
    }
  `};
`;

// icon?
// background-color: ${props.theme.iconHoverBackgroundColor};
// color: ${props.theme.darkBlueHover};
// background-color: ${(props) => props.theme.navBgColor};
