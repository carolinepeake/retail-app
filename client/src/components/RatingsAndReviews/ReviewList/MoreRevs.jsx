import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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
          <MoreButton type="button" onClick={() => handleMoreReviews()}>
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

const MoreButton = styled.button`
  padding: calc(7.5px + 0.75vw);
  font-size: calc(10px + 1vw);
  background-color: ${(props) => props.theme.secondaryColor};
  color: ${(props) => props.theme.fontColor};
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
`;
