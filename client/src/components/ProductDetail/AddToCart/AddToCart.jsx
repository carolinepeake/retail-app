import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { useGlobalContext } from '../../../contexts/GlobalStore';
import { Button } from '../../reusable/Button';

function AddToCart() {
  console.log('[AddToCart] is running');
  const { selectedStyle } = useGlobalContext();

  // const [ selectedItem, setSelectedItem ] = useState({
  //   sku: {
  //     sku:  '',
  //     quantity: 0,
  //     size: '',
  //   },
  //   quantity: 0,
  //   addToCart: false,
  // });

  // let stock = [];
  // for (const sku in skus) {
  //   const { quantity, size } = sku;
  //   if (quantity > 0) {
  //     stock.push({
  //       sku,
  //       quantity,
  //       size,
  //     });
  //   }
  // };
  // const sizeOptions = stock.length === 0
  // ? <option>Out of Stock</option>
  // : stock.sort((a, b) => Number(a.sku) - Number(b.sku)).map(({ sku, quantity, size }) => (
  //   <option key={sku} name='sku' value={sku, quantity, size} quantity={quantity} size={size}>{size}</option>
  // ))

  // const handleInputChange = (e) => {
  //   setSelectedItem({...selectedItem, [e.target.name]: { ...e.target.value }})
  // }

  // const quantityOptions = selectedItem?.sku?.quantity.
  //   <option key={quantity} name="quantity" value={quantity}>{quantity}</option>



  // const stock = selectedStyle.skus.filter((sku) => sku.quantity > 0 && sku);

  // const sizeOptions =  <option key={sku} value={sku.size}>{sku.size}</option>


  const [isSizeSelected, setIsSizeSelected] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [inStock, setInStock] = useState(false);
  const [selectedSku, setSelectedSku] = useState({});
  const [stock, setStock] = useState([]);
  const [error, setError] = useState(false);
  const sizeDropdown = useRef(null);

  const sizeOptions = Object.entries(selectedStyle.skus).map(([sku, { quantity, size }]) => {
    if (quantity > 0) {
      return (
        <Option
          key={sku}
          name="sku"
          // value={JSON.stringify({ sku, quantity, size })}
          value={sku}
        >
          {size}
        </Option>
      );
    }
  });

  const handleChangeSize = async (e) => {
    e.preventDefault();
    try {
      const sku = await JSON.parse(e.target.value);
      await setSelectedSku(sku);
      if (sku.size.length === 0 || typeof sku.size.length !== 'number') {
        setIsSizeSelected(false);
      } else {
        // await setSelectedSize(sku.size);
        setIsSizeSelected(true);
        if (error) {
          setError(false);
        }
      }
    } catch (err) {
      console.log('error handling select size');
    }
  };

  function handleChangeQuantity(e) {
    e.preventDefault();
    setSelectedQuantity(e.target.value);
  }

  // const [cartModal, {openCart, closeCart}] = useModal(cart, bag);

  function handleClickAddToBag(e) {
    e.preventDefault();
    if (!isSizeSelected) {
      // sizeDropdown.current.focus(); open
      // or set error to true and then have a useEffect that returns a timeout and cleartimeout resetting error to null
      // setError('Please select a size from the dropdown');
      setError(true);
    }
    // flushSync(() => {
    //   setSelectedItem({
    //     sku: {
    //       sku: '',
    //       quantity: 0,
    //       size: ''
    //     },
    //     quantity: 0,
    //     addToCart: false;
    //   });
    //   setBag([selectedItem, ...bag]);
    // });
    // openCart();
    // reset dropdowns
  }

  // TO-DO: get rid of error after set amount of time
  // and when mouse event outside of add to cart button

  return (
    <Cart>
      <SelectSizeAndQuantityContainer>
        {inStock
          ? (
            <StyledSelect
              as="select"
              ref={sizeDropdown}
              select
              error={error}
              // name="size"
              // value={e.target.value}
              // value={selectedSize}
              value={selectedSku.size}
              // defaultValue="Select Size"
              onChange={(e) => handleChangeSize(e)}
            >
              <Option value={JSON.stringify({ size: '', quantity: 0, sku: '' })}>Select Size</Option>
              {stock}
            </StyledSelect>
          )
          : (
            <StyledSelect as="select" disabled value="Out of Stock">
              <Option>Out of Stock</Option>
            </StyledSelect>
          )}
        {isSizeSelected
          ? (
            <StyledSelect as="select" value={selectedQuantity} quantity select onChange={(e) => handleChangeQuantity(e)}>
              {selectedSku.quantity >= 15
                ? [...Array(16).keys()].slice(1).map((num) => <Option value={num}>{num}</Option>)
                : [...Array(selectedSku.quantity + 1).keys()].slice(1).map((num) => (
                  <Option value={num}>{num}</Option>
                ))}
            </StyledSelect>
          )
          : (
            <StyledSelect quantity as="select" select disabled>
              <Option>––</Option>
            </StyledSelect>
          )}
      </SelectSizeAndQuantityContainer>
      <Error>Please Select a Size</Error>
      <BagContainer>
        <AddToCartButton type="submit" modal onClick={(e) => handleClickAddToBag(e)}>
          <AddToCartText>Add to Cart</AddToCartText>
          <AddToCartText>+</AddToCartText>
        </AddToCartButton>
        <Star type="button">
          <StarText small>Add to Wish List</StarText>
          <StarText>&#9733;</StarText>
        </Star>
      </BagContainer>
    </Cart>
  );
}

