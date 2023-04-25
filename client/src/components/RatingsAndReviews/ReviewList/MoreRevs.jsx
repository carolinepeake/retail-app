import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../../reusable/Button';

function MoreRevs({ revCount, setRevCount }) {
  function handleMoreReviews() {
    setRevCount((prev) => prev + 5);
  }

  return (
    <MoreRevsButton type="button" onClick={() => handleMoreReviews()}>
      More Reviews
    </MoreRevsButton>
  );
}

MoreRevs.propTypes = {
  revCount: PropTypes.number.isRequired,
  setRevCount: PropTypes.func.isRequired,
};

const MoreRevsButton = styled(Button)`
  flex: 1;
`;

export default MoreRevs;
