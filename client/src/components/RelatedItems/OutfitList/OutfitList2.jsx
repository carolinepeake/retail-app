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

  function fillEmpty() {
    const emptyCells = [];
    for (let i = 0; i < (3 - outfits.length); i += 1) {
      emptyCells.push(<EmptyOutfit key={i} />);
    }
    return emptyCells;
  }

  return (
    <Container>
      {/* <LeftBox> */}
      {/* {(outfitIndex !== 0 && outfits.length >= 3) */}
      {/* // ? <LeftButton /> : ( */}
      {/* &&  <LeftButton onClick={() => clickLeft()}> &lt; </LeftButton>} */}
      {/* // )} */}
      {/* </LeftBox> */}
      <StyleList>
        {/* {(outfitIndex !== 0 && outfits.length >= 3)
          && <LeftButton onClick={() => clickLeft()}> &lt; </LeftButton>} */}
        {outfits.map((outfit, i) => <Outfit outfit={outfit} key={i} index={i} />)}
        {(outfits.length <= 3 || (outfits.length >= 3 && (outfits.length - outfitIndex === 2 || outfits.length - outfitIndex === 3)))
         && <AddOutfit /> }
        {/* {(outfitIndex !== outfits.length - 2 && outfits.length >= 3)
          && <RightButton onClick={() => clickRight()}> &gt; </RightButton>} */}
      </StyleList>
      {/* <RightBox> */}
      {/* {/* {((outfits.length >= 4 && outfitIndex === outfits.length - 4) || (outfitIndex === 0 && outfits.length > 3))
          ? <RightButton onClick={() => clickRight()}> &gt; </RightButton>
          : <RightButton /> } */}
      {/* </RightBox> */}
    </Container>
  );
}

const Container = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  height: 100%;
  width: 100%;
  padding: 0;
  overflow-x: scroll;
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

const LeftBox = styled.div`
  display: flex;
  justify-content: flex-end;
  float: left;
  align-items: center;
  flex-grow: 1;
`;

const RightBox = styled.div`
  display: flex;
  float: left;
  align-items: center;
  flex-grow: 1;
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

const EmptyOutfit = styled.div`
  border: black solid medium transparent;
  width: 100%;
  height: 100%
`;

// const EmptyOutfit = styled.div`
//   width: 225px;
//   height: 225px;
//   border: black solid medium transparent;
// `;

// const EmptyOutfit = styled.div`
//   width: 225px;
//   height: 225px;
//   border: 15px solid transparent;
// `;

export default OutfitList2;
