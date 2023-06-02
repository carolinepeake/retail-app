import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ListTotalCount from '../../reusable/LargeList/ListTotalCount';
import StyledSelect from '../../reusable/StyledSelect';
import { useGlobalContext } from '../../../contexts/GlobalStore';

const options = [{ value: 'relevant', label: 'relevant', id: '00' }, { value: 'newest', label: 'newest', id: '01' }, { value: 'helpful', label: 'helpful', id: '02' }];

function SortList({
  itemsPerPage, listLength, pageNum,
}) {
  const {
    setSortOrder,
  } = useGlobalContext();

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
        options={options}
        handleSelect={setSortOrder}
      />
    </RevListHeader>
  );
}

SortList.propTypes = {
  itemsPerPage: PropTypes.number.isRequired,
  listLength: PropTypes.number,
  pageNum: PropTypes.number.isRequired,
};

SortList.defaultProps = {
  listLength: 0,
};

export default SortList;

const RevListHeader = styled.div`
  font-size: 1.17em;
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
  };
  @media (min-width 600px) {
    margin-inline-end: 1em;
  };
`;
// font-size: 1.17em;
//   font-weight: 500;
