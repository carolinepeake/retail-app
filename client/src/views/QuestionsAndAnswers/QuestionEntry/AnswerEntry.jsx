/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import ExpandedImageModal from './ExpandedImageModal';

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

  const [helpfulness, setHelpfulness] = useState(answer.helpfulness);
  const [clickedReport, setClickedReport] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [source, setSource] = useState('');

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
      {answer.photos.length > 1 && (
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
      )}
      <AnswerFooter>
        <Answerer>
          {'by '}
          {answer.answerer_name.toLowerCase() === 'seller' ? (
            <b>{answer.answerer_name}</b>
          ) : (
            answer.answerer_name
          )}
          {` on ${format(parseISO(answer.date), 'MMM dd, yyyy')}`}
        </Answerer>
        <div>|</div>
        <Helpful>
          <div style={{ paddingRight: '0.5em' }}>
            Helpful?
          </div>
          <Yes>
            {clickedHelpful.current ? (
              <b>Yes</b>
            ) : (
              <Clickable onClick={() => helpfulAnswer()}>
                Yes
              </Clickable>
            )}
          </Yes>
          {clickedHelpful.current ? (
            <b>{`(${helpfulness})`}</b>
          ) : (
            <span>{`(${helpfulness})`}</span>
          )}
        </Helpful>
        <div>|</div>
        <Report>
          {clickedReport ? (
            <Reported>Reported</Reported>
          ) : (
            <Clickable onClick={() => reportAnswer()}>
              Report
            </Clickable>
          )}
        </Report>
      </AnswerFooter>
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

const AnswerFooter = styled.h6`
  display: flex;
  justify-content: flex-start;
  padding-top: 0.1em;
  text-decoration: none;
`;

const Answerer = styled.div`
  padding-right: 1em;
  line-height: 1.5em;
  display: flex;
  justify-content: center;
  color: ${(props) => props.theme.minorFontColor};
`;

const Helpful = styled.div`
  padding: 0 1em;
  display: flex;
  justify-content: center;
`;

const Yes = styled.span`
  padding-right: 0.25em;
`;

const Report = styled.div`
  padding-left: 1em;
`;

const AnswerBody = styled.p`
  margin-block-end: 0.5em;
`;

const Clickable = styled.u`
  cursor: pointer;
  text-decoration: underline;
  &:hover {
    text-decoration: initial;
  }
  &:visited {
    color: ${(props) => props.theme.clicked};
  }
`;

const Reported = styled.span`
  font-weight: bold;
  color: ${(props) => props.theme.clicked};
`;

export default AnswerEntry;
