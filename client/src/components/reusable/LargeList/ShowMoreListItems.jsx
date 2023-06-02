import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../Button';

// TO-DO: add animation so expanding list is a smoother transition

function ShowMoreListItems({ setItemsPerPage, itemText }) {
  const [listExpanded, setListExpanded] = useState(false);

  function toggleMoreItems() {
    if (listExpanded === true) {
      setItemsPerPage(2);
    } else {
      setItemsPerPage(10);
    }
    setListExpanded((prev) => !prev);
  }

  const buttonText = listExpanded ? `Show Less ${itemText}` : `Show More ${itemText}`;

  return (
    <MoreListItemsButton type="button" onClick={() => toggleMoreItems()}>
      {buttonText}
    </MoreListItemsButton>
  );
}

ShowMoreListItems.propTypes = {
  setItemsPerPage: PropTypes.func.isRequired,
  itemText: PropTypes.string,
};

ShowMoreListItems.defaultProps = {
  itemText: 'Reviews',
};

const MoreListItemsButton = styled(Button)`
  flex: 1;
`;

export default ShowMoreListItems;
