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
      $checked={checked}
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
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  selected: PropTypes.bool,
};

RecommendRadio.defaultProps = {
  required: false,
  selected: false,
  label: '',
};

const Radio = styled.input`
  appearance: none;
  color: ${(props) => props.theme.blue[4]}; /* or inherit or declare form accent or array of form accent colors in theme */
  background: ${(props) => props.theme.backgroundColor};
  border: 1px  ${(props) => props.theme.blue[4]} solid;
  height: 4em;
  aspect-ratio: 1;
  border-radius: 3px;
  margin: 0;
  overflow: visible;
  font-weight: 400;
  cursor: pointer;
  /* transition: all 0.3s ease-in; */

 /* &::before {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: inherit;
    position: relative;
  } */

   &::after {
    content: '${(props) => props.label}';
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

 ${(props) => props.name === 'rating' && css`
 /* color: inherit; */
 position: relative;

 &::after {
  content: '☆';
  font-size: 2em;
  line-height: 1em;
  position: absolute;
  top: 0;
  background-color: transparent;
  color: inherit;
   }


 /* ::before {
   width: 100%;
   height: 100%;
   display: flex;
   justify-content: center;
   align-items: center;
   font-weight: inherit;
   position: relative;
     content: '★';
     font-size: 2em;
     line-height: 1em;
     color: ${props.theme.backgroundColor};
     border: none;
     border-radius: 3px;

 } */
 `};



${(props) => (props.name === 'rating' && props.$selected) && css`

 /* background-color: ${props.theme.backgroundColor};*/
/*  background-color:  ${props.theme.blue[4]}; */
/*  color: ${props.theme.backgroundColor}; */
background-color: ${props.theme.blue[4]};

/* &::after {
    background: transparent;
    color: transparent;
    content: '☆';
  } */

 /* &::before {
    background: transparent;
    content: '★';
    color: ${props.theme.backgroundColor};
   /* color: ${props.theme.blue[4]};
    color: white; */
  } */

   content: '★';

  &::after {
    content: '★';
     }

  & ~ input {
    &::after {
      content: '★';
      color: ${props.theme.backgroundColor};
      background-color: transparent;
    }
  }

/* &::after {
    content: '★';
   /* color: ${props.theme.backgroundColor};
    background-color: transparent;
    border-radius: inherit; */
    color: ${props.theme.backgroundColor};
  } */

  /* check to see if works */
/*   & ~ input {
    background-color:  ${props.theme.blue[4]};

    &::after {
      content: '★';
    }

    &::before {
      content: '★';
      color: ${props.theme.backgroundColor};
      background-color: transparent;
      border-radius: inherit;
    }
  } */

`};


&:hover, &:hover ~ input {
  font-weight: 600;
  border: 2px currentColor solid;
  background-color: ${(props) => props.theme.blue[4]};
  color: ${(props) => props.theme.backgroundColor};

 /* &::after {
    background-color: transparent;
    content: ${(props) => props.label};
  } */

  ${(props) => props.name === 'rating' && css`

    border: 1px ${props.theme.blue[4]} solid; /* should never change for stars */

    &::after {
      background-color: transparent;
      content: '★';
      color: ${props.theme.backgroundColor};
    }

  /*  &::before {
      background: transparent;
      content: '★';
      color: ${props.theme.backgroundColor};
    }*/

  /* & ~ input {

      background: ${props.theme.blue[4]};

      &::after {
        background-color: ${props.theme.blue[4]};
        content: '★';
        color: ${props.theme.backgroundColor};
      } */

    /*  &::before {
        background: ${props.theme.navBgColor};
        content: '★';
         color: ${props.theme.backgroundColor};
        border-radius: inherit;
      } */
    }

  `};
}

/ * can also be written as &:checked, &:checked ~ input { ... }; */
&:checked {
  font-weight: 600;
  background-color: ${(props) => props.theme.blue[4]};
  color: ${(props) => props.theme.backgroundColor};

  &::after {
    content: '★';
  }

  ${(props) => props.name === 'rating' && css`

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
    transition: scale 0.25s ease;
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


    /* & ~ &:before {
        background: transparent;
        border-radius: inherit;
        border: none;
        content: '★';
        color: white;
      }

       &::after {
        color: transparent;
        content: '☆';
        background: transparent;
       } */




