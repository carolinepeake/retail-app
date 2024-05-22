import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button, PrimaryButton, BoxShadowButton, SquareCloseButton } from '../../../components/Buttons';
import CartItem from './CartItem';

// TODO: make universal sidebar /modal component and use same as side nav

// TODO: make sure properly lined up on right edge of page

function Cart({
  showCart,
  toggleCart,
  // closeCart,
}) {
  console.log('[CART] is running');

  // need to re-render every time showCart changes
  function getStorageValue(key, defaultValue) {
    // getting stored value
    const saved = localStorage.getItem(key);
    const initial = JSON.parse(saved);
    return initial || defaultValue;
  }

  const [cart, setCart] = useState(() => (
    getStorageValue('cart', [])
  ));

  if (!cart) {
    return null;
  }

  const subtotal = cart.reduce((accumulator, currentValue) => (
    accumulator + Number(currentValue.originalPrice)
  ), 0);

  return (
    <>
      {showCart && (
      <Background
        id="appBackground"
        onClick={toggleCart}
        $visible={showCart}
      />
      )}
      <Container
        $visible={showCart}
      >
        <Header>
          <Title>
            Cart
          </Title>

          <CloseSidebarBtn
            onClick={toggleCart}
          >
            &#x2715;
          </CloseSidebarBtn>
        </Header>

        <ScrollContainer>

          {cart.length > 0 ? (
            <List>
              {cart.map((item, index) => (
                <ListItem key={index} id={index}>
                  <CartItem
                    item={item}
                    index={index}
                    id={item.sku}
                    setCart={setCart}
                    cart={cart} // TODO: control for whether deleting 1/all of 1 product or deleting 2 of an item that has 10 of it in the cart
                  />

                </ListItem>
              ))}

            </List>
          ) : 'Your cart is empty.'}

        </ScrollContainer>

        <Footer>
          <Subtotal>
            <span>Subtotal</span>
            <span>{`$${subtotal}.00`}</span>
          </Subtotal>
          <CartButton>
            Checkout
          </CartButton>
        </Footer>
      </Container>
    </>
  );
}

Cart.propTypes = {
  showCart: PropTypes.bool.isRequired,
  toggleCart: PropTypes.func.isRequired,
  // cart: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     style_id: PropTypes.number,
  //     name: PropTypes.string,
  //     styleName: PropTypes.string,
  //     originalPrice: PropTypes.string,
  //     salePrice: PropTypes.string,
  //     photo: PropTypes.string,
  //     sku: PropTypes.string,
  //     product: PropTypes.Number,
  //     size: PropTypes.string,
  //     quantity: PropTypes.string,
  //   }),
  // ).isRequired,
  // setCart: PropTypes.func.isRequired,
};

const Background = styled.div`
  display: block;
  width: 100vw;
  height: 100vh;
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
  right: ${(props) => (props.$visible ? '0' : '-20em')};
  top: 0;
  width: 20em;
  width: 22em;
  height: 100vh;
  z-index: 100;
  background: ${(props) => props.theme.backgroundColor};
  background: ${(props) => props.theme.navBgColor};
 /* border: 1px black solid;
  border-radiu: 3px; */
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
 /* padding: 1em; */
  transition: 0.5s ease;

  overflow: auto;
  justify-content: space-between;
`;

const Header = styled.div`
 padding: 1em;
`;

const Title = styled.h2`
  margin-bottom: 1em;
  margin-bottom: 0em;
  height: auto;
`;

const CloseSidebarBtn = styled(SquareCloseButton)`
  top: 0.5em;
  right: 0.5em;
  font-size: 1.5em;
`;

const ScrollContainer = styled.div`
  overflow: auto;
  scrollbar-color: ${(props) => props.theme.darkBlueHover};
  padding: 1em 2em 1em 2em;
  background-color: ${(props) => props.theme.backgroundColor};
  background-color: ${(props) => props.theme.blue[0]};
  background-color: ${(props) => props.theme.backgroundColor};
  flex: 1;
`;

const List = styled.ul`
  padding: 0;
  margin: 0;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
`;

const Subtotal = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1em 2em 1em 1em;
  font-weight: 400;
`;

const CartButton = styled(BoxShadowButton)`
  flex: 1;
/*  margin: 0.5rem 0; */
  margin: 1rem 0;
 /* background-color: ${(props) => props.theme.blue[4]};
  color: white;
  border: none; */
  border-radius: 25px;
`;

const ListItem = styled.li`
  padding: 1em 0;
  padding: 1em;
  margin: 1em 0;
  border-bottom: ${(props) => props.theme.lightBorder};
  border-radius: 7.5px;
  box-shadow: rgba(0,0,0,0.25) 0px 5px 10px; /* Lighter than box-shadow used for cards elsewhere */
  background-color: rgba(209,217,235, 0.2);

`;

export default Cart;
