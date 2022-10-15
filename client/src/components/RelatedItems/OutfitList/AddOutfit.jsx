import React from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../../contexts/GlobalStore';

function AddOutfit() {
  const {
    productID, outfits, setOutfits, currOutfit, setOutfitIndex, outfitIndex
  } = useGlobalContext();

  const add = async() => {
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
      <Button onClick={() => add()}>
        +
        <Text>Add Outfit</Text>
      </Button>
    </Outline>
  );
}

const Outline = styled.div`
  grid-row: 1/3;
  min-width: 100%;
  min-height: 100%;
  display: flex;
  mask-image: ${props => props.outfitIndex === props.outfits.length - 3 ? "linear-gradient(to right, rgba(0,0,0,1), 40%, rgba(0,0,0,0) 80%)" : " " };
`;

const Button = styled.button`
  min-width: 100%;
  aspect-ratio: 1;
  border-radius: 10px;
  cursor: pointer;
  padding: calc(8px + 0.5vw);
  align-self:center;
  font-size: calc(8px + 1vw);
`;

//grid-column: 3/5;
//font-size: 2rem;

// const Button = styled.button`
//   width: 225px;
//   height: 225px;
//   font-size: 60px;
//   font-width: bold;
//   border-radius: 10px;
//   cursor: pointer;
// `;

const Text = styled.div`
  font-size: 1.5rem;
  align-text: left;
`;

export default AddOutfit;
