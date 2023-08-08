import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from './Button';

function Modal({
  closeModal,
  children,
}) {
  const clickOutsideModal = (event) => {
    if (event.target.id === 'modalBackground') {
      closeModal();
    }
  };
  // click outside modal alternative -- not sure which is better
  // const modalRef = useRef(null);
  // useEffect(() => {
  //   const onClickOutside = (e) => {
  //     const element = e.target;
  //     if (!modalRef?.current?.contains(element)) {
  //       e.preventDefault();
  //       e.stopPropagation();
  //       closeModal();
  //     }
  //   };
  //   document.body.addEventListener('click', onClickOutside);
  //   return () => document.removeEventListener('click', onClickOutside);
  // }, []);

  // const inputRef = useRef(null);
  // useEffect(() => {
  //  inputRef.current.focus();
  // }, []);

  return (
    <ModalBackground
      id="modalBackground"
      onClick={clickOutsideModal}
    >
      <ModalContainer
        // ref={modalRef}
      >
        <Button close onClick={closeModal}>
          &#x2715;
        </Button>
        {children}
      </ModalContainer>
    </ModalBackground>
  );
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  // children: React.el.isRequired,
};

const ModalBackground = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
 /* z-index: 51;
  @media (min-width: 50rem) {
    z-index: 20;
  } */
  z-index: 20;
`;

// ModalDialogue?
const ModalContainer = styled.div`
  width: 100vw;
  max-height: 100vh;
/*  z-index: 52; */
  padding: 2.5em;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.backgroundColor};
  overflow: auto;
  position: relative;
  max-width: 40em;

  @media (min-width: 40rem) {
    border: 1px solid;
    max-height: 90vh;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    padding: 3em;
  }

  @media (min-width: 50rem) {
    max-height: 80vh;
   /* z-index: 21; */
    top: 1.5rem;
  }
`;

export default Modal;
