import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AddAnswerModal from './AddAnswerModal';
import useModal from '../../../hooks/useModal';
import HelpfulReport from '../../RatingsAndReviews/ReviewList/HelpfulReport';
import AnswersList from './AnswersList';

//TODO: add white-space: nowrap and min-width: 0 to flex containers
// where the children are wrapping when they dont need to

function QuestionEntry({ question }) {
  console.log('[QuestionEntry] is running');
  const [showModal, toggleModal] = useModal();

  const answerQuestion = () => {
    toggleModal();
  };

  return (
    <Entry>
      <QuestionContainer>

      <QuestionHeader>
      {/* <WrappingFlexBox> */}
        <Question>
          {/* Question */}
          Q:
        </Question>
        {/* <AddAnswer onClick={answerQuestion}>
            Add Answer
          </AddAnswer> */}
          {/* </WrappingFlexBox> */}
          {/* </QuestionHeader> */}

          <QuestionBody
            id="question_header"
          >
            {question.question_body}
          </QuestionBody>
          </QuestionHeader>


          {/* <AddAnswer onClick={answerQuestion}>
            Add Answer
          </AddAnswer> */}

          {/* </WrappingFlexBox> */}

          {/* <HelpfulReport
            name="questions"
            id={question.question_id}
            helpfulCount={question.question_helpfulness}
          >
            <div>|</div>
            <Clickable onClick={answerQuestion}>
              Add Answer
            </Clickable>
          </HelpfulReport> */}



      </QuestionContainer>

      {/* <HelpfulReport
            name="questions"
            id={question.question_id}
            helpfulCount={question.question_helpfulness}
          >
          </HelpfulReport> */}

      {/* <AnswersContainer> */}
        {/* <Answer id="answer_header">A:</Answer> */}
        <AnswersList answers={question.answers} />
      {/* </AnswersContainer> */}

      <AddAnswer onClick={answerQuestion}>
            Add Answer
          </AddAnswer>

      {showModal
        && (
        <AddAnswerModal
          questionId={question.question_id}
          questionBody={question.question_body}
          toggleModal={toggleModal}
        />
        )}

    </Entry>
  );
}

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

const Entry = styled.div`
  background: rgb(245,245,245);
  border-radius: 5px;
  padding: 1rem;
  overflow-wrap: anywhere;
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

const WrappingFlexBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
`;

const QuestionContainer = styled.div`

`;

const Question = styled.h4`
 /* display: flex;
  align-items: start; */
  font-size: 1.0em;
  margin: 0;
  padding-right: 0.5rem;
 /* margin-block-end: 0;
  margin-block-start: 0; */
 /* padding-top: 0.5rem; */
 /* align-self: start; */
  /* min-width: calc(2em + 1px); */
   min-width: calc(1.5em + 1px);
   width: max-content;
 /*  border-bottom: 1px lightgrey solid; */
   font-weight: 300;
   font-size: 1.17em;

  @media (min-width: 600px) {
    padding-right: 1rem;
    min-width: calc(2em + 1px);
  }
  `;

const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  justify-content: flex-start;
  flex-wrap: nowrap;
 /* width: 100%; */
  /* align-self: start; */
`;

const QuestionBody = styled.h3`
  width: fit-content;
 /* padding-right: 1em; */
  margin: 0;
 /* margin-block-end: 0;
  margin-block-start: 0; */
 /* padding-top: 0.5rem; */
  font-weight: 600;
 /* margin-bottom: 1rem;
  margin-top: 0.75rem; */
  width: 100%;
`;

const AnswersContainer = styled.div`
  display: flex;
  margin-top: 1rem;
`;

const Answer = styled.h4`
  font-size: 1.0em;
   padding-right: 1rem;
  margin: 0;
  line-height: 1.5rem;
  min-width: calc(2em + 1px);
`;

const AnswerNone = styled.p`
 /* padding-bottom: 1rem; */
  padding-left: 0;
 /* margin-block-end: 0.5rem; */
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

const AddAnswer = styled.button`
  cursor: pointer;
  &:hover {
    font-weight: 500;
  }
  &:visited {
    color: ${(props) => props.theme.clicked};
  }
  border: 1px lightgrey solid;
  padding: 0.25rem 1rem;
  border-radius: 25px;
  background: transparent;
  font-size:  ${(props) => props.theme.tertiary};
  font-weight: 300;
`;

export default QuestionEntry;
