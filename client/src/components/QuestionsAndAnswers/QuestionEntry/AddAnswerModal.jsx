import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';
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

  function askQuestion() {
    if (!validateInput()) {
      setValidInput(false);
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
          .then(() => {
            setShowModal(false);
          })
          .catch((err) => {
            console.log(err);
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
        <CloseButtonDiv>
          <CloseButtonButton onClick={() => setShowModal(false)}>
            &#10006;
          </CloseButtonButton>
        </CloseButtonDiv>
        <Header>
          <div>
            <b>Submit your answer</b>
          </div>
          <div>
            <b>{`${productInfo.name} : ${question.question_body}`}</b>
          </div>
        </Header>
        <Form id="form">
          <FormField htmlFor="name">
            Username
            <Required>*</Required>
          </FormField>
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
          <FormField htmlFor="email">
            Email
            <Required>*</Required>
          </FormField>
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
          <FormField htmlFor="body">
            Answer
            <Required>*</Required>
          </FormField>
          <InputAnswer
            onChange={(event) => setBody(event.target.value)}
            maxLength="1000"
            placeholder="Enter your answer"
          />
          {preview.length < 5 ? (
            <>
              <FormField>
                <div>Photos(optional)</div>
                <div>Max 5</div>
              </FormField>
              <FileInput
                onChange={(event) => handlePreviews(event)}
                type="file"
                id="photos"
                accept="image/png, image/jpeg"
              />
            </>
          ) : null}
          <PhotoPreviews>
            {preview.map((photo) => (
              <ImagePreview src={photo} alt="" key={photo} />
            ))}
          </PhotoPreviews>
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
          <FooterButton onClick={() => askQuestion()}>
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
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0%;
  top: 0%;
`;

const ModalContainer = styled.div`
  width: 60vw;
  max-height: 90vh;
  border-radius: 10px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  flex-direction: column;
  padding: 25px;
  background-color: ${(props) => props.theme.secondaryColor};
`;

const CloseButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CloseButtonButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: ${(props) => props.theme.fontColor};
  font-size: calc(8px + 0.5vw);
  padding: calc(6px + 0.375vw);
`;

const Form = styled.div`
  display: grid;
  grid-template-columns: 20% 75%;
  gap: 5%;
`;

const FormField = styled.label`
  font-size: 1rem;
  grid-column: 1;
  cursor: initial;
`;

const FormEntry = styled.input`
  grid-column: 2;
  cursor: initial;
  color: ${(props) => props.theme.fontColor};
  background-color: ${(props) => props.theme.tertiaryColor};
  ::placeholder,
  ::-webkit-input-placeholder {
    opacity: 0.2;
    color: ${(props) => props.theme.fontColor};
  }
  :-ms-input-placeholder {
    color: ${(props) => props.theme.fontColor};
  }
  border: black solid thin;
`;

const InputAnswer = styled.textarea`
  resize: none;
  height: 125px;
  font-family: Arial;
  color: ${(props) => props.theme.fontColor};
  background-color: ${(props) => props.theme.tertiaryColor};
  ::placeholder,
  ::-webkit-input-placeholder {
    opacity: 0.2;
    color: ${(props) => props.theme.fontColor};
  }
  :-ms-input-placeholder {
    color: ${(props) => props.theme.fontColor};
  }
  border: black solid thin;
`;

const Footer = styled.div`
  display: flex;
  flex: none;
  justify-content: center;
  margin-top: 20%;
`;

const FooterButton = styled.button`
  padding: calc(6px + 0.375vw);
  margin: calc(4px + 0.25vw);
  padding: calc(6px + 0.375vw);
  border: none;
  color: ${(props) => props.theme.fontColor};
  background-color: ${(props) => props.theme.backgroundColor};
  border-radius: 10px;
  border: black solid thin;
  font-size: calc(8px + 0.5vw);
  cursor: pointer;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
`;
// width: 5.5rem;
// height: 2.5rem;

const Required = styled.sup`
  color: #ff0000;
`;

const Disclaimer = styled.div`
  font-size: .75rem;
  grid-column: 2;
  font-style: italic;
`;

const PhotoPreviews = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  grid-column: 1 / 3;
`;

const ImagePreview = styled.img`
  width:20%;
  height: 20%;
  margin-right: 1%;
`;

const Header = styled.header`
  margin-bottom: 0.5rem;
`;

const FileInput = styled.input`
  color: ${(props) => props.theme.fontColor};
  cursor: pointer;
  ::file-selector-button {
    color: ${(props) => props.theme.fontColor};
    background-color: ${(props) => props.theme.tertiaryColor};
    cursor: pointer;
  }
  font-size: calc(8px + 0.5vw);
  padding: calc(6px + 0.375vw);
  font: inherit;
`;

export default AddAnswerModal;
