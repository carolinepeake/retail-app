import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../../contexts/GlobalStore';

function AddToCart() {
  const { productID, selectedStyle, productInfo, styles } = useGlobalContext();
  const [selectedSize, setSelectedSize] = useState('Select Size');
  const [isSizeSelected, setIsSizeSelected] = useState(false);
  const [availableQuantity, setAvailableQuantity] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [inStock, setInStock] = useState(false);

// useEffect(() => {
//     console.log('selectedStyle: ', selectedStyle);
//     for (var key in selectedStyle.skus) {
//       if (selectedStyle.skus[key].quantity > 0) {
//         console.log('add to cart: quantity greater than zero');
//         setInStock(true);
//         break;
//       }
//     };
//   }, [selectedStyle])

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
                  if (quantity > 0 && inStock === false) {
                    setInStock(true);
                    return <option key={sku} quantity={quantity} value={sku}>{size}</option>;
                  } else if (quantity > 0 && inStock === true) {
                    return <option key={sku} quantity={quantity} value={sku}>{size}</option>;
                  } else {
                    return;
                  }
                })
              )}
            </SelectSize>
            {!inStock
            &&  <SoldOut disabled value="Out of Stock">
                  <option>Out of Stock</option>
                </SoldOut>
            }
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
          <CartB type="submit">
            <AddCart>Add to Cart</AddCart>
            <PlusSign>+</PlusSign>
          </CartB>
        </AddtoBag>
          <Star type="button">&#9734;</Star>
      </BagContainer>
    </Cart>
  );
}


const Cart = styled.div`
  display: block;
  grid-column: 4/6;
  grid-row: 1;
  margin-right: 1rem;
  width: 100%;
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
  display: flex;
  margin-bottom: 2.5%;
  margin-right: 10%;
  justify-content: space-between;
`;

const SelectSizeContainer = styled.div`
  height: 2.5rem;
  width: 9.8rem;
`;

const SelectSize = styled.select`
  font-size: 1.0rem;
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  cursor: pointer;
  width: 100%;
`;

const SoldOut = styled.select`
  font-size: 1.0rem;
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  cursor: pointer;
  width: 100%;
`;

const SelectQuantityContainer = styled.div`
  height: 2.5rem;
  width: 6rem;
  margin-left: 45%
  margin-right: 2.5%
`;

const SelectQuantity = styled.select`
  font-size: 1.0rem;
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
  padding-left: 1.0rem;
  padding-right: 1.0rem;
  width: 100%;
`;

const BagContainer = styled.div`
  display: flex;
  margin-right: 10%;
  justify-content: space-between;
`;


const AddtoBag = styled.div`
  margin-top: 1px;
  height: auto;
`;

const CartB = styled.button`
  font-size: 1.0rem;
  width: 13.3rem;
  height: 2.5rem;
  cursor: pointer;
  padding: 0 1rem;
  position: relative;
`;

const AddCart = styled.span`
  position: absolute;
  top: 0.5rem;
  left: 1rem;
`;

const PlusSign = styled.span`
  position: absolute;
  top: 0.5rem;
  right: 1rem;
`;

const Star = styled.button`
  font-size: 1.0rem;
  height: 2.5rem;
  right: 5%;
  width: 2.5rem;
`;

export default AddToCart;
