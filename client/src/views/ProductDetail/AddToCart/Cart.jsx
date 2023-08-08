import React from 'react';
import styled from 'styled-components';
import { Button, StyledExitButton } from '../../../components/Button';
import CartItem from './CartItem';

function Cart({ showModal, toggleModal, cart }) {
  console.log('cart: ', cart);

  const items = cart.map((item) => (
    <CartItem
      key={item.product}
      item={item}
    />
  ));

  const handleCloseModal = () => {
    toggleModal();
  };

  return (
    <Container>
      <h4>Cart</h4>
      <StyledExitButton type="button" onClick={handleCloseModal}>
        &#x2715;
      </StyledExitButton>
      {items}
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

const Container = styled.div`
  position: fixed;
  right: 0;
  top: 4.5em;
  width: 20em;
  transform: translateY(-10em) smooth 1s;
  height: 80%;
  overflow: auto;
  z-index: 4;
  background: ${(props) => props.theme.backgroundColor};
  border: 1px black solid;
  border-radiu: 3px;
  padding: 1em;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 1.0em;

 /* @media (min-width: 800px) {
    flex-direction: row;
    column-gap: 2rem;
    justify-content: space-evenly;
    align-items: center;
    padding: 1.0em 0 1.0em 0;
  } */
`;

const CartButton = styled(Button)`
  flex: 1;
  margin: 0.5rem 0;

 /* @media (min-width: 800px) {
    margin: 0;
  } */
`;


export default Cart;
