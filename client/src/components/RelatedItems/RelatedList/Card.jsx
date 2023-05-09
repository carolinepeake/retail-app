import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { useGlobalContext } from '../../../contexts/GlobalStore';
import CardImage from './CardImage';
import CardStars from './CardStars';

function Card({ data, i }) {
  const {
    setProductID, setCardIndex, cardIndex, outfitIndex
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
  return (
    <CardContainer i={i}>
      { info.details
        ? (
          <CardStyle onClick={() => changeItem()} i={i} outfitIndex={outfitIndex}>
            <CardImage imageInfo={info.image.data} details={info.details} />
            <Text>
              <Cards style={{ paddingTop: '0.1em' }}>{info.details.data.category}</Cards>
              <Cards name>{info.details.data.name}</Cards>
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
};

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

// const CardContainer = styled.div`
//   grid-column: ${(props) => props.i};
//   grid-row: 1;
//   position: relative;
//   background-color: ${(props) => props.theme.backgroundColor};
//   min-width: 235px;
// `;
// background-color: white;
// font-family: "Lato","Verdana",sans-serif;

const CardContainer = styled.li`
  position: relative;
  background-color: ${(props) => props.theme.backgroundColor};
  min-width: 220px;
  aspect-ratio: 4/6;
`;

const CardStyle = styled.div`
  display: flex;
  flex-direction: column;
  border: black solid medium transparent;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border: lightgrey solid thin;
`;
// mask-image: ${(props) => (props.i === 3 ? 'linear-gradient(to right, rgba(0,0,0,1), 40%, rgba(0,0,0,0) 80%)' : ' ')};

const Cards = styled.div`
  margin-right: auto;
  font-size: ${(props) => props.theme.secondary};
  padding-left: 0.25em;
  ${(props) => props.name && css`
    font-size: ${props.theme.body};
    font-weight: 500;
  `};
`;
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
`;

export default Card;
