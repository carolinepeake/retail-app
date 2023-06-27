import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function POStars({ rating }) {
  const [partial, setPartial] = useState(0);

  function calculateStars(rat) {
    const average = rat * 4;
    const partialTemp = Math.round(average) * 5;
    setPartial(partialTemp);
    console.log('average in stars: ', average, 'partialTemp: ', partialTemp);
  }

  useEffect(() => {
    calculateStars(rating);
  }, [rating]);

  // can memoize this calc b/c will always stay the same
  const baseStars = [];
  const filledStars = [];
  for (let i = 0; i < 5; i += 1) {
    baseStars.push(<span className="empty-star" key={i}>&#9734;</span>);
    filledStars.push(<span className="filled-star" key={i}>&#9733;</span>);
  }

  return (
    <StarsContainer>
      <FilledStar className="star" size={partial}>{filledStars}</FilledStar>
      <BaseStar className="star">{baseStars}</BaseStar>
    </StarsContainer>
  );
}

POStars.propTypes = {
  rating: PropTypes.number.isRequired,
};

const StarsContainer = styled.h5`
  position: relative;
  margin-right: 0.75rem;
  color: ${(props) => props.theme.fontColor};
  display: inline-block;
  margin-block-end: 0em;
  margin-block-start: .5em;
  font-weight: 300;
`;

const BaseStar = styled.span`
  position: relative;
`;

const FilledStar = styled.div`
  position: absolute;
  top: 0.5em;
  left: 0px;
  display: flex;
  width: ${(props) => props.size}%;
  overflow:hidden;
  flex-direction: row;
  color: ${(props) => props.theme.starFilled};
`;

export default POStars;
