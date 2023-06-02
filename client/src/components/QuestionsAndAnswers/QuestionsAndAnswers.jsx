import React, { useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../contexts/GlobalStore';
import QuestionEntry from './QuestionEntry/QuestionEntry';
import QuestionSearch from './QuestionSearch/QuestionSearch';
import ExtraButtons from './Extras/ExtraButtons';
import SectionHeader from '../reusable/SectionHeader';
import ListNavigation from '../reusable/LargeList/ListNavigation';
import ListTotalCount from '../reusable/LargeList/ListTotalCount';

function QuestionAndAnswers() {
  const {
    numQuestions, filteredQuestions, setNumQuestions, questions,
  } = useGlobalContext();

  const [pageNum, setPageNum] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(2);

  function handleScroll(e) {
    // within 0.9 of the bottom
    const bottom = 0.9 * (e.target.scrollHeight - e.target.scrollTop) <= e.target.clientHeight;
    if (bottom) {
      setNumQuestions((prev) => prev + 2);
    }
  }

  const startingSlice = (pageNum - 1) * itemsPerPage;

  return (
    <Container id="question-and-answers">
      <SectionHeader>
        Questions & Answers
      </SectionHeader>
      <QuestionSearch />
      <QuestionListHeader>
        <ListTotalCount
          listLength={filteredQuestions.length}
          itemsPerPage={itemsPerPage}
          pageNum={pageNum}
          itemText="Questions"
        />
      </QuestionListHeader>
      <QuestionListContainer>
        {/* {numQuestions === 0 ? (
          <div>Be the first to ask a question!</div>
        ) : (
          filteredQuestions.map((question) => (
            <QuestionEntry
              question={question}
              key={`${question.question_id}`}
            />
          ))
        )} */}
        {filteredQuestions === 0 ? (
          <div>Be the first to ask a question!</div>
        ) : (
          filteredQuestions.slice(startingSlice, (startingSlice + itemsPerPage)).map((question) => (
            <QuestionEntry
              question={question}
              key={`${question.question_id}`}
            />
          ))
        )}
      </QuestionListContainer>
      {itemsPerPage > 2 && (
        <ListNavigation
          listLength={filteredQuestions.length}
          setPageNum={setPageNum}
          pageNum={pageNum}
          itemsPerPage={itemsPerPage}
        />
      )}
      <ExtraButtons setItemsPerPage={setItemsPerPage} />
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

const QuestionListHeader = styled.div`
  font-size: 1.17em;
  margin-block-start: 1.0em;
  margin-block-end: 1.0em;
`;

const QuestionListContainer = styled.div`
  justify-content: center;
  background-color: ${(props) => props.theme.backgroundColor};
  padding: 0;
  margin: 1em 0 0 0;
  @media (min-width: 600px) {
    overflow-y: auto;
    overflow-x: hidden;
    scroll-behavior: smooth;
    max-height: 31em;
  }
`;
// overflow: auto;
