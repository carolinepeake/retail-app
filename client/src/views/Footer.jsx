import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function Footer() {
  console.log('[Footer] is running');

  return (
    <Container>
      <Brand>Caroline Peake</Brand>
      <div>
        <UtilityLink>Github</UtilityLink>
        <UtilityLink>LinkedIn</UtilityLink>
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 7em;
  padding: 0 5%;
  background-color: ${(props) => props.theme.navBgColor};
  background-color: ${(props) => props.theme.blue[5]};
  color: ${(props) => props.theme.minorFontColor};
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
`;

const Brand = styled.span`
  color: ${(props) => props.theme.backgroundColor};
`;

const UtilityLink = styled.span`
  color: lightgrey;
  padding-left: 1em;
 /* font-size: ${(props) => props.theme.tertiary}; */
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
