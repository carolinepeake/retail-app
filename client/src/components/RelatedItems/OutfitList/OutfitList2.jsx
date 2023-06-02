import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../../contexts/GlobalStore';
import Outfit from './Outfit';
import AddOutfit from './AddOutfit';

function OutfitList2() {
  const {
    outfits, setOutfits, outfitIndex, setOutfitIndex,
  } = useGlobalContext();

  useEffect(() => {
    setOutfits(outfits);
  }, [outfits, setOutfits]);

  function clickRight() {
    if (outfitIndex + 2 < outfits.length) {
      setOutfitIndex(outfitIndex + 1);
    }
  }

  function clickLeft() {
    if (outfitIndex > 0) {
      setOutfitIndex(outfitIndex - 1);
    }
  }

  return (
    <Container>
      <StyleList>
        {/* {(outfitIndex !== 0 && outfits.length >= 3)
          && <LeftButton onClick={() => clickLeft()}> &lt; </LeftButton>} */}
        {outfits.map((outfit, i) => <Outfit outfit={outfit} key={i} index={i} />)}
        {(outfits.length <= 3 || (outfits.length >= 3 && (outfits.length - outfitIndex === 2 || outfits.length - outfitIndex === 3)))
         && <AddOutfit /> }
        {/* {(outfitIndex !== outfits.length - 2 && outfits.length >= 3)
          && <RightButton onClick={() => clickRight()}> &gt; </RightButton>} */}
      </StyleList>
    </Container>
  );
}

const Container = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  height: 100%;
  padding: 0;
  overflow-x: auto;
  scrollbar-width: 0px;
  --slide-count: 1;
  @media (min-width: 600) {
    --slide-count: 2;
  };
  @media (min-width: 900) {
    --slide-count: 3;
  };
  @media (min-width: 1200) {
    --slide-count: 4;
  };
  @media (min-width: 1500) {
    --slide-count: 5;
  };
  margin-left: 5%;
  margin-right: 5%;
`;
// height: 400px;
// width: 235px;
// align-items: center;

// const StyleCardList = styled.div`
//   display: flex;
//   float: left;
//   positive: relative;
//   flex-direction: row;
//   margin-left: auto;
//   margin-right: auto;
//   align-content: space-evenly;
//   grid-row: 2/3;
//   grid-column: 2/6;
// `;

const StyleList = styled.ul`
  display: flex;
  width: calc(100% * var(--slide-count));
  column-gap: 1em;
  list-style-type: none;
  padding-inline-start: 0px;

  @media (min-width: 600px) {
    column-gap: 2em;
  };
`;

const LeftButton = styled.button`
  align-self: center;
  position: absolute;
  font-width: bold;
  font-size: calc(15px + 1.5vw);
  background-color: transparent;
  border: none;
  &:hover {
    background-color: rgba(114, 114, 114, 0.5);
    color: white;
  }
  color: ${(props) => props.theme.fontColor};
  cursor: pointer;
  z-index: 1;
  grid-column: 1;
  grid-row: 2;
  padding: 0 0;
  height: calc(15px + 1.5vw);
`;

// const LeftButton = styled.button`
//   display: flex;
//   align-self: center;
//   position: absolute;
//   font-width: bold;
//   font-size: 2.5rem;
//   background-color: transparent;
//   border: none;
//   &:hover {
//     opacity: 0.60;
//   }
//   color: ${(props) => props.theme.fontColor};
//   cursor: pointer;
// `;

const RightButton = styled.button`
  align-self: center;
  position: absolute;
  font-width: bold;
  font-size: calc(15px + 1.5vw);
  background-color: transparent;
  border: none;
  &:hover {
    background-color: rgba(114, 114, 114, 0.5);
    color: white;
  }
  color: ${(props) => props.theme.fontColor};
  cursor: pointer;
  z-index: 1;
  grid-column: 2;
  grid-row: 1;
  right: 5%;
  padding: 0 0;
  height: calc(15px + 1.5vw);
`;

// const RightButton = styled.button`
//   display: flex;
//   align-self: center;
//   position: absolute;
//   font-width: bold;
//   font-size: 2.5rem;
//   background-color: transparent;
//   border: none;
//   &:hover {
//     opacity: 0.60;
//   }
//   color: ${(props) => props.theme.fontColor};
//   cursor: pointer;
// `;

export default OutfitList2;
