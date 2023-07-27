import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function StarCount({ rating }) {
  const starCount = [];

  for (let i = 0; i < rating; i += 1) {
    starCount.push(i);
  }

  return (
    <div>
      <StarContainer>
        {starCount.map((star) => (
          <div key={star}>&#9733;</div>
        ))}
      </StarContainer>
    </div>
  );
}

StarCount.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default StarCount;

const StarContainer = styled.div`
  display: flex;
`;
