import React, { useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../contexts/GlobalStore';
import Reviews from './ReviewList/Reviews';
import Ratings from './Breakdown/Ratings';
import SectionHeader from '../../components/SectionHeader';

function RatingsAndReviews() {
  console.log('[RatingsAndReviews] is running');
  const {
    reviews,
  } = useGlobalContext();

  const [ratingsFilter, setRatingsFilter] = useState([]);

  return (
    <SectionContainer id="ratings-and-reviews">

      <SectionHeader>
        Ratings & Reviews
      </SectionHeader>

      <LayoutContainer>

        <Ratings
          ratingsFilter={ratingsFilter}
          setRatingsFilter={setRatingsFilter}
        />

        <Reviews
          reviews={reviews}
          ratingsFilter={ratingsFilter}
          setRatingsFilter={setRatingsFilter}
        />

      </LayoutContainer>

    </SectionContainer>
  );
}

export default RatingsAndReviews;

const SectionContainer = styled.div`
  padding-left: 5%;
  padding-right: 5%;
  padding-bottom: 1.5em;
  padding-bottom: 5%;
  position: relative;

  @media (min-width: 600px) {
    padding-bottom: 0;
    margin-bottom: 5em;
  }
`;

// do I want font size to be 1rem or 0.83rem / em?
const LayoutContainer = styled.div`
  @media (min-width: 600px) {
    display: flex;
    flex-direction: row;
    gap: 2.5%;
    font-size: 0.875em;
  }

  @media (min-width: 700px) {
    font-size: 1em;
  }
`;
