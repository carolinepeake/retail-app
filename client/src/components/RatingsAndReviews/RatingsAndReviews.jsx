import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../contexts/GlobalStore';
import SortList from './ReviewList/SortList';
import ReviewsList from './ReviewList/ReviewsList';
import AddRev from './AddRev/AddRev';
import Breakdown from './Breakdown/Breakdown';
import ListNavigation from '../reusable/LargeList/ListNavigation';
import ShowMoreListItems from '../reusable/LargeList/ShowMoreListItems';
import SectionHeader from '../reusable/SectionHeader';

// need to change how i get reviews. Just get all at once, then slice.
// if need to change the filter, just make new get request

function RatingsAndReviews() {
  const {
    reviews,
    // numReviews, setNumReviews,
  } = useGlobalContext();

  const [itemsPerPage, setItemsPerPage] = useState(2);
  const [filteredRevs, setFilteredRevs] = useState(reviews);
  const [pageNum, setPageNum] = useState(1);

  const filterReviews = (starFilterArr) => {
    let result;
    if (starFilterArr.length === 0) {
      result = reviews;
    } else {
      result = reviews.filter((review) => (
        starFilterArr.includes(review.rating)
      ));
    }
    setFilteredRevs(result);
  };

  useEffect(() => {
    setFilteredRevs(reviews);
    setItemsPerPage(2);
    setPageNum(1);
  }, [reviews]);

  const revRef = useRef(null);

  // should forwarf ref instead of passing this function
  // to avoid creating a new function every render
  const scrollToListTop = () => {
    revRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Container id="ratings-and-reviews">
      <RRTitle>
        Ratings & Reviews
      </RRTitle>
      <GridContainer>
        <BreakdownContainer>
          <Breakdown
            filterReviews={filterReviews}
            reviews={reviews}
          />
        </BreakdownContainer>
        <ReviewListContainer ref={revRef}>

          {reviews.length > 0
            && (
              <>
                <SortList
                  itemsPerPage={itemsPerPage}
                  listLength={filteredRevs.length}
                  pageNum={pageNum}
                  setPageNum={setPageNum}
                />

                <ReviewsList
                  filteredRevs={filteredRevs}
                  itemsPerPage={itemsPerPage}
                  pageNum={pageNum}
                />
              </>
            )}

          {(itemsPerPage > 2 && filteredRevs.length > 10)
          && (
            <ListNavigation
              listLength={filteredRevs.length}
              setPageNum={setPageNum}
              pageNum={pageNum}
              itemsPerPage={itemsPerPage}
              scrollToListTop={scrollToListTop}
            />
          )}

          <MoreAddContainer>
            {(filteredRevs.length > 2)
            && (
              <ShowMoreListItems
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
                itemText="Reviews"
                scrollToListTop={scrollToListTop}
                setPageNum={setPageNum}
              />
            )}
            <AddRev />
          </MoreAddContainer>
        </ReviewListContainer>
      </GridContainer>
    </Container>
  );
}

export default RatingsAndReviews;

const Container = styled.div`
  padding-left: 5%;
  padding-right: 5%;
  padding-bottom: 1.5rem;
  padding-bottom: 5%;

  @media (min-width: 600px) {
    padding-bottom: 0;
  }
`;

const RRTitle = styled(SectionHeader)`
  width: 100%;
`;

const GridContainer = styled.div`
  @media (min-width: 600px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  };
`;

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
  }
`;

const BreakdownContainer = styled.div`
  max-width: 600px;
  margin-top: 0.5rem;

  @media (min-width: 400px) {
    padding: 0 2.5%;
    margin 0 auto;
  };

  @media (min-width: 600px) {
    grid-column: 1/2;
    grid-row: 1;
    padding: 0 2.5% 0 0;
    margin: 0;
    max-width: 400px;
  };
`;
