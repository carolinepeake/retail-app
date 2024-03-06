import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { CloseButton } from './Buttons';

function Modal({
  closeModal,
  children,
  submitted,
  side,
  isExpanded,
}) {
  const clickOutsideModal = (event) => {
    if (event.target.id === 'modalBackground') {
      closeModal();
    }
  };

  const modal = side
    ? (
      <SidebarContainer
        isExpanded={isExpanded}
      >
        <CollapseSide
          $square
          onClick={closeModal}
        >
          &#x2715;
        </CollapseSide>
        {children}
      </SidebarContainer>
    )
    : (
      <ModalContainer
        $submitted={submitted}
      >
        {/* <ExitModal
          $square
          onClick={closeModal}
          $submitted={submitted}
        >
          &#x2715;
        </ExitModal> */}
        {children}
      </ModalContainer>
    );

  return (
    <ModalBackground
      id="modalBackground"
      onClick={clickOutsideModal}
      $side={side}
      isExpanded={isExpanded}
    >
      {modal}
    </ModalBackground>
  );
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  submitted: PropTypes.bool,
};

Modal.defaultProps = {
  submitted: false,
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

  ${(props) => props.$side && css`
    display: none;
    display: ${props.isExpanded && 'block'};
  `};
`;

const ModalContainer = styled.div`
  width: 100vw;
  max-height: 100vh;
  z-index: 52;
  padding: 2em 1em;
  background-color: ${(props) => props.theme.backgroundColor};
  overflow: auto;
  position: relative;
  max-width: 40em;

  @media (min-width: 500px) {
    padding: 2em;
  }

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

  ${(props) => props.$submitted && css`
    width: fit-content;
  `};
`;

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
 /* z-index: 5; */
  z-index: 100;
  right: ${(props) => (props.isExpanded ? '0' : '-20em')};
  transition: 0.5s ease;
  top: 0;
  width: 20em;
  max-width: 85vw;
  height: 100vh;
  background-color: ${(props) => props.theme.blue[0]};
  background-color: ${(props) => props.theme.navBgColor};
  background-color: ${(props) => props.theme.backgroundColor};
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  padding: 1em;
  padding-top: 4em;

  @media (min-width: 50rem) {
    display: none;
  }
`;

const CollapseSide = styled(CloseButton)`
  font-size: 1.5em;
  top: 0.5em;
  right: 0.5em;

 /* right: 0.875rem;
  top: 0.875rem;
  padding: 0.25rem; */
`;

const ExitModal = styled(CloseButton)`
  padding: 0.25em;
  top: 1.125em;
  right: 1.125em;
  width: 1.5em;
  height: 1.5em;
  font-size: 1.5em;

  @media (max-width: 500px) {
    right: 0.5em;
  }

  @media (min-width: 40rem) {
    right: 1.75em;
  }
`;

export default Modal;
