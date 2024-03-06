import React from 'react';
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

      {/* <WrappingFlexBox> */}

      <AnswerBody>{answer.body}</AnswerBody>

      {/* <Answerer>
        {'by '}
        <AnswererName>
          {answer.answerer_name.toLowerCase() === 'seller' ? (
            <b>
              &nbsp;
              {answer.answerer_name}
              &nbsp;
            </b>
          ) : (
            answer.answerer_name
          )}
        </AnswererName>
        {` on ${formatDate(answer.date)}`}
        <span>
          {formatDate(answer.date)}
        </span>
      </Answerer> */}

      {/* </WrappingFlexBox> */}

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

      <Answerer>
        {/* {'by '} */}
        <AnswererName>
          {answer.answerer_name.toLowerCase() === 'seller' ? (
            <b>
              &nbsp;
              {answer.answerer_name}
              &nbsp;
            </b>
          ) : (
            answer.answerer_name
          )}
        </AnswererName>
        {/* {` on ${formatDate(answer.date)}`} */}
        <span>
          {formatDate(answer.date)}
        </span>
      </Answerer>

      <HelpfulReport
        name="answers"
        id={answer.id}
        helpfulCount={answer.helpfulness}
        margin="0.5rem"
      >
        {/* <Answerer>
          {'by '}
          {answer.answerer_name.toLowerCase() === 'seller' ? (
            <b>
              &nbsp;
              {answer.answerer_name}
              &nbsp;
            </b>
          ) : (
            answer.answerer_name
          )}
          {` on ${formatDate(answer.date)}`}
        </Answerer>
        <div>|</div> */}
      </HelpfulReport>

    </Answer>
  );
}

const WrappingFlexBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
`;

const Answer = styled.div`
  font-size: 1.0em;
 /* padding-right: 1.0em; */
 /* display: flex;
  flex-direction: column; */
 /* gap: 0.5em; */
 line-height: 1.5rem;

/* background: white;
 border-radius: 5px;
 padding: 0.5rem; */
/* margin-left: calc(2em + 1px); */
/* margin-bottom: 0.75rem; */
 margin-bottom: 1rem;
`;

const AnswerPhotos = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1em;
  padding: 0.25rem 0;
 /* padding: 0.5rem 0; */
/*  margin: 0.5rem 0; */
  margin: 0.25rem 0;
`;

const Answerer = styled.div`
  display: flex;
  justify-content: center;
  justify-content: flex-start;
  color: ${(props) => props.theme.minorFontColor};
  font-size: ${(props) => props.theme.tertiary};
  gap: 0.5em;
 /* margin-top: 1rem;
  margin-bottom: 1rem; */

  /* margin: 0.5rem 0; */
   margin: 0.25rem 0;
`;

const AnswererName = styled.span`
  &:after {
    content: ',';
  }
`;

const AnswerBody = styled.p`
  font-weight: 400;
 /* font-weight: 300; */
  margin: 0;
`;

export default AnswerEntry;
