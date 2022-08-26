import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useGlobalContext } from '../../contexts/GlobalStore';
import SortList from './ReviewList/SortList';
import ReviewTile from './ReviewList/ReviewTile';
import MoreRevs from './ReviewList/MoreRevs';
import AddRev from './AddRev/AddRev';
import Breakdown from './Breakdown/Breakdown';

// need to change how i get reviews. Just get all at once, then slice.
// if need to change the filter, just make new get request

function RatingsAndReviews() {
  const {
    productID, productInfo, reviews, setReviews, revMeta, setRevMeta,
  } = useGlobalContext();
  const [sortOrder, setSortOrder] = useState('relevant');
  const [revCount, setRevCount] = useState(2);
  const [filteredRevs, setFilteredRevs] = useState(reviews);

  const getReviews = function getReviews() {
    axios.get('/reviews', {
      params: {
        product_id: productID,
        count: 100,
        sort: sortOrder,
      },
    })
      .then((result) => {
        /* console.log('Value of reviews after RatingsAndReviews()
        axios get request:\n', result.data.results); */
        setReviews(result.data.results);
        setFilteredRevs(result.data.results);
      })
      .then(() => {})
      .catch((err) => {
        console.log('Error in axios get request in client function RatingsAndRevies():\n', err);
      });
  };

  const getMetaData = function getMetaData() {
    axios.get('/reviews/meta', {
      params: {
        product_id: productID,
      },
    })
      .then((result) => {
        // console.log('review meta data returned:\n', result.data);
        setRevMeta(result.data);
      })
      .catch((err) => {
        console.log('error in getMetaData() function inside Breakdown.jsx:/n', err);
      });
  };

  useEffect(() => {
    getReviews();
    getMetaData();
    setSortOrder('relevant');
    setRevCount(2);
  }, [productID]);

  useEffect(() => {
    getReviews();
    getMetaData();
  }, [sortOrder]);

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

  return (
    <Container id="ratings-and-reviews">
      <BreakdownContainer>
        <Breakdown
          productID={productID}
          productInfo={productInfo}
          revMeta={revMeta}
          filterReviews={(test) => filterReviews(test)}
        />
      </BreakdownContainer>
      <ReviewListContainer>

        <SortList
          productID={productID}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          revCount={revCount}
          filteredRevsLength={filteredRevs.length}
        />

        <ReviewTilesContainer>
          {filteredRevs.slice(0, revCount).map((review) => (
            <ReviewTile key={review.review_id} review={review} />
          ))}
        </ReviewTilesContainer>

        <MoreAddContainer>
          {
            reviews.length >= 2
            && (
              <MoreRevs
                productID={productID}
                setRevCount={setRevCount}
                revListLength={filteredRevs.length}
              />
            )
          }
          <AddRev revMeta={revMeta} productID={productID} productInfo={productInfo} />
        </MoreAddContainer>
      </ReviewListContainer>
    </Container>
  );
}

export default RatingsAndReviews;

const Container = styled.div`
  display: flex;
  padding-left: 5%;
  padding-right: 5%;
  background: ;
  margin-top: 20px;
  grid-column: 2/12;
`;

const ReviewListContainer = styled.div`
  padding: 1em;
  background: ;
  width: 80%;
`;

const ReviewTilesContainer = styled.div`
  padding: 1em;
  background: ;
  max-height: 31em;
  overflow: auto;
`;

const MoreAddContainer = styled.div`
  padding: 1em;
  display: flex;
  width: 20em;
  justify-content: space-around;
  margin-left: 20px;
`;

const BreakdownContainer = styled.div`
  padding: 1em;
  background: ;
  width: 20%;
`;
