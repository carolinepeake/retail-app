import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default function CharacterCount({
  characterLimit,
  charactersUsed,
}) {
  return (
    <StyledCharacterCount>
      {characterLimit - charactersUsed}
      &nbsp;
      /
      &nbsp;
      {characterLimit}
    </StyledCharacterCount>
  );
}

CharacterCount.propTypes = {
  characterLimit: PropTypes.number.isRequired,
  charactersUsed: PropTypes.number.isRequired,
};

const StyledCharacterCount = styled.h5`
  font-style: oblique;
  padding-top: 0;
  display: flex;
  flex-direction: row-reverse;
`;
