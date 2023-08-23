import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { calculateStars } from '../../../utils/getAverageRating';

function Stars({ rating }) {
  const partialStarWidth = calculateStars(rating);

  const baseStars = [];
  const filledStars = [];
  for (let i = 0; i < 5; i += 1) {
    baseStars.push(<span className="empty-star" key={i}>&#9734;</span>);
    filledStars.push(<span className="filled-star" key={i}>&#9733;</span>);
  }

  return (
    <StarsContainer>
      <FilledStar className="star" size={partialStarWidth}>{filledStars}</FilledStar>
      <BaseStar className="star">{baseStars}</BaseStar>
    </StarsContainer>
  );
}

Stars.propTypes = {
  rating: PropTypes.number.isRequired,
};

const StarsContainer = styled.div`
  position: relative;
  font-size: ${(props) => props.theme.tertiary};
  color: ${(props) => props.theme.fontColor};
  margin-top: 0.25rem;
  margin-right: auto;
  display: inline-block;
`;

const BaseStar = styled.span`
  position: relative;
`;

const FilledStar = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  display: flex;
  width: ${(props) => props.size}%;
  overflow: hidden;
  flex-direction: row;
  color: ${(props) => props.theme.starFilled};
  font-size: bold;
`;

export default Stars;
