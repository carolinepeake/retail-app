// const radioButtons = Object.entries(characteristic?.values).map(([value, label]) => (
// will want to separate into new component and useId to make unique ids
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
    <Radio value={value}>
      <Input
        required={required}
        type="radio"
        value={value}
        name={name}
        onChange={handleChange}
        checked={checked}
        id={id}
      />
      {/* {(value % 2 === 1) &&  */}
      <Label htmlFor={id} value={value}>{label}</Label>
      {/* } */}
    </Radio>
  );
}

RadioButton.propTypes = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  required: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
};

const Radio = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20%;
  font-size: ${(props) => props.theme.tertiary};

  /* &::first {
    align-items: flex-start;
  }

  &::last {
    align-items: flex-end;
  } */

  &:hover {
    cursor: pointer;
    box-shadow: box-shadow: 5px 5px 5px #727272;
    transform: transform: scale(1.05) ease;
    border-color: ${(props) => props.theme.darkBlueHover};
  }

  ${(props) => props.value === 1 && css`
    align-items: flex-start;
  `};
  ${(props) => props.value === 5 && css`
    align-items: flex-end;
  `};
`;

const Label = styled.label`
  left: ${(props) => (props.value === 1 ? '-25%' : props.value === 2 ? '-25%' : props.value === 4 ? ' 25%' : props.value === 5 ? '25%' : '')};
  position: relative;
  /* height: 50%; */
  text-align: center;
  line-height: 1em;
  ${(props) => props.value === 1 && css`
    text-align: start;
  `};
  ${(props) => props.value === 5 && css`
    text-align: end;
  `};
`;

const Input = styled.input`
  appearance: none;
  margin: 0;
  position: relative;
  left: ${(props) => (props.value === 2 ? '-25%' : props.value === 4 ? '25%' : '')};
  height: 1em;
  aspect-ratio: 1;
  ${(props) => props.value === 1 && css`
    transform: translateX(-50%);
  `};
  ${(props) => props.value === 5 && css`
    transform: translateX(50%);
  `};
  background-color: ${(props) => props.theme.backgroundColor};
  border-color: inherit;
  border-radius: 50%;
  border-width: 1px;
  border-style: solid;
  &:checked {
    background-color: ${(props) => props.theme.submitButtonHover};
    border-color: ${(props) => props.theme.darkBlueHover};
  }
  transform: translateY(-50%);
  &:focus-visible {
    outline-color: ${(props) => props.theme.secondaryFontColor};
  }
  &:hover {
    cursor: pointer;
    box-shadow: box-shadow: 5px 5px 5px #727272;
    transform: transform: scale(1.05) ease;
    background-color: ${(props) => props.theme.darkBlueHover};
  }
`;
