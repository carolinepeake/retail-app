import React from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../contexts/GlobalStore';
import QuestionEntry from './QuestionEntry/QuestionEntry';
import QuestionSearch from './QuestionSearch/QuestionSearch';
import ExtraButtons from './Extras/ExtraButtons';
import SectionHeader from '../reusable/SectionHeader';

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
      <SectionHeader>
        Questions & Answers
      </SectionHeader>
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
              {/* <hr /> */}
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
  padding-right: 5%;
  padding-left: 5%;

  @media (max-width: 600px) {
    padding-top: 5%;
  }

  @media (min-width: 600px) {
    justify-content: space-evenly;
  }
`;
// @media (min-width: 600px) {
//   margin-top: 1.5rem;
//   justify-content: space-evenly;
// }

const QuestionListContainer = styled.div`
  max-height: 31em;
  overflow: auto;
  justify-content: center;
  scroll-behavior: smooth;
  background-color: ${(props) => props.theme.backgroundColor};
  padding: 0.5em 0 1.0em 0;
`;
// margin-bottom: 0.5em;
// padding: 0.5em 1.0em 1.0em 1.0em;
// max-height: 75vh;
