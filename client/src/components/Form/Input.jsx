import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';
import { Button } from '../Button';
import { useGlobalContext } from '../../contexts/GlobalStore';
// import AddPhotos from '../../RatingsAndReviews/AddRev/AddPhotos';
import AddPhotos from './AddPhotos';
import Modal from '../Modal';
import useForm from '../../hooks/useForm';

function FormInput({
  id, label, required, disclaimer, ...props
}) {
  return (
    <>
      <StyledLabel htmlFor={id}>
        {label}
        {required && <Required>*</Required>}
      </StyledLabel>
      <StyledInput
        id={id}
        required={required}
        {...props}
        value={formState[name].value}
        type={props.type}
        name={props.name}
        error={props.errors[name]} // { error: '', message '' }
        onChange={handleInputChange}
        validation={props.validationSchema[name]} // [ {rule: '', test: } ]
        placeholder={props.placeholder}
        maxLength={props.maxLength}
      />
      {disclaimer && (
      <Disclaimer>
        {disclaimer}
      </Disclaimer>
      )}
      {error && <Error>{error.message}</Error>}
    </>
  );
}

const StyledLabel = styled.label`
  font-size: 1rem;
  cursor: initial;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 1em;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  border: currentColor solid thin;
  border-radius: 3px;
  box-shadow: inset 0.25px 0.25px 2px 2px ${(props) => props.theme.insetBoxShadow};
  cursor: initial;
  font-size: ${(props) => props.theme.input};
  color: ${(props) => props.theme.fontColor};
  background-color: ${(props) => props.theme.backgroundColor};

  ::placeholder {
    color: ${(props) => props.theme.inputPlaceholder};
  }

  &:focus {
    outline-color: ${(props) => props.theme.blue[5]};
    outline-offset: 2px;
    border: none;
  }

  ::label {
    font-size: ${(props) => props.theme.body};
    font-weight: 400;
    color: rgb(37, 55, 70);
  }
`;

const Disclaimer = styled.h5`
  font-style: oblique;
  padding-top: 0;
`;

const Error = styled.div`
  color: ${(props) => props.theme.formError};
  font-style: oblique;
`;

export default FormInput;
