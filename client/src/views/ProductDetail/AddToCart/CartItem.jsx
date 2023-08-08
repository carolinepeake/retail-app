import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { StyledExitButton } from '../../../components/Button';
import QuantityDropdown from './QuantityDropdown';

export default function CartItem({ item, cart, setCart }) {
  const handleRemoveItem = () => {
    const updatedCart = cart.filter((cartItem) => cartItem.sku !== item.sku);
    setCart(updatedCart);
  };

  const handleChangeQuantity = () => {

  };

  const price = (
    <PriceContainer>
    {item?.salePrice
      ? (
        <Price>
          <SalePrice>
            {`$${item?.salePrice}    `}
          </SalePrice>
          <s>{item?.originalPrice}</s>
        </Price>
      )
      : (
        <Price>{`$${item?.originalPrice}`}</Price>
      )}
  </PriceContainer>
  );

  return (
    <Container>
      <Thumbnail src={item?.photo} alt={item?.name}/>
      <div>
        <Name>
          {item?.name}
        </Name>
        <h5>
          <b>Size: </b>
          {item?.size}
        </h5>
        <h5>
          <b>Style: </b>
          {item?.styleName}
        </h5>
        <h5>
          <b>Qty:</b>
          <SelectedQuantity
            defaultValue={item?.quantity}
          >
            <QuantityDropdown availableQuantity={item?.availableQuantity}/>
          </SelectedQuantity>
        </h5>
        {price}
      </div>
      <Delete
        type="button"
        onClick={handleRemoveItem}
      > &#x2715;</Delete>
    </Container>
  );
}

CartItem.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      style_id: PropTypes.number,
      name: PropTypes.string,
      styleName: PropTypes.string,
      originalPrice: PropTypes.string,
      salePrice: PropTypes.string,
      photo: PropTypes.string,
      sku: PropTypes.string,
      product: PropTypes.string,
      size: PropTypes.string,
      quantity: PropTypes.string,
      availbleQuantity: PropTypes.number,
    }),
  ).isRequired,
  setCart: PropTypes.func.isRequired,
  item: PropTypes.shape({
    style_id: PropTypes.number,
    name: PropTypes.string,
    styleName: PropTypes.string,
    originalPrice: PropTypes.string,
    salePrice: PropTypes.string,
    photo: PropTypes.string,
    sku: PropTypes.string,
    product: PropTypes.string,
    size: PropTypes.string,
    quantity: PropTypes.string,
    availbleQuantity: PropTypes.number,
  }).isRequired,
};

const Container = styled.div`
  height: 10em;
  width: 100%;
  overflow: hidden;
  display: flex;
  gap: 0.5em;
  position: relative;
`;

const Thumbnail = styled.img`
  height: 7em;
  aspect-ratio: 4/6;
  object-fit: cover;

`;

const Name = styled.h4`
  margin: 0;
  font-size: 1em;
  font-weight: 300;
`;

const SelectedQuantity = styled.select`
  margin-left: 0.1em;
`;


const PriceContainer = styled.div`
  font-size: ${(props) => props.theme.body};
  font-weight: 300;
`;

const Price = styled.h5`
  margin: 0;
`;

const SalePrice = styled.span`
  color: ${(props) => props.theme.formError};;
`;

const Delete = styled(StyledExitButton)`
  height: 1em;
  font-size: 1em;
  top: 0;
`;
