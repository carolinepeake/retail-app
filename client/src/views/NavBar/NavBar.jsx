import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Search from '../../components/Search';
import { Button, CloseButton } from '../../components/Buttons';
import Modal from '../../components/Modal';
import useModal from '../../hooks/useModal';
import LinksList from './LinksList';
import ToggleDarkMode from './ToggleDarkMode';
import NavItem from './NavItem';
import Cart from '../ProductDetail/AddToCart/Cart';

// TO-DO: add scroll event listener for nav sections
// TO-DO: add animation to make expanding nav smooth
// TO-DO: collapse nav when click away
// TODO: make search RightIcon width 2em instead of 2.5em
// & search input padding 0.5em instead of 0.75em

function NavBar({ toggleTheme }) {
  console.log('[NavBar] is running');
  NavBar.propTypes = {
    toggleTheme: PropTypes.func.isRequired,
  };

  const [searchClosed, setSearchClosed] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleNavbarVisibility = () => {
    setIsExpanded((prev) => !prev);
    console.log('toggleing NavBar');
  };

  const toggleSearchBarVisibility = () => {
    setSearchClosed((prev) => !prev);
  };

  const closeModal = (event) => {
    event.preventDefault();
    if (event.target.id === 'appBackground') {
      setIsExpanded(() => false);
    }
  };

  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
  };

  const handleClickIcon = () => {
    toggleSearchBarVisibility();
    setSearchTerm('');
  };

  const [showCart, toggleCart] = useModal();
  const [cart, setCart] = useState([]);

  const openCart = () => {
    const initializedCart = JSON.parse(localStorage.getItem('cart'));
    setCart(initializedCart);
    toggleCart();
  };

  // const showCart = () => {
  // };

  return (
    <Background id="navbar" searchClosed={searchClosed}>

      <Logo modal>&#10058;</Logo>

      <LinksList
        isExpanded={isExpanded}
        toggleTheme={toggleTheme}
      />
      <ToggleDarkMode
        isExpanded={isExpanded}
        toggleTheme={toggleTheme}
      />

      <RightSide searchClosed={searchClosed}>
        <Search
          placeholder="Search..."
          searchClosed={searchClosed}
          // handleClickIcon={toggleSearchBarVisibility}
          handleClickIcon={handleClickIcon}
          searchTerm={searchTerm}
          handleChange={handleChange}
          nav
        />
        {/* <svg fill="#000000" width="16px" height="16px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>search</title> <path d="M30.885 29.115l-10.103-10.103c1.538-1.911 2.468-4.368 2.468-7.042 0-6.229-5.050-11.279-11.279-11.279s-11.279 5.050-11.279 11.279c0 6.229 5.050 11.279 11.279 11.279 2.674 0 5.13-0.93 7.063-2.485l-0.022 0.017 10.103 10.103c0.226 0.226 0.539 0.366 0.884 0.366 0.691 0 1.251-0.56 1.251-1.251 0-0.345-0.14-0.658-0.366-0.884l0 0zM3.25 12c0-4.832 3.918-8.75 8.75-8.75s8.75 3.918 8.75 8.75c0 4.832-3.918 8.75-8.75 8.75v0c-4.83-0.005-8.745-3.92-8.75-8.749v-0.001z"></path> </g></svg> */}

        <CartIcon
          onClick={openCart}
          type="button"
        >
          <svg fill="#000000" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 483.1 483.1">
            <path strokeWidth="0" strokeLinecap="round" strokeLinejoin="round" d="M434.55,418.7l-27.8-313.3c-0.5-6.2-5.7-10.9-12-10.9h-58.6c-0.1-52.1-42.5-94.5-94.6-94.5s-94.5,42.4-94.6,94.5h-58.6 c-6.2,0-11.4,4.7-12,10.9l-27.8,313.3c0,0.4,0,0.7,0,1.1c0,34.9,32.1,63.3,71.5,63.3h243c39.4,0,71.5-28.4,71.5-63.3 C434.55,419.4,434.55,419.1,434.55,418.7z M241.55,24c38.9,0,70.5,31.6,70.6,70.5h-141.2C171.05,55.6,202.65,24,241.55,24z M363.05,459h-243c-26,0-47.2-17.3-47.5-38.8l26.8-301.7h47.6v42.1c0,6.6,5.4,12,12,12s12-5.4,12-12v-42.1h141.2v42.1 c0,6.6,5.4,12,12,12s12-5.4,12-12v-42.1h47.6l26.8,301.8C410.25,441.7,389.05,459,363.05,459z" />
          </svg>
        </CartIcon>

        <CollapsedNav
          type="button"
          id="navbar-toggle"
          aria-controls="navbar-menu"
          aria-label="Toggle menu"
          aria-expanded={isExpanded}
          onClick={toggleNavbarVisibility}
          searchClosed={searchClosed}
        >
          <IconBar />
          <IconBar />
          <IconBar />
        </CollapsedNav>
      </RightSide>

      {/* {isExpanded
      && (
      <> */}
        <AppBackground
          id="appBackground"
          onClick={closeModal}
          isExpanded={isExpanded}
        />
        <ExpandedNav
          isExpanded={isExpanded}
        >
          <CloseNav
            $square
            onClick={toggleNavbarVisibility}
          >
            &#x2715;
          </CloseNav>
          <Container>
            <LinksList
              isExpanded={isExpanded}
              secondary
            />
            <ToggleDarkMode
              isExpanded={isExpanded}
              toggleTheme={toggleTheme}
              secondary
            />
          </Container>
          {/* <Container>
            <NavItem
              isExpanded={isExpanded}
              secondary
              handleClick={showCart}
              label="Cart"
            />
          </Container> */}
        </ExpandedNav>

        {/* <Modal
          isExpanded={isExpanded}
          closeModal={toggleNavbarVisibility}
          side
        >
          <Container>
            <LinksList
              isExpanded={isExpanded}
              secondary
            />
            <ToggleDarkMode
              isExpanded={isExpanded}
              toggleTheme={toggleTheme}
              secondary
            />
          </Container>
        </Modal> */}
      {/* </>
      )} */}

        <Cart
          showModal={showCart}
          toggleModal={toggleCart}
          cart={cart || []}
          setCart={setCart}
        />

    </Background>
  );
}

