import React, { useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../contexts/GlobalStore';
import CardsList from './RelatedList/CardsList';
import OutfitList from './OutfitList/OutfitList';
import SectionHeader from '../../components/SectionHeader';
import AddOutfit from './OutfitList/AddOutfit';

function RelatedItems() {
  console.log('[RelatedItems] is running');
  const {
    productList, productID, productInfo, revMeta, selectedStyle,
  } = useGlobalContext();

  const [outfits, setOutfits] = useState([]);

  const handleAddOutfit = () => {
    for (let i = 0; i < outfits.length; i += 1) {
      if (outfits[i].productID === productID) {
        return;
      }
    }

    // const scrollAfterAdding = () => {
    //   const updatedTransform = -100 / (outfits.length + 1);
    //   setTranslate(updatedTransform);
    //   setIndex((prev) => prev + 1);
    // };
    // scrollAfterAdding();

    const outfit = {
      productID,
      productInfo,
      revMeta,
      selectedStyle,
    };
    setOutfits((prev) => [...prev, outfit]);
  };

  return (
    <Container id="related-items">
      {productList.length > 0
      && (
        <OverflowContainer>
          <Text>
            Related Items
          </Text>
          <CardsList productList={productList} />
        </OverflowContainer>
      )}
      <FunContainer>
        {/* <Text>
          Outfit List
          Saved Items
        </Text> */}
        <Title>Outfit List</Title>
        {/* <AddOutfit
          length={outfits.length + 1}
          handleAddOutfit={handleAddOutfit}
        /> */}
        <OutfitList />
      </FunContainer>
    </Container>
  );
}

const Container = styled.div`
  padding-bottom: 5%;
  overflow: hidden;

  @media (min-width: 600px) {
    padding-bottom: 0;
  }
`;

const OverflowContainer = styled.div`
  padding-top: 5rem;
  padding-bottom: 5rem;
  overflow: hidden;
`;

const FunContainer = styled.div`
  background: ${(props) => props.theme.navBgColor};
  padding-top: 5rem;
  padding-bottom: 5rem;
  margin-top: 7.5rem;
  margin-bottom: 7.5rem;
  overflow: hidden;
`;

const Text = styled(SectionHeader)`
  text-align:left;
  margin-left: 5%;
  margin-right: 5%;

`;

const Title = styled(SectionHeader)`
  text-align: center;
`;

export default RelatedItems;
