import React from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../../contexts/GlobalStore';

function POStars() {
  const {
    reviews
  } = useGlobalContext();

  const baseStars = [];
  const filledStars = [];

  let average = 0;
  for (let i = 0; i < reviews.length; i += 1) {
    average += reviews[i].rating;
  }
  average /= reviews.length;
  const partial = average * 20;
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

const StarsContainer = styled.h5`
  position: relative;
  margin-left: auto;
  margin-right: 0.75rem;
  color: ${(props) => props.theme.fontColor};
  display: inline-block;
  margin-block-end: 0em;
  margin-block-start: .5em;
  1.25em;
`;

// const StarsContainer = styled.div`
//   position: relative;
//   margin-left: auto;
//   margin-right: auto;
//   font-size: 25px;
//   color: ${(props) => props.theme.fontColor};
// `;

const BaseStar = styled.span`
  position: relative;
`;

const FilledStar = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  display: flex;
  width: ${(props) => props.size}%;
  overflow:hidden;
  flex-direction: row;
  color: gold;
  font-size: bold;
`;

export default POStars;
