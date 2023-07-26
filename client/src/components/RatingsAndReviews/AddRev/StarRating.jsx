import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import RadioButton from './RadioButton';
import { RATING } from '../../utils/constants';

function StarRating({
  handleInputChange,
  rating,
}) {
  console.log('[StarRating] is running');

  return (
    <>
      <SubheaderContainer>
        <Subheader> Overall Rating</Subheader>
        <Required>*</Required>

        {rating
          ? <SelectedValue>{RATING[rating]}</SelectedValue>
          : <Placeholder>None Selected</Placeholder>}
      </SubheaderContainer>

      <RadioButtonsContainer>

        {Object.entries(RATING).map(([value, label]) => {
          console.log('value: ', value);
          return (
            <RadioButton
              key={label}
              required
              value={Number(value)}
              name="rating"
              handleChange={handleInputChange}
              checked={rating === value}
              label={label}
              rating={rating}
            />
          );
        })}

      </RadioButtonsContainer>
    </>
  );
}

StarRating.propTypes = {
  rating: PropTypes.string,
  handleInputChange: PropTypes.func.isRequired,
};

StarRating.defaultProps = {
  rating: null,
};

export default StarRating;

const SubheaderContainer = styled.div`
  margin-bottom: 1em;
`;

const Subheader = styled.span`
`;

const Required = styled.sup`
  color: ${(props) => props.theme.formError}
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

const RadioButtonsContainer = styled.div`
  display: flex;
  position: relative;
  border-top: 1px ${(props) => props.theme.secondaryFontColor} solid;
  justify-content: space-between;
  min-height: calc(2em + 24px);
  margin: 0 4px;
`;
