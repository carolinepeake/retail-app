/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useGlobalContext } from '../../../contexts/GlobalStore';
import Card from './Card';

function CardsList() {
  const {
    productID, cardIndex, setCardIndex, productList, setProductList, setCurrOutfit,
  } = useGlobalContext();
  useEffect(() => {
    setProductList([]);
    axios.get('/related', { params: { productID } })
      .then((results) => {
        // Get all related product IDs
        (results.data).map((id) => {
          const details = axios.get('/relatedItem', { params: { productID: id } });
          const image = axios.get('/relatedImage', { params: { productID: id } });
          const stars = axios.get('/relatedStars', { params: { reviewID: id } });
          return Promise.all([details, image, stars])
            .then((object) => {
              const tempObj = {
                details: object[0],
                image: object[1],
                stars: object[2],
              };
              setProductList((oldList) => [...oldList, tempObj]);
            })
            .catch((err) => {
              console.log(err);
            });
        });
      })
      .catch((error) => console.log('Error here:', error));
    // Get data for current product ID for user to add outfit
    const details = axios.get('/relatedItem', { params: { productID } });
    const image = axios.get('/relatedImage', { params: { productID } });
    const stars = axios.get('/relatedStars', { params: { reviewID: productID } });
    Promise.all([details, image, stars])
      .then((object) => {
        const outfitObj = {
          details: object[0],
          image: object[1],
          stars: object[2],
        };
        setCurrOutfit(outfitObj);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [productID]);
  function clickRight() {
    if (cardIndex + 4 < productList.length) {
      setCardIndex(cardIndex + 1);
    }
  }
  function clickLeft() {
    if (cardIndex > 0) {
      setCardIndex(cardIndex - 1);
    }
  }
  function fillEmpty() {
    const emptyCells = [];
    for (let i = 0; i < (4 - productList.length); i += 1) {
      emptyCells.push(<Empty key={i} />);
    }
    return emptyCells;
  }
  return (
    <Container>
      <LeftBox>
        {cardIndex === 0 || productList.length < 4
          ? <LeftButton /> : (
            <LeftButton onClick={() => clickLeft()}> &lt; </LeftButton>
          )}
      </LeftBox>
      <StyleCardList>
        {(productList.slice(cardIndex, cardIndex + 4)).map((data, i) => <Card data={data} key={i} />)}
        {(productList.length < 4 && productList.length > 0) && fillEmpty()}
        {(productList.length === 0) && <Text>No related items to show</Text>}
      </StyleCardList>
      <RightBox>
        {(cardIndex === productList.length - 4 || productList.length < 4)
          ? <RightButton /> : (
            <RightButton onClick={() => clickRight()}> &gt; </RightButton>
          )}
      </RightBox>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${(props) => props.theme.backgroundColor};
`;

const StyleCardList = styled.div`
  display: flex;
  float: left;
  positive: relative;
  flex-direction: row;
  margin-left: auto;
  margin-right: auto;
  align-content: space-evenly;
`;

const Text = styled.div`
  font-size: 35px;
  font-width: bold;
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
  display: flex;
  align-self: center;
  position: absolute;
  font-width: bold;
  font-size: 60px;
  background-color: transparent;
  border: none;
  &:hover {
    opacity: 0.80;
  }
  color: ${(props) => props.theme.fontColor};
  cursor: pointer;
`;

const RightButton = styled.button`
  display: flex;
  align-self: center;
  position: absolute;
  font-width: bold;
  font-size: 60px;
  background-color: transparent;
  border: none;
  &:hover {
    opacity: 0.80;
  }
  color: ${(props) => props.theme.fontColor};
  cursor: pointer;
`;

const Empty = styled.div`
  width: 225px;
  height: 225px;
  border: 15px solid transparent;
`;

const Fade = styled.div`
  grid-column: 12 /12;
  z-index: 2;
  background-color: gradient(left, rgba(0,0,0,0), rgba(0,0,0,1));
`;

export default CardsList;

// .wrapper{
//   color-fill: white;

//   }
  // .big-font{
  // font-size: 25px;
  // }
  // .fade-right {
  // background: -webkit-linear-gradient(right, rgba(0,0,0,0), rgba(0,0,0,1));
  // -webkit-background-clip: text;
  // -webkit-text-fill-color: transparent;
  // }
  // .fade-left {
  // background: -webkit-linear-gradient(left, rgba(0,0,0,0), rgba(0,0,0,1));
  // -webkit-background-clip: text;
  // -webkit-text-fill-color: transparent;
  // }
  // .fade-up {
  // background: -webkit-linear-gradient(rgba(0,0,0,1), rgba(0,0,0,0));
  // -webkit-background-clip: text;
  // -webkit-text-fill-color: transparent;
  // }
  // .fade-down {
  // background: -webkit-linear-gradient(rgba(0,0,0,0), rgba(0,0,0,1));
  // -webkit-background-clip: text;
  // -webkit-text-fill-color: transparent;
  // }