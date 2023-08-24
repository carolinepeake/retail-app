import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import HelpfulReport from './HelpfulReport';
import StarCount from './StarCount';
import ExpandedImageModal from '../../../components/ExpandedImageModal';
import { formatDate } from '../../../utils/getFormat';

function ReviewTile({ review }) {
  const [showModal, setShowModal] = useState(false);
  const [source, setSource] = useState('');

  const handlePhotoClick = (event) => {
    setShowModal(true);
    setSource(event.target.src);
  };

  return (
    <Container>

      <StarsDateName>
        <StarCount rating={review.rating} />
        <DateName>
          <ReviewerName>
            {`${review.reviewer_name},`}
            &nbsp;
          </ReviewerName>
          <Date>
            {formatDate(review.date)}
          </Date>
        </DateName>
      </StarsDateName>

      <Summary>{review.summary}</Summary>
      {/* need to add word break truncation to summary */}

      <Body>
        {review.body}
        {/* need to add conditional formatting for past 250 words */}
      </Body>

      {review.recommend
      && (
      <Recommend>
        &#10003; I recommend this product
      </Recommend>
      )}

      <PhotosDiv>
        {review.photos.map((photo) => (
          <RevImg
            key={photo.id}
            alt=""
            src={photo.url}
            onClick={handlePhotoClick}
          />
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

      <HelpfulReport
        name="reviews"
        id={review.review_id}
        helpfulCount={review.helpfulness}
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
    review_id: PropTypes.number,
    helpfulness: PropTypes.number,
    photos: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default ReviewTile;

const Container = styled.div`
  border-bottom: currentColor solid thin;
  overflow-wrap: anywhere;
  background-color: ${(props) => props.theme.backgroundColor};
  padding: 0.5em 0 0.5em 0.5em;
  margin-top: 0.5em;
  margin-right: 0.5em;
`;

const StarsDateName = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5em;
`;

const DateName = styled.h5`
  display: flex;
  justify-content: flex-end;
  font-size: 1em;
  padding-top: 0;
`;

const ReviewerName = styled.div`
  padding-right: 1em;

  @media (min-width: 600px) AND (max-width: 700 px) {
    padding-right: 0.5em;
  }
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
  font-size: 1.0em;
  margin: 1em 0;
`;

const Recommend = styled.h4`
  margin-bottom: 1em;
`;
