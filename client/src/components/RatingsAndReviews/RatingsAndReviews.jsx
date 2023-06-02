import React, { useState, useEffect } from 'react';
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
  }, [reviews]);

  return (
    <Container id="ratings-and-reviews">
      <RRTitle>
        Ratings & Reviews
      </RRTitle>
      <GridContainer>
        <BreakdownContainer>
          <Breakdown
            filterReviews={(test) => filterReviews(test)}
            reviews={reviews}
          />
        </BreakdownContainer>
        <ReviewListContainer>

          <SortList
            itemsPerPage={itemsPerPage}
            listLength={filteredRevs.length}
            pageNum={pageNum}
          />

          <ReviewsList
            filteredRevs={filteredRevs}
            itemsPerPage={itemsPerPage}
            pageNum={pageNum}
          />

          {itemsPerPage > 2
          // items per page when list expanded ^
          && (
            <ListNavigation
              listLength={filteredRevs.length}
              setPageNum={setPageNum}
              pageNum={pageNum}
              itemsPerPage={itemsPerPage}
            />
          )}

          <MoreAddContainer>
            {(filteredRevs.length > 2)
            && (
              <ShowMoreListItems
                setItemsPerPage={setItemsPerPage}
                itemText="Reviews"
              />
            )}
            <AddRev />
          </MoreAddContainer>
          {/* <LargeList
            listLength={filteredReviews.length}
            pageNum={pageNum}
            itemsPerPage={itemsPerPage}
            children={ReviewsList}
          /> */}
        </ReviewListContainer>
        {/* <LargeList filteredReviews={filteredRevs} /> */}
      </GridContainer>
    </Container>
  );
}

export default RatingsAndReviews;

const Container = styled.div`
  padding-left: 5%;
  padding-right: 5%;
  padding-bottom: 1.5rem;

  @media (max-width: 600px) {
    padding-top: 5%;
  };
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
