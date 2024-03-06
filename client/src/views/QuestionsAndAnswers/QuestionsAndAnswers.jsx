import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../contexts/GlobalStore';
import QuestionEntry from './QuestionEntry/QuestionEntry';
import QuestionSearch from './QuestionSearch/QuestionSearch';
import ExtraButtons from './Extras/ExtraButtons';
import SectionHeader from '../../components/SectionHeader';
import ListNavigation from '../../components/LargeList/ListNavigation';
import ListTotalCount from '../../components/LargeList/ListTotalCount';
import Search from '../../components/Search';

// TODO: create useSearch hook

function QuestionAndAnswers() {
  console.log('[QuestionsAndAnswers] is running');
  const {
    questions,
  } = useGlobalContext();

  const questRef = useRef(null);

  const ref = useRef(null);

  // const scrollToListTop = () => {
  //   questRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  // };

  const scrollToListTop = () => {
    questRef.current.scrollTo({
      behavior: 'smooth',
      top: '-6rem',
    });
    ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // need to init all and remove from useEffect
  // const [filteredQuestions, setFilteredQuestions] = useState(questions);
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
  };

  const [pageNum, setPageNum] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(2);
  // const startingSlice = (pageNum - 1) * itemsPerPage;

  useEffect(() => {
    setPageNum(1);
    setItemsPerPage(2);
    // setFilteredQuestions(questions);
  }, [questions]);

  const filterQuestions = (list, term) => {
    if (term.length > 0) {
      const searchResults = [];
      Object.values(list).forEach((listItem) => {
        const searchBody = listItem.question_body.toLowerCase();
        if (searchBody.includes(term)) {
          searchResults.push(listItem);
        }
      });
      return searchResults;
    }
    return list;
    // setFilteredQuestions(searchResults);
  };

  const filteredQuestions = filterQuestions(questions, searchTerm);

  const startingSlice = (pageNum - 1) * itemsPerPage <= filteredQuestions.length
    ? (pageNum - 1) * itemsPerPage : 0;
  const endingSlice = startingSlice + itemsPerPage;

  return (
    <Container id="question-and-answers">
      <SectionHeader>
        Questions & Answers
      </SectionHeader>

      {/* <QuestionSearch
        pageNum={pageNum}
        // setFilteredQuestions={setFilteredQuestions}
        handleChange={handleChange}
        searchTerm={searchTerm || ''}
      /> */}

      <Search
        placeholder="Have a Question? Search For Answers..."
        handleChange={handleChange}
        searchTerm={searchTerm}
        handleClickIcon={() => setSearchTerm('')}
        // handleSearch={searchQuestions}
        // handleClearSearch={handleClearResults}
      />

      <QuestionListHeader
        // ref={questRef}
        ref={ref}
      >
        <ListTotalCount
          listLength={filteredQuestions.length}
          itemsPerPage={itemsPerPage}
          pageNum={pageNum}
          itemText="Questions"
        />
      </QuestionListHeader>

      <QuestionListContainer ref={questRef}>
        {questions.length === 0
          ? <div>Be the first to ask a question!</div>
          : filteredQuestions.length === 0
            ? <div>No questions match your search</div>
            : (filteredQuestions.slice(startingSlice, endingSlice).map((question) => (
              <QuestionEntry
                question={question}
                key={`${question.question_id}`}
              />
            ))
            )}
        {/* <QuestionsList itemsPerPage={itemsPerPage} pageNum={pageNum} /> */}
      </QuestionListContainer>

      {(itemsPerPage > 2 && filteredQuestions.length > 10)
      && (
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
        listLength={filteredQuestions.length}
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
 /* font-size: 1.17em; */
  font-size: 1em;
  margin-block-start: 1.0em;
  margin-block-end: 1.0em;
`;

const QuestionListContainer = styled.div`
  justify-content: center;
  background-color: ${(props) => props.theme.backgroundColor};
  padding: 0;
  margin: 1em 0 0 0;

 /* @media (min-width: 600px) {
    overflow-y: auto;
    overflow-x: hidden;
    scroll-behavior: smooth;
    max-height: 31em;
  } */
`;
