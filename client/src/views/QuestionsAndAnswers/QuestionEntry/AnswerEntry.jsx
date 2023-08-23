/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { format, parseISO } from 'date-fns';
import ExpandedImageModal from './ExpandedImageModal';
import HelpfulReport from '../../RatingsAndReviews/ReviewList/HelpfulReport';

function AnswerEntry({ answer }) {
  console.log('[AnswerEntry] is running');
  AnswerEntry.propTypes = {
    answer: PropTypes.shape({
      id: PropTypes.number.isRequired,
      helpfulness: PropTypes.number.isRequired,
      body: PropTypes.string.isRequired,
      answerer_name: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      photos: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
  };
  const [showModal, setShowModal] = useState(false);
  const [source, setSource] = useState('');

  const handlePhotoClick = (event) => {
    setShowModal(true);
    setSource(event.target.src);
  };

  return (
    <Answer key={answer.id}>
      <AnswerBody>{answer.body}</AnswerBody>
      {answer.photos.length > 0 && (
      <AnswerPhotos>
        {answer.photos.map((photo) => (
          <AnswerImage
            src={photo}
            alt=""
            key={photo}
            onClick={handlePhotoClick}
          />
        ))}
      </AnswerPhotos>
      )}
      <HelpfulReport
        name="answers"
        id={answer?.id}
        helpfulCount={answer?.helpfulness}
      >
        <Answerer>
          {'by '}
          {answer.answerer_name.toLowerCase() === 'seller' ? (
            <b>&nbsp;{answer.answerer_name}&nbsp;</b>
          ) : (
            answer.answerer_name
          )}
          {` on ${format(parseISO(answer.date), 'MMM dd, yyyy')}`}
        </Answerer>
        <div>|</div>
      </HelpfulReport>
      {showModal && (
        <ExpandedImageModal
          src={source || ''}
          setShowModal={setShowModal}
        />
      )}
    </Answer>
  );
}

const Answer = styled.div`
  font-size: 1.0em;
  padding-right: 1.0em;
`;

const AnswerPhotos = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`;

const AnswerImage = styled.img`
  max-height: 8em;
  max-width: 8em;
  padding: .5em;
  cursor: pointer;
  object-fit: scale-down;
`;

const Answerer = styled.div`
  display: flex;
  justify-content: center;
  color: ${(props) => props.theme.minorFontColor};
`;

const AnswerBody = styled.p`
  margin-block-end: 0.5em;
  font-weight: 400;
`;

export default AnswerEntry;
