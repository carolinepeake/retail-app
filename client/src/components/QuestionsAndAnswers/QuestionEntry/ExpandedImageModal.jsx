import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function ExpandedImageModal({ src, setShowModal }) {
  ExpandedImageModal.propTypes = {
    src: PropTypes.string.isRequired,
    setShowModal: PropTypes.func.isRequired,
  };

  function closeModal(event) {
    if (event.target.id === 'background') {
      setShowModal(false);
    }
  }

  return (
    <ModalBackground
      id="background"
      onClick={(event) => closeModal(event)}
    >
      <ModalContainer>
        <CloseButtonDiv>
          <CloseButtonButton onClick={() => setShowModal(false)}>
            &#10006;
          </CloseButtonButton>
        </CloseButtonDiv>
        <Image src={src} alt="modal-image" />
      </ModalContainer>
    </ModalBackground>
  );
}

const ModalBackground = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.backgroundColor};
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0%;
  top: 0%;
  color: ${(props) => props.theme.fontColor};
`;

const ModalContainer = styled.div`
  max-width: 60vw;
  max-height: 90vh;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  flex-direction: column;
  padding: 25px;
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.fontColor};
`;

const CloseButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CloseButtonButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: ${(props) => props.theme.fontColor};
`;

const Image = styled.img`
  max-width: 50vw;
  max-height: 50vh;
`;

export default ExpandedImageModal;
