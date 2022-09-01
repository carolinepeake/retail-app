import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useGlobalContext } from '../../../contexts/GlobalStore';

function StarRating({ starRating, setStarRating }) {
  const handleClickStar = (rating) => {
    const numVal = parseInt(rating, 10);
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
    };

    setStarRating({
      meaning, numVal
    });
  };

  return (
    <div>
      Overall star rating*&nbsp;
      <br />
      <div>{starRating.meaning}</div>
      <div onChange={(event) => handleClickStar(event.target.value)}>

        <StarInput required type="radio" name="starRating" value={1} />
        1
        <StarInput type="radio" name="starRating" value={2} />
        2
        <StarInput type="radio" name="starRating" value={3} />
        3
        <StarInput type="radio" name="starRating" value={4} />
        4
        <StarInput type="radio" name="starRating" value={5} />
        5
      </div>
    </div>
  );
}

StarRating.propTypes = {
  starRating: PropTypes.shape({
    meaning: PropTypes.string,
    numVal: PropTypes.number,
  }).isRequired,
};

export default StarRating;

const AddButton = styled.button`
  padding: 0.75em;
  font-size: 1.17em;
  font-weight: bold;
`;

const StarInput = styled.input`

`;
