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
          src={source}
          setShowModal={setShowModal}
        />
      )}
    </Answer>
  );
}

const Answer = styled.div`
  padding-bottom: 1rem;
  font-size: 1.0em;
`;
// padding-left: 0.5rem;

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

const AnswerFooter = styled.h6`
  display: flex;
  justify-content: flex-start;
  padding-top: 0.1em;
`;

// const AnswerFooter = styled.div`
//   display: flex;
//   font-size: 0.75em;
//   justify-content: flex-start;
//   color: rgb(85 85 85);
//   padding-top: 0.1em;
// `;
// padding-top: 0.25em;

const Answerer = styled.div`
  padding-right: 1em;
`;

const Helpful = styled.div`
  padding: 0 1em;
  display: flex;
  justify-content: center;
`;

const Yes = styled.span`
  padding-right: 0.25em;
`;
// padding-left: 0.5em;

const Report = styled.div`
  padding-left: 1em;
`;

const AnswerBody = styled.p`
`;

// const AnswerBody = styled.div`
// `;
// padding-bottom: 0.5rem;

const Clickable = styled.u`
  cursor: pointer;
  text-decoration: underline;
  &:hover {
    text-decoration: initial;
  };
  &:visited {
    color: ${(props) => props.theme.clicked};
  };
`;
// &:hover {
//   box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
// }

const Reported = styled.span`
  font-weight: bold;
  color: ${(props) => props.theme.clicked};
`;
// margin-left: 1em;

export default AnswerEntry;
