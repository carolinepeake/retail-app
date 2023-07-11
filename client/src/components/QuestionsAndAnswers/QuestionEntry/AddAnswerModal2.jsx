import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';
import { Button } from '../../reusable/Button';
import { useGlobalContext } from '../../../contexts/GlobalStore';
// import AddPhotos from '../../RatingsAndReviews/AddRev/AddPhotos';
import AddPhotos2 from '../../reusable/Form/AddPhotos2';
import Modal from '../../reusable/Modal';
import useForm from '../../utils/useForm';

function AddAnswerModal2({ showModal, question, toggleModal }) {
  AddAnswerModal2.propTypes = {
    question: PropTypes.shape({
      question_id: PropTypes.number.isRequired,
      question_body: PropTypes.string.isRequired,
    }).isRequired,
    toggleModal: PropTypes.func.isRequired,
    showModal: PropTypes.bool.isRequired,
  };

  const initialFormState = {
    name: '',
    email: '',
    body: '',
  };

  const [formState, errors, handleInputChange, resetForm, handleSubmit] = useForm(initialFormState, askQuestion);

  // const [preview, setPreview] = useState([]);

  const [photos, setPhotos] = useState([]);

  const { name, email, body } = formState;

  const { productInfo } = useGlobalContext();

  const closeModal = () => {
    toggleModal();
    // setPreview([]);
    setPhotos([]);
    resetForm();
  };


  function askQuestion(form) {
    // e.preventDefault();

    // if (!validateInput()) {
    //   setValidInput(false);
    //   console.log('add answer input failed validation');
    //   return;
    // }

    const previews = photos.map((photo) => photo.url);

    const postBody = { ...formState, question_ID: question.question_id, photos: previews };
    console.log('postBody: ', postBody);

    axios
      .post('/answers', postBody)
      .then((result) => {
        console.log('answer posted successfully: ', result);
        closeModal();
      })
      .catch((err) => {
        console.log('there was an error adding answer: ', err);
      });
  }

  return (
    <Modal
      closeModal={closeModal}
      showModal={showModal}
    >
      <Header>
        <AddAnswer>
          Submit Your Answer
        </AddAnswer>
        <ProductName>
          {`${productInfo.name} : ${question.question_body}`}
        </ProductName>
      </Header>
      <Form
        id="form"
        // onSubmit={(e) => askQuestion(e)}
      >

        <FormField htmlFor="body">
          Answer
          <Required>*</Required>
        </FormField>
        <InputAnswer
          onChange={handleInputChange}
          maxLength="1000"
          rows="6"
          placeholder="Enter your answer"
          value={body}
          name="body"
        />
        <br />
        <AddPhotos2
          // preview={preview}
          // setPreview={setPreview}
          photos={photos}
          setPhotos={setPhotos}
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
            value={name}
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
            onChange={handleInputChange}
            maxLength="60"
            type="email"
            id="email"
            placeholder="jack@email.com"
            value={email}
            name="email"
          />
          <Disclaimer>
            For authentication reasons, you will not be emailed.
          </Disclaimer>
        </div>
        <br />
        {/* {!validInput ? (
          <Disclaimer>
            {errors.map((error) => <Error>{error}</Error>)}
          </Disclaimer>
        ) : null} */}
        {errors.length > 0 ? (
          <Disclaimer>
            {errors.map((error) => <Error key={error.id}>{error.message}</Error>)}
          </Disclaimer>
        ) : null}
      </Form>
      <Footer id="footer">
        <FooterButton
          modal
          type="submit"
          // onClick={(e) => askQuestion(e)}
          onClick={handleSubmit}
        >
          Submit
        </FooterButton>
        <FooterButton
          type="button"
          onClick={closeModal}
        >
          Cancel
        </FooterButton>
      </Footer>
    </Modal>
  );
}

const Header = styled.header`
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

const AddAnswer = styled.h2`
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
  font-size: 1rem;
  cursor: initial;
`;

const FormEntry = styled.input`
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
  border-radius: 5px;
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
  color: ${(props) => props.theme.formError};
`;

const Disclaimer = styled.h5`
  font-style: oblique;
`;

const Error = styled.div`
  color: ${(props) => props.theme.formError};
`;

export default AddAnswerModal2;
