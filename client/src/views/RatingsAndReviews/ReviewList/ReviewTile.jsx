import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { format, parseISO } from 'date-fns';
import HelpfulReport from './HelpfulReport';
import StarCount from './StarCount';
import ExpandedImageModal from '../../QuestionsAndAnswers/QuestionEntry/ExpandedImageModal';

function ReviewTile({ review }) {
  const [showModal, setShowModal] = useState(false);
  const [source, setSource] = useState('');

  function handlePhotoClick(event) {
    setShowModal(true);
    setSource(event.target.src);
  }

  return (
    <Container>
      <StarsDateName>
        <StarCount rating={review?.rating} />
        <DateName>
          <ReviewerName>
            {`${review.reviewer_name},`}
            &nbsp;
          </ReviewerName>
          <Date>
            {format(parseISO(review?.date), 'MMMM dd, yyyy')}
          </Date>
        </DateName>
      </StarsDateName>
      <Summary>{review?.summary}</Summary>
      {/* need to add word break truncation to summary */}
      <Body>
        {review?.body}
        {/* need to add conditional formatting for past 250 words */}
      </Body>
      {review.recommend
      && <Recommend> &#10003; I recommend this product</Recommend>}

      <PhotosDiv>
        {review?.photos?.map((photo) => (
          <RevImg
            key={photo.id}
            alt=""
            src={photo.url}
            onClick={(event) => handlePhotoClick(event)}
          />
        ))}
      </PhotosDiv>

      {review?.response
        && (
        <div>
          <Response>
            <h4>Response:</h4>
            <br />
            <div>{review.response}</div>
          </Response>
        </div>
        )}

      <HelpfulReport
        name="reviews"
        id={review?.review_id}
        helpfulCount={review?.helpfulness}
      />
      {showModal && (
        <ExpandedImageModal
          src={source || ''}
          setShowModal={setShowModal}
        />
      )}
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

const DateName = styled.h5`
  display: flex;
  justify-content: flex-end;
  font-size: 1rem;
  padding-top: 0;
`;

const ReviewerName = styled.div`
  padding-right: 1rem;
`;

const Date = styled.div`
  font-weight: 400;
`;

const Response = styled.div`
  padding: 1em;
  background-color: lightgrey;
`;

const PhotosDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`;

const RevImg = styled.img`
  max-height: 8em;
  max-width: 8em;
  padding: .5em;
  object-fit: scale-down;
  cursor: pointer;
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
