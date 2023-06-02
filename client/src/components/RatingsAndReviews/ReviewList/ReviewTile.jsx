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
      <StarsDateName>
        <StarCount review={review} />
        <DateName>
          <ReviewerName>
            {`${review.reviewer_name},`}
            &nbsp;
          </ReviewerName>
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
      {review.recommend
      && <Recommend> &#10003; I recommend this product</Recommend>}

      <PhotosDiv>
        {review.photos.map((photo) => (
          <RevImg key={photo.id} alt="" src={photo.url} />
        ))}
      </PhotosDiv>

      {review.response
        && (
        <div>
          <Response>
            <h4>Response:</h4>
            <br />
            <div>{review.response}</div>
          </Response>
        </div>
        )}

      <HelpfulReport review={review} />
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
  border-bottom: currentColor solid thin;
  overflow-wrap: anywhere;
  background-color: ${(props) => props.theme.backgroundColor};
  padding: 0.5rem 0 0.5rem 0.5rem;
  margin-top: 0.5rem;
  margin-right: 0.5rem;
`;

const StarsDateName = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
`;
  // margin-top: 1rem;

//   const DateName = styled.h4`
//   display: flex;
//   justify-content: flex-end;
// `;

const DateName = styled.div`
  display: flex;
  justify-content: flex-end;
  background: ;
  font-size: 1rem;
  font-weight: 400;
`;

const ReviewerName = styled.div`
  padding-right: 1rem;
`

const Response = styled.div`
  padding: 1em;
  background-color: lightgrey;
`;

const PhotosDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const RevImg = styled.img`
  height: 25%;
  width: 25%;
  padding: .5em;
`;

const Summary = styled.h3`
  display: flex;
`;

const Body = styled.p`
  display: flex;
  font-size: 1.0rem;
  margin: 1rem 0;
`;

const Recommend = styled.h4`
  margin-bottom: 1rem;
`;
