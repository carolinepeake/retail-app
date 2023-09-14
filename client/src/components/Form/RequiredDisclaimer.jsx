import React from 'react';
import styled from 'styled-components';

export default function RequiredDisclaimer() {
  return (
    <StyledParagraph>Required fields are marked with  *</StyledParagraph>
  );
}

const StyledParagraph = styled.p`
  padding: 0.5em 0;
  border-top: ${(props) => props.theme.lightBorder};
  border-bottom: ${(props) => props.theme.lightBorder};
  margin-bottom: 2em;
`;
