import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
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
    <QuestionSearchBar>
      <Input
        onChange={(event) => setSearchTerm(event.target.value)}
        type="text"
        placeholder="Have a Question? Search For Answers..."
      />
    </QuestionSearchBar>
  );
}

const QuestionSearchBar = styled.div`
  justify-content: left;
  align-items: center;
  padding: 0.5rem;
  margin-left: 1rem;
  margin-right: 1rem;
  border-radius: 10px;
`;

const Input = styled.input`
  width: 100%;
  height: 1.5rem;
  border-color: ${(props) => props.theme.fontColor};
  border-radius: 10px;
  background-color: ${(props) => props.theme.tertiaryColor};
  color: ${(props) => props.theme.fontColor};
  ::placeholder,
  ::-webkit-input-placeholder {
    color: ${(props) => props.theme.fontColor};
  }
  :-ms-input-placeholder {
     color: ${(props) => props.theme.fontColor};
  }
  width: 80%;
  margin-left: 0.5rem;
  font-size: 1rem;
  padding: 0.25rem 0.25rem;
  padding-left: 0.5rem;
`;

export default QuestionSearch;
