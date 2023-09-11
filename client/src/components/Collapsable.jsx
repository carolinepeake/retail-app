import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Button } from './Buttons';

function Collapsable({ children, header }) {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Container>
      <Header
        type="button"
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
  border-top: ${(props) => props.theme.lightBorder};
  &:last-child {
    border-bottom: ${(props) => props.theme.lightBorder};
  };
`;

const Header = styled(Button)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 4em;
  align-items: center;
  border: none;
  &:hover {
    box-shadow: none;
  }
  font-size: 1em;
  font-weight: 300;
  margin: 0;
  padding: 1.5em 0;
`;

const Content = styled.div`
  font-size: 0.83em;
  margin-bottom: 1.5rem;
  ${(props) => props.collapsed && css`
    display: none;
  `};
`;

const Icon = styled.span`
  font-size: ${(props) => props.theme.tertiary};
`;

export default Collapsable;
