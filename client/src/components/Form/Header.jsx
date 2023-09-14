import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CloseButton } from '../Buttons';
import RequiredDisclaimer from './RequiredDisclaimer';

export default function Header({
  product,
  closeModal,
  title,
}) {
  return (
    <div>
      <ModalTitle>
        <span>
          {title}
        </span>
        <ExitModal
          $square
          onClick={closeModal}
        >
          &#x2715;
        </ExitModal>
      </ModalTitle>
      <ProductName>
        {product}
      </ProductName>
      <RequiredDisclaimer />
    </div>
  );
}

Header.propTypes = {
  closeModal: PropTypes.func.isRequired,
  product: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

// const FormHeader = styled.div``;

const ExitModal = styled(CloseButton)`
  right: -0.25em;
  top: -0.25em;
  font-size: 1em;
  line-height: 1em;
`;

const ModalTitle = styled.h2`
  line-height: 1.5em;
  line-height: 1em;
  position: relative;
  height: auto;
`;

const ProductName = styled.h1`
  margin: default;
`;
