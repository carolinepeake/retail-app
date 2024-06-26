import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';
import PropTypes from 'prop-types';
import RecommendRadio from './RecommendRadio';
import Characteristics from './Characteristics';
import AddPhotos from '../../../components/Form/AddPhotos';
import Modal from '../../../components/Modal';
import CharacterCount from '../../../components/Form/CharacterCount';
// import RequiredDisclaimer from '../../../components/Form/RequiredDisclaimer';
import Header from '../../../components/Form/Header';
import useForm from '../../../hooks/useForm';
import useModal from '../../../hooks/useModal';
import { CHARACTERISTICS, RATING } from '../../../constants/constants';
import { Button } from '../../../components/Buttons';
import { useGlobalContext } from '../../../contexts/GlobalStore';

function AddRev({
  toggleModal,
}) {
  const {
    productID, productInfo, revMeta,
  } = useGlobalContext();

  const [showSubmittedModal, toggleSubmittedModal] = useModal();
  const [submittedMessage, setSubmittedMessage] = useState('Review Submitted Successfully');
  const closeSubmittedModal = () => {
    toggleSubmittedModal();
    toggleModal();
  };

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

    axios
      .post('/reviews', postBody)
      .then(() => {
        // repopulate reviews?
        setSubmittedMessage('Review Submitted Successfully');
        toggleSubmittedModal();
      })
      .catch((err) => {
        console.log('there was an error adding review: ', err);
        setSubmittedMessage(err.message || 'Error submitting review');
        toggleSubmittedModal();
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

  // const handleMouseEnter = () => {

  // };

  // cont handleMouseExit = () => {

  // };

  return (
    <Modal
      closeModal={closeModal}
      submitted={showSubmittedModal}
    >

      {!showSubmittedModal
        ? (
          <form onSubmit={handleSubmit}>

            <Header
              title="Write a Review"
              product={productInfo.name}
              closeModal={closeModal}
            />

            <Field>
              <RecommendProdLabel>
                Overall Rating *

                {formState.rating
                  ? (
                    <SelectedValue>
                      {`${formState.rating} out of 5 stars selected. Product is ${RATING[formState.rating]}.`}
                    </SelectedValue>
                  )
                  : <Placeholder>None Selected</Placeholder>}

                <RadioButtonsContainer $rating>
                  {Object.keys(RATING).map((value) => (
                    <RecommendRadio
                      key={`star${value}`}
                      label="☆"
                      // value={6 - Number(value)}
                      // value={1 + Number(value)}
                      value={Number(value)}
                      handleChange={handleInputChange}
                      // checked={Number(formState.rating) === (6 - Number(value))}
                      checked={Number(formState.rating) === (Number(value))}
                      name="rating"
                      $rating
                      required={value === '1'}
                      // selected={Number(formState.rating) >= (6 - Number(value))}
                      selected={Number(formState.rating) >= (Number(value))}
                      notSelected={!((Number(formState.rating) || 0) >= (Number(value)))}
                      // handleeMouse
                    />
                  ))}
                </RadioButtonsContainer>
              </RecommendProdLabel>
            </Field>

            <Field>
              <RecommendProdLabel>
                Would you recommend this product to a friend? *
                <RadioButtonsContainer>

                  <RecommendRadio
                    key="recommendYes"
                    label="Yes"
                    value="true"
                    handleChange={handleInputChange}
                    checked={formState.recommend === 'true'}
                    name="recommend"
                    required
                  />
                  <RecommendRadio
                    key="recommendNo"
                    label="No"
                    value="false"
                    handleChange={handleInputChange}
                    checked={formState.recommend === 'false'}
                    name="recommend"
                  />

                </RadioButtonsContainer>
              </RecommendProdLabel>
            </Field>

            <Field>
              {/* <fieldset>

                <legend>Product Characteristics</legend>

                <div> */}

                  {Object.keys(revMeta.characteristics).map((name) => (
                    <Characteristics
                      key={`radio${name}`}
                      id={name.id}
                      title={name}
                      characteristic={CHARACTERISTICS[name]}
                      handleInputChange={handleInputChange}
                      inputState={formState.characteristics}
                    />
                  ))}
{/*
                </div>

              </fieldset> */}
            </Field>

            <Field>
              <StyledLabel label="summary">
                Review Summary
                <StyledInput
                  placeholder="Example: Best purchase ever!"
                  maxLength="60"
                  id="summary"
                  name="summary"
                  type="text"
                  value={formState.summary}
                  onChange={handleInputChange}
                />
              </StyledLabel>
            </Field>

            <Field>
              <StyledLabel label="body">
                Review body *
                <StyledTextArea
                  placeholder="Why did you like the product or not?"
                  minLength="50"
                  maxLength="1000"
                  rows="6"
                  onChange={handleInputChange}
                  required
                  id="body"
                  name="body"
                  value={formState.body}
                  as="textarea"
                />
              </StyledLabel>
              <CharacterCount
                characterLimit={1000}
                charactersUsed={formState.body.length}
              />
            </Field>

            <Field>
              <AddPhotos
                handleInputChange={handleInputChange}
                photos={formState.photos}
              />
            </Field>

            <Field>
              <StyledLabel label="name">
                Username *
                <StyledInput
                  type="text"
                  maxLength="60"
                  placeholder="Example: jackson11!"
                  onChange={handleInputChange}
                  value={formState.name}
                  required
                  id="name"
                  name="name"
                />
              </StyledLabel>
              <Disclaimer>
                For privacy reasons, do not use your full name or email
                address.
              </Disclaimer>
            </Field>

            <Field>
              <StyledLabel label="email">
                Your Email *
                <StyledInput
                // type="email"
                  maxLength="60"
                  placeholder="Example: jackson11@email.com"
                  onChange={handleInputChange}
                  value={formState.email}
                // required
                  id="email"
                  name="email"
                />
              </StyledLabel>
              <Disclaimer>For authentication reasons, you will not be emailed</Disclaimer>
            </Field>

            {errors.map((error) => (
              <ErrorsContainer key={error.id}>{error.message}</ErrorsContainer>
            ))}

            <ButtonContainer>
              <ButtonDiv
                $primary
                $submit
                type="submit"
              >
                Submit
              </ButtonDiv>

              <ButtonDiv
                $cancel
                type="button"
                onClick={closeModal}
              >
                Cancel
              </ButtonDiv>
            </ButtonContainer>

          </form>
        )
        : (
          <div>
            <div>
              {submittedMessage}
            </div>
            <ButtonContainer>
              <ButtonDiv
                type="button"
                onClick={closeSubmittedModal}
                $submitted
              >
                Close
              </ButtonDiv>
            </ButtonContainer>
          </div>
          // <SubmittedModal
          //   submittedMessage={submittedMessage}
          //   closeSubmittedModal={closeSubmittedModal}
          // />
        )}

    </Modal>
  );
}

AddRev.propTypes = {
  toggleModal: PropTypes.func.isRequired,
};

export default AddRev;

const Field = styled.div`
  margin: 1.5em 0;
`;

const RadioButtonsContainer = styled.div`
  margin-top: 0.75em;
  display: flex;
  min-height: calc(2em + 24px);
  width: 50%;
  justify-content: flex-start;
  gap: 0.5em;
  position: relative;
  ${(props) => props.$rating && css`
    width: auto;
    flex-wrap: wrap;
  /*  flex-direction: row-reverse;
    justify-content: flex-end; */
    color: ${props.theme.blue[5]};
  /*  background-color: ${props.theme.backgroundColor}; */
    &:hover {
      color: ${props.theme.backgroundColor};
      /* ${props.theme.blue[5]}; */
    /*  background-color: ${props.theme.blue[5]}; */
    background: transparent;
    color: transparent;
    }
  `};
`;

const RecommendProdLabel = styled.span`
  display: block;
  font-size: ${(props) => props.theme.body};
  font-weight: 400;
  color: rgb(37, 55, 70);
`;

const StyledLabel = styled.label`
  font-size: ${(props) => props.theme.body};
  font-weight: 400;
  color: rgb(37, 55, 70);
  display: block;
`;

const Placeholder = styled.span`
  color: ${(props) => props.theme.inputPlaceholder};
  display: block;
  margin-top: 0.75em;
  font-size: ${(props) => props.theme.input};
  font-weight: 400;
`;

const SelectedValue = styled(Placeholder)`
  color: ${(props) => props.theme.secondaryFontColor};
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
  line-height: 1.5em;
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
  margin-bottom: 0.375em;
 /* line-height: 1.5em; */
`;

const Disclaimer = styled.h5`
  font-style: oblique;
  padding-top: 0;
`;

const ErrorsContainer = styled.div`
  color: ${(props) => props.theme.formError};
  font-style: oblique;
  margin-bottom: 1em;
  font-size: 0.875em;
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
  margin: 0.5em 0;

  @media (min-width: 600px) {
    margin: 0;
  }

  ${(props) => props.$submitted && css`
    background-color: ${props.theme.blue[5]};
    color: ${props.theme.submitButtonHoverFont};
  `};
`;
