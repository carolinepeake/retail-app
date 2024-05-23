import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Button } from './Buttons';

function Collapsable({ children, header }) {
  const [collapsed, setCollapsed] = useState(true);

  // TODO: make stroke dark blue and strokeWidth 0.5 for screens wider than 600px

  return (
    <Container collapsed={collapsed}>
      <Header
        type="button"
        onClick={() => setCollapsed((prevCollapsed) => !prevCollapsed)}
      >
        <span>{header}</span>
        {collapsed
          ? (
            <Icon>
              {/* &#9532; */}
              <svg viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="purple">
                <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.24000000000000005" />
                <g id="SVGRepo_iconCarrier">
                  <path d="M12.75 11.25V5C12.75 4.80109 12.671 4.61032 12.5303 4.46967C12.3897 4.32902 12.1989 4.25 12 4.25C11.8011 4.25 11.6103 4.32902 11.4697 4.46967C11.329 4.61032 11.25 4.80109 11.25 5V11.25H5C4.80109 11.25 4.61032 11.329 4.46967 11.4697C4.32902 11.6103 4.25 11.8011 4.25 12C4.25 12.1989 4.32902 12.3897 4.46967 12.5303C4.61032 12.671 4.80109 12.75 5 12.75H11.25V19C11.2526 19.1981 11.3324 19.3874 11.4725 19.5275C11.6126 19.6676 11.8019 19.7474 12 19.75C12.1989 19.75 12.3897 19.671 12.5303 19.5303C12.671 19.3897 12.75 19.1989 12.75 19V12.75H19C19.1989 12.75 19.3897 12.671 19.5303 12.5303C19.671 12.3897 19.75 12.1989 19.75 12C19.7474 11.8019 19.6676 11.6126 19.5275 11.4725C19.3874 11.3324 19.1981 11.2526 19 11.25H12.75Z" fill="#000000" />
                </g>
              </svg>
            </Icon>
          )
          : (
            <Icon>
              {/* &#9472; */}
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                <g id="SVGRepo_iconCarrier">
                  <path d="M20 13H4C3.73478 13 3.48043 12.8946 3.29289 12.7071C3.10536 12.5196 3 12.2652 3 12C3 11.7348 3.10536 11.4804 3.29289 11.2929C3.48043 11.1054 3.73478 11 4 11H20C20.2652 11 20.5196 11.1054 20.7071 11.2929C20.8946 11.4804 21 11.7348 21 12C21 12.2652 20.8946 12.5196 20.7071 12.7071C20.5196 12.8946 20.2652 13 20 13Z" fill="#000000" />
                </g>
              </svg>
            </Icon>
          )}
      </Header>
      <Content collapsed={collapsed}>
        {children}
      </Content>
    </Container>
  );
}

const Container = styled.div`
  border: none;
  background-color:  ${(props) => props.theme.backgroundColor};
  border-radius: 15px;
  margin-top: 0.5em;
  padding-bottom: 1rem;

  &:hover {
    box-shadow: rgba(0,0,0,0.25) 0px 5px 10px;
  }

  ${(props) => props.collapsed && css`
    padding-bottom: 0;
`};

  @media (min-width: 600px) {
    border-top: ${(props) => props.theme.lightBorder};
    &:last-child {
      border-bottom: ${(props) => props.theme.lightBorder};
    };
    border-radius: 0px;
    margin-top: 0px;
    padding-bottom: 0;

    &:hover {
      box-shadow: none;
    }
  }
`;

const Header = styled(Button)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 4em;
  align-items: center;
  border: none;

  font-size: 1em;
  font-weight: 500;
  margin: 0;
  background-color: inherit;
  border-radius: inherit;
  padding: 1.5em 1em;

  @media (min-width: 600px) {
    font-weight: 400;
    padding: 1.5em 0;
   /* margin: 0.5em 0;
    padding: 1em; */
  }
`;

//  TODO: make light faint purple for background under 600px

const Content = styled.div`
  font-size: ${(props) => props.theme.tertiary}; /* 0.83em; */
  margin: 0 1rem;
  border-radius: inherit;
  padding: 1rem;
  background-color: rgba(209,217,235, 0.2); /* maybe don't use diff bg color if no specific purpose for it (and if not applied consistently across screen widths) */

  ${(props) => props.collapsed && css`
    display: none;
  `};

  @media (min-width: 600px) {
  /*  border-radius: 5px; */
    margin: 0 0 1.5em 0;
   /* padding: 1em; */
    padding: 0 0.5em;
  /*  background-color: inherit; */
    background-color: transparent;
  }
`;

const Icon = styled.span`
 width: 2em;
 height: 2em;
 /* make stroke purple */

 @media (min-width: 600px) {
  /* make stroke-width thinner and blue */
  /* font-size: ${(props) => props.theme.tertiary}; ? */
  width: 1.5em;
  height: 1.5em;
}
`;

export default Collapsable;
