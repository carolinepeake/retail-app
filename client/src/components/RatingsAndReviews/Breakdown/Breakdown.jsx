import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
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
    <BreakdownContainer>
      <Summary revMeta={revMeta} />
      <RatingBreakdown
        revMeta={revMeta}
        filterReviews={filterReviews}
        productID={productID}
      />
      <br />
      <LengthBreakdown
        revMeta={revMeta}
        productInfo={productInfo}
      />
    </BreakdownContainer>
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

const BreakdownContainer = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  padding: 0.5rem;
`;

export default Breakdown;
