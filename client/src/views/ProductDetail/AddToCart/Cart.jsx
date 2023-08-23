import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button, CloseButton } from '../../../components/Buttons';
import CartItem from './CartItem';

function Cart({
  showModal,
  toggleModal,
  cart,
  setCart,
}) {
  const handleCloseModal = () => {
    toggleModal();
  };

  const items = cart.map((item) => (
    <CartItem
      key={item.product}
      item={item}
      cart={cart}
      setCart={setCart}
    />
  ));

  return (
    <Container
      $visible={showModal}
    >
      <Title>
        Cart
      </Title>

      <CartCloseButton
        $square
        onClick={handleCloseModal}
      >
        &#x2715;
      </CartCloseButton>

      <ScrollContainer>
        {cart.length > 0
          ? items
          : 'Your cart is empty.'}
      </ScrollContainer>

      <ButtonContainer>
        <CartButton
          $primary
        >
          Checkout
        </CartButton>
        <CartButton
          type="button"
          onClick={handleCloseModal}
        >
          Keep Shopping
        </CartButton>
      </ButtonContainer>
    </Container>
  );
}

Cart.propTypes = {
  showModal: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
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
    }),
  ).isRequired,
  setCart: PropTypes.func.isRequired,
};

// --accent-color: ${(props) => props.theme.darkBlueHover}; ?

const Container = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  right: ${(props) => (props.$visible ? '0' : '-20em')};
  top: 4.5em;
  width: 20em;
  height: 80%;
  overflow: auto;
  z-index: 4;
  background: ${(props) => props.theme.backgroundColor};
  border: 1px black solid;
  border-radiu: 3px;
  padding: 1em;
  transition: 0.5s ease;
`;

const Title = styled.h2`
  margin-bottom: 1em;
`;

const CartCloseButton = styled(CloseButton)`
  top: 0.25em;
  right: 0.25em;
`;

const ScrollContainer = styled.div`
  overflow: auto;
  height: 100%;
  scrollbar-color: ${(props) => props.theme.darkBlueHover};
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 1.0em;
`;

const CartButton = styled(Button)`
  flex: 1;
  margin: 0.5rem 0;
`;

export default Cart;