const Background = styled.div`
  z-index: 50;
  position: sticky;
  top: 0;
  background-color: ${(props) => props.theme.navBgColor};
 /*  background-color: ${(props) => props.theme.blue[0]}; */
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.navFontColor};
 /* color: ${(props) => props.theme.blue[4]}; or 5 */
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
 /* font-weight: 700; */
  font-weight: 600;
  font-stretch: ultra-condensed;
 /* font-size: clamp(0.875rem, calc(0.5rem + 0.75vw), 1.25rem); */
  padding: 0.5em 5%;
  /* padding: 0 5%; */

  @media (min-width: 50rem) {
    padding-right: 2.5%;
    padding-left: 2.5%;
    flex-wrap: ${(props) => (props.searchClosed ? 'nowrap' : 'wrap')};
  }

  @media (min-width: 57rem) {
    flex-wrap: nowrap;
  }

  @media (min-width: 62rem) {
    padding: 0 5%;
  }
`;

const Logo = styled(Button)`
  position: relative;
  z-index: 6;
  border: none;
  border-radius: 50px;
  margin: 0;
  background-color: ${(props) => props.theme.backgroundColor};
  color:  ${(props) => props.theme.navFontColor};
  /* color:  ${(props) => props.theme.blue[5]}; 0 4 */
  &:hover {
    background-color: ${(props) => props.theme.secondaryBackgroundColor};
   /* background-color: ${(props) => props.theme.blue[3]}; */
   /* color: ${(props) => props.theme.navActiveFontColor}; */
    box-shadow: initial;
  }
  font-size: calc(24px + 1.2vw);
  padding: 0px calc(4px + 0.25vw);

  @media (min-width: 900px) {
  /*  padding: calc(1px + 0.5vw) calc(4px + 0.5vw);
    font-size: calc(10px + 1.2vw); */
  }
`;

const RightSide = styled.div`
  display: flex;
  align-items: flex-end;
  margin-left: 1em;
  width: fit-content;
  padding-top: 0.25em;
  padding-bottom: 0.25em;
  ${(props) => !props.searchClosed && css`
    width: 100%;
  `};

  @media (min-width: 50rem) {
    margin-left: 0.25em;
    width: 100%;
    padding-top: 0.75em;
    ${(props) => props.searchClosed && css`
      width: fit-content;
      padding-top: 0.25em;
    `};
  }

  @media (min-width: 57rem) {
    width: 10em;
    padding-top: 0.25em;
    ${(props) => props.searchClosed && css`
      width: fit-content;
    `};
  }

  @media (min-width: 65em) {
    width: 11em;
  }

  @media (min-width: 69em) {
    width: initial;
  }
`;

const CollapsedNav = styled.button`
  border: none;
  border-radius: 5px;
  height: 2em;
  width: 2.5em;
  aspect-ratio: 1/1;
  background-color: transparent;
  align-self: center;
  padding: 0.25em;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-left: 1.0em;
  color: ${(props) => props.theme.navFontColor};
  /* color:  ${(props) => props.theme.blue[4]}; or 5*/
  opacity: 1.0;
  &:hover {
    opacity: 1.0;
    color: ${(props) => props.theme.navActiveFontColor};
   /*  color:  ${(props) => props.theme.blue[5]}; */
  }
  ${(props) => props.searchClosed && css`
    margin-left: 0.5em;
  `};

  @media (min-width: 50rem) {
    display: none;
  }
`;

const AppBackground = styled.div`
  display: none;
  display: ${(props) => props.isExpanded && 'block'};
  width: 100vw;
  height: 100vh;
  position: absolute;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.3);

  @media (min-width: 50rem) {
    display: none;
  }
`;

const ExpandedNav = styled.div`
  display: flex;
  flex-direction: column;
  /* position: absolute; */
  position: fixed;
 /* z-index: 5; */
  z-index: 100;
 /* right: 5%; */
  /* right: 0; */
  right: ${(props) => (props.isExpanded ? '0' : '-20em')};
 /* top: ${(props) => (props.isExpanded ? '4em' : '-1en')}; */
  transition: 0.5s ease;
 /* top: 100%; */
  top: 0;
  width: 20em;
  max-width: 85vw;
  height: 100vh;
 /* border: ${(props) => props.theme.fontColor} solid 1px; */
  background-color: ${(props) => props.theme.navBgColor};
  background-color: ${(props) => props.theme.backgroundColor};
 /* background-color: ${(props) => props.theme.blue[0]}; */
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  padding: 1em;
  padding-top: 4em;


  @media (min-width: 50rem) {
    display: none;
  }
`;

const CloseNav = styled(CloseButton)`
  font-size: 1.5em;
  top: 0.5em;
  right: 0.5em;
`;

const Container = styled.div`
  padding: 1em 0;
  border-top: lightgrey 1px solid;
  border-bottom: lightgrey 1px solid;
`;

const IconBar = styled.span`
  display: block;
  width: 2em;
  height: 0.25em;
  background-color: currentColor;
`;

const CartIcon = styled.button`
  background: transparent;
  border: none;
`;

export default NavBar;
