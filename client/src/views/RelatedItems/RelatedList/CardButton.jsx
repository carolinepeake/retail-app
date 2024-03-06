import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default function CardButton({
  handleClickIconBtn,
  icon,
  active,
}) {
  console.log('[StarButton] is running');

  if (icon === 'star') {
    return (
      <Button
        type="button"
        onClick={handleClickIconBtn}
        $active={active}
      >
        <svg fill="#000000" width="16px" height="16px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>bookmark</title> <path d="M26 0.75h-20c-0.69 0-1.25 0.56-1.25 1.25v0 28.178c0 0.496 0.289 0.924 0.707 1.126l0.007 0.003c0.157 0.076 0.341 0.121 0.536 0.121 0.301 0 0.577-0.107 0.793-0.285l-0.002 0.002 9.218-7.537 9.21 7.369c0.212 0.171 0.484 0.274 0.781 0.274 0.691 0 1.25-0.56 1.25-1.25v0-28c-0-0.69-0.56-1.25-1.25-1.25h-0zM24.75 27.398l-7.969-6.375c-0.212-0.17-0.484-0.273-0.78-0.273-0.302 0-0.578 0.107-0.794 0.284l0.002-0.002-7.959 6.508v-24.291h17.5z"></path> </g></svg>
      </Button>
    );
  }

  return (
    <Button
      type="button"
      onClick={handleClickIconBtn}
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

const Button = styled.button`
  position: absolute;
/*  top: 0;
  right: 0;
  margin-top: 2.5%;
  margin-right: 2.5%; */
  top: 0.5em;
  right: 0.5em;
  display: flex;
  align-items: center;
 /* padding-top: 0;
  padding-bottom: 0; */
  padding: 0;
  height: 2em;
  width: 2em;
/*  color: currentColor; */
  color: ${(props) => props.theme.backgroundColor};
  aspect-ratio: 1;
/*  background-color: ${(props) => props.theme.backgroundColor}; */
  background: rgba(55,78,78,0.2);
  border: none;
  border-radius: 50px;
  box-shadow: rgba(55,78,78,0.2) 5px 5px 15px;
  font-size: 1em;
  font-weight: bold;
  cursor: pointer;
  opacity: 0.80;
 /* z-index: 1; */
  &: after {
    ${(props) => props.$icon === 'star' && 'content: "☆"'};
    ${(props) => props.$active && 'content: "★"'};
    ${(props) => props.$icon === 'remove' && 'content: "✕"'};
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    background: rgba(255,255,255,0.3);
    border-radius: 50px;
  }
  &:hover {
  /* opacity: 0.80; */
   opacity: 1;
    &::after {
      ${(props) => props.$icon === 'star' && 'content: "★"'};
    }
  }
`;
