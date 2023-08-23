/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import HelpfulReport from '../../RatingsAndReviews/ReviewList/HelpfulReport';
import ListImage from './ListImage';
import { formatDate } from '../../../utils/getFormat';

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

  return (
    <Answer key={answer.id}>

      <AnswerBody>{answer.body}</AnswerBody>

      {answer.photos.length > 0 && (
      <AnswerPhotos>
        {answer.photos.map((photo) => (
          <ListImage
            photo={photo}
            key={photo}
          />
        ))}
      </AnswerPhotos>
      )}

      <HelpfulReport
        name="answers"
        id={answer.id}
        helpfulCount={answer.helpfulness}
      >
        <Answerer>
          {'by '}
          {answer.answerer_name.toLowerCase() === 'seller' ? (
            <b>&nbsp;{answer.answerer_name}&nbsp;</b>
          ) : (
            answer.answerer_name
          )}
          {` on ${formatDate(answer.date)}`}
        </Answerer>
        <div>|</div>
      </HelpfulReport>

    </Answer>
  );
}

const Answer = styled.div`
  font-size: 1.0em;
  padding-right: 1.0em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;

const AnswerPhotos = styled.div`
  display: flex;
  flex-wrap: wrap;
 /* align-items: flex-start; */
  align-items: center;
`;

const Answerer = styled.div`
  display: flex;
  justify-content: center;
  color: ${(props) => props.theme.minorFontColor};
`;

const AnswerBody = styled.p`
  /* margin-block-end: 0.5em; */
  font-weight: 400;
  margin: 0;
`;

export default AnswerEntry;
