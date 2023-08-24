import React, { useId } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

export default function RadioButton({
  value,
  name,
  handleChange,
  checked,
  required,
  label,
}) {
  const id = useId();

  return (
    <Radio value={value} checked={checked} key={id}>
      <Input
        required={required}
        type="radio"
        value={value}
        name={name}
        onChange={handleChange}
        checked={checked}
        id={id}
        aria-label={label}
      />
      {(value % 2 === 1)
      && <Label htmlFor={id} value={value}>{label}</Label>}
    </Radio>
  );
}

RadioButton.propTypes = {
  value: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  required: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
};

const Radio = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  ${(props) => props.value === 1 && css`
    align-items: flex-start;
  `};
  ${(props) => props.value === 5 && css`
    align-items: flex-end;
  `};
  ${(props) => props.value === 2 && css`
    justify-content: flex-start;
  `};
  ${(props) => props.value === 4 && css`
    justify-content: flex-start;
  `};
  width: 20%;
  top: -0.75em;
  height: 4em;
  border-radius: 3px;
  font-size: ${(props) => props.theme.tertiary};
  overflow: visible;
  position: relative;

  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.darkBlueHover};
    border-color: ${(props) => props.theme.darkBlueHover};
  }
  &:active {
    transform: scale(1.01);
    transition: scale 0.2s ease;
  }
 /* &:focus {
    outline-color: ${(props) => props.theme.focusColor};
    outline-color: ${(props) => props.theme.darkBlueHover};
    outline-style: dashed;
    outline-width: 1.5px;
  } */
  &:focus-visible {
    outline-color: ${(props) => props.theme.focusColor};
    outline-color: ${(props) => props.theme.darkBlueHover};
    outline-style: dashed;
    outline-width: 1.5px;
  }
`;

const Label = styled.label`
  height: 50%;
  text-align: center;
  line-height: 1em;
  ${(props) => props.value === 1 && css`
    text-align: start;
  `};
  ${(props) => props.value === 5 && css`
    text-align: end;
  `};
  color: ${(props) => props.theme.minorFontColor};

  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.darkBlueHover};
  }
`;

const Input = styled.input`
  appearance: none;
  margin: 0;
  position: relative;
  height: 1em;
  left: ${(props) => (props.value === 2 ? '-25%' : props.value === 4 ? '25%' : '')};
  aspect-ratio: 1;
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.submitButtonHover};
  overflow: visible;
  border: 1px currentColor solid;
  border-radius: 50px;

  /* on hover do similiar css as modal exit button, might need to use inside div's border as white border */
  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.darkBlueHover};
    outline: 1.5px currentColor solid;
    outline-offset: 1px;
    background-color: currentColor:
  }

  &:checked {
    border: none,
    border-radius: 0;

    &:hover {
      border: none;
      outline: none;
    }

    &::after {
      content: ' ';
      width: calc(1em - 3px);
      aspect-ratio: 1;
      border-radius: 50%;
      display: block;
      position: relative;
      background-color: currentColor;
      border: 1px white solid;
      outline: 1.5px currentColor solid;
      margin: 0;
    }

    &:active {
      transform: scale(1.01);
      transition: scale 0.2s ease;
    }

    &:focus-visible {
      outline-color: ${(props) => props.theme.focusColor};
      outline-width: 1.5px;
      outline-style: dashed;
      outline-offset: 4px;
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
    outline-offset: 4px;
    border: none;
    border-radius: 0px;
  }
`;
