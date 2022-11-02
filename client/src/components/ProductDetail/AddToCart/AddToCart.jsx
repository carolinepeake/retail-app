import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { useGlobalContext } from '../../../contexts/GlobalStore';
import Button from '../../reusable/Button.jsx';

function AddToCart() {
  const { selectedStyle } = useGlobalContext();

  const [isSizeSelected, setIsSizeSelected] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [inStock, setInStock] = useState(false);
  //const [selectedSize, setSelectedSize] = useState('Select Size');
  const [selectedSku, setSelectedSku] = useState({});

  let options;

  selectedStyle.skus && (
    options = Object.entries(selectedStyle.skus).map(([sku, {quantity, size}]) => {
      if (quantity > 0) {
        if (inStock === false) {
          setInStock(true);
        }
        return <Option key={sku} value={JSON.stringify({sku: sku, quantity: quantity, size: size})}>{size}</Option>
      } else {
        return;
      }
    })
  );

  const handleChangeSize = async (e) => {
    e.preventDefault();
    try {
      let sku = await JSON.parse(e.target.value);
      await setSelectedSku(sku);
      if (sku.size.length === 0 || typeof sku.size.length !== "number") {
        setIsSizeSelected(false);
      } else {
       // await setSelectedSize(sku.size);
        setIsSizeSelected(true);
      }
    } catch (err) {
      console.log('error handling select size');
    }
 };

  function handleChangeQuantity(e) {
    e.preventDefault();
    setSelectedQuantity(e.target.value);
  };

  return (
    <Cart>
      <SelectSizeAndQuantityContainer>
        {inStock
        ? <StyledSelect as="select"
            //value={selectedSize}
            onChange={(e) => handleChangeSize(e)}>
            <Option value={JSON.stringify({size: '', quantity: 0, sku: ''})}>Select Size</Option>
            {options}
          </StyledSelect>
        : <StyledSelect as="select" disabled value="Out of Stock">
            <Option>Out of Stock</Option>
          </StyledSelect>}
        {isSizeSelected
        ? <StyledSelect quantity as="select" value={selectedQuantity} onChange={(e) => handleChangeQuantity(e)}>
            {selectedSku.quantity >= 15
            ? [...Array(16).keys()].slice(1).map((num) =>
                <Option value={num}>{num}</Option>)
            : [...Array(selectedSku.quantity + 1).keys()].slice(1).map((num) =>
                <Option value={num}>{num}</Option>)}
          </StyledSelect>
        : <StyledSelect quantity as="select" disabled >
            <Option>––</Option>
          </StyledSelect>}
      </SelectSizeAndQuantityContainer>
      <BagContainer>
        <AddToCartContainer type="submit" disabled={!isSizeSelected}>
          <AddToCartText words>Add to Cart</AddToCartText>
          <AddToCartText plus>+</AddToCartText>
          </AddToCartContainer>
        <Star type="button">&#9734;</Star>
      </BagContainer>
    </Cart>
  );
}

const Cart = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 1em;
  width: 100%;
`;

const SelectSizeAndQuantityContainer = styled.div`
  flex-direction: row;
  align-content: space-between;
  display: flex;
  margin-bottom: 2.5%;
  margin-right: 10%;
  justify-content: space-between;
  flex-basis: 2.5em;
  flex-grow: 1;
  flex-shrink: 1;
`;

const StyledSelect = styled(Button)`
  width: 100%;
  height: 100%;
  flex-basis: 9.8em;
  flex-grow: 3;
  flex-shrink: 1;
  margin-right: 1em;
  ${props => props.quantity && css`
    flex-basis: 6em;
    flex-grow: 1;
    flex-shrink: 3;
    margin-right: 0;
  `};
`;

//can combine flex-basis, grow, and shrink into one line shorthand

const Option = styled.option`
  min-height: 0;
  padding: 0;
`;

const BagContainer = styled.div`
  display: flex;
  margin-right: 10%;
  justify-content: space-between;
  margin-top: 2.5%;
  flex-basis: 2.5em;
  flex-grow: 1;
  flex-shrink: 1;
`;


const AddToCartContainer = styled(Button)`
  padding: calc(5px + 0.5vw);
  height: 100%;
  position: relative;
  margin-right: calc(10px + 1vw);
  flex-basis: 13.3em;
  flex-grow: 5;
  flex-shrink: 1;
`;

const AddToCartText = styled.span`
  position: absolute;
  top: 1rem;
  ${props => props.words && css`
    left: 7.5%;
  `};
  ${props => props.plus && css`
    right: 7.5%;
  `};
`;

const Star = styled(Button)`
  height: 100%;
  right: 5%;
  flex-basis: 2.5em;
  flex-grow: 1;
  flex-shrink: 5;
`;

export default AddToCart;
