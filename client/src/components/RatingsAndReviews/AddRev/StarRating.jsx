import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import RadioButton from './RadioButton';

const RATING = {
  1: 'Poor',
  2: 'Fair',
  3: 'Average',
  4: 'Good',
  5: 'Great',
};

function StarRating({
  handleInputChange,
  rating,
}) {
  console.log('[StarRating] is running');

  return (
    <div>
      <Subheader>Overall Rating</Subheader>
      <Required>*</Required>

      <div>
        {rating
          ? RATING[rating]
          : 'none selected'}
      </div>

      <RadioButtonsContainer>

        {Object.entries(RATING).map(([value, label]) => (
          <RadioButton
            required
            value={value}
            name="rating"
            onChange={handleInputChange}
            checked={rating === Number(value)}
            label={label}
          />
        ))}

        {/* <StarInput required type="radio" name="rating" value={1} onChange={handleInputChange} id="star1" checked={rating === '1'} />
        <label htmlFor="star1">{1}</label>

        <StarInput type="radio" name="rating" value={2} onChange={handleInputChange} id="star2" checked={rating === '2'} />
        <label htmlFor="star2">{2}</label>

        <StarInput type="radio" name="rating" value={3} onChange={handleInputChange} id="star3" checked={rating === '3'} />
        <label htmlFor="star3">{3}</label>

        <StarInput type="radio" name="rating" value={4} onChange={handleInputChange} id="star4" checked={rating === '4'} />
        <label htmlFor="star4">{4}</label>

        <StarInput type="radio" name="rating" value={5} onChange={handleInputChange} id="star5" checked={rating === '5'} />
        <label htmlFor="star5">{5}</label> */}

      </RadioButtonsContainer>
    </div>
  );
}

StarRating.propTypes = {
  // or null
  // rating: PropTypes.string,
  handleInputChange: PropTypes.func.isRequired,
};

export default StarRating;

const RadioButtonsContainer = styled.div`
   /* margin-top: 0.25em; */
  margin: 0 5%;
  display: flex;
  position: relative;
  border-top: 1px ${(props) => props.theme.secondaryFontColor} solid;
  justify-content: space-between;
`;

const Subheader = styled.div`
`;

const Required = styled.sup`
  color: ${(props) => props.theme.formError}
`;

const StarInput = styled.input`
`;
