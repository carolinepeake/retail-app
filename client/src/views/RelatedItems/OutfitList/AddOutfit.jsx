import React from 'react';
import styled from 'styled-components';
import { Button } from '../../../components/Button';
import { useGlobalContext } from '../../../contexts/GlobalStore';
import { calcAverageRating } from '../../../utils/useAverageRating';

function AddOutfit({ setIndex }) {
  console.log('[AddOutfit] is running');
  const {
    productID, productInfo, revMeta, selectedStyle, outfits, setOutfits,
  } = useGlobalContext();

  // will want to make outfits array of productIds only, eventually
  // if (outfits.includes(productId))
  const add = () => {
    for (let i = 0; i < outfits.length; i += 1) {
      if (outfits[i].id === productID) {
        return;
      }
    }

    // const outfit = {
    //   id: productID,
    //   name: productInfo.name,
    //   category: productInfo.category,
    //   price: productInfo.default_price,
    //   rating: calcAverageRating(revMeta.ratings),
    //   photo: selectedStyle.photos[0].thumbnail_url,
    // };
    const outfit = {
      productID,
      productInfo,
      revMeta,
      selectedStyle,
    };
    const tempArray = [...outfits, outfit];
    setOutfits(tempArray);
    setIndex((prev) => prev + 1);
  };

  return (
    <Outline>
      <AddOutfitButton onClick={() => add()}>
        +
        <Text>Add Outfit</Text>
      </AddOutfitButton>
    </Outline>
  );
}

const Outline = styled.div`
  justify-self: stretch;
  width: 100%;
  height: 100%;
  display: flex;
`;
// mask-image: ${props => props.outfitIndex === props.outfits.length - 3 ? "linear-gradient(to right, rgba(0,0,0,1), 40%, rgba(0,0,0,0) 80%)" : " " };

const AddOutfitButton = styled(Button)`
  min-width: 100%;
  padding: calc(8px + 0.5vw);
  align-self: flex-start;
  font-size: calc(8px + 1vw);
  margin: 0;
  height: 100%;
  background-color: ${(props) => props.theme.navBgColor};
  color: ${(props) => props.theme.fontColor};
`;

const Text = styled.div`
  font-size: 1.5rem;
  align-text: left;
`;

export default AddOutfit;
