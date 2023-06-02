import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

function Search({
  searchTerm,
  setSearchTerm,
  placeholder,
  searchClosed,
  clickHandler,
}) {
  return (
    <QuestionSearchBar searchClosed={searchClosed}>
      <Input
        type="search"
        placeholder={placeholder}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchClosed={searchClosed}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <SearchIcon type="submit" onClick={clickHandler} searchClosed={searchClosed} />
    </QuestionSearchBar>
  );
}

Search.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  searchClosed: PropTypes.bool,
  clickHandler: PropTypes.func.isRequired,
};

Search.defaultProps = {
  placeholder: 'Search...',
  searchClosed: false,
};

const QuestionSearchBar = styled.form`
  display: flex;
  justify-content: space-between;
  padding: 2px;
  border: 1px solid currentColor;
  border-radius: 5px;
  width: 100%;
  font-size: clamp(0.875rem, calc(0.875rem + 0.268vw), 1.25rem);
  background-color: ${(props) => props.theme.backgroundColor};
  @media (max-width: 65em) {
    ${(props) => props.searchClosed && css`
      border: 1px solid transparent;
      background-color: ${props.theme.navBgColor};
    `};
  };
`;

// TO-DO: make bigger on focus (for mobile)
const Input = styled.input`
  font-family: inherit;
  background: transparent;
  margin: 0;
  padding: 0.5em;
  font-size: ${(props) => props.theme.input};
  color: ${(props) => props.theme.fontColor};
  border: 1px solid transparent;
  border-radius: inherit;
  flex: 1;
  width: 100%;
  ::placeholder {
    color: ${(props) => props.theme.inputPlaceholder};
  };

  @media (max-width: 65em) {
    ${(props) => props.searchClosed && css`
      width: 0px;
      border: none;
      padding: 0px;
    `};
  };
`;

const SearchIcon = styled.button`
  width: 2em;
  padding: 1em;
  margin: 0;
  margin-left: 2px;
  border: 1px solid transparent;
  border-radius: inherit;
  background: transparent url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E") no-repeat center;
  cursor: pointer;
  color: ${(props) => props.theme.navFontColor};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1;
  &:hover {
    color: ${(props) => props.theme.navActiveFontColor};
    background-color: ${(props) => props.theme.iconHoverBackgroundColor};
  };
`;

export default Search;
