/* eslint-disable no-unneeded-ternary */
import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import Stars from '../RelatedList/Stars';
import CardImage from '../RelatedList/CardImage';
import { useGlobalContext } from '../../../contexts/GlobalStore';
import { StyledExitButton } from '../../reusable/Button';

function Outfit({ outfit, index, setIndex, i }) {
  const {
    outfits, setOutfits,
  } = useGlobalContext();
  const outfitImage = outfit.photo;

  function removeOutfit() {
    if (index === outfits.length) {
      setIndex((prev) => prev - 1);
    }
    // Note: Need to use below syntax for component to re-render properly
    const tempArray = [...outfits];
    tempArray.splice(i, 1);
    setOutfits(tempArray);
  }

  return (
    <OutfitContainer>
      <Outline>
        {/* <Button onClick={() => removeOutfit()}><AiOutlineCloseCircle /></Button> */}
        <Close
          type="button"
          onClick={() => removeOutfit()}
        >
          &#10005;
        </Close>
        <CardImage
          imageUrl={outfitImage}
        />
        <Text>
          <Info category>
            {outfit.category}
          </Info>
          <Info productName>
            {outfit.name}
          </Info>
          <Info price>
            $
            {outfit.price}
          </Info>
        </Text>
        <Stars rating={outfit.rating} />
      </Outline>
    </OutfitContainer>
  );
}

// Outfit.propTypes = {
//   outfit: PropTypes.shape({
//     image: PropTypes.shape({
//       data: PropTypes.shape({
//         results: PropTypes.arrayOf(PropTypes.shape({
//           photos: PropTypes.arrayOf(PropTypes.shape({
//             thumbnail_url: PropTypes.string,
//           })),
//         })),
//       }),
//     }),
//     details: PropTypes.shape({
//       data: PropTypes.shape({
//         name: PropTypes.string,
//         category: PropTypes.string,
//         default_price: PropTypes.string,
//       }),

//     }),
//   }).isRequired,
//   index: PropTypes.number.isRequired,
// };

const OutfitContainer = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.backgroundColor};
  margin: 0 auto;
  width: 100%;
  height: 100%;
`;

const Outline = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: lightgrey solid thin;
  justify-content: flex-end;
  height: 100%;
  position: relative;
`;
// box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
// &:hover {
//   opacity: 0.80;
// }

const Info = styled.div`
  margin-right: auto;
  font-size: ${(props) => props.theme.tertiary};
  paddingTop: ${(props) => (props.category ? '0.1em' : props.productName ? '0.05em' : '')};
  padding: ${(props) => props.price && '0.25em'};
  padding-left: 0.25em;
  ${(props) => props.productName && css`
    font-size: ${props.theme.body};
    font-weight: 500;
    &:hover {
      text-decoration: underline;
    }
  `};
`;

// const Button = styled.button`
//   display: block;
//   position: absolute;
//   top: 0px;
//   right: 0px;
//   color: black;
//   background-color: transparent;
//   border: none;
//   padding: calc(5px + 0.5vw);
//   font-size: calc(15px + 1.5vw);
//   &:hover {
//     background-color: trasparent;
//     opacity: 0.80;
//   }
//   cursor: pointer;
//   z-index: 1;
// `;

const Close = styled(StyledExitButton)`
  font-size: 1em;
  top: 0.25em;
  right: 0.25em;
  opacity: 0.5;
  &:hover {
    opacity: 0.8;
  }
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  margin-top: 0.2em;
`;

export default Outfit;