const Cart = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  margin-top: 1.0rem;
  margin-bottom: 1.0rem;

  @media (min-width: 600px) {
    margin-top: 0px;
    margin-bottom: 0px;
  };

  @media (min-width: 900px) {
    margin-bottom: 1.0rem;
  };
`;

const SelectSizeAndQuantityContainer = styled.form`
  flex-direction: row;
  align-content: space-between;
  display: flex;
  margin-bottom: 0%;
  justify-content: space-between;
  flex-basis: 2.5em;
  flex-grow: 1;
  flex-shrink: 1;

  @media (min-width: 600px) {
    margin-bottom: 2.5%;
  };
`;

const StyledSelect = styled(Button)`
  width: 100%;
  flex-basis: 9.8em;
  flex-grow: 3;
  flex-shrink: 1;
  margin-right: 1em;
  /* might want to just make size of body / other buttons */
  font-size: 1rem;
  border-color: ${(props) => props.error && 'red'};

  ${(props) => props.quantity && css`
    flex-basis: 6em;
    flex-grow: 1;
    flex-shrink: 3;
    margin-right: 0;
  `};
`;

const Option = styled.option`
  min-height: 0;
  padding: 0;
`;

const BagContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-basis: 1
  flex-grow: 1;
  flex-shrink: 1;
  flex-direction: column;

  @media (min-width: 600px) {
    flex-direction: row;
    flex-basis: 2.5em;
    margin-bottom: 2.5%;
  };
`;

const AddToCartButton = styled(Button)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
  font-size: 1rem;

  @media (min-width: 600px) {
    margin-right: calc(10px + 1vw);
    flex-basis: 12em;
    flex-grow: 4;
    flex-shrink: 1;
    padding: calc(1px + 1.2vw) calc(6px + 1.2vw);
  };
`;

const AddToCartText = styled.div`
  display: inline-block;
  padding: 1px 0;
`;

const Star = styled(Button)`
  @media (max-width: 600px) {
    border: none;
    font-size: 0.83em;
    &:hover {
      text-decoration: none;
      box-shadow: none;
    };
    align-self: flex-start;
    padding: 0.5em 1em 0 1em;
    text-decoration: underline;
    display: inline-block;
    padding-left: 0px;
    margin-left: 0px;
  };

  @media (min-width: 600px) {
    right: 5%;
    flex-basis: 2.5em;
    flex-grow: 1;
    flex-shrink: 4;
    font-size: 1rem;
    &:hover {
      color: ${(props) => props.theme.starFilled};
      border-color: ${(props) => props.theme.fontColor};
    };
  };
`;

const StarText = styled.span`
  display: ${(props) => (props.small ? 'initial' : 'none')};

  @media (max-width: 600px) {
    padding-left: 0px;
  };

  @media (min-width: 600px) {
    display: ${(props) => (props.small ? 'none' : 'initial')};
  };
`;

const Error = styled.div`
  color: red;
  font-size: 0.75em;
  font-weight: 300;
  display: ${(props) => (props.error ? 'block' : 'none')};
`;

export default AddToCart;
