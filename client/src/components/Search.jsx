import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
// import { useGlobalContext } from '../contexts/GlobalStore';

function Search({
  placeholder,
  searchClosed,
  // handleSearch,
  // handleClearSearch,
  handleChange,
  // setSearchTerm,
  searchTerm,
  handleClickIcon,
  nav,
}) {
  // const { productID } = useGlobalContext();

  // const [searchTerm, setSearchTerm] = useState('');

  // useEffect(() => {
  //   setSearchTerm('');
  //   // console.log('resetting search inputs');
  // }, [productID]);

  // const handleChange = (e) => {
  //   const term = e.target.value.toLowerCase();
  //   setSearchTerm(term);
  //   if (term.length > 3) {
  //     handleSearch(term);
  //   }
  //   if (term === '') {
  //     handleClearSearch();
  //   }
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const term = e.target.value.toLowerCase();
  //   handleSearch(term);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    // const term = e.target.value.toLowerCase();
    // handleSearch(term);
    handleClickIcon();
  };

  // const handleReset = () => {
  //   handleClearSearch();
  //   setSearchTerm('');
  // };

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
    <QuestionSearchBar
      $collapsed={searchClosed}
      role="search"
    >
      <Input
        type="search"
        placeholder={placeholder}
        value={searchTerm}
        $collapsed={searchClosed}
        onChange={handleChange}
        $nav={nav}
      />
      <RightIcon
        type="submit"
        onClick={handleSubmit}
        $clear={searchTerm?.length > 0}
        $nav={nav}
      />
    </QuestionSearchBar>
  );
}

Search.propTypes = {
  // handleClearSearch: PropTypes.func,
  // handleSearch: PropTypes.func,
  handleChange: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  searchClosed: PropTypes.bool,
  handleClickIcon: PropTypes.func,
  nav: PropTypes.bool,
};

Search.defaultProps = {
  placeholder: 'Search...',
  searchClosed: false,
  handleClickIcon: () => null,
  nav: false,
  // handleClearSearch: () => console.log('clearing search'),
  // handleSearch: () => console.log('handling search'),
};

const QuestionSearchBar = styled.form`
  display: flex;
 /* justify-content: space-between; */
  padding: 2px;
  border: 1px solid currentColor;
 /* border-radius: 5px; */
  border-radius: 3px;
  width: 100%;
  /* font-size: clamp(0.875rem, calc(0.875rem + 0.268vw), 1.25rem); */
  /* font-size: clamp(14px, 1.6vw, 18px); */
  /* font-size: ${(props) => props.theme.input}; */
  background-color: ${(props) => props.theme.backgroundColor};
  @media (max-width: 65em) {
    ${(props) => props.$collapsed && css`
      border: 1px solid transparent;
     /* background-color: ${props.theme.navBgColor}; */
      background: transparent;
    `};
  }
`;

// TO-DO: make bigger on focus (for mobile)
const Input = styled.input`
 /* font-family: inherit; */
  background: transparent;
  margin: 0;
  /* padding: 0.5em; */
  padding: 0.75em;
  ${(props) => props.$nav && 'padding: 0.5em'};
  font-size: ${(props) => props.theme.input};
  color: ${(props) => props.theme.fontColor};
  border: 1px solid transparent;
  border-radius: inherit;
  flex: 1;
  width: 100%;

  ::placeholder {
    color: ${(props) => props.theme.inputPlaceholder};
  }

  ::-webkit-search-cancel-button {
    appearance: none;
  }

  /* want "x" to be styled with the same color as focus outline */
  &:focus-visible {
    outline-color: ${(props) => props.theme.blue[5]};
    outline-color: ${(props) => props.theme.backgroundColor};
  }

  @media (max-width: 65em) {
    ${(props) => props.$collapsed && css`
     /* width: 0px;
      border: none;
      padding: 0px; */
      display: none;
    `};
  }
`;

const RightIcon = styled.button`
  position: relative;
  z-index: 6;
 /* width: 2em; */
  width: 2.5em;
  ${(props) => props.$nav && css`
    width: 2em;
    font-size: 0.875em;
  `};
  padding: 1em;
  margin: 0;
  margin-left: 2px;
  border: 1px solid transparent;
  border-radius: inherit;
  background: transparent url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E") no-repeat center;
  ${(props) => props.$clear && css`
    background: none;
    height: 2.5em;
    ${props.$nav && 'height: 2em'};
    &:after {
      content: '✕';
      color: ${props.theme.navFontColor};
    }
  `};
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

