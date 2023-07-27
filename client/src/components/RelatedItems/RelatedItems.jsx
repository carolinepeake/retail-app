import React from 'react';
import styled from 'styled-components';
import CardsList from './RelatedList/CardsList';
import OutfitList from './OutfitList/OutfitList';
import SectionHeader from '../reusable/SectionHeader';

function RelatedItems() {
  console.log('[RelatedItems] is running');
  return (
    <Container id="related-items">
      <Text>
        Related Items
      </Text>
      <CardsList />
      <Text second>
        Outfit List
      </Text>
      <OutfitList />
    </Container>
  );
}

const Container = styled.div`
  padding-bottom: 5%;

  @media (min-width: 600px) {
    padding-bottom: 0;
  }
`;

const Text = styled(SectionHeader)`
  text-align:left;
  margin-left: 5%;
  margin-right: 5%;
`;

export default RelatedItems;
