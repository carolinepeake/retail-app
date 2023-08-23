import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CloseButton } from './Buttons';

function Modal({
  closeModal,
  children,
}) {
  const clickOutsideModal = (event) => {
    if (event.target.id === 'modalBackground') {
      closeModal();
    }
  };

  return (
    <ModalBackground
      id="modalBackground"
      onClick={clickOutsideModal}
    >
      <ModalContainer>
        <CloseButton $square onClick={closeModal}>
          &#x2715;
        </CloseButton>
        {children}
      </ModalContainer>
    </ModalBackground>
  );
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
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
  z-index: 51;

  @media (min-width: 50rem) {
    z-index: 20;
  }
`;

const ModalContainer = styled.div`
  width: 100vw;
  max-height: 100vh;
  z-index: 52;
  padding: 2em;
  background-color: ${(props) => props.theme.backgroundColor};
  overflow: auto;
  position: relative;
  max-width: 40em;

  @media (min-width: 40rem) {
    border-radius: 3px;
    max-height: 90vh;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
   padding: 2em 3em;
  }

  @media (min-width: 50rem) {
    max-height: 80vh;
    z-index: 21;
    top: 1.5rem;
  }
`;

export default Modal;
