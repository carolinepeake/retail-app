import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function SortList({ sortOrder, setSortOrder, revCount, filteredRevsLength }) {
  const handleSortSelect = function handleSortSelect(event) {
    setSortOrder(event.target.value);
  };

  return (
    <RevListHeader>
      &nbsp;
      {revCount === 2 ? 2 : filteredRevsLength}
      &nbsp;
      reviews, sorted by&nbsp;
      <select onChange={handleSortSelect} value={sortOrder}  style={{ cursor: 'pointer' }}>
        <option value="relevant">Relevance</option>
        <option value="newest">Newest</option>
        <option value="helpful">Helpful</option>
      </select>
    </RevListHeader>
  );
}

SortList.propTypes = {
  revCount: PropTypes.number.isRequired,
  sortOrder: PropTypes.string.isRequired,
  setSortOrder: PropTypes.func.isRequired,
};

export default SortList;

const RevListHeader = styled.div`
  padding: 1em;
  font-size: 1.17em;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
  display: flex;
`;
