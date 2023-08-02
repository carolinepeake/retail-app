import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';
import { Button } from '../../../components/Button';
import { useGlobalContext } from '../../../contexts/GlobalStore';

function AddQuestionModal({ setShowModal }) {
  console.log('[AddQuestionModal] is running');
  AddQuestionModal.propTypes = {
    setShowModal: PropTypes.func.isRequired,
  };

  const { productID, productInfo } = useGlobalContext();

  const initialFormState = {
    name: '',
    email: '',
    body: '',
  };

  const [formState, setFormState] = useState(initialFormState);

  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [body, setBody] = useState('');
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

  function askQuestion(e) {
    e.preventDefault();
    if (!validateInput()) {
      setValidInput(false);
      console.log('add question input failed validation');
      return;
    }
    const postBody = {
      body: formState.body,
      name: formState.name,
      email: formState.email,
      product_id: productID,
    };
    axios
      .post('/questions', postBody)
      .then((result) => {
        console.log('question posted successfully', result);
        setFormState(initialFormState);
        setShowModal(false);
      })
      .catch((err) => {
        console.log('there was an error adding question: ', err);
      });
  }

  function closeModal(event) {
    if (event.target.id === 'background') {
      setShowModal(false);
    }
  }

  return (
    <ModalBackground
      id="background"
      onClick={(event) => closeModal(event)}
    >
      <ModalContainer>
        <Button close onClick={() => setShowModal(false)}>
          &#x2715;
        </Button>
        <Header>
          <AskAQuestion>Ask a Question</AskAQuestion>
          <ProductName>
            {productInfo.name}
          </ProductName>
        </Header>
        <Form>
          <FormField htmlFor="body">
            Question
            <Required>*</Required>
          </FormField>
          <InputQuestion
            onChange={(event) => setBody(event.target.value)}
            rows="6"
            maxLength="1000"
            placeholder="Ask your question"
          />
          <br />
          <FormField htmlFor="name">
            Username
            <Required>*</Required>
          </FormField>
          <div>
            <FormEntry
              onChange={(event) => setName(event.target.value)}
              maxLength="60"
              type="text"
              id="name"
              name="name"
              placeholder="Example: jackson11!"
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
              onChange={(event) => setEmail(event.target.value)}
              maxLength="60"
              type="text"
              id="email"
              placeholder="jack@email.com"
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
        </Form>
        <Footer>
          <FooterButton type="submit" modal onClick={(e) => askQuestion(e)}>
            Submit
          </FooterButton>
          <FooterButton onClick={() => setShowModal(false)}>
            Cancel
          </FooterButton>
        </Footer>
      </ModalContainer>
    </ModalBackground>
  );
}

const ModalBackground = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0%;
  top: 0%;
  z-index: 51;
  @media (min-width: 50rem) {
    z-index: 20;
  }
`;

const ModalContainer = styled.div`
  width: 100vw;
  max-height: 100vh;
  z-index: 52;
  padding: 2.5em;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.backgroundColor};
  overflow: auto;
  position: relative;

  @media (min-width: 40rem) {
    width: 70vw;
    border: 1px solid;
    max-height: 90vh;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }

  @media (min-width: 50rem) {
    max-height: 80vh;
    width: 60vw;
    z-index: 21;
    top: 1.5rem;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  @media (min-width: 40rem) {
    width: 90%;
  }

  @media (min-width: 50rem) {
    width: 80%;
  }
`;

const AskAQuestion = styled.h2`
  margin-top: 0px;
`;

const ProductName = styled.h4`
  margin-top: 0px;
  font-size: 1.5em;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;

  @media (min-width: 40rem) {
    width: 90%;
  }

  @media (min-width: 50rem) {
    width: 80%;
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
  border-radius: 5px;
  padding: 0.5em;
  font-size: ${(props) => props.theme.input};
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 1.5em;
  width: 100%;

  @media (min-width: 40rem) {
    width: 90%;
  }

  @media (min-width: 50rem) {
    width: 80%;
  }

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
  color: ${(props) => props.theme.formError}
`;

const Disclaimer = styled.h5`
  font-style: oblique;
`;

export default AddQuestionModal;
