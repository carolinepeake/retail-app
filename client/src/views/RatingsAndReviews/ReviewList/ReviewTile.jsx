import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import HelpfulReport from './HelpfulReport';
import StarCount from './StarCount';
import Stars from '../../RelatedItems/RelatedList/Stars';
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
        {/* <StarCount rating={review.rating} /> */}
        <StarsContainer>
          <Stars rating={review.rating} />
        </StarsContainer>
        <DateName>
          <ReviewerName>
            {`${review.reviewer_name}`}
            {/* &nbsp; */}
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

      {review.photos.length > 0
      && (
      <PhotosDiv>
        {review.photos.map((photo) => (
          <RevImg
            key={photo.id}
            height="4 rem"
            width="4 rem"
            alt=""
            src={photo.url}
            onClick={handlePhotoClick}
          />
        ))}
      </PhotosDiv>
      )}

      {/* <ReviewerName>
        {review.reviewer_name}
      </ReviewerName> */}

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
  padding: 1rem;
  overflow-wrap: anywhere;
  background-color: rgb(245,245,245);
  border-radius: 5px;
  margin-top: 0.5rem;
  line-height: 1.5rem;

  @media (min-width: 400px) {
    padding: 1rem 0 1rem 0.5rem;
    margin-right: 0.5rem;
    margin-top: 0;
    background-color: ${(props) => props.theme.backgroundColor};
    border-bottom: ${(props) => props.theme.lightBorder};
    border-radius: 0;

    &&:first-child {
      border-top: ${(props) => props.theme.lightBorder};
    }
  }
`;

const StarsDateName = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.0rem;
  align-items: flex-start;
  margin-bottom: 0;

  @media (min-width: 400px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

  }
`;

const DateName = styled.h5`
  display: flex;
  font-size: ${(props) => props.theme.tertiary};
  padding-top: 0;
  gap: 0.5em;
  width: 100%;
  color: ${(props) => props.theme.minorFontColor};
  margin: 0;
  order: -1;
  justify-content: space-between;


  @media (min-width: 400px) {
    order: 0;
    justify-content: flex-end;
    width: auto;
  }
`;

const StarsContainer = styled.div`
  display: flex;
  align-items: center;
  height: 1.5rem;
`;

const ReviewerName = styled.div`
  color: ${(props) => props.theme.minorFontColor};

  @media (min-width: 400px) {
    &:after {
      content: ',';
    }
  }
`;

const Date = styled.div`
  /* font-weight: 300; */
`;

const Response = styled.div`
  padding: 1rem;
  background-color: lightgrey;
`;

const PhotosDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 0.25rem 0;
  line-height: 1.5rem;
`;

const RevImg = styled.img`
  height: 4rem;
  width: 4rem;
  width: 100%;
  height: auto;
  max-height: 8rem;
  max-width: 8rem;
  object-fit: scale-down;
  cursor: pointer;
`;

const Summary = styled.h3`
  display: flex;
/*  margin: 1rem 0; */
`;

const Body = styled.p`
  display: flex;
  font-size: 1.0em;
  margin: 1rem 0;
`;

const Recommend = styled.h4`
  margin-bottom: 1rem;
`;
