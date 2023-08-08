import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import StarRating from './StarRating';
import RecommendRadio from './RecommendRadio';
import Characteristics from './Characteristics';
import AddPhotos from '../../../components/Form/AddPhotos';
import Modal from '../../../components/Modal';
import useForm from '../../../hooks/useForm';
import { CHARACTERISTICS } from '../../../constants/constants';
import { Button } from '../../../components/Button';

import { useGlobalContext } from '../../../contexts/GlobalStore';

function AddRev({ toggleModal, showModal }) {
  const {
    productID, productInfo, revMeta,
  } = useGlobalContext();

  const initialFormState = {
    product_id: Number(productID),
    rating: null,
    summary: '',
    body: '',
    recommend: null,
    name: '',
    email: '',
    photos: [],
    characteristics: {},
  };

  const submitReview = (form) => {
    // need to make data transformation a function so can catch errors from it
    console.log('submitting review: ', form);
    const previews = form.photos.map((photo) => photo.url);

    const ratingNum = Number(form.rating);

    let recommendBool;
    if (form.recommend === 'true') {
      recommendBool = true;
    } else if (form.recommend === 'false') {
      recommendBool = false;
    } else {
      console.log('recommend value incorrect type: ', typeof form.recommend, form.recommend);
      return;
    }

    const characteristicsNums = {};
    const revCharacteristics = Object.keys(form.characteristics);
    console.log('revCharacteristics: ', revCharacteristics);
    for (let i = 0; i < revCharacteristics.length; i++) {
      const characteristicId = revCharacteristics[i];
      characteristicsNums[characteristicId] = Number(form.characteristics[characteristicId]);
    }

    const postBody = {
      ...form,
      photos: previews,
      rating: ratingNum,
      recommend: recommendBool,
      characteristics: characteristicsNums,
    };
    console.log('postBody: ', postBody);

    axios
      .post('/reviews', postBody)
      .then(() => {
        // show success message
        console.log('review submitted successfully');
        // closeModal();
        toggleModal();
        // repopulate reviews?
      })
      .catch((err) => {
        // show error message
        console.log('there was an error adding review: ', err);
      });
  };

  // might want to memoize handleInputChange or rating b/c StarRating is re-rendering upon any change to every form component
  const [
    formState,
    errors,
    handleInputChange,
    resetForm,
    handleSubmit,
  ] = useForm(submitReview, initialFormState);

  const closeModal = () => {
    toggleModal();
    resetForm();
  };

  return (
    <Modal closeModal={closeModal}>
      <FormContainer onSubmit={handleSubmit}>

        <WriteAReview>Write a Review</WriteAReview>
        <ProductName>
          {productInfo.name}
        </ProductName>

        <StarRating
          handleInputChange={handleInputChange}
          rating={formState.rating}
        />
        <br />

        <RecommendProdLabel>
          Would you recommend this product to a friend?
          <Required>*</Required>
          <RadioButtonsContainer>

            <RecommendRadio
              label="Yes"
              value="true"
              handleChange={handleInputChange}
              checked={formState.recommend === 'true'}
            />
            <RecommendRadio
              label="No"
              value="false"
              handleChange={handleInputChange}
              checked={formState.recommend === 'false'}
            />

          </RadioButtonsContainer>
        </RecommendProdLabel>
        <br />

        {Object.keys(revMeta.characteristics).map((name) => {
          const characteristic = CHARACTERISTICS[name];
          return (
            <>
              <Characteristics
                key={name}
                  // id={id}
                name={name}
                characteristic={characteristic}
                handleInputChange={handleInputChange}
                inputState={formState.characteristics}
              />
              {/* <br /> */}
            </>
          );
        })}
        <br />

        <RevSummaryDiv>
          <CustomLabel label="summary">
            Review Summary
            <TextInput
              placeholder="Example: Best purchase ever!"
              maxLength="60"
              id="summary"
              name="summary"
              type="text"
              as="input"
              value={formState.summary}
              onChange={handleInputChange}
            />
          </CustomLabel>
        </RevSummaryDiv>
        <br />

        <RevBodyDiv>
          <CustomLabel label="body">
            Review body
            <Required>*</Required>
            <TextAreaDiv
              placeholder="Why did you like the product or not?"
              minLength="50"
              maxLength="1000"
              rows="6"
              onChange={handleInputChange}
              required
              id="body"
              name="body"
              value={formState.body}
            />
          </CustomLabel>
        </RevBodyDiv>
        <br />

        <AddPhotos
          handleInputChange={handleInputChange}
          photos={formState.photos}
        />
        <br />

        <CustomLabel label="name">
          Username
          <Required>*</Required>
          <TextInput
            type="text"
            as="input"
            maxLength="60"
            placeholder="Example: jackson11!"
            onChange={handleInputChange}
            value={formState.name}
            required
            id="name"
            name="name"
          />
        </CustomLabel>
        <AuthTag>
          For privacy reasons, do not use your full name or email
          address.
        </AuthTag>
        <br />

        <CustomLabel label="email">
          Your Email
          <Required>*</Required>
          <TextInput
            type="email"
            as="input"
            maxLength="60"
            placeholder="Example: jackson11@email.com"
            rows="1"
            onChange={handleInputChange}
            value={formState.email}
            required
            id="email"
            name="email"
          />
        </CustomLabel>
        <AuthTag>For authentication reasons, you will not be emailed</AuthTag>
        <br />

        {errors.length > 0
          && (
          <AuthTag>
            {errors.map((error) => (
              <ErrorsContainer key={error.id}>{error.message}</ErrorsContainer>
            ))}
          </AuthTag>
          )}

        <ButtonContainer>
          <ButtonDiv $primary type="submit">Submit</ButtonDiv>
          <ButtonDiv type="button" onClick={() => closeModal()}> Cancel </ButtonDiv>
        </ButtonContainer>

      </FormContainer>
    </Modal>
  );
}

