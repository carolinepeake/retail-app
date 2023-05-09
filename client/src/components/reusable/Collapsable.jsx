import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import Button from './Button';

function Collapsable({ children, header }) {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Container>
      <Header
        type="button"
        collapsed={collapsed}
        onClick={() => setCollapsed((prevCollapsed) => !prevCollapsed)}
      >
        <span>{header}</span>
        {collapsed
          ? <span>+</span>
          : <span>-</span>}
      </Header>
      <Content collapsed={collapsed}>
        {children}
      </Content>
    </Container>
  );
}

const Container = styled.div`
  border-top: grey solid thin;
  &:last-child {
    ${(props) => !props.collapsed && css`
      border-bottom: grey solid thin;
    `};
  };
`;

const Header = styled(Button)`
  background-color: ${(props) => props.theme.backgroundColor};
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 3em;
  align-items: center;
  border: none;
  &:hover {
    box-shadow: none;
  };
  padding-left: 0px;
  padding-right: 0px;
`;
// &::after {
//   content: '\02795';
//   font-size: 13px;
//   color: ${(props) => props.theme.fontColor};
//   float: right;
//   margin-left: 5px;
// };
// content: ${(props) => props.collapsed ? ' "\02795" ' : ' "\2796" '};

// padding: 18px;
// text-align: left;
// outline: none;
// font-size: 15px;
// cursor: pointer;

// @media (min-width: 900px) {
//   display: none;
// };

const Content = styled.div`

  ${(props) => props.collapsed && css`
    display: none;
  `};
`;

// @media (min-width: 900px) {
//   display: block;
// };

export default Collapsable;
