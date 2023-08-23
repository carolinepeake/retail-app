import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';
import Modal from '../../../components/Modal';
import { Button } from '../../../components/Buttons';
import CharacterCount from '../../../components/Form/CharacterCount';
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
      <form onSubmit={askQuestion}>
        <h2>Ask a Question</h2>
        <h1>
          {productInfo.name}
        </h1>
        <StyledLabel htmlFor="body">
          Question *
        </StyledLabel>
        <StyledTextArea
          onChange={handleInputChange}
          rows="6"
          maxLength="1000"
          placeholder="Ask your question"
          value={formState.body}
          name="body"
          id="body"
          as="textarea"
        />
        <CharacterCount
          characterLimit={1000}
          charactersUsed={formState.body.length}
        />
        <br />
        <StyledLabel htmlFor="name">
          Username *
        </StyledLabel>
        <StyledInput
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
        <br />
        <StyledLabel htmlFor="email">
          Email *
        </StyledLabel>
        <StyledInput
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
      </form>
    </Modal>
  );
}

AddQuestionModal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
};

const StyledLabel = styled.label`
  font-size: ${(props) => props.theme.body};
  font-weight: 400;
  color: rgb(37, 55, 70);
  display: block;
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
    display: block;
  }
`;

const StyledTextArea = styled(StyledInput)`
  resize: auto;
  line-height: 1.5em;
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

const Disclaimer = styled.h5`
  font-style: oblique;
  padding-top: 0;
`;

export default AddQuestionModal;
