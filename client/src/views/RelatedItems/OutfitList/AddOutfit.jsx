import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button } from '../../../components/Buttons';

// TODO: make outfits array only contain ids
// and prevent duplication by checking if (outfits.includes(productId))

function AddOutfit({
  handleAddOutfit,
  length,
}) {
  console.log('[AddOutfit] is running');

  return (
    <Outline length={length}>
      <AddOutfitButton
        type="button"
        onClick={handleAddOutfit}
      >
        +
        <Text>Add Outfit</Text>
      </AddOutfitButton>
    </Outline>
  );
}

AddOutfit.propTypes = {
  handleAddOutfit: PropTypes.func.isRequired,
};

const Outline = styled.div`
  justify-self: stretch;
  width: 100%;
  width: calc(100% / ${(props) => props.length});
  height: 100%;
  display: flex;
  padding-right: 2.5vw;
  padding-left: 2.5vw;
  /* height: 100%;
  aspect-ratio: 4/6; */
  @media (min-width: 900px) {
    padding-right: 1.25vw;
    padding-left: 1.25vw;
  };
`;

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
