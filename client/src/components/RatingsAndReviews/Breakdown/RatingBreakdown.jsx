import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function RatingBreakdown({ productID, revMeta, filterReviews }) {
  const [starFilter, setStarFilter] = useState([]);
  const [clickedBar, setClickedBar] = useState({});

  const totalVotesCalc = (ratingsObj) => {
    let totalVotes = 0;
    const entries = Object.entries(ratingsObj);
    entries.forEach((entry) => {
      const votes = parseInt(entry[1], 10);
      totalVotes += votes;
    });
    return totalVotes;
  };

  const totalVotes = totalVotesCalc(revMeta.ratings);

  const handleStarBarClick = (event) => {
    const val = parseInt(event.target.id, 10);
    const ind = starFilter.indexOf(val);
    setClickedBar((prevClickedBar) => {
      const copy = {};
      Object.assign(copy, prevClickedBar);
      copy[val] = !copy[val];
      return copy;
    });

    if (ind > -1) {
      setStarFilter((prevStarFilter) => {
        const copy = prevStarFilter.splice(0);
        copy.splice(ind, 1);
        return copy;
      });
    } else {
      setStarFilter((prevStarFilter) => prevStarFilter.concat(val));
    }
  };

  useEffect(() => {
    filterReviews(starFilter);
    // console.log(starFilter);
  }, [starFilter]);

  useEffect(() => {
    setClickedBar({
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
    });
    setStarFilter([]);
  }, [productID]);

  return (
    Object.entries(revMeta.ratings).map((ratingEntry) => (
      <StarRankContainer key={ratingEntry[0]}>
        <StarLabel>{`${ratingEntry[0]} stars`}</StarLabel>
        &nbsp;
        <StarBarBackground>
          <StarBar
            id={ratingEntry[0]}
            onClick={(event) => handleStarBarClick(event)}
            width={Math.round((ratingEntry[1] / totalVotes) * 100)}
            clickedBar={clickedBar[ratingEntry[0]]}
          />
        </StarBarBackground>
        <br />
        {/* <br /> */}
      </StarRankContainer>
    ))
  );
}

RatingBreakdown.propTypes = {
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

export default RatingBreakdown;

const StarRankContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const StarLabel = styled.div`
  display: flex;
  width: 30%;
  font-size: 0.9rem;
`;

const StarBar = styled.div`
  background: ${(props) => props.clickedBar ? props.theme.starFilled : 'grey'};
  height: 0.5rem;
  width: ${(props) => props.width}%;
  &:hover {
    background: ${(props) => props.theme.starFilled};
  }
`;

const StarBarBackground = styled.div`
  background: ${(props) => props.theme.starBackground};
  height: 100%;
  width: 70%;
  margin: auto 0;
`;
