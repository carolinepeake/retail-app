import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function Stars({
  rating,
}) {
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
      <FilledStar className="star" count={partial}>{filledStars}</FilledStar>
      <BaseStar className="star">{baseStars}</BaseStar>
    </StarsContainer>
  );
}

Stars.propTypes = {
  rating: PropTypes.number.isRequired,
};

const StarsContainer = styled.div`
  position: relative;
  margin-left: 0.25rem;
  margin-right: auto;
  font-size: ${(props) => props.theme.tertiary};
  color: ${(props) => props.theme.fontColor};
  margin-top: 0.25rem;
`;

const BaseStar = styled.span`
  position: relative;
`;

const FilledStar = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  display: flex;
  width: ${(props) => props.count}%;
  overflow:hidden;
  flex-direction: row;
  color: ${(props) => props.theme.starFilled};
  font-size: bold;
`;

export default Stars;
