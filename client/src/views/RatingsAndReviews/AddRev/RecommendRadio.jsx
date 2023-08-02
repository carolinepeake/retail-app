// const radioButtons = Object.entries(characteristic?.values).map(([value, label]) => (
// will want to separate into new component and useId to make unique ids
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default function RecommendRadio({
  value,
  handleChange,
  checked,
  label,
}) {
  return (
    <Radio
      required
      value={value}
      checked={checked}
      type="radio"
      name="recommend"
      onChange={handleChange}
      label={label}
      aria-label={label}
    />
  );
}

RecommendRadio.propTypes = {
  value: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
};

const Radio = styled.input`
  appearance: none;
  border: 1px ${(props) => props.theme.submitButtonHover} solid;
  height: 4em;
  aspect-ratio: 1;
  border-radius: 3px;
  margin: 0;
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.submitButtonHover};
  overflow: visible;
  font-weight: 400;

  &::after {
    content: '${(props) => props.label}';
    color: inherit;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: inherit;
    border-radius: inherit;
    font-weight: inherit;
  }

  &:hover {
    cursor: pointer;
    font-weight: 500;
    background-color: ${(props) => props.theme.navBgColor};
    border: 2px currentColor solid;
    /* box-shadow? */
  }

  &:checked {
    background-color: ${(props) => props.theme.submitButtonHover};
    color: ${(props) => props.theme.submitButtonHoverFont};
    /* box-shadow? */

    &:hover {
      color: ${(props) => props.theme.submitButtonHoverFont};
      background-color:  ${(props) => props.theme.submitButtonHover};
      border: 1px ${(props) => props.theme.submitButtonHover} solid;
      border-radius: 3px;
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
