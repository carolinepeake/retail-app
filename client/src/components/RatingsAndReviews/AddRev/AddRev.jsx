import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import StarRating from './StarRating';
import Characteristics from './Characteristics';
import AddPhotos from './AddPhotos';
import Button from '../../reusable/Button';

import { useGlobalContext } from '../../../contexts/GlobalStore';

function AddRev() {
  const {
    productID, productInfo, revMeta, reviews, setReviews,
  } = useGlobalContext();

  const [addClicked, setAddClicked] = useState(false);
  const [rating, setRating] = useState({
    meaning: '',
    numVal: 0,
  });
  const [recommend, setRecommend] = useState(false);
  const [charVal, setCharVal] = useState({});
  const [charObj, setCharObj] = useState({});
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [preview, setPreview] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [validInput, setValidInput] = useState(true);

  // if (!revMeta.product_id) {
  //   return (
  //     <div />
  //   );
  // }

  const handleAddRev = function handleAddRev() {
    setAddClicked((prevAddClicked) => !prevAddClicked);
  };

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

  function handleSubmit(event) {
    event.preventDefault();

    if (!validateInput()) {
      setValidInput(false);
      console.log('add review input failed validation');
      return;
    }

    const revBody = {
      product_id: productID,
      rating: rating.numVal,
      summary,
      body,
      recommend,
      name,
      email,
      photos: [],
      characteristics: charObj,
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
          revBody.photos.push(result.data.url);
          console.log('photos: ', result.data.url);
        });

        axios
          .post('/reviews', revBody)
          .then((result) => {
            console.log('A new review was posted to the API:\n', result);
            // setReviews([{
            //   rating,
            //   summary,
            //   recommend,
            //   response: null,
            //   body,
            //   reviewer_name: name,
            //   helpfulness:
            // }, ...reviews]);
            setAddClicked(false);
          })
          .catch((err) => {
            console.log('there was an error posting review to API:\n', err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleBackgroundClick = function handleBackgroundClick(event) {
    if (event.target.id === 'AddRevBackground') {
      setAddClicked(false);
    }
  };

  return (
    <>
      <AddRevButton modal type="button" onClick={() => handleAddRev()}>
        Add a Review +
      </AddRevButton>
      {addClicked && (
      <AddRevBackground id="AddRevBackground" onClick={(event) => handleBackgroundClick(event)}>
        <AddRevDiv>
          <Button close onClick={() => setAddClicked(false)}>
            &#x2715;
          </Button>
          <AddRevHeader>
            <WriteAReview>Write a Review</WriteAReview>
            <ProductName>
              {/* About the&nbsp; */}
              {productInfo.name}
            </ProductName>
          </AddRevHeader>
          <FormContainer onSubmit={(event) => handleSubmit(event)}>

            <StarRating rating={rating} setRating={setRating} />
            <br />

            <RecommendProdLabel label="recommend" onChange={(event) => setRecommend(event.target.value === 'true')}>
              Do you recommend this product?
              <Required>*</Required>
              <RadioButtonsContainer>
                <input required type="radio" value="true" name="ovRating" id="recommend" />
                Yes
                <input type="radio" value="false" name="ovRating" id="recommend" />
                No
              </RadioButtonsContainer>
            </RecommendProdLabel>
            <br />

            <Characteristics
              revMeta={revMeta}
              productInfo={productInfo}
              charVal={charVal}
              setCharVal={setCharVal}
              charObj={charObj}
              setCharObj={setCharObj}
            />
            <br />

            <RevSummaryDiv>
              <CustomLabel label="summary">
                Review Summary
                <TextAreaDiv
                  placeholder="Example: Best purchase ever!"
                  maxLength="60"
                  rows="1"
                  id="summary"
                  onChange={(event) => setSummary(event.target.value)}
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
                  onChange={(event) => setBody(event.target.value)}
                  required
                  id="body"
                />
              </CustomLabel>
            </RevBodyDiv>
            <br />

            <AddPhotos preview={preview} setPreview={setPreview} />
            <br />

            <CustomLabel label="name">
              What is your nickname?
              <Required>*</Required>
              <TextInput
                type="text"
                as="input"
                maxLength="60"
                placeholder="Example: jackson11!"
                rows="1"
                onChange={(event) => setName(event.target.value)}
                required
                id="name"
              />
            </CustomLabel>
            <br />

            <CustomLabel label="email">
              Your Email
              <Required>*</Required>
              <TextInput
                type="text"
                as="input"
                maxLength="60"
                placeholder="Example: jackson11@email.com"
                rows="1"
                onChange={(event) => setEmail(event.target.value)}
                required
                id="email"
              />
            </CustomLabel>
            <AuthTag>For authentication reasons, you will not be emailed</AuthTag>
            <br />

            {!validInput ? (
              <ErrorsContainer>
                <div>
                  1. Not all mandatory fields have been provided.
                </div>
                <div>2. Email is not in the correct email format.</div>
                <div>
                  3. The images selected are invalid or unable to be
                  uploaded.
                </div>
              </ErrorsContainer>
            ) : null}

            <ButtonContainer>
              <ButtonDiv modal type="submit" onClick={(e) => handleSubmit(e)}>Submit</ButtonDiv>
              {/* <ButtonDiv type="button" onClick={() => setAddClicked(false)}> Cancel </ButtonDiv> */}
            </ButtonContainer>

          </FormContainer>
        </AddRevDiv>
      </AddRevBackground>
      )}
    </>
  );
}

// AddRev.propTypes = {
//   revMeta: PropTypes.shape({
//     product_id: PropTypes.string,
//   }).isRequired,
// };

export default AddRev;

const AddRevButton = styled(Button)`
  flex: 1;
`;

const AddRevBackground = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0%;
  top: 0%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 51;
  @media (min-width: 50rem) {
    z-index: 20;
  };
`;

const AddRevDiv = styled.div`
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
    max-height: 90vh;
    border: 1px solid;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  };

  @media (min-width: 50rem) {
    max-height: 80vh;
    width: 60vw;
    z-index: 21;
    top: 1.5rem;
  };
`;
// filter: drop-shadow(2px 4px 6px black);

const AddRevHeader = styled.div`
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
`;

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
  };

  @media (min-width: 50rem) {
    width: 80%;
  };
`;

const RadioButtonsContainer = styled.div`
  margin-top: 0.25em;
`;

const RecommendProdLabel = styled.label`
`;

const CustomLabel = styled.label`
  display: block;
`;

const TextAreaDiv = styled.textarea`
  resize: none;
  display: block;
  width: 100%;
  font-family: inherit;
  color: ${(props) => props.theme.fontColor};
  background-color: ${(props) => props.theme.backgroundColor};
  margin-top: 0.25em;
  padding: 0.5em;
  border: 1px solid currentColor;
  border-radius: 5px;
  font-size: ${(props) => props.theme.input};
  ::placeholder {
    color: ${(props) => props.theme.inputPlaceholder};
  };
  &:focus {
    background-color: ${(props) => props.theme.navBgColor};
  };
`;

const TextInput = styled(TextAreaDiv)`
  border-radius: 0px;
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
  };
`;

const ButtonDiv = styled(Button)`
  flex: 1;
  margin: 0.5rem 0;

  @media (min-width: 600px) {
    margin: 0;
  };
`;
