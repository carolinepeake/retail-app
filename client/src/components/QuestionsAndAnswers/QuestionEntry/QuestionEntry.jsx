import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import axios from 'axios';
import AnswerEntry from './AnswerEntry';
// import AddAnswerModal from './AddAnswerModal';
import AddAnswerModal2 from './AddAnswerModal2';
import useModal from '../../utils/useModal';
import { Button } from '../../reusable/Button';

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

  const [showModal, toggleModal] = useModal();
  // const [showModal, setShowModal] = useState(false);

  const [numAnswers, setNumAnswers] = useState(2);
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
    // setShowModal(true);
    toggleModal();
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
      // <>
      <AnswerEntry answer={answer} key={answer.id} />
      /* {idx !== topAnswers.length - 1 ? (
          <hr style={{ width: '90%' }} />) : (
          null) }
       </> */
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

  // TO-DO: make this a CSS change so can animate it to make it appear smooth; also animate the chevron
  // fix underlining on hover
  // make sure can get rid of grid css
  // make sure conditional logic for more answers buttons works correctly
  const [moreAnswersShown, setMoreAnswersShown] = useState(false);

  useEffect(() => {
    if (topAnswers.length >= allAnswers.length) {
      setMoreAnswersShown(true);
    }
  }, [question.question_id]);

  const moreAnswersButtonText = moreAnswersShown ? 'Collapse Answers' : 'See More Answers';

  function handleClickMoreAnswers() {
    const newAnswersNum = moreAnswersShown ? -100 : 2;
    changeNumAnswers(newAnswersNum);
    setMoreAnswersShown((prev) => !prev);
  }

  const moreAnswers = (
    <MoreAnswers type="button" moreAnswersShown={moreAnswersShown} onClick={(e) => handleClickMoreAnswers(e)}>
      {/* <i className="fa-solid fa-chevron-down" /> */}
      <MoreAnswersButtonText
        moreAnswersButtonText={moreAnswersButtonText}
      >
        {moreAnswersButtonText}
      </MoreAnswersButtonText>
      <Arrow moreAnswersShown={moreAnswersShown}>&#9662;</Arrow>
    </MoreAnswers>
  );

  // function moreAnswers() {
  //   if (allAnswers.length <= 2) {
  //     return null;
  //   }
  //   if (topAnswers.length < allAnswers.length) {
  //     return (
  //       <MoreAnswers type="button" onClick={() => changeNumAnswers(2)}>
  //         <i className="fa-solid fa-chevron-down" />
  //         <Arrow>&#9662;</Arrow>
  //         <MoreAnswersButtonText>&nbsp; See More Answers</MoreAnswersButtonText>
  //       </MoreAnswers>
  //     );
  //   }
  //   return (
  //     <MoreAnswers type="button" onClick={() => changeNumAnswers(-100)}>
  //       <i className="fa-solid fa-chevron-up" />
  //       <Arrow moreAnswersShown>&#9662;</Arrow>
  //       <span>Collapse Answers</span>
  //     </MoreAnswers>
  //   );
  // }

  return (
    <Entry>
      <A>
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
      </A>
      <B>
        <Answer id="answer_header">A:</Answer>
        <Answers>
          {answersList()}
          {allAnswers.length > 2 && moreAnswers}
        </Answers>
        {/* {showModal && (
        <AddAnswerModal
          setShowModal={setShowModal}
          question={question}
          showModal={showModal}
        />
        )} */}
        <AddAnswerModal2
          question={question}
          showModal={showModal}
          toggleModal={toggleModal}
        />
      </B>
    </Entry>
  );
}

const Entry = styled.div`
  border-bottom: currentColor solid thin;
  &&:first-child {
    border-top: currentColor solid thin;
  };
  padding-top: 0.83em;
  margin-right: 0.5em;
`;

const A = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 0.25rem;
  margin-bottom: 0.5em;
  justify-content: flex-start;
`;

const Question = styled.h4`
  display: flex;
  align-items: start;
  font-size: 1.0em;
  margin-block-end: 0;
  padding-right: 1rem;
  margin-block-start: 0;
  padding-top: 0.5rem;
  align-self: start;
`;

const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  align-self: start;
`;

const QuestionBody = styled.h3`
  width: fit-content;
  padding-right: 1em;
  margin-block-end: 0;
  margin-block-start: 0;
  padding-top: 0.5rem;
  font-weight: 600;
`;

const RightSide = styled.h6`
  display: flex;
  justify-content: flex-end;
  align-self: center;
  flex-wrap: nowrap;
  margin-block-end: 0;
  margin-block-start: 0;
  text-decoration: none;
`;

const Helpful = styled.div`
  padding-right: 1em;
  display: flex;
`;

const Yes = styled.span`
  padding-right: 0.25em;
`;

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

const B = styled.div`
  display: flex;
`;

const Answers = styled.div`
  padding-bottom: 1rem;
  font-size: 1.0em;
`;

const AnswersListContainer = styled.div`
  max-height: 25em;
  overflow-x: hidden;
  overflow-y: auto;
  text-align: justify;
  padding-bottom: 0.1rem;
`;

const AnswerNone = styled.p`
  padding-bottom: 1rem;
  padding-left: 0;
  margin-block-end: 0.5em;
`;

const Answer = styled.h4`
  font-size: 1.0em;
  padding-right: 1rem;
`;

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

const MoreAnswers = styled(Button)`
  display: flex;
  cursor: pointer;
  background-color: ${(props) => props.theme.backgroundColor};
  };
  border: none;
  font-family: inherit;
  font-weight: bold;
  font-size: 0.83em;
  &:hover {
    box-shadow: none;
  };
  padding: 0
  margin: 0;
  transition: 1s ease-in-out;
`;

const MoreAnswersButtonText = styled.span`
  padding-right: 0.25em;
  ${MoreAnswers}&:hover {
    text-decoration: underline;
  };
`;

const Arrow = styled.span`
  margin-top: -0.1rem;
  ${(props) => props.moreAnswersShown && css`
    transform: translateY(0.5em) rotateX(-180deg);
  `};
`;

export default QuestionEntry;
