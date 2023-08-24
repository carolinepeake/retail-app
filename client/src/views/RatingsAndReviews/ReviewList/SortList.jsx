import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ListTotalCount from '../../../components/LargeList/ListTotalCount';
import StyledSelect from '../../../components/StyledSelect';
import { useGlobalContext } from '../../../contexts/GlobalStore';
import { capitalizeFirstLetter } from '../../../utils/getFormat';
import { SORT_OPTIONS } from '../../../constants/constants';

function SortList({
  itemsPerPage, listLength, pageNum, setPageNum,
}) {
  console.log('[SortList] is running');
  const {
    setSortOrder, sortOrder,
  } = useGlobalContext();

  // may need to move up in hierarchy
  useEffect(() => {
    // request reviews
    setPageNum(1);
  }, [sortOrder]);

  const handleSelectSortValue = (newValue) => {
    setSortOrder(newValue);
  };

  const getDropdownLabel = (value) => {
    const sortValue = value || 'relevant';
    const formattedValue = capitalizeFirstLetter(sortValue);
    const dropdownLabel = `Sort by ${formattedValue}`;
    return dropdownLabel;
  };

  return (
    <RevListHeader>
      <ListTotalCount
        pageNum={pageNum}
        itemsPerPage={itemsPerPage}
        listLength={listLength}
        itemText="Reviews"
      />
      <StyledSelect
        initialValue="relevant"
        options={SORT_OPTIONS}
        getLabel={getDropdownLabel}
        handleSelect={handleSelectSortValue}
      />
    </RevListHeader>
  );
}

SortList.propTypes = {
  itemsPerPage: PropTypes.number.isRequired,
  listLength: PropTypes.number,
  pageNum: PropTypes.number.isRequired,
  setPageNum: PropTypes.func.isRequired,
};

SortList.defaultProps = {
  listLength: 0,
};

export default SortList;

const RevListHeader = styled.div`
  font-size: 1em;
  font-weight: 500;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0;
  margin-inline-end: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width 400px) {
    margin-left: 1em;
  }

  @media (min-width 600px) {
    margin-inline-end: 1em;
  }
`;
