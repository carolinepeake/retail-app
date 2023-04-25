import styled, { css } from 'styled-components';

const Button = styled.button`
  cursor: pointer;
  border: currentColor thin solid;
  border-radius: 5px;
  padding: calc(2px + 1.2vw) calc(8px + 1.2vw);
  font-size: calc(6px + 1.2vw);
  background-color: ${(props) => props.theme.secondaryColor};
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
    padding: calc(2px + 1.2vw) calc(6px + 1.2vw);
    background-color: ${(props) => props.theme.secondaryColor};
    color: ${(props) => props.theme.fontColor};
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
  // padding: calc(4px + 1.2vw) calc(10px + 1vw);
export default Button;

// cut from primary:
// border-radius: 10px;
// padding: calc(7.5px + 0.75vw);
