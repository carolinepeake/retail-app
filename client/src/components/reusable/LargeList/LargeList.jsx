import React, { useState } from 'react';
import styled from 'styled-components';
// import { useGlobalContext } from '../../contexts/GlobalStore';
import SortList from '../../RatingsAndReviews/ReviewList/SortList';
import ListTotalCount from './ListTotalCount';
import ReviewsList from '../../RatingsAndReviews/ReviewList/ReviewsList';
import AddRev from '../../RatingsAndReviews/AddRev/AddRev';
import ListNavigation from './ListNavigation';
import ShowMoreListItems from './ShowMoreListItems';

// need to change how i get reviews. Just get all at once, then slice.
// if need to change the filter, just make new get request

function LargeList({ children, listLength, pageNum, itemsPerPage }) {
  // const {
  //   reviews,
  //   numReviews, setNumReviews,
  // } = useGlobalContext();



  return (
    <ReviewListContainer>

      <ListTotalCount
        itemsPerPage={itemsPerPage}
        // listLength={children.length}
        listLength={listLength}
        pageNum={pageNum}
      />

      {/* <SortList
        itemsPerPage={itemsPerPage}
        // listLength={children.length}
        listLength={listLength}
        pageNum={pageNum}
      /> */}

      <ReviewsList
        filteredRevs={filteredRevs}
        // itemsPerPage={itemsPerPage}
        // pageNum={pageNum}
        startingSlice={startingSlice}
        endingSlice={endingSlice}
      />

      {listLength >= itemsPerPage
      && (
        <ListNavigation
          listLength={listLength}
          setPageNum={setPageNum}
          pageNum={pageNum}
          itemsPerPage={itemsPerPage}
        />
      )}

      <MoreAddContainer>
        {(listLength > 2)
        && (
          <ShowMoreListItems
            setItemsPerPage={setItemsPerPage}
          />
        )}
        <AddRev />
      </MoreAddContainer>
    </ReviewListContainer>
  );
}

const ReviewListContainer = styled.div`
@media (max-width: 600px) {
    width: 100%;
    margin-top: 1.5rem;
  };

  @media (min-width: 600px) {
    grid-column: 2/4;
    grid-row: 1;
    padding-left: 1em;
  };
`;

const MoreAddContainer = styled.div`
  padding: 1em 0px;
  display: flex;
  flex-direction: column;

  @media (min-width: 600px) {
    flex-direction: row;
    justify-content: space-around;
    column-gap: 2.0rem;
    padding: 1em 0 1em 0;
  };
`;

export default LargeList;
