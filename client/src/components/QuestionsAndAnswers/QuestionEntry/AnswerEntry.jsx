/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import ExpandedImageModal from './ExpandedImageModal';

function AnswerEntry({ answer }) {
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

  const [helpfulness, setHelpfulness] = useState(answer.helpfulness);
  const [clickedReport, setClickedReport] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [source, setSource] = useState();

  const clickedHelpful = useRef(false);

  function helpfulAnswer() {
    if (!clickedHelpful.current) {
      axios
        .put('/answers/helpful', { answer_id: answer.id })
        .then(() => {
          setHelpfulness(helpfulness + 1);
          clickedHelpful.current = true;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function reportAnswer() {
    axios
      .put('/answers/report', { answer_id: answer.id })
      .then(() => {
        setClickedReport(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handlePhotoClick(event) {
    setShowModal(true);
    setSource(event.target.src);
  }

  return (
    <Answer key={answer.id}>
      <AnswerBody>{answer.body}</AnswerBody>
      <AnswerPhotos>
        {answer.photos.map((photo) => (
          <AnswerImage
            src={photo}
            alt=""
            key={photo}
            onClick={(event) => handlePhotoClick(event)}
          />
        ))}
      </AnswerPhotos>
      <AnswerFooter>
        <div>
          {'by '}
          {answer.answerer_name.toLowerCase() === 'seller' ? (
            <b>{answer.answerer_name}</b>
          ) : (
            answer.answerer_name
          )}
          {` on ${format(parseISO(answer.date), 'MMM dd, yyyy')}`}
        </div>
        <div>
          Helpful?{' '}
          {clickedHelpful.current ? (
            <b>Yes</b>
          ) : (
            <Clickable onClick={() => helpfulAnswer()}>
              {' '}
              Yes
            </Clickable>
          )}
          {clickedHelpful.current ? (
            <b>({helpfulness})</b>
          ) : (
            <span>({helpfulness})</span>
          )}
        </div>
        <div>
          {clickedReport ? (
            <Reported>Reported</Reported>
          ) : (
            <Clickable onClick={() => reportAnswer()}>
              Report
            </Clickable>
          )}
        </div>
      </AnswerFooter>
      {showModal && (
        <ExpandedImageModal
          src={source}
          setShowModal={setShowModal}
        />
      )}
    </Answer>
  );
}

const Answer = styled.div`
  grid-column: 2 / 3;
  padding-bottom: 0.5rem;
  padding-left: 0.5rem;
`;

const AnswerPhotos = styled.span`
  display: flex;
  justify-content: flex-start;
  padding-bottom: 0.5rem;
`;

const AnswerImage = styled.img`
  width: 20%;
  height: 20%;
  padding-right: 0.5rem;
  cursor: pointer;
`;

const AnswerFooter = styled.div`
  display: grid;
  grid-template-columns: 50% 25% 25%;
  font-size: 0.75rem;
`;

const AnswerBody = styled.div`
  grid-column: 2 / 3;
  padding-bottom: 0.5rem;
`;

const Clickable = styled.u`
  cursor: pointer;
  text-decoration: underline;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
`;

const Reported = styled.span`
  grid-column: 3;
  font-weight: bold;
`;

export default AnswerEntry;
