import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default function RatingBreakdown({
  ratingValue,
  handleFilterClick,
  width,
  clickedBar,
}) {
  console.log('[RatingBar] is running');

  const handleClick = () => {
    handleFilterClick(ratingValue);
  };

  return (
    <StarRankContainer
      onClick={handleClick}
    >
      <StarLabel>{`${ratingValue} stars`}</StarLabel>
        &nbsp;
      <StarBarBackground>
        <StarBar
          $width={width}
          $clickedBar={clickedBar}
        />
      </StarBarBackground>
      <br />
    </StarRankContainer>
  );
}

RatingBreakdown.propTypes = {
  ratingValue: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  clickedBar: PropTypes.bool.isRequired,
  handleFilterClick: PropTypes.func.isRequired,
};

const StarRankContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  cursor: pointer;
  margin-top: 0.25em;
`;

const StarLabel = styled.div`
  display: flex;
  width: 30%;
  line-height: 1em;

  @media (min-width: 500px) AND (max-width: 600px) {
    width: 20%;
  }

  &:hover {
    text-decoration: underline;
  }
`;

const StarBarBackground = styled.div`
  background: ${(props) => props.theme.starBackground};
  height: 1em;
  border-radius: 3px;
  overflow: hidden;
  margin: auto 0;
  width: 70%;

  @media (min-width: 500px) AND (max-width: 600px) {
    width: 80%;
  }
`;

const StarBar = styled.div`
  background: ${(props) => (props.$clickedBar ? props.theme.starFilled : 'grey')};
  background: ${(props) => (props.$clickedBar ? props.theme.starFilled : props.theme.blue[5])};
  height: 1em;
  width: ${(props) => props.$width}%;
  &:hover {
    background: ${(props) => props.theme.starFilled};
    cursor: pointer;
  }
`;
