import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';
import { Button } from '../../../components/Buttons';
import { useGlobalContext } from '../../../contexts/GlobalStore';
import AddPhotos from '../../../components/Form/AddPhotos';
import Modal from '../../../components/Modal';
import useForm from '../../../hooks/useForm';

function AddAnswerModal({ question, toggleModal }) {
  console.log('[AddAnswerModal] is running');
  const { productInfo } = useGlobalContext();

  const initialFormState = {
    question_ID: question.question_id,
    name: '',
    email: '',
    body: '',
    photos: [],
  };

  const askQuestion = (form) => {
    const previews = form.photos.map((photo) => photo.url);
    const postBody = { ...form, photos: previews };
    console.log('postBody: ', postBody);

    axios
      .post('/answers', postBody)
      .then(() => {
        // show success message
        console.log('answer submitted successfully');
        // closeModal();
        toggleModal();
      })
      .catch((err) => {
        // show error message
        console.log('there was an error adding answer: ', err);
      });
  };

  const [
    formState,
    errors,
    handleInputChange,
    resetForm,
    handleSubmit,
  ] = useForm(askQuestion, initialFormState);

  const closeModal = () => {
    toggleModal();
    resetForm();
  };

  return (
    <Modal
      closeModal={closeModal}
    >
      <Form
        id="form"
        onSubmit={handleSubmit}
      >
        <ModalTitle>
          Submit Your Answer
        </ModalTitle>
        <ProductName>
          {`${productInfo.name} : ${question.question_body}`}
        </ProductName>

        <FormField htmlFor="body">
          Answer
          <Required>*</Required>
        </FormField>
        <InputAnswer
          required
          onChange={(e) => handleInputChange(e.target)}
          maxLength="1000"
          rows="6"
          placeholder="Enter your answer"
          value={formState.body}
          name="body"
        />
        <br />
        <AddPhotos
          handleInputChange={handleInputChange}
          photos={formState.photos}
        />
        <br />
        <FormField htmlFor="name">
          Username
          <Required>*</Required>
        </FormField>
        <div>
          <FormEntry
            onChange={(e) => handleInputChange(e.target)}
            required
            maxLength="60"
            type="text"
            id="name"
            name="name"
            value={formState.name}
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
            onChange={(e) => handleInputChange(e.target)}
            maxLength="60"
            required
            type="email"
            id="email"
            placeholder="Example: jack@email.com"
            value={formState.email}
            name="email"
          />
          <Disclaimer>
            For authentication reasons, you will not be emailed.
          </Disclaimer>
        </div>
        <br />
        {errors.length > 0 && (
          <Disclaimer>
            {errors.map((error) => <Error key={error.id}>{error.message}</Error>)}
          </Disclaimer>
        )}
        <Footer id="footer">
          <FooterButton
            $primary
            $submit
            type="submit"
          >
            Submit
          </FooterButton>
          <FooterButton
            $cancel
            type="button"
            onClick={closeModal}
          >
            Cancel
          </FooterButton>
        </Footer>
      </Form>
    </Modal>
  );
}

AddAnswerModal.propTypes = {
  question: PropTypes.shape({
    question_id: PropTypes.number.isRequired,
    question_body: PropTypes.string.isRequired,
  }).isRequired,
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
  font-size: 1rem;
  cursor: initial;
`;

const FormEntry = styled.input`
  display: block;
  width: 100%;
  padding: 0.5em;
  margin-top: 0.25em;
  border: currentColor solid thin;
  border-radius: 3px;
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
`;

const InputAnswer = styled.textarea`
  resize: none;
  display: block;
  width: 100%;
  margin-top: 0.25em;
  font-family: inherit;
  font-size: ${(props) => props.theme.input};
  color: ${(props) => props.theme.fontColor};
  background-color: ${(props) => props.theme.backgroundColor};
  ::placeholder {
    color: ${(props) => props.theme.inputPlaceholder};
  }
  border: currentColor solid thin;
  border-radius: 3px;
  padding: 0.5em;

  &:focus {
    background-color: ${(props) => props.theme.navBgColor};
  }
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 1.5em;
  width: 100%;
  gap: 1.5em;

  @media (min-width: 600px) {
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    gap: 2em;
  }
`;

const FooterButton = styled(Button)`
  flex: 1;
  margin: 0;
`;

const Required = styled.sup`
  color: ${(props) => props.theme.formError};
`;

const Disclaimer = styled.h5`
  font-style: oblique;
`;

const Error = styled.div`
  color: ${(props) => props.theme.formError};
`;

export default AddAnswerModal;
