import React from 'react';
import styled from 'styled-components';
import CardsList from './RelatedList/CardsList';
import OutfitList from './OutfitList/OutfitList';

function RelatedItems() {
  return (
      <Container id="related-items">
        <Text1>
          Related Items
        </Text1>
        <CardsList />
        <Text2>
          Outfit List
        </Text2>
        <OutfitList />
      </Container>
  );
}

const Container = styled.div`
  grid-column: 2/4;
  grid-row: 3/4;
  display: grid;
  grid-template-columns: repeat(3, 4fr 1rem) 3fr 5% 5%;
  grid-template-rows: 1em 1fr 1.5em 1em 1fr;
`;

const Text1 = styled.div`
  text-align:left;
  grid-row: 1/2;
  grid-column: 1/8;
`;

// const Text1 = styled.div`
//   font-size: large;
//   font-weight: bold;
//   border-radius: 10px;
//   text-align:left;
//   grid-row: 1/2;
// `;

const Text2 = styled.div`
  text-align:left;
  grid-row: 4/5;
  grid-column: 1/8;
`;


// const CardList = styled.div`
//   grid-column: 2/6;
//   column-gap: 10%;
//   grid-row: 2/3;
//   display: flex;
// `;

// const CardList = styled.div`
//   grid-column: 2/12;
//   column-gap: 10%
// `;



export default RelatedItems;
