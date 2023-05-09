import styled, { css } from 'styled-components';

const Button = styled.button`
  cursor: pointer;
  border: currentColor thin solid;
  margin: 0.5em 0;
  font-family: futura-pt, sans-serif;
  font-style: normal;
  font-weight: 500;
  padding: 1em;
  font-size: ${(props) => props.theme.body};

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

  ${(props) => props.select && css`
    background-color: ${props.theme.backgroundColor};
    color: ${props.theme.fontColor};
  `};

  ${(props) => props.modal && css`
    &:hover {
      background-color: ${props.theme.submitButtonHover};
      color: ${props.theme.submitButtonHoverFont};
      box-shadow: initial;
    };
    background-color: ${props.theme.submitButton};
    color: ${props.theme.submitButtonFont};
  `};
`;

// font-size: 16px;

// @media (min-width: 600px) {
//   margin: 0;
//   font-size: calc(10px + 1vw);
// };

// @media (min-width: 1500px) {
//   font-size: 24px;
// };

// @media (min-width: 600px) {
//   margin: 0;
//   padding: calc(2px + 1.2vw) calc(8px + 1.2vw);
//   font-size: calc(6px + 1.2vw);
// };

// ${(props) => props.select && css`
// background-color: ${(props) => props.theme.secondaryColor};
// color: ${(props) => props.theme.fontColor};
// `};
//   // padding: calc(4px + 1.2vw) calc(10px + 1vw);
  // border-radius: 5px;
//   ${(props) => props.select && css`
//   padding: calc(2px + 1.2vw) calc(6px + 1.2vw);
//   background-color: ${(props) => props.theme.secondaryColor};
//   color: ${(props) => props.theme.fontColor};
// `};
export default Button;

// cut from primary:
// border-radius: 10px;
// padding: calc(7.5px + 0.75vw);
