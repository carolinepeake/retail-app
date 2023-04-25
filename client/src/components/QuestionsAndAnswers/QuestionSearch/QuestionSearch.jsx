import React, { useState, useEffect } from 'react';
import Search from '../../reusable/Search';
import { useGlobalContext } from '../../../contexts/GlobalStore';

function QuestionSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const { questions, setFilteredQuestions, numQuestions } = useGlobalContext();

  useEffect(() => {
    if (searchTerm.length >= 3) {
      const filtered = [];
      Object.values(questions).forEach((question) => {
        if (question.question_body.includes(searchTerm)) {
          filtered.push(question);
        }
      });
      setFilteredQuestions(filtered.slice(0, numQuestions));
    } else if (searchTerm.length < 3) {
      setFilteredQuestions(questions.slice(0, numQuestions));
    }
  }, [questions, searchTerm, numQuestions]);

  return (
    <Search
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      placeholder="Have a Question? Search For Answers..."
    />
  );
}

export default QuestionSearch;
