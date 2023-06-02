import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function ListTotalCount({
  itemsPerPage, listLength, pageNum, itemText,
}) {
  const beginningIndex = ((pageNum - 1) * itemsPerPage) + 1 || 1;
  const endingIndex = (pageNum * itemsPerPage) > listLength ? listLength : (pageNum * itemsPerPage);

  return (
    <TotalCount>
      {`${beginningIndex} –– ${endingIndex} of ${listLength} ${itemText}`}
    </TotalCount>
  );
}

ListTotalCount.propTypes = {
  itemsPerPage: PropTypes.number.isRequired,
  listLength: PropTypes.number,
  pageNum: PropTypes.number.isRequired,
  itemText: PropTypes.string,
};

ListTotalCount.defaultProps = {
  listLength: 0,
  itemText: 'Reviews',
};

const TotalCount = styled.h5`
  margin-block-start: 0px;
  margin-block-end: 0px;
`;

export default ListTotalCount;