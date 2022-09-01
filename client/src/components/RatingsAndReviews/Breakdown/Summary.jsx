import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function Summary({ revMeta }) {
  const recommendPercentage = Math.trunc(
    (parseInt(revMeta.recommended.true, 10)
    / (parseInt(revMeta.recommended.false, 10)
    + parseInt(revMeta.recommended.true, 10))) * 100,
  );

  const aveRatingCalc = (ratingsObj) => {
    let totalRatings = 0;
    let totalVotes = 0;
    const entries = Object.entries(ratingsObj);
    entries.forEach((entry) => {
      const rating = parseInt(entry[0], 10);
      const votes = parseInt(entry[1], 10);
      totalVotes += votes;
      totalRatings += rating * votes;
    });
    return Math.round((totalRatings / totalVotes) * 100) / 100;
  };

  const aveRating = aveRatingCalc(revMeta.ratings);

  return (
    <div>
      <RatingHeader>{aveRating}</RatingHeader>
      <p>
        {recommendPercentage}
        % of reviews recommend this product
      </p>
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
  padding: .12em;
  font-size: 0.25rem;
`;
