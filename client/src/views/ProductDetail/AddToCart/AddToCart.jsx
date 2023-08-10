import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { useGlobalContext } from '../../../contexts/GlobalStore';
import { Button } from '../../../components/Buttons';
import Cart from './Cart';
// import {
//   createStock, sortBySize, getAvailableStock, getQuantityOptions,
// } from '../../../utils/getStock';
import QuantityDropdown from './QuantityDropdown';
import useModal from '../../../hooks/useModal';

function AddToCart() {
  console.log('[AddToCart] is running');
  const { productID, selectedStyle, productInfo } = useGlobalContext();

  const [cart, setCart] = useState([]);

  const [selectedItem, setSelectedItem] = useState({
    sku: '',
    quantity: '1',
    product: productID,
  });

  const [error, setError] = useState(false);

  const [showModal, toggleModal] = useModal();

  // can move to only row 1
  if (!selectedStyle.skus) {
    return null;
  }

  let sizes = [];
  sizes = Object.entries(selectedStyle.skus).map(([sku, { quantity, size }]) => {
    if (quantity > 0) {
      return (
        <Option
          key={sku}
          name="sku"
          value={sku}
        >
          {size}
        </Option>
      );
    }
  });

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setSelectedItem((prev) => ({ ...prev, [name]: value }));
    setError(false);
  };

  const handleClickAddToBag = (e) => {
    e.preventDefault();
    if (!selectedItem.sku) {
      // sizeDropdown.current.focus(); open
      // or set error to true and then have a useEffect that returns a timeout and cleartimeout resetting error to null
      // setError('Please select a size from the dropdown');
      setError(true);
      return;
    }
    const item = {
      ...selectedItem,
      style: selectedStyle.style_id,
      name: productInfo.name,
      photo: selectedStyle.photos[0].thumbnail_url,
      size: selectedStyle.skus[selectedItem.sku].size,
      styleName: selectedStyle.name,
      salePrice: selectedStyle.sale_price,
      originalPrice: selectedStyle.original_price,
      availableQuantity: selectedStyle.skus[selectedItem.sku].quantity,
    };
    setCart((prev) => [...prev, item]);
    // TODO: save cart to local storage
    toggleModal();
    setSelectedItem((prev) => ({ ...prev, sku: '', quantity: '1' }));
  };

  // TO-DO: get rid of error after set amount of time
  // and when mouse event outside of add to cart button

  return (
    <>
      <AddToBagForm
        onSubmit={handleClickAddToBag}
      >
        <SelectSizeAndQuantityContainer>
          {/* <label htmlFor="size">
          Size */}
          {sizes.length > 0
            ? (
              <StyledSelect
                id="size"
                as="select"
                select
                name="sku"
                value={selectedItem.sku || ''}
                onChange={handleInputChange}
              >
                <Option
                  name="sku"
                  value=""
                  disabled
                >
                  Select Size
                </Option>
                {sizes}
              </StyledSelect>
            )
            : (
              <StyledSelect
                id="size"
                as="select"
                select
                disabled
              >
                <Option>
                  Out of Stock
                </Option>
              </StyledSelect>
            )}
          {/* </label> */}

          {/* <label htmlFor="quantity">
          Qty */}
          {selectedItem.sku
            ? (
              <StyledSelect
                id="quantity"
                as="select"
                value={selectedItem.quantity || '1'}
                name="quantity"
                quantity
                select
                onChange={handleInputChange}
              >
                <QuantityDropdown
                  availableQuantity={selectedStyle.skus[selectedItem.sku].quantity}
                />
              </StyledSelect>
            )
            : (
              <StyledSelect
                id="quantity"
                as="select"
                quantity
                select
                disabled
              >
                <Option>
                  ––
                </Option>
              </StyledSelect>
            )}

          {/* </label> */}

        </SelectSizeAndQuantityContainer>
        <Error error={error}>
          {sizes.length > 0 ? 'Please select a size.' : 'Please select a different style.'}
        </Error>
        <BagContainer>
          <AddToCartButton
            type="submit"
            $primary
            $submit
          >
            <AddToCartText>Add to Cart</AddToCartText>
            <AddToCartText>+</AddToCartText>
          </AddToCartButton>
          <Star type="button">
            <StarText small>Add to Wish List</StarText>
            <StarText>&#9733;</StarText>
          </Star>
        </BagContainer>
      </AddToBagForm>
      <Cart
        showModal={showModal}
        toggleModal={toggleModal}
        cart={cart}
        setCart={setCart}
      />
    </>
  );
}

const AddToBagForm = styled.form`
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

const SelectSizeAndQuantityContainer = styled.div`
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
