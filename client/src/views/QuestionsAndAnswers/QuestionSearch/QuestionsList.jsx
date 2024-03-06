import React from 'react';
import QuestionEntry from '../QuestionEntry/QuestionEntry';

export default function QuestionsList({ pageNum, itemsPerPage, filteredQuestions }) {
  console.log('[QuestionList] is running');

  // may be better to keep with parent component
  const startingSlice = (pageNum - 1) * itemsPerPage;

  const visibleQuestions = filterQuestions(questions, searchTerm);

  const startingSlice = (pageNum - 1) * itemsPerPage <= visibleReviews.length
    ? (pageNum - 1) * itemsPerPage : 0;

  const endingSlice = startingSlice + itemsPerPage;

  return (
    filteredQuestions.slice(startingSlice, (startingSlice + itemsPerPage)).map((question) => (
      <QuestionEntry
        question={question}
        key={`${question.question_id}`}
      />
    ))
  );
}
