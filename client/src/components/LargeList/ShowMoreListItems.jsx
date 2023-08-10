import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from '../Buttons';

// TO-DO: add animation so expanding list is a smoother transition

function ShowMoreListItems({
  itemsPerPage,
  setItemsPerPage,
  itemText,
  scrollToListTop,
  setPageNum,
}) {
  const toggleMoreItems = () => {
    // if item list is expanded
    if (itemsPerPage > 2) {
      setItemsPerPage(2);
      setPageNum(1);
      scrollToListTop();
    } else {
      setItemsPerPage(10);
    }
  };

  const buttonText = itemsPerPage > 2 ? `Show Less ${itemText}` : `Show More ${itemText}`;

  return (
    <MoreListItemsButton type="button" onClick={toggleMoreItems}>
      {buttonText}
    </MoreListItemsButton>
  );
}

ShowMoreListItems.propTypes = {
  itemsPerPage: PropTypes.number,
  setItemsPerPage: PropTypes.func.isRequired,
  itemText: PropTypes.string,
  scrollToListTop: PropTypes.func.isRequired,
  setPageNum: PropTypes.func.isRequired,
};

ShowMoreListItems.defaultProps = {
  itemText: 'Reviews',
  itemsPerPage: 2,
};

const MoreListItemsButton = styled(Button)`
  flex: 1;
`;

export default ShowMoreListItems;
