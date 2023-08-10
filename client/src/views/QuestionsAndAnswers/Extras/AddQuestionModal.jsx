import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';
import Modal from '../../../components/Modal';
import { Button } from '../../../components/Buttons';
import { useGlobalContext } from '../../../contexts/GlobalStore';

// TODO: extract form inputs, form layout, and modal css components
// TODO: useForm in this component

function AddQuestionModal({ toggleModal }) {
  console.log('[AddQuestionModal] is running');

  const { productID, productInfo } = useGlobalContext();

  const initialFormState = {
    product_id: productID,
    name: '',
    email: '',
    body: '',
  };

  const [formState, setFormState] = useState(initialFormState);

  const handleInputChange = (e) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [validInput, setValidInput] = useState(true);

  function validateInput() {
    function validateEmail(emailName) {
      const regex = /\S+@\S+\.\S+/;
      return regex.test(emailName);
    }

    if (formState.name === '' || formState.email === '' || formState.body === '') {
      return false;
    }

    if (!validateEmail(formState.email)) {
      return false;
    }
    return true;
  }

  const askQuestion = (e) => {
    e.preventDefault();
    if (!validateInput()) {
      setValidInput(false);
      console.log('add question input failed validation');
      return;
    }
    axios
      .post('/questions', formState)
      .then((result) => {
        console.log('question posted successfully', result);
        setFormState(initialFormState);
        toggleModal();
      })
      .catch((err) => {
        console.log('there was an error adding question: ', err);
      });
  };

  const closeModal = () => {
    toggleModal();
    setFormState(initialFormState);
  };

  return (
    <Modal
      closeModal={closeModal}
    >
      <Form onSubmit={askQuestion}>
        <ModalTitle>Ask a Question</ModalTitle>
        <ProductName>
          {productInfo.name}
        </ProductName>
        <FormField htmlFor="body">
          Question
          <Required>*</Required>
        </FormField>
        <InputQuestion
          onChange={handleInputChange}
          rows="6"
          maxLength="1000"
          placeholder="Ask your question"
          value={formState.body}
          name="body"
          id="body"
        />
        <br />
        <FormField htmlFor="name">
          Username
          <Required>*</Required>
        </FormField>
        <div>
          <FormEntry
            onChange={handleInputChange}
            maxLength="60"
            type="text"
            id="name"
            name="name"
            placeholder="Example: jackson11!"
            value={formState.name}
          />
          <Disclaimer>
            For privacy reasons, do not use your full name or email
            address.
          </Disclaimer>
        </div>
        <br />
        <FormField htmlFor="email">
          Email
          <Required>*</Required>
        </FormField>
        <div>
          <FormEntry
            onChange={handleInputChange}
            maxLength="60"
            type="email"
            id="email"
            name="email"
            placeholder="jack@email.com"
            value={formState.email}
          />
          <Disclaimer>
            For authentication reasons, you will not be emailed.
          </Disclaimer>
        </div>
        <br />
        {!validInput ? (
          <Disclaimer>
            <div>1. Not all fields have been provided.</div>
            <div>2. Email is not in the correct email format.</div>
          </Disclaimer>
        ) : null}
        <Footer>
          <FooterButton
            $primary
            $submit
            type="submit"
          >
            Submit
          </FooterButton>
          <FooterButton
            type="button"
            $cancel
            onClick={closeModal}
          >
            Cancel
          </FooterButton>
        </Footer>
      </Form>
    </Modal>
  );
}

AddQuestionModal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
};

const ModalTitle = styled.h2`
  margin-top: 0px;
  font-size: 1.75em;
  color: rgb(55, 78, 98);
`;

const ProductName = styled.h4`
  margin-top: 0px;
  font-size: 1.5em;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;

  @media (min-width: 40rem) {
    width: 90%;
  }
`;

const FormField = styled.label`
  font-size: 1.0rem;
  cursor: initial;
`;

const FormEntry = styled.input`
  cursor: initial;
  margin-top: 0.25em;
  display: block;
  width: 100%;
  color: ${(props) => props.theme.fontColor};
  &:focus {
    background-color: ${(props) => props.theme.navBgColor};
  }
  background-color: ${(props) => props.theme.backgroundColor};
  ::placeholder {
    color: ${(props) => props.theme.inputPlaceholder};
  }
  border: currentColor solid thin;
  border-radius: 3px;
  padding: 0.5em;
  font-family: inherit;
  font-size: ${(props) => props.theme.input};
`;

const InputQuestion = styled.textarea`
  resize: none;
  margin-top: 0.25em;
  display: block;
  width: 100%;
  font-family: inherit;
  color: ${(props) => props.theme.fontColor};
  &:focus {
    background-color: ${(props) => props.theme.navBgColor};
  }
  background-color: ${(props) => props.theme.backgroundColor};
  ::placeholder {
    color: ${(props) => props.theme.inputPlaceholder};
  }
  border: currentColor solid thin;
  border-radius: 3px;
  padding: 0.5em;
  font-size: ${(props) => props.theme.input};
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 1.5em;
  row-gap: 1em;
  width: 100%;

  @media (min-width: 600px) {
    flex-direction: row;
    column-gap: 2rem;
    justify-content: space-evenly;
    align-items: center;
  }
`;

const FooterButton = styled(Button)`
  flex: 1;
  margin: 0.5rem 0;

  @media (min-width: 600px) {
    margin: 0;
  }
`;

const Required = styled.sup`
  color: ${(props) => props.theme.formError};
`;

const Disclaimer = styled.h5`
  font-style: oblique;
`;

export default AddQuestionModal;
