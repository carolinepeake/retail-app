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
      reviews, sorted by&nbsp;
      <select onChange={handleSortSelect} value={sortOrder} style={{ cursor: 'pointer' }}>
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
`;
