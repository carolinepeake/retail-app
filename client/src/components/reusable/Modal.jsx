import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import axios from 'axios';
import { Button } from './Button';
// import { useGlobalContext } from '../../../contexts/GlobalStore';
// import useModal from '../utils/useModal';

// function ModalHeader({ children }) {
//   return (
//     <Header>
//       {children}
//     </Header>
//   );
// }

// const Header = styled.header`
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   width: 100%;
//   @media (min-width: 40rem) {
//     width: 90%;
//   };

//   @media (min-width: 50rem) {
//     width: 80%;
//   };
//   margin-bottom: 0.5rem;
// `;

// function ModalBody({ children }) {
//   return (
//     <ModalBody>
//       {children}
//     </ModalBody>
//   );
// }

// function ModalFooter({ children }) {
//   return (
//     <Footer>
//       {children}
//     </Footer>
//   );
// }

// const Footer = styled.div`
//   display: flex;
//   flex-direction: column;
//   padding-top: 1.5em;
//   width: 100%;

//   @media (min-width: 40rem) {
//     width: 90%;
//   };

//   @media (min-width: 50rem) {
//     width: 80%;
//   };

//   @media (min-width: 600px) {
//     flex-direction: row;
//     column-gap: 2rem;
//     justify-content: space-evenly;
//     align-items: center;
//   };
// `;

function Modal({ showModal, closeModal, children }) {
  function clickOutsideModal(event) {
    if (event.target.id === 'background') {
      closeModal();
    }
  }
  // click outside done another way
  // const inputRef = useRef(null);
  const modalRef = useRef(null);

  const onClickOutside = (e) => {
    const element = e.target;
    if (modalRef.current && !modalRef.current.contains(element)) {
      e.preventDefault();
      e.stopPropagation();
      closeModal();
    }
  };

  useEffect(() => {
    // inputRef.current.focus();
    document.body.addEventListener('click', onClickOutside);
    return () => document.removeEventListener('click', onClickOutside);
  }, []);

  // const onChange = (e) => {
  //   setValue(e.target.value);
  // };

  // const onSub = (e) => {
  //   e.preventDefault();
  //   onSubmit(value);
  //   onClose();
  // };

  return showModal ? (
    <ModalBackground
      id="background"
      onClick={(event) => clickOutsideModal(event)}
    >
      <ModalContainer
        ref={modalRef}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Button close onClick={closeModal}>
          &#x2715;
        </Button>
        {children}
      </ModalContainer>
    </ModalBackground>
  ) : null;
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
};

const ModalBackground = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0%;
  top: 0%;
  z-index: 51;
  @media (min-width: 50rem) {
    z-index: 20;
  }
`;

// ModalDialogue?
const ModalContainer = styled.div`
  width: 100vw;
  max-height: 100vh;
  z-index: 52;
  padding: 2.5em;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.backgroundColor};
  overflow: auto;
  position: relative;

  @media (min-width: 40rem) {
    width: 70vw;
    border: 1px solid;
    max-height: 90vh;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }

  @media (min-width: 50rem) {
    max-height: 80vh;
    width: 60vw;
    z-index: 21;
    top: 1.5rem;
  }
`;

export default Modal;
