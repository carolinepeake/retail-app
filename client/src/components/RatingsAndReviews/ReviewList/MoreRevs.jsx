import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../../reusable/Button.jsx';

function MoreRevs({ productID, setRevCount, revListLength }) {
  const noMoreReviews = useRef(false);
  const handleMoreReviews = function handleMoreReviews() {
    setRevCount(() => {
      noMoreReviews.current = true;
      return revListLength;
    });
  };

  useEffect(() => {
    noMoreReviews.current = false;
  }, [productID]);

  return (
    <div>
      {!noMoreReviews.current
        && (
          <MoreButton primary type="button" onClick={() => handleMoreReviews()}>
            More Reviews
          </MoreButton>
        )}
    </div>
  );
}

MoreRevs.propTypes = {
  productID: PropTypes.number.isRequired,
  setRevCount: PropTypes.func.isRequired,
  revListLength: PropTypes.number.isRequired,
};

export default MoreRevs;

const MoreButton = styled(Button)`
  background-color: ${(props) => props.theme.secondaryColor};
  color: ${(props) => props.theme.fontColor};
`;
