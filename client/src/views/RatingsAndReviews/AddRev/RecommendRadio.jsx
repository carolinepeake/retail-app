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
      aria-checked={checked}
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
  checked: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  selected: PropTypes.bool,
};

RecommendRadio.defaultProps = {
  required: false,
  selected: false,
  label: '',
  checked: false,
};

const Radio = styled.input`
  appearance: none;
  color: ${(props) => props.theme.blue[4]}; /* or inherit or declare form accent or array of form accent colors in theme */
  background: ${(props) => props.theme.backgroundColor};
  border: 1px ${(props) => props.theme.blue[4]} solid;
  height: 4em;
  aspect-ratio: 1;
  border-radius: 3px;
  margin: 0;
  overflow: visible;
  font-weight: 400;
  cursor: pointer;
  position: relative;
  transition: all 0.15s linear;

  &::after {
    content: '${(props) => (props.name === 'rating' ? '☆' : props.label)}';
    font-size: ${(props) => (props.name === 'rating' ? '2em' : '1.5em')};
    line-height: 1em;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    font-weight: inherit;
    border-radius: inherit;
    border: none;
    color: inherit;
  }

  ${(props) => (props.name === 'rating' && props.$selected) && css`
    background-color: ${props.theme.blue[4]};
    color: ${props.theme.backgroundColor};

    &::after {
      content: '★';
    }

    & ~ input {
      &::after {
        content: '★';
      }
    }
  `};

  &:hover {
    background-color: ${(props) => props.theme.blue[4]};
    color: ${(props) => props.theme.backgroundColor};

    ${(props) => props.name === 'rating' && css`
      &::after {
        content: '★';
      }

      & ~ input {
        background-color: ${props.theme.blue[4]};
        color: ${props.theme.backgroundColor};

        &::after {
          content: '★';
        }
      }
    `}
  }

  &:checked {
    background-color: ${(props) => props.theme.blue[4]};
    color: ${(props) => props.theme.backgroundColor};

    ${(props) => props.name === 'rating' && css`
    &::after {
      content: '★';
    }

    & ~ input {
      background-color: ${props.theme.blue[4]};
      color: ${props.theme.backgroundColor};

      &::after {
        content: '★';
      }
    }
  `};
  }

  &:active {
    transform: scale(1.025);
    transition: scale 0.15s linear;
  }

  &:focus {
    outline-color: ${(props) => props.theme.focusColor};
    outline-width: 1.5px;
    outline-offset: 1.5px;
    outline-style: solid;
  }

  &:focus-visible {
    outline-style: dashed;
    outline-offset: 3px;
  }
`;
