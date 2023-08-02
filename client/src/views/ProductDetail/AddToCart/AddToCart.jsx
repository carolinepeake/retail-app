import React, { useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import { useGlobalContext } from '../../../contexts/GlobalStore';
import { Button } from '../../../components/Button';
import {
  createStock, sortBySize, getAvailableStock, getQuantityOptions,
} from '../../../utils/getStock';
import QuantityDropdown from './QuantitySelect';

function AddToCart({ skus }) {
  console.log('[AddToCart] is running');
  // const { skus } = useGlobalContext().selectedStyle;
  // const { skus } = useGlobalContext()?.selectedStyle;
  const { productID, selectedStyle } = useGlobalContext();
  // const cart = useState([]);

  const sizeDropdown = useRef(null);

  const [selectedItem, setSelectedItem] = useState({
    // sku: {
    //   size: '',
    //   id: '',
    //   quantity: ''
    // },
    sku: '',
    size: '',
    quantity: '1',
    product: productID,
    style: selectedStyle.style_id,
  });

  console.log('selectedItem: ', selectedItem);

  const availableStock = skus ? getAvailableStock(createStock(skus)) : [];

  const inStock = availableStock.length > 0;

  const sortedStock = inStock ? sortBySize(availableStock) : [];

  const sizeOptions = sortedStock.map(({ sku, size, quantity }) => {
    console.log('size option: ', sku, size, quantity);
    return (
      <option
        name="size"
        key={sku}
      // value={
      //   sku,
      //   size,
      //   quantity
      // }
        value={sku}
        quantity={quantity}
      >
        {size}
      </option>
    );
  });

  const sizeSelected = (selectedItem.size !== '');

  const itemStock = sizeSelected && skus[selectedItem.size].quantity;

  const quantityOptions = typeof itemStock === 'number' && getQuantityOptions(itemStock);

  // const quantityOptions = selectedItem?.sku?.quantity

  // const sizes = <option key={selectedSize}>{selectedItem?.sku?.size}</option>

  // const quantityOptions = selectedItem?.sku?.quantity.
  //   <option key={quantity} name="quantity" value={quantity}>{quantity}</option>

  // const availableSizes = skus.filter((sku) => sku.quantity > 0 && sku);

  // const [isSizeSelected, setIsSizeSelected] = useState(false);
  // const [selectedQuantity, setSelectedQuantity] = useState(1);
  // const [inStock, setInStock] = useState(false);
  // const [selectedSku, setSelectedSku] = useState({});
  // const [stock, setStock] = useState([]);
  // const [error, setError] = useState(false);

  // const handleChangeSize = (e) => {
  //   setSelectedSize({ ...selectedSize, [e.target.name]: e.target.value });
  // };

  //   let quantities = [];
  //   if (selectedSize.sku.length > 0) {
  //     quantities = Object.entries(selectedStyle?.skus).map(([sku, { quantity, size }]) => {
  //     if (quantity > 0) {
  //       return (
  //         <Option
  //           key={sku}
  //           name="sku"
  //           value={sku}
  //         >
  //           {size}
  //         </Option>
  //       );
  //     }
  //   });
  // }

  // let selectQuantity;
  // if (sizes.length > 0) {
  //   selectSize = (
  //     <StyledSelect
  //       as="select"
  //       ref={sizeDropdown}
  //       select
  //       error={error}
  //       name="sku"
  //       value={selectedSize.sku || ''}
  //       onChange={(e) => handleChangeSize(e)}
  //     >
  //       <Option value='' name="sku">Select Size</Option>
  //       {sizes}
  //     </StyledSelect>
  //   );
  // } else {
  //   selectSize = (
  //     <StyledSelect
  //       // defaultValue='Out of Stock'
  //       name="sku"
  //       as="select"
  //       disabled
  //     >
  //       <Option value='' name="sku">Out of Stock</Option>
  //     </StyledSelect>
  //   );
  // }

  //   let sizes = [];
  //   if (selectedStyle.skus) {
  //     sizes = Object.entries(selectedStyle?.skus).map(([sku, { quantity, size }]) => {
  //     if (quantity > 0) {
  //       return (
  //         <Option
  //           key={sku}
  //           name="sku"
  //           value={sku}
  //         >
  //           {size}
  //         </Option>
  //       );
  //     }
  //   });
  // }

  // const handleChangeSize = async (e) => {
  //   try {
  //     const sku = await JSON.parse(e.target.value);
  //     await setSelectedSku(sku);
  //     if (sku.size.length === 0 || typeof sku.size.length !== 'number') {
  //       setIsSizeSelected(false);
  //     } else {
  //       // await setSelectedSize(sku.size);
  //       setIsSizeSelected(true);
  //       if (error) {
  //         setError(false);
  //       }
  //     }
  //   } catch (err) {
  //     console.log('error handling select size');
  //   }
  // };

  const handleInputChange = (e) => {
    setSelectedItem((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // const [cartModal, {openCart, closeCart}] = useModal(cart, bag);

  // function handleClickAddToBag(e) {
  //   e.preventDefault();
  //   if (!isSizeSelected) {
  //     // sizeDropdown.current.focus(); open
  //     // or set error to true and then have a useEffect that returns a timeout and cleartimeout resetting error to null
  //     // setError('Please select a size from the dropdown');
  //     setError(true);
  //     return;
  //   }
  //   // flushSync(() => {
  //   //   setSelectedItem({
  //   //     sku: {
  //   //       sku: '',
  //   //       quantity: 0,
  //   //       size: ''
  //   //     },
  //   //     quantity: 0,
  //   //     addToCart: false;
  //   //   });
  //   //   setBag([selectedItem, ...bag]);
  //   // });
  //   // openCart();
  //   // reset dropdowns
  // }

  // TO-DO: get rid of error after set amount of time
  // and when mouse event outside of add to cart button



  // could make all one component that updates together

  // {selectedStyle.skus[sku].size}




  // selectedStyle?.skus?. =


  return (
    <Cart>
      <SelectSizeAndQuantityContainer skus={skus} handleInputChange={handleInputChange}>
        {inStock
          ? (
            <StyledSelect
              as="select"
              ref={sizeDropdown}
              select
              // error={error}
              name="size"
              value={selectedItem.size || ''}
              onChange={handleInputChange}
            >
              <Option
                name="size"
                value=""
              >
                Select Size
              </Option>
              {sizeOptions}
            </StyledSelect>
          )
          : (
            <StyledSelect
              as="select"
              disabled
            >
              <Option>Out of Stock</Option>
            </StyledSelect>
          )}

        {sizeSelected
          ? (
            <StyledSelect as="select" value={selectedItem.quantity || '1'} name="quantity" quantity select onChange={handleInputChange}>
              {/* {selectedSku.quantity >= 15
                ? [...Array(16).keys()].slice(1).map((num) => <Option value={num} name="quantity">{num}</Option>)
                : [...Array(selectedSku.quantity + 1).keys()].slice(1).map((num) => (
                  <Option value={num} name="quantity">{num}</Option>
                ))} */}
              {/* <Option name="quantity" value="">1</Option> */}
              {quantityOptions && <QuantityDropdown quantity={quantityOptions} />}
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
        <AddToCartButton
          type="submit"
          modal
        >
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
  }

  @media (min-width: 900px) {
    margin-bottom: 1.0rem;
  }
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
  }
`;

const StyledSelect = styled(Button)`
  width: 100%;
  flex-basis: 9.8em;
  flex-grow: 3;
  flex-shrink: 1;
  margin-right: 1em;
  /* might want to just make size of body / other buttons */
  font-size: 1rem;
  border-color: ${(props) => props.error && props.theme.error};

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
  }
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
  }
`;

const AddToCartText = styled.div`
  display: inline-block;
  padding: 1px 0;
`;

const Star = styled(Button)`
  @media (max-width: 600px) {
    border: none;
    font-size: 0.83em;
    align-self: flex-start;
    padding: 0.5em 1em 0 1em;
    text-decoration: underline;
    display: inline-block;
    padding-left: 0px;
    margin-left: 0px;
  }
  &:hover {
    text-decoration: none;
    box-shadow: none;
  }

  @media (min-width: 600px) {
    right: 5%;
    flex-basis: 2.5em;
    flex-grow: 1;
    flex-shrink: 4;
    font-size: 1rem;
    &:hover {
      color: ${(props) => props.theme.starFilled};
      border-color: ${(props) => props.theme.fontColor};
    }
  }
`;

const StarText = styled.span`
  display: ${(props) => (props.small ? 'initial' : 'none')};

  @media (max-width: 600px) {
    padding-left: 0px;
  }

  @media (min-width: 600px) {
    display: ${(props) => (props.small ? 'none' : 'initial')};
  }
`;

const Error = styled.div`
  color: red;
  font-size: 0.75em;
  font-weight: 300;
  display: ${(props) => (props.error ? 'block' : 'none')};
`;

export default AddToCart;
