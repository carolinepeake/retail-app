import React from 'react';
import PropTypes from 'prop-types';
import Summary from './Summary';
import RatingBreakdown from './RatingBreakdown';
import LengthBreakdown from './LengthBreakdown';

function Breakdown({ productID, productInfo, revMeta, filterReviews }) {
  if (!revMeta.product_id) {
    return (
      <div />
    );
  }

  return (
    <div style={{ fontSize: '1.17rem' }}>
      Ratings & Reviews
      <Summary revMeta={revMeta} />
      <RatingBreakdown
        revMeta={revMeta}
        filterReviews={filterReviews}
        productID={productID}
      />
      {/* <br /> */}
      <LengthBreakdown
        revMeta={revMeta}
        productInfo={productInfo}
      />
    </div>
  );
}

Breakdown.propTypes = {
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

export default Breakdown;
