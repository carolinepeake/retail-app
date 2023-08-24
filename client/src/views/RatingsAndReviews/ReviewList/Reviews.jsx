import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useGlobalContext } from '../../../contexts/GlobalStore';
import SortList from './SortList';
import AddRev from '../AddRev/AddRev';
import ListNavigation from '../../../components/LargeList/ListNavigation';
import ShowMoreListItems from '../../../components/LargeList/ShowMoreListItems';
import useModal from '../../../hooks/useModal';
import { Button } from '../../../components/Buttons';
import { filterReviews } from '../../../utils/getReviews';
import ReviewTile from './ReviewTile';

export default function Reviews({
  reviews,
  ratingsFilter,
  setRatingsFilter,
}) {
  const {
    productID, setSortOrder,
  } = useGlobalContext();

  const [itemsPerPage, setItemsPerPage] = useState(2);
  const [pageNum, setPageNum] = useState(1);

  const visibleReviews = filterReviews(reviews, ratingsFilter);

  const startingSlice = (pageNum - 1) * itemsPerPage <= visibleReviews.length
    ? (pageNum - 1) * itemsPerPage : 0;

  const endingSlice = startingSlice + itemsPerPage;

  // maybe move up one
  useEffect(() => {
    setItemsPerPage(2);
    setPageNum(1);
    setRatingsFilter([]);
    setSortOrder('relevant');
  }, [productID]);

  const listRef = useRef(null);

  const scrollToListTop = () => {
    listRef.current.scrollTo({
      behavior: 'smooth',
      top: '-6rem',
    });
  };

  const [showModal, toggleModal] = useModal();

  const handleAddRev = () => {
    toggleModal();
  };

  return (
    <Container>

      {reviews.length > 0
      && (
        <SortList
          itemsPerPage={itemsPerPage}
          listLength={visibleReviews.length}
          pageNum={pageNum}
          setPageNum={setPageNum}
        />
      )}

      {visibleReviews.length > 0
      && (
        <ReviewTilesContainer
          ref={listRef}
        >
          {visibleReviews.slice(startingSlice, endingSlice).map((review) => (
            <ReviewTile
              key={review.review_id}
              review={review}
            />
          ))}
        </ReviewTilesContainer>
      )}

      {itemsPerPage > 2 && visibleReviews.length > 10
      && (
      <ListNavigation
        listLength={visibleReviews.length}
        setPageNum={setPageNum}
        pageNum={pageNum}
        itemsPerPage={itemsPerPage}
        scrollToListTop={scrollToListTop}
      />
      )}

      <MoreAddContainer>
        {visibleReviews.length > 2
        && (
          <ShowMoreListItems
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            itemText="Reviews"
            scrollToListTop={scrollToListTop}
            setPageNum={setPageNum}
          />
        )}

        <AddRevButton
          type="button"
          $primary
          onClick={handleAddRev}
        >
          Add a Review +
        </AddRevButton>
      </MoreAddContainer>

      {showModal
        && (
        <AddRev
          toggleModal={toggleModal}
          showModal={showModal}
        />
        )}

    </Container>
  );
}

Reviews.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      body: PropTypes.string,
      summary: PropTypes.string,
      recommend: PropTypes.bool,
      rating: PropTypes.number,
      reviewer_name: PropTypes.string,
      date: PropTypes.string,
      response: PropTypes.string,
      review_id: PropTypes.number,
      helpfulness: PropTypes.number,
      // photos: PropTypes.arrayOfOne([
      //   PropTypes.string,
      //   PropTypes.shape({}),
      // ]),
    }),
  ).isRequired,
  ratingsFilter: PropTypes.arrayOf(PropTypes.number).isRequired,
  setRatingsFilter: PropTypes.func.isRequired,
};

const Container = styled.div`
@media (max-width: 600px) {
    width: 100%;
    margin-top: 1.5em;
  }

  @media (min-width: 600px) {
    flex-grow: 6;
    flex-shrink: 1;
    flex-basis: 66%;
    max-width: 1400px;
  }
`;

const MoreAddContainer = styled.div`
  padding: 1em 0px;
  display: flex;
  flex-direction: column;

  @media (min-width: 700px) {
    flex-direction: row;
    justify-content: space-around;
    column-gap: 2.0em;
    padding: 1em 0 1em 0;
  }
`;

const AddRevButton = styled(Button)`
  flex: 1;
`;

const ReviewTilesContainer = styled.div`
  @media (max-width: 600px) {
    border-top: black solid 1px;
  }

  @media (min-width: 600px) {
    max-height: 31em;
    overflow: auto;
  }
`;
