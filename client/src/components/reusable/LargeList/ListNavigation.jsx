import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import {
  MdArrowForwardIos, MdArrowBackIos,
} from 'react-icons/md';
import Button from '../Button';

// TO-DO: test getting more reviews from API on call and see if faster

function ListNavigation({
  listLength,
  setPageNum,
  pageNum,
  itemsPerPage,
  scrollToListTop,
}) {
  function handleClick(e) {
    const newValue = Number(e.target.value);
    setPageNum(newValue);
    scrollToListTop();
  }

  function handleClickBack() {
    setPageNum((prev) => prev - 1);
    scrollToListTop();
  }

  function handleClickForward() {
    setPageNum((prev) => prev + 1);
    scrollToListTop();
  }

  const totalPages = Math.ceil(listLength / itemsPerPage);

  const buttons = Array.from(Array(totalPages), (_, i) => i + 1);

  return (
    <ListNavContainer>

      <ScrollButton
        // onClick={(e) => handleClickBack(e)}
        onClick={() => handleClickBack()}
        disabled={pageNum === 1}
      >
        <MdArrowBackIos style={{ transform: 'translateX(25%)' }} />
      </ScrollButton>

      {buttons.map((page) => (
        <PageButton type="button" value={page} onClick={(e) => handleClick(e)} key={page} active={pageNum === page}>
          {page}
        </PageButton>
      ))}

      <ScrollButton
        onClick={(e) => handleClickForward(e)}
        disabled={pageNum === totalPages}
      >
        <MdArrowForwardIos />
      </ScrollButton>

    </ListNavContainer>
  );
}

ListNavigation.propTypes = {
  listLength: PropTypes.number.isRequired,
  pageNum: PropTypes.number.isRequired,
  setPageNum: PropTypes.func.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  scrollToListTop: PropTypes.func.isRequired,
};

const ListNavContainer = styled.div`
  display: flex;
  border: none;
  justify-content: center;
  align-items: center;
  margin: 1.5em 0 0 0;
`;

const NavButton = styled(Button)`
  aspect-ratio: 1/1;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  margin: 0;
`;

const PageButton = styled(NavButton)`
  height: 2em;
  width: 2em;
  ${(props) => props.active && css`
    background-color: ${props.theme.submitButton};
    color: ${props.theme.submitButtonFont};
  `};
  &:hover {
    background-color: ${(props) => props.theme.submitButtonHover};
    color: ${(props) => props.theme.submitButtonHoverFont};
  };
`;

const ScrollButton = styled(NavButton)`
  padding: 0;
  height: 1.25em;
  width: 1.25em;
  font-size: 1.5em;
  ${(props) => props.disabled && css`
    color: darkgrey;
    background-color: transparent;
  `};
`;

export default ListNavigation;
