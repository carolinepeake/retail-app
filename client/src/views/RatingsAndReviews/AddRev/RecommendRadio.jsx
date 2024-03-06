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
  notSelected
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
      // $not={notSelected}
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
  /*  background-color: currentColor; */
   /* color: inherit; */
  /*  background: inherit; */
    border: 1px ${props.theme.blue[5]} solid;
    border-radius: 3px;
    color: transparent;
    color: inherit;
    background-color: ${props.theme.navBgColor};
    position: relative;
    background: ${props.theme.blue[5]};
  `};

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
    color: inherit;

    ${(props) => props.name === 'rating' && css`
      content: '☆';
      font-size: 2em;
      line-height: 1em;
      background: transparent;
      position: absolute;
      top: 0;

    /*  background: ${props.theme.navBgColor}; */
      color: ${props.theme.blue[5]};
    /*  border: 1px ${props.theme.blue[5]}; solid; */
      border: none;
      border-radius: inherit;
      color: currentColor
      color: inherit;
      background: inherit;
      background: transparent;

    `};
  }

  &::before {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: inherit;
    font-weight: inherit;
    border-radius: inherit;
    border: none;
    color: inherit;
    position: relative;

    ${(props) => props.name === 'rating' && css`
      content: '★';
      font-size: 2em;
      line-height: 1em;
      color: ${props.theme.backgroundColor};
      background: ${props.theme.navBgColor};
     /* background: ${props.theme.blue[5]}; */
      background: currentColor;
      border: none;
      border-radius: 3px;
  `};
  }

 /* ${(props) => props.name === 'rating' && props.$not && css`
    background-color: ${props.theme.backgroundColor};
    color: ${props.theme.blue[5]};
    &::after {
      content: '☆';
      color: inherit;
      background: inherit;
    }

    &:hover {
      background-color:  ${props.theme.blue[5]};
      color: ${props.theme.backgroundColor};
    }
  `}; */


 ${(props) => props.name === 'rating' && props.$selected && css`
      background-color:  ${props.theme.blue[5]};
    & ~ &:before {
      background-color:  ${props.theme.blue[5]};
      background-color: green;
    }
    &::after {
      content: '★';
      color: ${props.theme.backgroundColor};
      background: transparent;
    }

   & ~ input {
    /*  background-color: ${props.theme.blue[5]}; */
      background-color: ${props.theme.backgroundColor};
      &::after {
      /*  background: transparent; */
        background: inherit;
      /*  color: ${props.theme.backgroundColor}; */
        color: ${props.theme.blue[5]};
      /*  content: '★'; */
        content: '☆';
      }
    }
`};

  &:hover {
    cursor: pointer;
    font-weight: 600;
    border: 2px currentColor solid;

    ${(props) => props.name === 'rating' && css`
    /*  background-color: ${props.theme.blue[5]};
      background-color: transparent;
      border: 1px ${props.theme.blue[5]} solid; */

      background-color: ${props.theme.blue[5]};
      border: 1px ${props.theme.blue[5]} solid;
      border-radius: 3px;

      &::after {
      /*  content: '★'; */
        color: ${props.theme.backgroundColor};
        background: transparent;
        color: transparent;
      }

      &::before {
        background: transparent;
        content: '★';
        color: ${props.theme.backgroundColor};
      }
    /*  input {
        background-color: ${props.theme.blue[5]};
        border: 1px ${props.theme.blue[5]} solid;
        &::after {
          color: ${props.theme.backgroundColor};
          content: '★';
          background: transparent;
        }
      } */
      & ~ input {
        background-color: ${props.theme.backgroundColor};
        color: ${props.theme.blue[5]};
        font-weight: 400;
      /*  border: 1px currentColor solid; */
        background: ${props.theme.blue[5]};

        &::after {
          background-color: ${props.theme.backgroundColor};
          color: inherit;
          content: '☆';
          color: ${props.theme.blue[5]};
          background: transparent;
        }

        &::before {
          background: ${props.theme.navBgColor};
          content: '★';
          color: ${props.theme.backgroundColor};
          border-radius: inherit;
        }
      }
    `};
  }

  &:checked {
    background-color: ${(props) => props.theme.blue[5]};
    color: ${(props) => props.theme.backgroundColor};
    font-weight: 600;

  /*  ${(props) => props.name === 'rating' && css`
      background-color: ${props.theme.blue[5]};
      color: ${props.theme.backgroundColor};
      border: none;
   `}; */

    &:hover {
   /*   color: ${(props) => props.theme.backgroundColor};
      background-color:  ${(props) => props.theme.blue[5]}; */
      border: 1px ${(props) => props.theme.blue[5]} solid;
      border-radius: 3px;

    ${(props) => props.name === 'rating' && css`
      & ~ &:before {
        background-color: ${props.theme.blue[5]};
        background: transparent;
      /*  border: none; */
      /*  border: 1px ${props.theme.blue[5]} solid; */
        border-radius: inherit;
        border: none;
      }
      background-color: ${props.theme.blue[5]};
      color: ${props.theme.backgroundColor};
    /*  border: none; */
    `};
    }
  }

  &:active {
    transform: scale(1.01);
    transition: scale 0.2s ease;
  }

  &:focus {
    outline-color: ${(props) => props.theme.focusColor};
    outline-width: 1.5px;
    outline-offset: 1.5px;
    outline-style: solid;
  }

  &:focus-visible {
   /* outline-color: ${(props) => props.theme.focusColor};
    outline-width: 1.5px; */
    outline-style: dashed;
    outline-offset: 3px;
  }
`;
