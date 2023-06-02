/* eslint-disable no-unneeded-ternary */
import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import CardStars from '../RelatedList/CardStars';
import { useGlobalContext } from '../../../contexts/GlobalStore';

function Outfit({ outfit, index }) {
  const {
    outfits, setOutfits, outfitIndex,
  } = useGlobalContext();
  const outfitImage = outfit.image.data.results[0].photos[0].thumbnail_url;
  const outfitDetails = outfit.details.data;
  const outfitStars = outfit.stars.data;
  const defaultImage = 'https://www.escapeauthority.com/wp-content/uploads/2116/11/No-image-found.jpg';

  function removeOutfit() {
    // Note: Need to use below syntax for component to re-render properly
    const tempArray = [...outfits];
    tempArray.splice(index, 1);
    setOutfits(tempArray);
  }

  return (
    <OutfitContainer i={index} outfitIndex={outfitIndex}>
      <Outline>
        <ImageOutline>
          <Image src={outfitImage ? outfitImage : defaultImage} />
          <Button onClick={() => removeOutfit()}><AiOutlineCloseCircle /></Button>
        </ImageOutline>
        <Info style={{ paddingTop: '0.1em' }}>{outfitDetails.category}</Info>
        <Info name style={{ paddingTop: '0.05em' }}>{outfitDetails.name}</Info>
        <Info style={{ padding: '0.25em' }}>
          $
          {outfitDetails.default_price}
        </Info>
        <CardStars reviewID={outfitStars} />
      </Outline>
    </OutfitContainer>
  );
}

Outfit.propTypes = {
  outfit: PropTypes.shape({
    image: PropTypes.shape({
      data: PropTypes.shape({
        results: PropTypes.arrayOf(PropTypes.shape({
          photos: PropTypes.arrayOf(PropTypes.shape({
            thumbnail_url: PropTypes.string,
          })),
        })),
      }),
    }),
    details: PropTypes.shape({
      data: PropTypes.shape({
        name: PropTypes.string,
        category: PropTypes.string,
        default_price: PropTypes.string,
      }),

    }),
  }).isRequired,
  index: PropTypes.number.isRequired,
};

// const Outline = styled.div`
//   display: flex;
//   flex-direction: column;
//   &:hover {
//     opacity: 0.80;
//   }
//   border: black solid medium transparent;
//   margin-top: 0.5rem;
// `;

const OutfitContainer = styled.li`
  min-width: 220px;
  position: relative;
  background-color: ${(props) => props.theme.backgroundColor};
  aspect-ratio: 4/6;
`;
// mask-image: ${(props) => (props.i === 3 ? 'linear-gradient(to right, rgba(0,0,0,1), 40%, rgba(0,0,0,0) 80%)' : ' ')};
// const OutfitContainer = styled.div`
//   grid-column: ${(props) => props.i};
//   align-self: center;
//   background-color: ${(props) => props.theme.backgroundColor};
// `;

const Outline = styled.div`
  &:hover {
    opacity: 0.80;
  }
  border: black solid medium transparent;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border: lightgrey solid thin;
`;

const ImageOutline = styled.div`
  position: relative;
  overflow: hidden;
  object-fit: cover;
  width: 100%;
`;

const Info = styled.div`
  display: inline-block;
  padding-left: 0.25em;
  margin-right: auto;
  font-size: ${(props) => props.theme.cardText};
  ${(props) => props.name && css`
    font-size: ${props.theme.cardTitle};
    font-weight: 500;
  `};
`;

const Image = styled.img`
  display: block;
  // margin-left: auto;
  // margin-right: auto;
  width: 220px;
  aspect-ratio: 4/5;
  object-fit: cover;
  cursor: pointer;
  overflow: hidden;
`;
// width: 100%;

const Button = styled.button`
  display: block;
  position: absolute;
  top: 0px;
  right: 0px;
  color: black;
  background-color: transparent;
  border: none;
  padding: calc(5px + 0.5vw);
  font-size: calc(15px + 1.5vw);
  &:hover {
    background-color: trasparent;
    opacity: 0.80;
  }
  cursor: pointer;
`;

export default Outfit;
