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
      <FormLabel htmlFor={id}>
        {label}
        {required && <Required>*</Required>}
      </FormLabel>
      <StyledFormInput
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

const FormLabel = styled.label`
  font-size: 1rem;
  cursor: initial;
`;

const StyledFormInput = styled.input`
  display: block;
  width: 100%;
  padding: 0.5em;
  margin-top: 0.25em;
  border: currentColor solid thin;
  cursor: initial;
  font-family: inherit;
  font-size: ${(props) => props.theme.input};
  color: ${(props) => props.theme.fontColor};
  background-color: ${(props) => props.theme.backgroundColor};

  ::placeholder {
    color: ${(props) => props.theme.inputPlaceholder};
  }

  &:focus {
    background-color: ${(props) => props.theme.navBgColor};
  }

  ::label {
    font-size: 1rem;
    color: ${(props) => props.theme.fontColor};
  }

  /* ::error {
  } ? */
`;

const Required = styled.sup`
  color: ${(props) => props.theme.formError};
`;

const Disclaimer = styled.h5`
  font-style: oblique;
`;

const Error = styled.div`
  color: ${(props) => props.theme.formError};
  font-style: oblique;
`;

export default FormInput;
