import React from 'react';
import styled from 'styled-components';
import Button from '../../reusable/Button';
import { useGlobalContext } from '../../../contexts/GlobalStore';
import { calcAverageRating } from '../../utils/useAverageRating';

function AddOutfit() {
  const {
    productID, productInfo, revMeta, selectedStyle, outfits, setOutfits,
  } = useGlobalContext();

  // will want to make outfits array of productIds only, eventually
  // if (outfits.includes(productId))
  const add = async () => {
    for (let i = 0; i < outfits.length; i += 1) {
      if (outfits[i].id === productID) {
        return;
      }
    }

    const outfit = {
      id: productID,
      name: productInfo.name,
      category: productInfo.category,
      price: productInfo.default_price,
      rating: calcAverageRating(revMeta.ratings),
      photo: selectedStyle.photos[0].thumbnail_url,
    };
    const tempArray = [...outfits, outfit];
    await setOutfits(tempArray);
  };

  return (
    <Outline outfits={outfits}>
      <AddOutfitButton onClick={() => add()}>
        +
        <Text>Add Outfit</Text>
      </AddOutfitButton>
    </Outline>
  );
}

const Outline = styled.div`
  justify-self: stretch;
  aspect-ratio: 4/6;
  min-width: 220px;
  height: 100%;
  display: flex;
`;
// mask-image: ${props => props.outfitIndex === props.outfits.length - 3 ? "linear-gradient(to right, rgba(0,0,0,1), 40%, rgba(0,0,0,0) 80%)" : " " };

const AddOutfitButton = styled(Button)`
  min-width: 100%;
  padding: calc(8px + 0.5vw);
  align-self: flex-start;
  font-size: calc(8px + 1vw);
  aspect-ratio: 4/6;
`;

const Text = styled.div`
  font-size: 1.5rem;
  align-text: left;
`;

export default AddOutfit;
