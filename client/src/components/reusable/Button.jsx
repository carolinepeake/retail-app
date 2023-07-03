import styled, { css } from 'styled-components';

// To-DO: make reusable styles for all diff clickable components

const Button = styled.button`
  border: currentColor thin solid;
  margin: 0.5em 0;
  padding: 1em;
  font-size: ${(props) => props.theme.body};
  font-weight: 500;
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.fontColor};
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  };

  ${(props) => props.disabled && css`
    cursor: default;
    background-color: ${props.theme.disabledButton};
    &:hover {
      box-shadow: initial;
    };
  `};

  /* can delete */
  ${(props) => props.select && css`
    background-color: ${props.theme.backgroundColor};
    color: ${props.theme.fontColor};
  `};

  ${(props) => props.modal && css`
    background-color: ${props.theme.submitButton};
    color: ${props.theme.submitButtonFont};
    &:hover {
      background-color: ${props.theme.submitButtonHover};
      color: ${props.theme.submitButtonHoverFont};
      box-shadow: initial;
    };
  `};

  ${(props) => props.close && css`
    position: absolute;
    right: 0.5em;
    top: 0.5em;
    z-index: 22;
    color: ${props.theme.darkBlueHover};
    background-color: transparent;
    &:hover {
      box-shadow: none;
      transform: scale(1.05);
      transition: scale 0.2s ease;
      font-weight: 600;
    };
    font-size: 1.5em;
    display: inline-flex;
    border: none;
    width: 1.5em;
    height: 1.5em;
    line-height: 1.5em;
    border-radius: 5px;
    aspect-ratio: 1/1;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0.5em;
  `};
`;
// background-color: ${props.theme.iconHoverBackgroundColor};
// color: ${props.theme.fontColor};
export default Button;
// background-color: ${(props) => props.theme.navBgColor};

