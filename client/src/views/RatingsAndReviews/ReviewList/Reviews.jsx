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
import { capitalizeFirstLetter } from '../../../utils/getFormat';
import { SORT_OPTIONS } from '../../../constants/constants';
import ListTotalCount from '../../../components/LargeList/ListTotalCount';
import StyledSelect from '../../../components/StyledSelect';

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
  const ref1 = useRef(null);

  const scrollToListTop = () => {
    listRef.current.scrollTo({
      behavior: 'smooth',
      top: '-6rem',
    });
    ref1.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const [showModal, toggleModal] = useModal();

  const handleAddRev = () => {
    toggleModal();
  };

  const handleSelectSortValue = (newValue) => {
    setSortOrder(newValue);
    setPageNum(1);
  };

  const getDropdownLabel = (value) => {
    const sortValue = value || 'relevant';
    const formattedValue = capitalizeFirstLetter(sortValue);
    const dropdownLabel = `Sort by ${formattedValue}`;
    return dropdownLabel;
  };

  return (
    <Container>

      {/* {reviews.length > 0
      && (
        <SortList
          itemsPerPage={itemsPerPage}
          listLength={visibleReviews.length}
          pageNum={pageNum}
          setPageNum={setPageNum}
          ref={ref}
        />
      )} */}

      {reviews.length > 0
      && (
        <RevListHeader ref={ref1}>
          <ListTotalCount
            pageNum={pageNum}
            itemsPerPage={itemsPerPage}
            listLength={visibleReviews.length}
            itemText="Reviews"
          />
          <StyledSelect
            initialValue="relevant"
            options={SORT_OPTIONS}
            getLabel={getDropdownLabel}
            handleSelect={handleSelectSortValue}
          />
        </RevListHeader>
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

  @media (min-width: 400px) {
    flex-direction: row;
    margin-left: 1em;
  }

  @media (min-width 600px) {
    margin-inline-end: 1em;
  }
`;

const MoreAddContainer = styled.div`
  padding: 1em 0px;
  display: flex;
  flex-direction: column;

  @media (min-width: 700px) {
    flex-direction: row;
   /* justify-content: space-around; */
    column-gap: 2.0em;
   /* padding: 1em 0 1em 0; */
  }
`;

const AddRevButton = styled(Button)`
  flex: 1;
`;

const ReviewTilesContainer = styled.div`
 /* @media (max-width: 600px) {
    border-top: ${(props) => props.theme.lightBorder};
  } */

 /* @media (min-width: 600px) {
    max-height: 31em;
    overflow: auto;
  } */
`;