// AddRev.propTypes = {
//   revMeta: PropTypes.shape({
//     product_id: PropTypes.string,
//   }).isRequired,
// };

export default AddRev;

const WriteAReview = styled.h2`
  margin-top: 0px;
`;

const ProductName = styled.h4`
  margin-top: 0px;
  font-size: 1.5em;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;

  @media (min-width: 40rem) {
    width: 90%;
  }
`;

const RadioButtonsContainer = styled.div`
  margin-top: 0.75em;
  display: flex;
  min-height: calc(2em + 24px);
  width: 50%;
  justify-content: flex-start;
  gap: 2em;
  position: relative;
  /* margin: 0 4px; */
`;

const RecommendProdLabel = styled.span`
  display: block;
  font-weight: 300;
  color: ${(props) => props.theme.fontColor};
  font-size: ${(props) => props.theme.body};
`;

const CustomLabel = styled.label`
  display: block;
  color: rgb(37, 55, 70);
  font-weight: 400;
`;

// margin-top: 0.5em;
const TextAreaDiv = styled.textarea`
  resize: none;
  display: block;
  width: 100%;
  font-family: inherit;
  color: ${(props) => props.theme.fontColor};
  background-color: ${(props) => props.theme.backgroundColor};
  margin-top: 0.5em;
  padding: 0.5em;
  border: 1px solid currentColor;
  border-radius: 3px;
  font-size: ${(props) => props.theme.input};
  boxShadow: inset -1px 1px 3px 0.5px ${(props) => props.theme.insetBoxShadow}, inset 0.5px -0.5px 3px 1px ${(props) => props.theme.insetBoxShadow};
  ::placeholder {
    color: ${(props) => props.theme.inputPlaceholder};
  }
  &:focus {
    background-color: ${(props) => props.theme.navBgColor};
    transform: scale(1.01);
    transition: scale 0.2s ease;
    outline-offset: 3px;
    outline-color: ${(props) => props.theme.focusColor}
    outline-width: 2px;
  }
  &:focus-visible: {
    outline: 2px ${(props) => props.theme.focusColor} solid;
    outline-offset: 3px;
  }
`;

const TextInput = styled(TextAreaDiv)`
`;

const Required = styled.sup`
  color: ${(props) => props.theme.formError}
`;

const RevSummaryDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const RevBodyDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthTag = styled.h5`
  font-style: oblique;
`;

const ErrorsContainer = styled.div`
  color: ${(props) => props.theme.formError}
  font-style: oblique;
  font-size: 0.83em;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 1.0em;

  @media (min-width: 600px) {
    flex-direction: row;
    column-gap: 2rem;
    justify-content: space-evenly;
    align-items: center;
    padding: 1.0em 0 1.0em 0;
  }
`;

const ButtonDiv = styled(Button)`
  flex: 1;
  margin: 0.5rem 0;

  @media (min-width: 600px) {
    margin: 0;
  }
`;
