import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import StyledSelect from '../../reusable/StyledSelect';

function SortList({
  sortOrder, setSortOrder, revCount, filteredRevsLength,
}) {
  const handleSortSelect = function handleSortSelect(event) {
    setSortOrder(event.target.value);
  };

  const options = [{ value: 'relevant', label: 'relevant', id: '00' }, { value: 'newest', label: 'newest', id: '01' }, { value: 'helpful', label: 'helpful', id: '02' }];

  return (
    <RevListHeader>
      {/* &nbsp; */}
      {/* {revCount === 2 ? 2 : filteredRevsLength} */}
      <TotalCount> {`1 –– ${revCount} of ${filteredRevsLength} Reviews`}</TotalCount>
      {/* &nbsp; */}
      {/* reviews, sorted by: */}
      {/* <Sort onChange={handleSortSelect} value={sortOrder}>
        <option value="relevant">Relevance</option>
        <option value="newest">Newest</option>
        <option value="helpful">Helpful</option>
      </Sort> */}
      <StyledSelect initialValue="relevant" options={options} handleSelect={setSortOrder} sortOrder={sortOrder} />
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
  font-size: 1.17em;
  font-weight: 500;
  margin-block-start: 1em;
  margin-block-end: 0.5em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  display: flex;

  @media (min-width 400px) {
    margin-left: 1em;
  };

  justify-content: space-between;
  padding: 0 0.5em;
  align-items: center;
`;
// font-size: 1.0rem;

const TotalCount = styled.h5`
margin-block-start: 0px;
margin-block-end: 0px;
`;

const Sort = styled.select`
  font: inherit;
  font-weight: 600;
  cursor: pointer;
  border-radius: 5px;
  margin-left: 0px;
  margin-top: -0.25em;
  align-self: center;

  border: none;
  text-decoration: underline;
  padding: 0.25em 0 0.25em 0;
`;
// text-decoration: underline;
// background-color: inherit;
// border: none;
// padding: 0.25em;
// margin-left: 0.25em;
