import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Summary from './Summary';
import RatingBreakdown from './RatingBreakdown';
import LengthBreakdown from './LengthBreakdown';

import { useGlobalContext } from '../../../contexts/GlobalStore';

function Breakdown({ filterReviews }) {
  console.log('[Breakdown] is running');
  const {
    productID, revMeta,
  } = useGlobalContext();

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
      />
    </BreakdownContainer>
  );
}

Breakdown.propTypes = {
  filterReviews: PropTypes.func.isRequired,
};

const BreakdownContainer = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  @media (min-width: 400px) {
    padding: 0.5rem;
  }
`;

export default Breakdown;
