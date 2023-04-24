import styled, { css } from 'styled-components';

const Button = styled.button`
  padding: calc(2px + 1.2vw) calc(8px + 1.2vw);
  font-size: calc(8px + 1.2vw);
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  border: currentColor thin solid;
  border-radius: 5px;
  background-color: ${(props) => props.theme.secondaryColor};
  color: ${(props) => props.theme.fontColor};
  ${(props) => props.primary && css`
    padding: calc(2px + 1.2vw) calc(6px + 1.2vw);
    font-size: calc(6px + 1.2vw);
  `}
  ${(props) => props.modal && css`
    &:hover {
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    };
  `}
  ${(props) => props.load && css`
    &:hover {
      background-color: ${props.theme.fontColor};
      color: ${props.theme.secondaryColor};
    };
  `}
`;
  // padding: calc(4px + 1.2vw) calc(10px + 1vw);
export default Button;

// cut from primary:
// border-radius: 10px;
// padding: calc(7.5px + 0.75vw);
