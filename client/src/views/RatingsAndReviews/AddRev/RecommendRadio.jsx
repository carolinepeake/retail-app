// const radioButtons = Object.entries(characteristic?.values).map(([value, label]) => (
// will want to separate into new component and useId to make unique ids
import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

export default function RecommendRadio({
  value,
  handleChange,
  checked,
  label,
  name,
  required,
  selected,
}) {
  return (
    <Radio
      required={required}
      value={value}
      checked={checked}
      type="radio"
      name={name}
      onChange={handleChange}
      label={label}
      aria-label={label}
      $selected={selected}
    />
  );
}

RecommendRadio.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  handleChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  selected: PropTypes.bool,
};

RecommendRadio.defaultProps = {
  required: false,
  selected: false,
};

const Radio = styled.input`
  appearance: none;
  border: 1px ${(props) => props.theme.blue[5]} solid;
  height: 4em;
  aspect-ratio: 1;
  border-radius: 3px;
  margin: 0;
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.blue[5]};
  overflow: visible;
  font-weight: 400;
  ${(props) => props.name === 'rating' && css`
    background-color: ${props.theme.navBgColor};
  `}

  &::after {
    content: '${(props) => props.label}';
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: inherit;
    font-weight: inherit;
    border-radius: inherit;
    border: none;
    ${(props) => props.name === 'rating' && css`
      color: inherit;
      content: '☆';
      font-size: 2em;
      line-height:1em;
    `};
  }

 ${(props) => props.name === 'rating' && props.$selected && css`
    &::after {
      content: '★';
      color: ${props.theme.backgroundColor};
      background-color: ${props.theme.blue[5]};
      border: none;
    }
`};

  &:hover {
    cursor: pointer;
    font-weight: 500;
    border: 2px currentColor solid;
    ${(props) => props.name === 'rating' && css`
      border: none;
      &::after {
        content: '★';
        color: ${props.theme.backgroundColor};
        background-color: ${props.theme.blue[5]};
        border: none;
      }
      & ~ input {
        &::after {
          background-color: ${props.theme.blue[5]};
          color: ${props.theme.backgroundColor};
          content: '★';
          border: none;
        }
      }
    `};
  }

  &:checked {
    background-color: ${(props) => props.theme.blue[5]};
    color: ${(props) => props.theme.backgroundColor};

    ${(props) => props.name === 'rating' && css`
     background-color: ${props.theme.blue[5]};
     color: ${props.theme.backgroundColor};
   `};

    &:hover {
      color: ${(props) => props.theme.backgroundColor};
      background-color:  ${(props) => props.theme.blue[5]};
      border: 1px ${(props) => props.theme.blue[5]} solid;
      border-radius: 3px;

    ${(props) => props.name === 'rating' && css`
      & ~ &:before {
        background-color:  ${props.theme.blue[5]};
        border: none;
      }
      background-color: ${props.theme.blue[5]};
      color: ${props.theme.backgroundColor};
    `};
    }
  }

  &:active {
    transform: scale(1.01);
    transition: scale 0.2s ease;
  }

  &:focus-visible {
    outline-color: ${(props) => props.theme.focusColor};
    outline-width: 1.5px;
    outline-style: dashed;
    outline-offset: 3px;
  }
`;
