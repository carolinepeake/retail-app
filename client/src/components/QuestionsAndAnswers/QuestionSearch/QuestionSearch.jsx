import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../../contexts/GlobalStore';
import Button from '../../reusable/Button.jsx';

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
        type="search"
        placeholder="Have a Question? Search For Answers..."
      />
      <SearchIcon type="submit"/>
    </QuestionSearchBar>
  );
}
const QuestionSearchBar = styled.form`
  display: flex;
  justify-content: space-between;
  padding: 2px;
  border: 1px solid currentColor;
  border-radius: 5px;
  color: #555;
  background-color: ${(props) => props.theme.secondaryColor};
  margin: 0.5rem;
`;
// cursor: pointer;
// &:hover {
//   font-weight: bold;
// };
// font-size: calc(10px + 1vw);
// align-self: center;

// TO-DO: make bigger on focus (for mobile)
// const Input = styled.input`
//   background-color: ${(props) => props.theme.secondaryColor};
//   color: ${(props) => props.theme.fontColor};
//   border: ${(props) => props.theme.fontColor} 1px solid;
//   border-radius: 2.5%;
//   &:focus {
//     outline: none;
//   }
//   width: 70%;
//   font-size: large;
// `;

const Input = styled.input`
  border: none;
  background: transparent;
  margin: 0;
  padding: 7px 8px;
  font-size: 14px;
  color: inherit;
  border: 1px solid transparent;
  border-radius: inherit;
  width: 95%;
`;

// input[type="search"]::placeholder {
//   color: #bbb;
// }

// button[type="submit"] {

// }

// button[type="submit"]:hover {
//   opacity: 1;
// }

const SearchIcon = styled.button`
  text-indent: -999px;
  overflow: hidden;
  width: 40px;
  padding: 0;
  margin: 0;
  border: 1px solid transparent;
  border-radius: inherit;
  background: transparent url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E") no-repeat center;
  cursor: pointer;
  opacity: 0.7;
`;
// const QuestionSearchBar = styled.form`
//   justify-content: left;
//   align-items: center;
//   padding: 0.5rem;
//   margin-left: 1rem;
//   margin-right: 1rem;
//   border-radius: 10px;
// `;

// const Input = styled.input`
//   width: 100%;
//   border-color: ${(props) => props.theme.fontColor};
//   background-color: ${(props) => props.theme.tertiaryColor};
//   color: ${(props) => props.theme.fontColor};
//   ::placeholder,
//   ::-webkit-input-placeholder {
//     color: ${(props) => props.theme.fontColor};
//   }
//   :-ms-input-placeholder {
//      color: ${(props) => props.theme.fontColor};
//   }
//   width: 80%;
//   margin-left: 0.5rem;
//   border-radius: 25px;
//   padding: calc(7.5px + 0.75vw);
//   font-size: 1rem;
// `;


// height: 1.5rem;
// font-size: 1rem;
// padding: 0.25rem 0.25rem;
// padding-left: 0.5rem;



export default QuestionSearch;
