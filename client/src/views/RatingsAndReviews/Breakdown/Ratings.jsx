import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CharactersticRating from './CharactersticRating';
import RatingBar from './RatingBar';
import { calcTotalVotes, calcRecommendPercentage, calcAverageRating } from '../../../utils/getAverageRating';
import { useGlobalContext } from '../../../contexts/GlobalStore';

// TODO: make gap bigger between reviewsList and ratings breakdown

export default function Ratings({
  ratingsFilter,
  setRatingsFilter,
}) {
  console.log('[Breakdown] is running');
  const {
    revMeta,
  } = useGlobalContext();

  if (!revMeta.product_id) {
    return (
      <div />
    );
  }

  const handleStarBarClick = (value) => {
    const val = parseInt(value, 10);
    const index = ratingsFilter.indexOf(val);
    if (index > -1) {
      setRatingsFilter((prevRatingsFilter) => {
        const copy = prevRatingsFilter.splice(0);
        copy.splice(index, 1);
        return copy;
      });
    } else {
      setRatingsFilter((prevRatingsFilter) => prevRatingsFilter.concat(val));
    }
  };

  const totalVotes = calcTotalVotes(revMeta.ratings);
  const recommendPercentage = calcRecommendPercentage(revMeta.recommended);
  const aveRating = calcAverageRating(revMeta.ratings);

  return (
    <BreakdownContainer>

      <RatingHeader>
        {aveRating}
      </RatingHeader>

      <RatingSummary>
        {recommendPercentage}
        % of reviews recommend this product
      </RatingSummary>

      {Object.entries(revMeta.ratings).map(([ratingValue, ratingCount]) => (
        <RatingBar
          key={`rating_${ratingValue}`}
          ratingValue={ratingValue}
          handleFilterClick={handleStarBarClick}
          width={Math.round((ratingCount / totalVotes) * 100)}
          clickedBar={ratingsFilter.includes(Number(ratingValue))}
        />
      ))}

      <br />

      {Object.entries(revMeta.characteristics).map(([label, { id, value }]) => (
        <CharactersticRating
          key={id}
          label={label}
          value={value}
        />
      ))}

    </BreakdownContainer>
  );
}

Ratings.propTypes = {
  ratingsFilter: PropTypes.arrayOf(PropTypes.number).isRequired,
  setRatingsFilter: PropTypes.func.isRequired,
};

const BreakdownContainer = styled.div`
  background-color: ${(props) => props.theme.navBgColor};
  max-width: 22em;
  margin: 0 auto;
  margin-top: 0.5em;

  @media (min-width: 400px) {
    padding: 0.5em 2.5%;
  }

  @media (min-width: 20em) {
    padding: 5%;
    max-width: none;
  }

  @media (min-width: 600px) {
    margin-top: 1em;
    margin-bottom: auto;
    max-width: 20em;
    flex-basis: auto;
    flex-grow: 5;
    flex-shrink: 1;
    min-width: 12em;
    width: 15em;
    padding: 2.5%;
    padding-top: 1.75%;
  }
`;

const RatingHeader = styled.div`
  font-size: 3.0em;
`;

const RatingSummary = styled.div`
  font-size: 1.0em;
  margin: 1.0em 0;
`;
