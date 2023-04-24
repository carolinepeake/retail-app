import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useGlobalContext } from '../../contexts/GlobalStore';
import SortList from './ReviewList/SortList';
import ReviewTile from './ReviewList/ReviewTile';
import MoreRevs from './ReviewList/MoreRevs';
import AddRev from './AddRev/AddRev';
import Breakdown from './Breakdown/Breakdown';
import SectionHeading from '../reusable/SectionHeading';

// need to change how i get reviews. Just get all at once, then slice.
// if need to change the filter, just make new get request

function RatingsAndReviews() {
  const {
    productID, productInfo, reviews, setReviews, revMeta, setRevMeta
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
      <RRTitle>
        Ratings & Reviews
      </RRTitle>
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
};

export default RatingsAndReviews;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1em 1fr;
  background: ;

  @media (max-width: 600px) {
    padding-left: 5%;
    padding-right: 5%;
    padding-top: 5%;
  }

  @media (min-width: 600px) {
    margin-top: 1.5rem;
    padding: 0 2.5% 1.5rem 2.5%
  }
`;

const RRTitle = styled(SectionHeading)`
  grid-column: 1/4;
  grid-row: 1;
  padding-right: 5%;
`;

const ReviewListContainer = styled.div`
  grid-column: 2/4;
`;

// const ReviewListContainer = styled.div`
//   padding: 1em;
//   background: ;
//   width: 80%;
//   grid-column: 3/5;
// `;

const ReviewTilesContainer = styled.div`
  padding-left: 1em;
  background: ;
  max-height: 31em;
  overflow: auto;
`;

const MoreAddContainer = styled.div`
  padding: 1em;
  display: flex;
  justify-content: space-evenly;
`;
  // width: 20em;
  // margin-left: 15%;
  // justify-content: space-around;

const BreakdownContainer = styled.div`
  max-width: 400px;
  margin-top: 0.5rem;

  @media (max-width: 600px) {
    margin 0 auto;
    padding: 0 5%;
  }

  @media (min-width: 600px) {
    grid-column: 1/2;
    grid-row: 2;
    padding-right: 2.5%;
  }
`;

// const BreakdownContainer = styled.div`
//   padding: 1em;
//   background: ;
//   grid-column: 2/3;
// `;


//better organize axios requests
// refactor related axios requests to make DRYier
//make stars a higher order component
// possibly make carasouel a higher order  component