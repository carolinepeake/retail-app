import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function StarRating({ rating, setRating }) {
  const handleClickStar = (starRating) => {
    const numVal = parseInt(starRating, 10);
    let meaning;
    if (numVal === 1) {
      meaning = 'Poor';
    } else if (numVal === 2) {
      meaning = 'Fair';
    } else if (numVal === 3) {
      meaning = 'Average';
    } else if (numVal === 4) {
      meaning = 'Good';
    } else if (numVal === 5) {
      meaning = 'Great';
    }

    setRating({
      meaning, numVal,
    });
  };

  return (
    <div>
      Overall star rating*&nbsp;
      <div>{rating.meaning}</div>
      <RadioButtonsContainer onChange={(event) => handleClickStar(event.target.value)}>

        <StarInput required type="radio" name="rating" value={1} />
        1
        <StarInput type="radio" name="rating" value={2} />
        2
        <StarInput type="radio" name="rating" value={3} />
        3
        <StarInput type="radio" name="rating" value={4} />
        4
        <StarInput type="radio" name="rating" value={5} />
        5
      </RadioButtonsContainer>
    </div>
  );
}

StarRating.propTypes = {
  rating: PropTypes.shape({
    meaning: PropTypes.string,
    numVal: PropTypes.number,
  }).isRequired,
  setRating: PropTypes.func.isRequired,
};

export default StarRating;

const RadioButtonsContainer = styled.div`
  margin-top: 0.25em;
`;

const StarInput = styled.input`

`;
