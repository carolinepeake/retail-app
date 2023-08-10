import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { calcAverageRating } from '../../../utils/useAverageRating';

function Summary({ revMeta }) {
  const recommendPercentage = Math.trunc(
    (parseInt(revMeta.recommended.true, 10)
    / (parseInt(revMeta.recommended.false, 10)
    + parseInt(revMeta.recommended.true, 10))) * 100,
  );

  const aveRating = calcAverageRating(revMeta.ratings);

  return (
    <div>
      <RatingHeader>{aveRating}</RatingHeader>
      <RatingSummary>
        {recommendPercentage}
        % of reviews recommend this product
      </RatingSummary>
    </div>
  );
}

Summary.propTypes = {
  revMeta: PropTypes.shape({
    characteristics: PropTypes.shape({}),
    product_id: PropTypes.string,
    ratings: PropTypes.shape({}),
    recommended: PropTypes.shape({
      true: PropTypes.string,
      false: PropTypes.string,
    }),
  }).isRequired,
};

export default Summary;

const RatingHeader = styled.div`
  font-size: 3.0rem;
`;

const RatingSummary = styled.div`
  font-size: 1.0rem;
  margin: 1.0rem 0;
`;
