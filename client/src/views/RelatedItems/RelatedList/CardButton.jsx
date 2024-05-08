import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { RoundCloseButton } from '../../../components/Buttons';

export default function CardButton({
  handleClickIconBtn,
  index,
  icon,
  active,
}) {
  console.log('[StarButton] is running');

  return (
    <Button
      type="button"
      index={index}
      onClick={(e) => handleClickIconBtn(e, index)}
      $icon={icon}
      $active={active}
    />
  );
}

CardButton.propTypes = {
  handleClickIconBtn: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  active: PropTypes.bool,
};

CardButton.defaultProps = {
  active: false,
};

const Button = styled(RoundCloseButton)`

  display: flex;
  align-items: center;

  font-weight: bold; /* 500? */

  z-index: 10;
  opacity: 0.5;

  &: after {
    ${(props) => props.$icon === 'star' && 'content: "☆"'};
  /*  ${(props) => props.$active && 'content: "★"'}; */
    ${(props) => props.$icon === 'remove' && 'content: "✕"'};

    align-items: center;
    justify-content: center;
    width: 100%;
  }

  &:hover {
   opacity: 0.9;
   box-shadow: rgba(55,78,78,0.2) 5px 5px 15px;

    &::after {
      ${(props) => props.$icon === 'star' && 'content: "★"'};
    }
  }

  @media (max-width: 5000px) {
    font-size: 1em;
  }
`;
