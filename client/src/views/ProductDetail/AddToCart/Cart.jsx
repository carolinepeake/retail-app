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
      key={item.sku}
      item={item}
      cart={cart}
      setCart={setCart}
    />
  ));

  const subtotal = cart.reduce((accumulator, currentValue) => accumulator + Number(currentValue.originalPrice), 0);

  return (
    <>
      <Background
        id="appBackground"
        onClick={handleCloseModal}
        $visible={showModal}
      />
      <Container
        $visible={showModal}
      >
        <Header>
          <Title>
            Cart
          </Title>

          <CartCloseButton
            $square
            onClick={handleCloseModal}
          >
            &#x2715;
          </CartCloseButton>
        </Header>

        <ScrollContainer>
          <List>
            {cart.length > 0
              ? items
              : 'Your cart is empty.'}
          </List>
        </ScrollContainer>

        <Footer>
          <Subtotal>
            <span>Subtotal</span>
            <span>{`$${subtotal}.00`}</span>
          </Subtotal>
          <CartButton
            $primary
          >
            Checkout
          </CartButton>
        </Footer>
      </Container>
    </>
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

const Background = styled.div`
  display: none;
  display: ${(props) => props.$visible && 'block'};
  width: 100vw;
  height: 100vh;
  position: absolute;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.3);
`;

const Container = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  right: ${(props) => (props.$visible ? '0' : '-20em')};
  top: 0;
  width: 20em;
  height: 100vh;
  overflow: auto;
  z-index: 100;
  background: ${(props) => props.theme.backgroundColor};
  background: ${(props) => props.theme.navBgColor};
 /* border: 1px black solid;
  border-radiu: 3px; */
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
 /* padding: 1em; */
  transition: 0.5s ease;
`;

const Header = styled.div`
  padding: 1em;
`;

const Title = styled.h2`
  margin-bottom: 1em;
  margin-bottom: 0em;
  height: auto;
`;

const CartCloseButton = styled(CloseButton)`
  top: 0.5em;
  right: 0.5em;
  font-size: 1.5em;
`;

const ScrollContainer = styled.div`
  overflow: auto;
  scrollbar-color: ${(props) => props.theme.darkBlueHover};
  padding: 1em 2em 1em 2em;
  background: ${(props) => props.theme.backgroundColor};
  flex: 1;
`;

const List = styled.ul`
  padding: 0;
  margin: 0;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 1.0em;
 /* height: 8em; */
  padding: 1em;
`;

const Subtotal = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1em 2em 1em 1em;
  font-weight: 400;
`;

const CartButton = styled(Button)`
  flex: 1;
  margin: 0.5rem 0;
  margin: 1rem 0;
  background-color: ${(props) => props.theme.blue[5]};
  color: white;
  border: none;
`;

export default Cart;
