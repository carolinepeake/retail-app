import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { useGlobalContext } from '../contexts/GlobalStore';

// TO-DO: make toggle (whatever the small info banner thing is called)
// appear above "X" when hovered that says "clear search"

function Search({
  placeholder,
  searchClosed,
  handleSearch,
  handleClearSearch,
}) {
  const { productID } = useGlobalContext();

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setSearchTerm('');
    console.log('resetting search inputs');
  }, [productID]);

  const handleChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    if (term.length > 3) {
      handleSearch(term);
    }
    if (term === '') {
      handleClearSearch();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const term = e.target.value.toLowerCase();
    handleSearch(term);
  };

  const handleReset = () => {
    handleClearSearch();
    setSearchTerm('');
  };

  // could also be a useFilter and include sort and filter and search
  // function useSearch() {

  //   // could also be maintained using useForm hook or useInput
  //   const [searchTerm, setSearchTerm]


  //   useDebounce

  //   handleClickSearch


  //   return [searchResults, ]
  // }
  //   (dataList, )

  return (
    <QuestionSearchBar $collapsed={searchClosed}>
      <Input
        type="search"
        placeholder={placeholder}
        value={searchTerm}
        $collapsed={searchClosed}
        onChange={handleChange}
      />
      <SearchIcon type="submit" onClick={handleSubmit} />
    </QuestionSearchBar>
  );
}

Search.propTypes = {
  handleClearSearch: PropTypes.func,
  handleSearch: PropTypes.func,
  placeholder: PropTypes.string,
  searchClosed: PropTypes.bool,
};

Search.defaultProps = {
  placeholder: 'Search...',
  searchClosed: false,
  handleClearSearch: () => console.log('clearing search'),
  handleSearch: () => console.log('clearing search'),
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
    ${(props) => props.$collapsed && css`
      border: 1px solid transparent;
      background-color: ${props.theme.navBgColor};
    `};
  }
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
  }

  @media (max-width: 65em) {
    ${(props) => props.$collapsed && css`
      width: 0px;
      border: none;
      padding: 0px;
    `};
  }
`;

const SearchIcon = styled.button`
  position: relative;
  z-index: 6;
  width: 2em;
  padding: 1em;
  margin: 0;
  margin-left: 2px;
  border: 1px solid transparent;
  border-radius: inherit;
  background: transparent url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E") no-repeat center;
  cursor: pointer;
  color: ${(props) => props.theme.navFontColor};
  fill: ${(props) => props.theme.navFontColor};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1;
  &:hover {
    color: ${(props) => props.theme.navActiveFontColor};
    fill: ${(props) => props.theme.navActiveFontColor};
    background-color: ${(props) => props.theme.iconHoverBackgroundColor};
  }
`;

export default Search;
