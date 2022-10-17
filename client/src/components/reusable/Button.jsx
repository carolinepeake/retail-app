import styled, { css } from 'styled-components';


const Button = styled.button`
    padding: calc(7.5px + 0.75vw) calc(10px + 1vw);
    font-size: calc(10px + 1vw);
    cursor: pointer;
    ${props => props.primary && css`
    border-radius: 10px;
    padding: calc(7.5px + 0.75vw);
    &:hover {
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    };
  `}
  `;

  export default Button;

