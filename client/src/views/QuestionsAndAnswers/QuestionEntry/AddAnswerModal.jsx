import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';
import { Button } from '../../../components/Buttons';
import { useGlobalContext } from '../../../contexts/GlobalStore';
import AddPhotos from '../../../components/Form/AddPhotos';
import CharacterCount from '../../../components/Form/CharacterCount';
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

  const addAnswer = (form) => {
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
  ] = useForm(addAnswer, initialFormState);

  const closeModal = () => {
    toggleModal();
    resetForm();
  };

  return (
    <Modal
      closeModal={closeModal}
    >
      <form
        id="form"
        onSubmit={handleSubmit}
      >
        <h2>
          Submit Your Answer
        </h2>
        <h1>
          {`${productInfo.name} : ${question.question_body}`}
        </h1>

        <StyledLabel htmlFor="body">
          Answer *
        </StyledLabel>
        <StyledTextArea
          required
          as="textarea"
          onChange={handleInputChange}
          maxLength="1000"
          rows="6"
          placeholder="Enter your answer"
          value={formState.body}
          name="body"
          id="body"
        />
        <CharacterCount
          characterLimit={1000}
          charactersUsed={formState.body.length}
        />
        <br />
        <AddPhotos
          handleInputChange={handleInputChange}
          photos={formState.photos}
        />
        <br />
        <StyledLabel htmlFor="name">
          Username *
        </StyledLabel>
        <StyledInput
          onChange={handleInputChange}
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
        <br />
        <StyledLabel htmlFor="email">
          Email *
        </StyledLabel>
        <StyledInput
          onChange={handleInputChange}
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
      </form>
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

// const Required = styled.sup`
//   color: ${(props) => props.theme.formError};
// `;

const Disclaimer = styled.h5`
  font-style: oblique;
  padding-top: 0;
`;

const Error = styled.div`
  color: ${(props) => props.theme.formError};
`;

export default AddAnswerModal;
