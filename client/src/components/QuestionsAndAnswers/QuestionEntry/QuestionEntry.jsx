import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';
import AnswerEntry from './AnswerEntry';
import AddAnswerModal from './AddAnswerModal';
import Button from '../../reusable/Button';

function QuestionEntry({ question }) {
  QuestionEntry.propTypes = {
    question: PropTypes.shape({
      question_id: PropTypes.number.isRequired,
      question_helpfulness: PropTypes.number.isRequired,
      question_body: PropTypes.string.isRequired,
      answers: PropTypes.objectOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          helpfulness: PropTypes.number.isRequired,
          body: PropTypes.string.isRequired,
          answerer_name: PropTypes.string.isRequired,
          date: PropTypes.string.isRequired,
          photos: PropTypes.arrayOf(PropTypes.string).isRequired,
        }),
      ).isRequired,
    }).isRequired,
  };

  const [numAnswers, setNumAnswers] = useState(2);
  const [showModal, setShowModal] = useState(false);
  const [helpfulness, setHelpfulness] = useState(
    question.question_helpfulness,
  );
  const [clickedReport, setClickedReport] = useState(false);

  const clickedHelpful = useRef(false);

  const { answers } = question;
  const allAnswers = Object.values(answers);
  function sellerFirst(a, b) {
    if (a.answerer_name.toLowerCase() === 'seller') return -1;
    if (b.answerer_name.toLowerCase() === 'seller') return 1;
    return b.helpfulness - a.helpfulness;
  }
  function helpfulnessFirst(a, b) {
    return b.helpfulness - a.helpfulness;
  }
  allAnswers.sort(helpfulnessFirst);
  allAnswers.sort(sellerFirst);

  const topAnswers = Object.values(allAnswers).slice(0, numAnswers);

  function reportQuestion() {
    if (clickedReport) return;
    axios
      .put('/questions/report', {
        question_id: question.question_id,
      })
      .then(() => {
        setClickedReport(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function helpfulQuestion() {
    if (clickedHelpful.current) return;
    axios
      .put('/questions/helpful', {
        question_id: question.question_id,
      })
      .then(() => {
        setHelpfulness((prevHelpfulness) => prevHelpfulness + 1);
        clickedHelpful.current = true;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function answerQuestion() {
    setShowModal(true);
  }

  function changeNumAnswers(val) {
    const count = Math.max(2, numAnswers + val);
    setNumAnswers(count);
  }

  function handleScroll(e) {
    // within 0.9 of the bottom
    const bottom = 0.9 * (e.target.scrollHeight - e.target.scrollTop) <= e.target.clientHeight;
    if (bottom && allAnswers.length > numAnswers) {
      changeNumAnswers(2);
    }
  }

  function answersList() {
    if (topAnswers.length === 0) {
      return (
        <AnswerNone>
          This question has not been answered yet!
        </AnswerNone>
      );
    }
    const list = topAnswers.map((answer, idx) => (
      <>
        <AnswerEntry answer={answer} key={answer.id} />
        {/* {idx !== topAnswers.length - 1 ? (
          <hr style={{ width: '90%' }} />) : (
          null) } */}
      </>
    ));
    return (
      <AnswersListContainer
        id="question_answers"
        onScroll={(event) => handleScroll(event)}
      >
        {list}
      </AnswersListContainer>
    );
  }

  function moreAnswers() {
    if (allAnswers.length <= 2) {
      return null;
    }
    if (topAnswers.length < allAnswers.length) {
      return (
        <MoreAnswers onClick={() => changeNumAnswers(2)}>
          <i className="fa-solid fa-chevron-down" />
          <Arrow>&#9662;</Arrow>
          <span>&nbsp; See More Answers</span>
        </MoreAnswers>
      );
    }
    return (
      <MoreAnswers type="button" onClick={() => changeNumAnswers(-100)}>
        <i className="fa-solid fa-chevron-up" />
        <span>Collapse Answers</span>
      </MoreAnswers>
    );
  }

  return (
    <Entry>
      {/* <QBlock> */}
      <Question>Q:</Question>
      <QuestionHeader>
        <QuestionBody id="question_header">{question.question_body}</QuestionBody>
        <RightSide>
          <Helpful>
            <div style={{ paddingRight: '0.5em' }}>Helpful?</div>
            <Yes>
              {clickedHelpful.current ? (
                <b>Yes</b>
              ) : (
                <Clickable onClick={() => helpfulQuestion()}>Yes</Clickable>
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
              <Clickable onClick={() => reportQuestion()}>
                Report
              </Clickable>
            )}
          </Report>
          <div>|</div>
          <Add>
            <Clickable onClick={() => answerQuestion()}>
              Add Answer
            </Clickable>
          </Add>
        </RightSide>
      </QuestionHeader>
      {/* </QBlock> */}
      {/* <AnswerBlock> */}
      <Answer id="answer_header">A:</Answer>
      <Answers>
        {answersList()}
        {moreAnswers()}
      </Answers>
      {/* </AnswerBlock> */}
      {showModal && (
        <AddAnswerModal
          setShowModal={setShowModal}
          question={question}
        />
      )}
    </Entry>
  );
}

const Entry = styled.div`
  width: 100%;
  padding-bottom: 0.1rem;
  padding-right: 0.5em;
  margin-top: 1.0rem;
  border-bottom: currentColor solid thin;
  display: grid;
  grid-template-columns: max-content auto;
  grid-auto-rows: auto;
  grid-row-gap: 0.5rem;
  @media (max-width: 300px) {
    grid-column-gap: 0.5em;
  };
  @media (min-width: 300px) {
    grid-column-gap: 1.0em;
  };
  @media (min-width: 600px) {
    grid-column-gap: 0.5em;
    grid-row-gap: 0px;
  };
`;

const QBlock = styled.div`
  display: flex;
  align-items: start;
  padding-bottom: 0.25rem;
`;

const Question = styled.h4`
  text-align: center;
  grid-row: 1/2;
  grid-column: 1/2;
  display: flex;
  align-items: start;
  font-size: 1.0em;
  margin: 1.17rem 0;
`;

// const Question = styled.div`
//   text-align: center;
//   grid-row: 1/2;
//   grid-column: 1/2;
//   font-size: 1.0em;
//   display: flex;
//   align-items: flex-start;
// `;
// width: 10%;


const QuestionHeader = styled.div`
  grid-row: 1/2;
  grid-column: 2/3;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  align-content: center;
`;
// margin-left: 1.0rem;
// width: 100%;

const QuestionBody = styled.h3`
  width: fit-content;
  padding-right: 1em;
`;

// const QuestionBody = styled.div`
//   font-weight: bold;
//   width: fit-content;
//   font-size: 1.17em;
//   padding-right: 1em;
// `;

const RightSide = styled.h6`
  display: flex;
  justify-content: flex-end;
  align-self: center;
  flex-wrap: nowrap;
`;
// margin-top: 0.1em;

// const RightSide = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   font-size: 0.75em;
//   align-self: center;
//   margin-top: 0.1em;
//   flex-wrap: nowrap;
// `;

// const RightSide = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   font-size: 0.75em;
//   align-self: center;
//   margin-top: 0.1em;
//   flex-wrap: nowrap;
// `;

const Helpful = styled.div`
  padding-right: 1em;
  display: flex;
`;

const Yes = styled.span`
  padding-right: 0.25em;
`;
// padding-left: 0.5em;

const Report = styled.div`
  padding: 0 1em;
`;

const Reported = styled.span`
  font-weight: bold;
  &:visited {
    color: ${(props) => props.theme.clicked};
  };
`;

const Add = styled.div`
  padding-left: 1em;
`;

const AnswerBlock = styled.div`
  display: flex;
  padding-top: 0.25rem;
`;

const Answers = styled.div`
  grid-row: 2/3;
  grid-column: 2/3;
`;
// width: 100%;
// padding-top: 0.25rem;

// TO-DO: change max height from px
const AnswersListContainer = styled.div`
  max-height: 250px;
  overflow-x: auto;
  overflow-y: auto;
  text-align: justify;
  padding-bottom: 0.1rem;
`;
// background-color: ${(props) => props.theme.tertiaryColor};
// border: 1px solid;
// padding-left: 0.5rem;
// grid-column: 2;

const AnswerNone = styled.p`
  padding-bottom: 1rem;
  padding-left: 0;
`;

// const AnswerNone = styled.div`
//   padding-bottom: 1rem;
//   padding-left: 0;
// `;
// grid-column: 2;
// padding-left: 2.0rem;
// margin-left: 0.5rem;


const Answer = styled.h4`
  grid-row: 2/3;
  grid-column: 1/2;
  font-size: 1.0em;
`;

// const Answer = styled.div`
//   grid-row: 2/3;
//   grid-column: 1/2;
//   font-size: 1.0em;
// `;
// width: 10%;

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

const MoreAnswers = styled(Button)`
  display: flex;
  cursor: pointer;
  background-color: ${(props) => props.theme.backgroundColor};
  };
  border: none;
  font-family: inherit;
  font-weight: bold;
  font-size: 0.75em;
  &:hover {
    text-decoration: underline;
  };
  padding: 0 0 1rem 0;
  margin: 0;
`;
// grid-column: 2;
// font-size: calc(8px + 0.5vw);
// padding: 0 0 0 1em;
// margin-top: 0.5em;
// margin: 0.5em 0;

const Arrow = styled.span`
  margin-top: -0.1rem;
`;

// margin-top: 1em;
// margin-left: 1em;

export default QuestionEntry;
