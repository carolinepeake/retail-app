import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';
import Button from '../../reusable/Button';
import { useGlobalContext } from '../../../contexts/GlobalStore';

function AddAnswerModal({ setShowModal, question }) {
  AddAnswerModal.propTypes = {
    question: PropTypes.shape({
      question_id: PropTypes.number.isRequired,
      question_body: PropTypes.string.isRequired,
    }).isRequired,
    setShowModal: PropTypes.func.isRequired,
  };

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const [validInput, setValidInput] = useState(true);
  const [preview, setPreview] = useState([]);

  const { productInfo } = useGlobalContext();

  function validateInput() {
    function validateEmail(emailName) {
      const regex = /\S+@\S+\.\S+/;
      return regex.test(emailName);
    }

    if (name === '' || email === '' || body === '') {
      return false;
    }

    if (!validateEmail(email)) {
      return false;
    }
    return true;
  }

  function askQuestion(e) {
    e.preventDefault();

    if (!validateInput()) {
      setValidInput(false);
      console.log('add answer input failed validation');
      return;
    }

    const postBody = {
      body,
      name,
      email,
      question_ID: question.question_id,
      photos: [],
    };

    const promises = [];
    for (let i = 0; i < preview.length; i += 1) {
      const promise = axios.post('/cloudinary/upload', {
        image: preview[i],
      });
      promises.push(promise);
    }

    Promise.all(promises)
      .then(async (results) => {
        await results.forEach((result) => {
          postBody.photos.push(result.data.url);
        });

        axios
          .post('/answers', postBody)
          .then((result) => {
            console.log('answer posted successfully', result);
            setShowModal(false);
          })
          .catch((err) => {
            console.log('there was an error adding answer: ', err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handlePreviews(event) {
    if (preview.length >= 5 || event.target.files.length === 0) return;

    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64image = reader.result;
      console.log('base64image: ', base64image);
      setPreview([...preview, base64image]);
    };
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
          <AddAnswer>
            Submit your Answer
          </AddAnswer>
          <ProductName>
            {`${productInfo.name} : ${question.question_body}`}
          </ProductName>
        </Header>
        <Form id="form">

          <FormField htmlFor="body">
            Answer
            <Required>*</Required>
          </FormField>
          <InputAnswer
            onChange={(event) => setBody(event.target.value)}
            maxLength="1000"
            rows="6"
            placeholder="Enter your answer"
          />
          <br />
          {preview.length < 5 ? (
            <FormField htmlFor="photos">
              Upload Your Photos
              <FileInput
                onChange={(event) => handlePreviews(event)}
                type="file"
                id="photos"
                accept="image/png, image/jpeg"
              />
              <Disclaimer>
                Optional, max 5
              </Disclaimer>
            </FormField>
          ) : null}
          <PhotoPreviews>
            {preview.map((photo) => (
              <ImagePreview src={photo} alt="" key={photo} />
            ))}
          </PhotoPreviews>
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
              <div>
                1. Not all mandatory fields have been provided.
              </div>
              <div>2. Email is not in the correct email format.</div>
              <div>
                3. The images selected are invalid or unable to be
                uploaded.
              </div>
            </Disclaimer>
          ) : null}
        </Form>
        <Footer id="footer">
          <FooterButton modal onClick={(e) => askQuestion(e)}>
            Submit
          </FooterButton>
          {/* <FooterButton onClick={() => setShowModal(false)}>
            Cancel
          </FooterButton> */}
        </Footer>
      </ModalContainer>
    </ModalBackground>
  );
}

const ModalBackground = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0%;
  top: 0%;
  z-index: 51;
  @media (min-width: 50rem) {
    z-index: 20;
  };
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
  };

  @media (min-width: 50rem) {
    max-height: 80vh;
    width: 60vw;
    z-index: 21;
    top: 1.5rem;
  };
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  @media (min-width: 40rem) {
    width: 90%;
  };

  @media (min-width: 50rem) {
    width: 80%;
  };
  margin-bottom: 0.5rem;
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
  };

  @media (min-width: 50rem) {
    width: 80%;
  };
`;

const FormField = styled.label`
  font-size: 1rem;
  cursor: initial;
`;

const FormEntry = styled.input`
  display: block;
  width: 100%;
  margin-top: 0.25em;
  cursor: initial;
  color: ${(props) => props.theme.fontColor};
  background-color: ${(props) => props.theme.backgroundColor};
  ::placeholder {
    color: ${(props) => props.theme.inputPlaceholder};
  };
  &:focus {
    background-color: ${(props) => props.theme.navBgColor};
  };
  border: currentColor solid thin;
  padding: 0.5em;
  font-family: inherit;
  font-size: ${(props) => props.theme.input};
`;

const InputAnswer = styled.textarea`
  resize: none;
  display: block;
  width: 100%;
  margin-top: 0.25em;
  font-family: inherit;
  color: ${(props) => props.theme.fontColor};
  background-color: ${(props) => props.theme.backgroundColor};
  ::placeholder {
    color: ${(props) => props.theme.inputPlaceholder};
  };
  border: currentColor solid thin;
  border-radius: 5px;
  padding: 0.5em;
  font-size: ${(props) => props.theme.input};
  &:focus {
    background-color: ${(props) => props.theme.navBgColor};
  };
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 1.5em;
  width: 100%;

  @media (min-width: 40rem) {
    width: 90%;
  };

  @media (min-width: 50rem) {
    width: 80%;
  };

  @media (min-width: 600px) {
    flex-direction: row;
    column-gap: 2rem;
    justify-content: space-evenly;
    align-items: center;
  };
`;

const FooterButton = styled(Button)`
  flex: 1;
  margin: 0.5rem 0;

  @media (min-width: 600px) {
    margin: 0;
  };
`;

const Required = styled.sup`
  color: ${(props) => props.theme.formError};
`;

const Disclaimer = styled.h5`
  font-style: oblique;
`;

const PhotoPreviews = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 1.0em;
`;

const ImagePreview = styled.img`
  width:20%;
  height: 100%;
  margin-right: 1%;
`;

const FileInput = styled.input`
  display: block;
  width: 100%;
  color: ${(props) => props.theme.fontColor};
  margin-top: 0.25em;
  ::file-selector-button {
    color: ${(props) => props.theme.fontColor};
    background-color: ${(props) => props.theme.navBgColor};
    cursor: pointer;
    padding: 0.5em 1em;
    margin-right: 0.5em;
    border: 1px solid ${(props) => props.theme.fontColor};
    border-radius: 5px;
  };
  ::placeholder {
    color: ${(props) => props.theme.inputPlaceholder};
  };
  font-size: 1em;
  font-family: inherit;
`;

export default AddAnswerModal;
