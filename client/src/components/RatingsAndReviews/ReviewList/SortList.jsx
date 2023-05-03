import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function SortList({
  sortOrder, setSortOrder, revCount, filteredRevsLength,
}) {
  const handleSortSelect = function handleSortSelect(event) {
    setSortOrder(event.target.value);
  };

  return (
    <RevListHeader>
      &nbsp;
      {revCount === 2 ? 2 : filteredRevsLength}
      &nbsp;
      reviews, sorted by:
      <Sort onChange={handleSortSelect} value={sortOrder}>
        <option value="relevant">Relevance</option>
        <option value="newest">Newest</option>
        <option value="helpful">Helpful</option>
      </Sort>
    </RevListHeader>
  );
}

SortList.propTypes = {
  revCount: PropTypes.number.isRequired,
  sortOrder: PropTypes.string.isRequired,
  setSortOrder: PropTypes.func.isRequired,
  filteredRevsLength: PropTypes.number,
};

SortList.defaultProps = {
  filteredRevsLength: 0,
};

export default SortList;

const RevListHeader = styled.div`
  font-size: 1.0rem;
  margin-block-start: 1em;
  margin-block-end: 0.5em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  display: flex;

  @media (min-width 400px) {
    margin-left: 1em;
  };
`;

const Sort = styled.select`
  font: inherit;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
  padding: 0.25em;
  margin-left: 0.25em;
  margin-top: -0.25em;
  align-self: center;
`;
// text-decoration: underline;
// background-color: inherit;
// border: none;
