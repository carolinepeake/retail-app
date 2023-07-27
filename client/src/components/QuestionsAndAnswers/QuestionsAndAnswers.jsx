import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../contexts/GlobalStore';
import QuestionEntry from './QuestionEntry/QuestionEntry';
import QuestionSearch from './QuestionSearch/QuestionSearch';
import ExtraButtons from './Extras/ExtraButtons';
import SectionHeader from '../reusable/SectionHeader';
import ListNavigation from '../reusable/LargeList/ListNavigation';
import ListTotalCount from '../reusable/LargeList/ListTotalCount';

function QuestionAndAnswers() {
  console.log('[QuestionsAndAnswers] is running');
  const {
    filteredQuestions, questions,
  } = useGlobalContext();

  // should forwarf ref instead of passing this function
  // to avoid creating a new function every render
  // might not happen with ref?
  const questRef = useRef(null);
  const scrollToListTop = () => {
    questRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const [pageNum, setPageNum] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const startingSlice = (pageNum - 1) * itemsPerPage;

  useEffect(() => {
    setPageNum(1);
    setItemsPerPage(2);
  }, [questions]);

  return (
    <Container id="question-and-answers">
      <SectionHeader>
        Questions & Answers
      </SectionHeader>
      <QuestionSearch pageNum={pageNum} itemsPerPage={itemsPerPage} />
      <QuestionListHeader ref={questRef}>
        <ListTotalCount
          listLength={filteredQuestions.length}
          itemsPerPage={itemsPerPage}
          pageNum={pageNum}
          itemText="Questions"
        />
      </QuestionListHeader>
      <QuestionListContainer>
        {questions.length === 0
          ? <div>Be the first to ask a question!</div>
          : (
            filteredQuestions.slice(startingSlice, (startingSlice + itemsPerPage)).map((q) => (
              <QuestionEntry
                question={q}
                key={`${q.question_id}`}
              />
            ))
          )}
        {/* <QuestionsList itemsPerPage={itemsPerPage} pageNum={pageNum} /> */}
      </QuestionListContainer>
      {(itemsPerPage > 2 && filteredQuestions.length > 10) && (
        <ListNavigation
          listLength={filteredQuestions.length}
          setPageNum={setPageNum}
          pageNum={pageNum}
          itemsPerPage={itemsPerPage}
          scrollToListTop={scrollToListTop}
        />
      )}
      <ExtraButtons
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        scrollToListTop={scrollToListTop}
        setPageNum={setPageNum}
      />
    </Container>
  );
}

export default QuestionAndAnswers;

const Container = styled.div`
  padding-right: 5%;
  padding-left: 5%;
  padding-bottom: 5%;

  @media (min-width: 600px) {
    padding-bottom: 0;
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
