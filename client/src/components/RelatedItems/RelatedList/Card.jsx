import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { useGlobalContext } from '../../../contexts/GlobalStore';
import StarButton from './StarButton';
import CardImage from './CardImage';
import CardStars from './CardStars';

function Card({
  data,
  i,
  // cardWidth, numberOfCards, card
  index,
  length,
}) {
  const {
    setProductID, setCardIndex, cardIndex, outfitIndex,
  } = useGlobalContext();
  const [info, setInfo] = useState(data);

  useEffect(() => {
    setInfo(data);
  }, [data]);

  function changeItem() {
    setProductID(data.details.data.id);
    // Reset card index when clicking on new item
    setCardIndex(0);
  }

  const numVisible = 4;

  return (
    <CardContainer
      i={i}
      numVisible={numVisible}
    // cardWidth={cardWidth} numberOfCards={numberOfCards} card={card}
      index={index}
      className="carousel-card"
    >
      { info.details
        ? (
          <CardStyle onClick={() => changeItem()} i={i} outfitIndex={outfitIndex}>
            <StarButton details={info.details} />
            <CardImage imageInfo={info.image.data} />
            <Text>
              <Cards style={{ paddingTop: '0.1em' }}>{info.details.data.category}</Cards>
              <Cards name style={{ paddingTop: '0.05em' }}>{info.details.data.name}</Cards>
              <Cards style={{ padding: '0.25em' }}>
                $
                {info.details.data.default_price}
              </Cards>
            </Text>
            <CardStars reviewID={info.stars.data} />
          </CardStyle>
        )
        : <div /> }
    </CardContainer>
  );
}

Card.propTypes = {
  data: PropTypes.shape({
    details: PropTypes.shape({
      data: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        category: PropTypes.string,
        default_price: PropTypes.string,
      }),
    }),
  }).isRequired,
};

const CardContainer = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.backgroundColor};
  margin: 0 auto;
  width: 100%;
  height: 100%;
`;
// aspect-ratio: 4/6;

// width: 220px;
// flex-shrink: 0;
// padding-right: ${(props) => (props.cardWidth / 5)}px;
// width: ${(props) => props.card}px;
// width: ${(props) => props.cardWidth}px;
// &&:nth-child(n) {
//   ${(props) => (((props.index + 1) % props.numberOfCards === 0) && css`
//     padding-right: 0;
//     width: ${props.actualCardWidth - (props.cardWidth / 5)}px;
//   `)};
// width: ${props.actualCardWidth - (props.cardWidth / 5)}px;
// ${(props) => (((props.index + 1) % props.numberOfCards === 0) && css`
//     padding-right: 0;
//   `)};
// padding-right: 1em;
// width: 220px;
//   @media (min-width: 1032px) {
//     width: 240px;
//   };

// width: 90vw;
// &&:last-of-type {
//   margin-right: 0;
// };
// &&:${(props) => props.numVisible}-of-type {
//   margin-right: 0;
// };
// @media (min-width: 400px) {
//   width: calc(95vw / 2 - 1em);
//   margin-right: 1em;
//   margin-left: 0;
// };
// @media (min-width: 800px) {
//   width: calc(95vw / 3 - 2em);
//   margin-right: 2em;
// }
// @media (min-width: 1032px) {
//   width: calc(95vw / 4 - 3em);
// };

const CardStyle = styled.div`
  display: flex;
  flex-direction: column;
  border: black solid medium transparent;
  border: lightgrey solid thin;
  justify-content: flex-end;
  height: 100%;
  position: relative;
`;
// box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

// mask-image: ${(props) => (props.i === 3 ?
// 'linear-gradient(to right, rgba(0,0,0,1), 40%, rgba(0,0,0,0) 80%)' : ' ')};
// mask-image: ${(props) => (props.i === 0 ?
// 'linear-gradient(to left, rgba(0,0,0,1), 40%, rgba(0,0,0,0) 80%)' : ' ')};
// mask-image: ${(props) => (props.i === 3 ?
// 'linear-gradient(to right, rgba(0,0,0,1), 40%, rgba(0,0,0,0) 80%)' : ' ')};

const Cards = styled.div`
  margin-right: auto;
  font-size: ${(props) => props.theme.tertiary};
  padding-left: 0.25em;
  ${(props) => props.name && css`
    font-size: ${props.theme.body};
    font-weight: 500;
  `};
`;
// font-size: ${props.theme.cardTitle};
// font-size: ${(props) => props.theme.cardText};
// font-size: 1.0rem;
// padding-left: 0.25rem;
// ${props => props.name && css`
// font-size: 1.25rem;
// fontWeight: '500'
// `}
// margin-left: auto;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  &:hover {
    text-decoration: underline;
  }
  cursor: pointer;
  margin-top: 0.2em;
`;

export default Card;
