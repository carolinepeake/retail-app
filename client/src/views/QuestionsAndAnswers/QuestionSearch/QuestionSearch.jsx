import React from 'react';
import PropTypes from 'prop-types';
import Search from '../../../components/Search';
// import { useGlobalContext } from '../../../contexts/GlobalStore';

function QuestionSearch({
  // setFilteredQuestions,
  handleChange,
  searchTerm,
}) {
  console.log('[QuestionSearch] is running');
  // const {
  //   questions,
  // } = useGlobalContext();

  // could make recursive so only testing questions
  // that have met the search criteria so far
  // const searchQuestions = (searchTerm) => {
  //   const searchResults = [];
  //   Object.values(questions).forEach((question) => {
  //     const searchBody = question.question_body.toLowerCase();
  //     if (searchBody.includes(searchTerm)) {
  //       searchResults.push(question);
  //     }
  //   });
  //   setFilteredQuestions(searchResults);
  // };

  // const handleClearResults = () => {
  //   setFilteredQuestions(questions);
  // };

  return (
    <Search
      placeholder="Have a Question? Search For Answers..."
      handleChange={handleChange}
      searchTerm={searchTerm}
      // handleSearch={searchQuestions}
      // handleClearSearch={handleClearResults}
    />
  );
}

QuestionSearch.propTypes = {
  // setFilteredQuestions: PropTypes.func.isRequired,
  // setSearchTerm: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
};

export default QuestionSearch;
