import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

function DropdownChevron({ dropdownOpened }) {
  return (
    <DropdownIcon dropdownOpened={dropdownOpened}>
      &#8964;
    </DropdownIcon>
  );
}

DropdownChevron.propTypes = {
  dropdownOpened: PropTypes.bool,
};

DropdownChevron.defaultProps = {
  dropdownOpened: false,
};

const DropdownIcon = styled.div`
  font-size: 2em;
  opacity: 0.7;
  height: 1em;
  width: 1em;
  position: relative;
  bottom: 0.25em;
  font-weight: 400;
  line-height: 1em;
  ${(props) => props.dropdownOpened && css`
    transform: translateY(0.5em) rotateX(-180deg);
    opacity: 1;
  `};

  @media (min-width: 600px) AND (max-width: 700px) {
    width: 0.5em;
  }
`;

export default DropdownChevron;
