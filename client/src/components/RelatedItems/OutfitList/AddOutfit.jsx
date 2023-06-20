import React from 'react';
import styled from 'styled-components';
import Button from '../../reusable/Button';
import { useGlobalContext } from '../../../contexts/GlobalStore';

function AddOutfit() {
  const {
    productID, outfits, setOutfits, currOutfit, setOutfitIndex, outfitIndex
  } = useGlobalContext();

  const add = async () => {
    for (let i = 0; i < outfits.length; i += 1) {
      if (outfits[i].details.data.id === productID) {
        return;
      }
    }
    const newOutfit = currOutfit;
    const tempArray = [...outfits, newOutfit];
    await setOutfits(tempArray);
  };

  return (
    <Outline outfitIndex={outfitIndex} outfits={outfits}>
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
