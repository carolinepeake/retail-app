import React from 'react';
import styled from 'styled-components';
import CardsList from './RelatedList/CardsList';
import OutfitList from './OutfitList/OutfitList';

function RelatedItems() {
  return (
    // <div id="related-items">
      <Container id="related-items">
        <Text>
          Related Items
        </Text>
        <CardsList />
        <Text>
          Outfit List
        </Text>
        <OutfitList />
      </Container>
    // </div>
  );
}

const Container = styled.div`
  padding-top: 20px;
  grid-column: 2/12;
`;

const Text = styled.div`
  font-size: large;
  font-weight: bold;
  // text-align: center;
  // margin-left: 20px;
  // margin-right: 20px;
  border-radius: 10px;
  grid-column: 2/12;
  text-align:left;
`;

const CardList = styled.div`
  grid-column: 2/12;
  column-gap: 10%
`;



export default RelatedItems;
