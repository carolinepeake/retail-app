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
  grid-column: 2/3;
  grid-row: 3/4;
  display: grid;
  grid-template-columns: 10% repeat(3, 4fr) 3fr 10%;
  grid-template-rows: 1em 1fr 1.5em 1em 1fr;
  column-gap: 1em;
`;

const Text1 = styled.div`
  font-size: 1.0rem;
  text-align:left;
  grid-row: 1/2;
  grid-column: 2/4;
`;

// const Text1 = styled.div`
//   font-size: large;
//   font-weight: bold;
//   border-radius: 10px;
//   text-align:left;
//   grid-row: 1/2;
// `;

const Text2 = styled.div`
  font-size: 1.0rem;
  text-align:left;
  grid-row: 4/5;
  grid-column: 2/4;
`;
const CardList = styled.div`
  grid-column: 2/6;
  column-gap: 10%;
  grid-row: 2/3;
  display: contents;


`;

// const CardList = styled.div`
//   grid-column: 2/12;
//   column-gap: 10%
// `;



export default RelatedItems;
