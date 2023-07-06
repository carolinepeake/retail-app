import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Button } from './Button';

// To-DO: replace '+' and '-' with unicode characters

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
          ? <Icon>&#9532;</Icon>
          : <Icon>&#9472;</Icon>}
      </Header>
      <Content collapsed={collapsed}>
        {children}
      </Content>
    </Container>
  );
}

const Container = styled.div`
  border-top: lightgrey solid thin;
  &:last-child {
    ${(props) => !props.collapsed && css`
      border-bottom: lightgrey solid thin;
    `};
  };
`;

const Header = styled(Button)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 3em;
  align-items: center;
  border: none;
  &:hover {
    box-shadow: none;
  };
  padding-left: 0;
  padding-right: 0;
  font-size: 1em;
  font-weight: 300;
  ${(props) => !props.collapsed && css`
    margin-bottom: 0px
  `};
`;

const Content = styled.div`
  font-size: 0.83em;
  ${(props) => props.collapsed && css`
    display: none;
  `};
`;

const Icon = styled.span`
  font-size: ${(props) => props.theme.tertiary};
`;

export default Collapsable;
