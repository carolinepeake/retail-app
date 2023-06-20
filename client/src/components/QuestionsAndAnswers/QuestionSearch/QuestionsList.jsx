import React, { useState, useEffect } from 'react';
import QuestionEntry from '../QuestionEntry/QuestionEntry';
import { useGlobalContext } from '../../../contexts/GlobalStore';

export default function QuestionsList({ pageNum, itemsPerPage }) {
  const {
    numQuestions,
    filteredQuestions,
    setNumQuestions,
    questions,
  } = useGlobalContext();

  // may be better to keep with parent component
  const startingSlice = (pageNum - 1) * itemsPerPage;

  return (
    filteredQuestions.slice(startingSlice, (startingSlice + itemsPerPage)).map((question) => (
      <QuestionEntry
        question={question}
        key={`${question.question_id}`}
      />
    ))
  )

};