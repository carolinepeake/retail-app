import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { useGlobalContext } from '../../../contexts/GlobalStore';
import Button from '../../reusable/Button';
import SocialMedia from '../ProductOverview/SocialMedia';

function AddToCart() {
  const { selectedStyle } = useGlobalContext();

  const [isSizeSelected, setIsSizeSelected] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [inStock, setInStock] = useState(false);
  // const [selectedSize, setSelectedSize] = useState('Select Size');
  const [selectedSku, setSelectedSku] = useState({});
  const [stock, setStock] = useState([]);
  const [error, setError] = useState(false);
  const sizeDropdown = useRef(null);

  function getStock() {
    const options = Object.entries(selectedStyle.skus).map(([sku, { quantity, size }]) => {
      if (quantity > 0) {
        if (inStock === false) {
          setInStock(true);
        }
        return <Option key={sku} value={JSON.stringify({ sku, quantity, size })}>{size}</Option>;
      }
    });
    return options;
  }

  useEffect(() => {
    if (selectedStyle.skus) {
      setStock(() => getStock());
    }
  }, [selectedStyle]);

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

  function handleAddToBag(e) {
    if (!isSizeSelected) {
      // sizeDropdown.current.focus();
      setError(true);
    }
    e.preventDefault();
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
              style={{ borderColor: error ? 'red' : 'black' }}
            // value={selectedSize}
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
      <Error style={{ display: error ? 'block' : 'none' }}>Please Select a Size</Error>
      <BagContainer>
        <AddToCartButton type="submit" modal onClick={(e) => handleAddToBag(e)}>
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
    margin-bottom: 2.0rem;
  };

  @media (min-width: 900px) {
    margin-top: 1.0rem;
  };
`;
// margin-right: 1em;
// margin-right: 10%;

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
  margin-right: 2em;

  ${(props) => props.quantity && css`
    flex-basis: 6em;
    flex-grow: 1;
    flex-shrink: 3;
    margin-right: 0;
  `};
`;
// @media (min-width: 700px) {
//   margin-right: 1em;
//   padding: calc(2px + 1.2vw) calc(6px + 1.2vw);
//   font-size: calc(6px + 1.2vw);
//   height: 100%;
// };

// can combine flex-basis, grow, and shrink into one line shorthand

const Option = styled.option`
  min-height: 0;
  padding: 0;
`;

const BagContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2.5%;
  flex-basis: 2.5em;
  flex-grow: 1;
  flex-shrink: 1;

  @media (max-width: 600px) {
    flex-direction: column;
    flex-basis: 1;
  };
`;

const AddToCartButton = styled(Button)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;

  @media (min-width: 600px) {
    margin-right: calc(10px + 1vw);
    flex-basis: 12em;
    flex-grow: 4;
    flex-shrink: 1;
    padding: calc(1px + 1.2vw) calc(6px + 1.2vw);
  };
`;
// @media (min-width: 700px) {
//   margin-right: calc(10px + 1vw);
//   flex-basis: 12em;
//   flex-grow: 4;
//   flex-shrink: 1;

//   padding: calc(1px + 1.2vw) calc(6px + 1.2vw);
//   font-size: calc(6px + 1.2vw);
// };
// @media (max-width: 600px) {
//   flex-basis: 1;
//   position: initial;
//   margin-right: 0;
//   flex-basis: 1;
//   flex-grow: 1;
//   flex: 1;
//   width: 100%;
//   padding: calc(2px + 1.2vw) calc(8px + 1.2vw);
// font-size: calc(6px + 1.2vw);

const AddToCartText = styled.div`
  display: inline-block;
  padding: 1px 0;
`;
// @media (min-width: 700px) {
//   font-size: calc(6px + 1.2vw);
// };

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
// @media (max-width: 700px) {
//   font-size: 0.83em;
//   padding-left: 1em;
//   padding-top: 1em;
//   text-decoration: underline;
//   &:hover {
//     text-decoration: none;
//   };
// };
const Error = styled.div`
  color: red;
  font-size: 0.75em;
`;

export default AddToCart;
