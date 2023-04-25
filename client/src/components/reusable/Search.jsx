import React from 'react';
import styled from 'styled-components';

function Search(props) {
  return (
    <QuestionSearchBar props={props}>
      <Input
        type="search"
        placeholder={props.placeholder}
        searchTerm={props.searchTerm}
        setSearchTerm={props.setSearchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <SearchIcon type="submit" />
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
  background-color: ${(props) => props.theme.backgroundColor};
  margin: 0.5rem;
`;

// TO-DO: make bigger on focus (for mobile)
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
 ::placeholder {
   color: ${(props) => props.theme.inputPlaceholder};
  };
`;
// font-size: calc(10px + 1vw);

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
  &:hover {
    opacity: 1;
  }
`;

export default Search;
