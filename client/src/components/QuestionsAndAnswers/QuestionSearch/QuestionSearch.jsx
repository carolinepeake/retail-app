import React, { useState, useEffect } from 'react';
import Search from '../../reusable/Search';
import { useGlobalContext } from '../../../contexts/GlobalStore';

function QuestionSearch({
  // pageNum,
  // itemsPerPage,
}) {
  // would move this to search component,
  // search function to search component,
  // and pass in array of objects that include body to search in and id
  const [searchTerm, setSearchTerm] = useState('');
  const {
    questions,
    setFilteredQuestions,
    // numQuestions,
  } = useGlobalContext();

  // could also just pass through starting slice or final questions array
  // const startingSlice = (pageNum - 1) * itemsPerPage;

  // this should be in search component and then won't have to use useEffect,
  // just call it onChange and onClick and set searchResults or reassign filteredQuestions
  const searchQuestions = () => {
    const searchResults = [];
    // if (searchTerm.length >= 3) {
    Object.values(questions).forEach((question) => {
      const searchBody = question.question_body.toLowerCase();
      if (searchBody.includes(searchTerm)) {
        searchResults.push(question);
      }
      // });
      // setFilteredQuestions(searchResults.slice(0, numQuestions));
      setFilteredQuestions(searchResults);
      return searchResults;
    });
    // searchResults = questions.slice(0, numQuestions);
    // setFilteredQuestions(questions.slice(0, numQuestions));
    // return searchResults;
  };

  // might want to memoize or cache all questions and filtered questions
  // useMemo(() => {

  // }, [])

  // cache:
  // all questions => DONE as part of questions state
  // filtered questions search is submitted or deleted (for deleted, only once over 3 characters)
  // once searchTerm is over 3 characters begin filtering questions
  // if search is submitted begin filtering questions

  // delay first search until 3 characters
  // but continue to search if go back
  // once back to 0 characters, 3 character delay is reinitiated

  // let questions2 = [];

  // this does the same thing as current search function
  useEffect(() => {
    // if (searchTerm.length >= 3) {
    //   questions2 = searchQuestions();
    //   return;
    // }
    if (searchTerm !== '') {
      searchQuestions();
      console.log('searched questions');
      return;
    }
    setFilteredQuestions(questions);
    console.log('setting filtered questions to questions');
    // could memoize (or cache?) this calculation to return to
    // setFilteredQuestions(questions.slice(0, numQuestions));
  }, [searchTerm]);

  useEffect(() => {
    setSearchTerm('');
    console.log('setting search term to nothing');
  }, [questions]);

  const handleSearch = (e) => {
    e.preventDefault();
    searchQuestions();
  };

  // <QuestionsList questions={questions}/>
  // filteredQuestions.slice(startingSlice, (startingSlice + itemsPerPage)).map((question) => (
  //   <QuestionEntry
  //     question={question}
  //     key={`${question.question_id}`}
  //   />
  // ))

  return (
    <Search
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      placeholder="Have a Question? Search For Answers..."
      handleSearch={handleSearch}
    />
  );
}

export default QuestionSearch;
