import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button, StyledExitButton } from '../../../components/Button';
import CartItem from './CartItem';

// TODO: fix animation by making cart width 0 instead of conditionally rendering cart

function Cart({
  showModal,
  toggleModal,
  cart,
  setCart,
}) {
  console.log('cart: ', cart);

  const items = cart.map((item) => (
    <CartItem
      key={item.product}
      item={item}
      cart={cart}
      setCart={setCart}
    />
  ));

  const handleCloseModal = () => {
    toggleModal();
  };

  return (
    <Container $visible={showModal}>
      <Title>Cart</Title>
      <StyledExitButton type="button" onClick={handleCloseModal}>
        &#x2715;
      </StyledExitButton>
      <ScrollContainer>
        {cart.length > 0 ? items : 'Your cart is empty.'}
      </ScrollContainer>
      <ButtonContainer>
        <CartButton $primary>
          Checkout
        </CartButton>
        <CartButton type="button" onClick={handleCloseModal}>
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

const Container = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  right: 0;
  top: 4.5em;
  width: ${(props) => (props.$visible ? '20em' : '0')};
  height: 80%;
  overflow: auto;
  z-index: 4;
  background: ${(props) => props.theme.backgroundColor};
  border: 1px black solid;
  border-radiu: 3px;
  padding: 1em;
  transition: 0.5s;
`;

const Title = styled.h2`
  margin-bottom: 2em;
`;

const ScrollContainer = styled.div`
  overflow: auto;
  height: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 1.0em;
 /* position: absolute;
  bottom: 1em; */
`;

const CartButton = styled(Button)`
  flex: 1;
  margin: 0.5rem 0;
`;

export default Cart;
