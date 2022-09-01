import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { format, parseISO } from 'date-fns';
import HelpfulReport from './HelpfulReport';
import StarCount from './StarCount';

function ReviewTile({ review }) {
  const starCount = [];

  for (let i = 0; i < review.rating; i += 1) {
    starCount.push(i);
  }

  return (
    <Container>
      <br />
      <StarsDateName>
        <StarCount review={review} />
        <DateName>
          <div>
            {`${review.reviewer_name},`}
            &nbsp;
          </div>
          <div>
            {format(parseISO(review.date), 'MMMM dd, yyyy')}
          </div>
        </DateName>
      </StarsDateName>
      <Summary>{review.summary}</Summary>
      {/* need to add word break truncation to summary */}
      <Body>
        {review.body}
        {/* need to add conditional formatting for past 250 words */}
      </Body>
      <br />
      {review.recommend
      && <div> &#10003; I recommend this product</div>}
      <br />

      <PhotosDiv>
        {review.photos.map((photo) => (
          <RevImg key={photo.id} alt="" src={photo.url} />
        ))}
      </PhotosDiv>
      <br />

      {review.response
        && (
        <div>
          <Response>
            <h4>Response:</h4>
            <br />
            <div>{review.response}</div>
          </Response>
          <br />
        </div>
        )}

      <HelpfulReport review={review} />
      <br />
    </Container>
  );
}

ReviewTile.propTypes = {
  review: PropTypes.shape({
    body: PropTypes.string,
    summary: PropTypes.string,
    recommend: PropTypes.bool,
    rating: PropTypes.number,
    reviewer_name: PropTypes.string,
    date: PropTypes.string,
    response: PropTypes.string,
  }).isRequired,
};

export default ReviewTile;

const Container = styled.div`
  border-bottom: black solid thin;
  overflow-wrap: anywhere;
`;

const StarsDateName = styled.div`
  display: flex;
  justify-content: space-between;
  background: ;
`;

const DateName = styled.div`
  display: flex;
  justify-content: flex-end;
  background: ;
`;

const Response = styled.div`
  padding: 1em;
  background: lightgrey;
`;

const PhotosDiv = styled.div`
  display: flex;

`;

const RevImg = styled.img`
  height: 25%;
  width: 25%;
  padding: .5em;
`;

const Summary = styled.h3`
  display: flex;
`;

const Body = styled.h3`
  display: flex;
`;
