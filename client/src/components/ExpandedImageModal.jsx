import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CloseButton } from './Buttons';

function ExpandedImageModal({ src, setShowModal }) {
  const closeModal = (event) => {
    if (event.target.id === 'background') {
      setShowModal(false);
    }
  };

  return (
    <ModalBackground
      id="background"
      onClick={closeModal}
    >
      <ModalContainer>
        <CloseButtonDiv>
          <CloseButton
            $round
            onClick={() => setShowModal(false)}
          >
            &#x2715;
          </CloseButton>
        </CloseButtonDiv>
        <Image
          src={src}
          alt="modal-image"
        />
      </ModalContainer>
    </ModalBackground>
  );
}

ExpandedImageModal.propTypes = {
  src: PropTypes.string.isRequired,
  setShowModal: PropTypes.func.isRequired,
};

const ModalBackground = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0%;
  top: 0%;
`;

const ModalContainer = styled.div`
  max-width: 60vw;
  max-height: 90vh;
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.fontColor};
`;

const CloseButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
`;

const Image = styled.img`
  max-width: 50vw;
  max-height: 50vh;
  border-radius: 3px;
`;

export default ExpandedImageModal;
