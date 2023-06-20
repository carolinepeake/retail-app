import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReviewTile from './ReviewTile';

function ReviewsList({
  filteredRevs, itemsPerPage, pageNum,
}) {
  const startingSlice = (pageNum - 1) * itemsPerPage;

  return (
    <ReviewTilesContainer>

      {filteredRevs.slice(startingSlice, (startingSlice + itemsPerPage)).map((review) => (
        <ReviewTile key={review.review_id} review={review} />))}

    </ReviewTilesContainer>
  );
}

ReviewsList.propTypes = {
  itemsPerPage: PropTypes.number.isRequired,
  pageNum: PropTypes.number.isRequired,
  filteredRevs: PropTypes.arrayOf(PropTypes.shape({
    review_id: PropTypes.number,
    rating: PropTypes.number,
    summary: PropTypes.string,
    recommend: PropTypes.bool,
    response: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.null,
    ]),
    body: PropTypes.string,
    date: PropTypes.string,
    reviewer_name: PropTypes.string,
    helpfulness: PropTypes.number,
    photos: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        url: PropTypes.string,
      })),
      PropTypes.array,
    ]),
  })).isRequired,
};

const ReviewTilesContainer = styled.div`

@media (max-width: 600px) {
  border-top: black solid 1px;
};

  @media (min-width: 600px) {
    max-height: 31em;
    overflow: auto;
  };
`;

export default ReviewsList;
