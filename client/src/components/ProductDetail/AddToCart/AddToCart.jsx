import React, { useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../../contexts/GlobalStore';

function AddToCart() {
  const { productID, selectedStyle, productInfo, styles } = useGlobalContext();
  const [selectedSize, setSelectedSize] = useState('Select Size');
  const [isSizeSelected, setIsSizeSelected] = useState(false);
  const [availableQuantity, setAvailableQuantity] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  function handleChangeSize(e) {
    e.preventDefault();
    setSelectedSize(selectedStyle.skus[e.target.value].size);
    setIsSizeSelected(true);
    setAvailableQuantity(selectedStyle.skus[e.target.value].quantity);
  }

  function handleChangeQuantity(e) {
    e.preventDefault();
    setSelectedQuantity(e.target.value);
  }

  return (
    <Cart>
      <SQContainer>
        <SelectSizeContainer>
            <SelectSize value={selectedSize} onChange={(e) => handleChangeSize(e)}>
                <option>{selectedSize}</option>
              {selectedStyle.skus
              && (
                Object.entries(selectedStyle.skus).map(([sku, {size, quantity}]) => {
                  return (quantity > 0 && <option key={sku} quantity={quantity} value={sku}>{size}</option>)
                }
              ))}
            </SelectSize>
        </SelectSizeContainer>
        <SelectQuantityContainer>
          {isSizeSelected
          ? <SelectQuantity value={selectedQuantity} onChange={(e) => handleChangeQuantity(e)}>
              <option>-</option>
              {availableQuantity >= 15
              ? [...Array(16).keys()].slice(1).map((num) =>
                  <option value={num}>{num}</option>)
              : [...Array(availableQuantity + 1).keys()].slice(1).map((num) =>
                  <option value={num + 1}>{num + 1}</option>)
              }
            </SelectQuantity>
          : <SelectQuantity disabled={!isSizeSelected} value={selectedQuantity} onChange={(e) => handleChangeQuantity(e)}>
              <option>-</option>
            </SelectQuantity>
          }
        </SelectQuantityContainer>
      </SQContainer>
      <BagContainer>
        <AddtoBag>
          <CartB type="submit">Add to Cart</CartB>
        </AddtoBag>
      </BagContainer>
    </Cart>
  );
}


const Cart = styled.div`
  display: block;
  grid-column: 4/6;
  grid-row: 5/6;
`;

// const Cart = styled.div`
//   display: block;
//   //grid-column: 4 / 6;
//   //grid-row: 1;
//   flex: 3 1;
// `;

const SQContainer = styled.div`
  flex-direction: row;
  align-content: space-between;
  display: inline-flex;
  margin-bottom: 2%;
`;

const SelectSizeContainer = styled.div`
  height: auto;
  width: auto;
`;

const SelectSize = styled.select`
  font-size: 1.0rem;
  padding-bottom: 0.4rem;
  padding-top: 0.4rem;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-right: 1rem;
  cursor: pointer;
`;

const SelectQuantityContainer = styled.div`
  height: auto;
  width: auto;
  margin-left: 45%
  margin-right: 2%
`;

const SelectQuantity = styled.select`
  font-size: 1.0rem;
  padding-bottom: 0.4rem;
  padding-top: 0.4rem;
  padding-left: 1.1rem;
  padding-right: 1.1rem;

`;

const BagContainer = styled.div`
`;


const AddtoBag = styled.div`
  margin-top: 1px;
  height: auto
  display: grid;
  width: 35%
`;

const CartB = styled.button`
  font-size: 1.0rem;
  width: 13.3rem;
  height: 2.4rem;
  cursor: pointer;
`;

export default AddToCart;
