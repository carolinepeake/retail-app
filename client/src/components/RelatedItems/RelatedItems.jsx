import React from 'react';
import styled from 'styled-components';
import CardsList8 from './RelatedList/CardsList8';
import OutfitList from './OutfitList/OutfitList';
import OutfitList2 from './OutfitList/OutfitList2';
import SectionHeader from '../reusable/SectionHeader';
import { useGlobalContext } from '../../contexts/GlobalStore';

function RelatedItems() {
  const {
    productList,
  } = useGlobalContext();

  return (
    <Container id="related-items">
      <Text>
        Related Items
      </Text>
      {productList.length > 0 && (
      <CardsList8 />)}
      <Text second>
        Outfit List
      </Text>
      {/* <OutfitList /> */}
      <OutfitList2 />
    </Container>
  );
}

const Container = styled.div`
  @media (max-width: 600px) {
    padding-top: 5%;
  };
`;

const Text = styled(SectionHeader)`
  text-align:left;
  margin-left: 5%;
  margin-right: 5%;
`;

export default RelatedItems;
