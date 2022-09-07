import React from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../contexts/GlobalStore';
import QuestionEntry from './QuestionEntry/QuestionEntry';
import QuestionSearch from './QuestionSearch/QuestionSearch';
import ExtraButtons from './Extras/ExtraButtons';

function QuestionAndAnswers() {
  const { numQuestions, filteredQuestions, setNumQuestions } = useGlobalContext();

  function handleScroll(e) {
    // within 0.9 of the bottom
    const bottom = 0.9 * (e.target.scrollHeight - e.target.scrollTop) <= e.target.clientHeight;
    if (bottom) {
      setNumQuestions((prev) => prev + 2);
    }
  }

  return (
    <Container id="question-and-answers">
      <div style={{ fontSize: '1.0rem' }}>{`Questions \& Answers`}</div>
      <QuestionSearch />
      <QuestionListContainer id="scrollable-container" onScroll={(e) => handleScroll(e)}>
        {numQuestions === 0 ? (
          <div>Be the first to ask a question!</div>
        ) : (
          filteredQuestions.map((question) => (
            <>
              <QuestionEntry
                question={question}
                key={`${question.question_id}`}
              />
              <hr/>
            </>
          ))
        )}
      </QuestionListContainer>
      <ExtraButtons />
    </Container>
  );
}

export default QuestionAndAnswers;

const Container = styled.div`
  justify-content: space-evenly;
  grid-column: 2/3;
  grid-row: 4/5;
  display: flex;
  flex-direction: column;

`;

const QuestionListContainer = styled.div`
  max-height: 75vh;
  overflow: auto;
  border-radius: 10px;
  justify-content: center;
  scroll-behavior: smooth;
`;

// const QuestionListContainer = styled.div`
//   max-height: 75vh;
//   overflow: auto;
//   margin-left: 20px;
//   margin-right: 20px;
//   padding: 10px;
//   border-radius: 10px;
//   justify-content: center;
//   scroll-behavior: smooth;
// `;
