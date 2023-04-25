import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
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
              <Cards style={{ paddingTop: '0.1rem'}}>{info.details.data.category}</Cards>
              <Cards style={{ fontSize: '1.0rem' }}>{info.details.data.name}</Cards>
              <Cards style={{ padding: '0.25rem' }}>
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

const CardContainer = styled.div`
  grid-column: ${(props) => props.i};
  grid-row: 1;
  position: relative;
  background-color: ${(props) => props.theme.backgroundColor};
`;
// background-color: white;

const CardStyle = styled.div`
  display: flex;
  flex-direction: column;
  border: black solid medium transparent;
  mask-image: ${(props) => (props.i === 3 ? 'linear-gradient(to right, rgba(0,0,0,1), 40%, rgba(0,0,0,0) 80%)' : ' ' )};
`;

const Cards = styled.div`
  margin-right: auto;
  font-size: 0.75rem;
  padding-left: 0.25rem;
`;
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
