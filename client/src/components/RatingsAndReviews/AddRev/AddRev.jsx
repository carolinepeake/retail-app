import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import PropTypes from 'prop-types';
import StarRating from './StarRating';
import Characteristics from './Characteristics';
import AddPhotos from './AddPhotos';

function AddRev({ revMeta, productID, productInfo }) {
  const [addClicked, setAddClicked] = useState(false);
  const [starRating, setStarRating] = useState({
    meaning: '',
    numVal: 0,
  });
  const [recommendProd, setRecommendProd] = useState();
  const [charVal, setCharVal] = useState({});
  const [charObj, setCharObj] = useState({});
  const [revSum, setRevSum] = useState('');
  const [revBody, setRevBody] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');

  if (!revMeta.product_id) {
    return (
      <div />
    );
  }

  const handleAddRev = function handleAddRev() {
    setAddClicked((prevAddClicked) => !prevAddClicked);
  };

  const postRev = function postRev(newReview) {
    axios.post('/reviews', newReview)
      .then((result) => {
        console.log('A new review was posted to the API:\n', result);
      })
      .catch((err) => {
        console.log('there was an error posting review to API:\n', err);
      });
  };

  const handleSubmit = function handleSubmit(event) {
    event.preventDefault();
    const newRevObj = {
      product_id: productID,
      rating: starRating,
      summary: revSum,
      body: revBody,
      recommend: recommendProd,
      name: nickname,
      email,
      photos: [],
      characteristics: charObj,
    };
    postRev(newRevObj);
    setAddClicked(false);
    // console.log(newRevObj);
  };

  const handleBackgroundClick = function handleBackgroundClick(event) {
    if (event.target.id === 'AddRevBackground') {
      setAddClicked(false);
    }
  };

  return (
    <div>
      <AddButton type="button" onClick={() => handleAddRev()}>
        Add a Review +
      </AddButton>
      {addClicked && (
      <AddRevBackground id="AddRevBackground" onClick={(event) => handleBackgroundClick(event)}>
        <AddRevDiv>
          <CloseDiv onClick={() => setAddClicked(false)}>
            &#10006;
          </CloseDiv>
          <AddRevHeader>
            <h2>Write a Review</h2>
            <div>
              About the&nbsp;
              {productInfo.name}
            </div>
          </AddRevHeader>
          <FormContainer onSubmit={(event) => handleSubmit(event)}>

            <StarRating starRating={starRating} setStarRating={setStarRating} />
            <br />

            <RecommendProdLabel htmlFor="recommendProd" onChange={(event) => setRecommendProd(event.target.value === 'true')}>
              Do you recommend this product?*&nbsp;
              <div>
                <input required type="radio" value="true" name="ovRating" />
                Yes
                <input type="radio" value="false" name="ovRating" />
                No
              </div>
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
              <div>Review summary</div>
              <TextAreaDiv
                placeholder="Example: Best purchase ever!"
                maxLength="60"
                rows="1"
                onChange={(event) => setRevSum(event.target.value)}
              />
            </RevSummaryDiv>
            <br />

            <RevBodyDiv>
              <div>Review body*</div>
              <TextAreaDiv
                placeholder="Why did you like the product or not?"
                minLength="50"
                maxLength="1000"
                rows="6"
                onChange={(event) => setRevBody(event.target.value)}
                required
              />
            </RevBodyDiv>
            <br />

            <AddPhotos />
            <br />

            What is your nickname?*
            <TextAreaDiv
              maxLength="60"
              placeholder="Example: jackson11!"
              rows="1"
              onChange={(event) => setNickname(event.target.value)}
              required
            />
            <br />

            Your email*
            <TextAreaDiv
              maxLength="60"
              placeholder="Example: jackson11@email.com"
              rows="1"
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <AuthTag>For authentication reasons, you will not be emailed</AuthTag>
            <br />

            <ButtonContainer>
              <ButtonDiv type="submit">Submit</ButtonDiv>
              <ButtonDiv type="button" onClick={() => setAddClicked(false)}> Cancel </ButtonDiv>
            </ButtonContainer>

          </FormContainer>
        </AddRevDiv>
      </AddRevBackground>
      )}
    </div>
  );
}

AddRev.propTypes = {
  revMeta: PropTypes.shape({
    product_id: PropTypes.string,
  }).isRequired,
};

export default AddRev;

const AddButton = styled.button`
  padding: calc(7.5px + 0.75vw);
  font-size: calc(10px + 1vw);
  background-color: ${(props) => props.theme.secondaryColor};
  color: ${(props) => props.theme.fontColor};
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
`;
// height: 3rem;
// width: 14rem;

const AddRevBackground = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0%;
  top: 0%;
`;

const AddRevDiv = styled.div`
  width: 60vw;
  max-height: 80vh;
  padding: 25px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  border: 1px solid;
  background-color: ${(props) => props.theme.secondaryColor};
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  filter: drop-shadow(2px 4px 6px black);
  overflow: auto;
`;

const CloseDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 1.0rem;
  cursor: pointer;
`;

const AddRevHeader = styled.div`
  padding: 0em 1em 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormContainer = styled.form`
  display: flex;
  padding: 1em;
  flex-direction: column;
  position: relative;
`;

const RecommendProdLabel = styled.label`

`;

const TextAreaDiv = styled.textarea`
  resize: none;
  font-family: Arial;
  color: ${(props) => props.theme.fontColor};
`;

const RevSummaryDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const RevBodyDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthTag = styled.div`
  font-size: 1.0rem;
  font-style: oblique;
  font-weight: lighter;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 1.5em;
`;

const ButtonDiv = styled.button`
  width 40%;
  padding: calc(7.5px + 0.75vw);
  font-size: calc(10px + 1vw);
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
`;
