import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AddAnswerModal from './AddAnswerModal';
import useModal from '../../../hooks/useModal';
import HelpfulReport from '../../RatingsAndReviews/ReviewList/HelpfulReport';
import AnswersList from './AnswersList';

function QuestionEntry({ question }) {
  console.log('[QuestionEntry] is running');
  const [showModal, toggleModal] = useModal();

  const answerQuestion = () => {
    toggleModal();
  };

  return (
    <Entry>
      <QuestionContainer>
        <Question>Q:</Question>

        <QuestionHeader>
          <QuestionBody
            id="question_header"
          >
            {question.question_body}
          </QuestionBody>

          <HelpfulReport
            name="questions"
            id={question.question_id}
            helpfulCount={question.question_helpfulness}
          >
            <div>|</div>
            <Clickable onClick={answerQuestion}>
              Add Answer
            </Clickable>
          </HelpfulReport>

        </QuestionHeader>
      </QuestionContainer>

      <AnswersContainer>
        <Answer id="answer_header">A:</Answer>
        <AnswersList answers={question.answers} />
      </AnswersContainer>

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
  border-bottom: currentColor solid thin;
  &&:first-child {
    border-top: currentColor solid thin;
  }
  padding-top: 0.83em;
  margin-right: 0.5em;
`;

const QuestionContainer = styled.div`
  display: flex;
  align-items: center;
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

const AnswersContainer = styled.div`
  display: flex;
`;

const Answer = styled.h4`
  font-size: 1.0em;
  padding-right: 1rem;
  margin: 0;
  line-height: 1.5em;
`;

const AnswerNone = styled.p`
  padding-bottom: 1rem;
  padding-left: 0;
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

export default QuestionEntry;
