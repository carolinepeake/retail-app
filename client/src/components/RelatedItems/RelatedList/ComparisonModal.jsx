/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useGlobalContext } from '../../../contexts/GlobalStore';
import { Button } from '../../reusable/Button';

function ComparisonModal({ details, closeModal }) {
  const {
    productInfo,
  } = useGlobalContext();

  const currentProduct = productInfo.features;
  const comparedProduct = details.features;

  const comparison = {};
  for (let i = 0; i < currentProduct.length; i += 1) {
    if (currentProduct[i].value === null) {
      comparison[currentProduct[i].feature] = {
        [productInfo.name]: '✓',
        [details.name]: '',
        feature: currentProduct[i].feature,
      };
    } else {
      comparison[currentProduct[i].feature] = {
        [productInfo.name]: currentProduct[i].value.match(/[A-Z][a-z]+/g).join(' '),
        [details.name]: '',
        feature: currentProduct[i].feature,
      };
    }
  }
  for (let i = 0; i < comparedProduct.length; i += 1) {
    // Create the "feature" property in modal if it doesn't exist in current product
    if (comparison[comparedProduct[i].feature] === undefined) {
      if (comparedProduct[i].value === null) {
        comparison[comparedProduct[i].feature] = {
          [details.name]: '✓',
          [productInfo.name]: '',
          feature: comparedProduct[i].feature,
        };
      } else {
        comparison[comparedProduct[i].feature] = {
          [details.name]: comparedProduct[i].value.match(/[A-Z][a-z]+/g).join(' '),
          [productInfo.name]: '',
          feature: comparedProduct[i].feature,
        };
      }
    } else {
      comparison[comparedProduct[i].feature][details.name] = comparedProduct[i].value.match(/[A-Z][a-z]+/g).join(' ');
    }
  }
  const allFeatures = Object.values(comparison);

  return (
    <ModalContainer>
      <Table>
        <Caption>
          <span>Compare Products</span>
          <CloseButton close type="button" onClick={() => closeModal()}>&#x2715;</CloseButton>
        </Caption>
        <thead>
          <tr>
            <ProductHeading id={productInfo.name}>
              {productInfo.name}
            </ProductHeading>
            <FeaturesHeading />
            <ProductHeading id={details.name}>
              {details.name}
            </ProductHeading>
          </tr>
        </thead>
        <Body>
          {allFeatures.map((feature) => (
            <Row key={feature.feature}>
              <Cell headers={`${productInfo.name} ${feature.feature}`}>
                {feature[productInfo.name]}
              </Cell>
              <FeatureName id={feature.feature}>
                {feature.feature}
              </FeatureName>
              <Cell headers={`${details.name} ${feature.feature}`}>
                {feature[details.name]}
              </Cell>
            </Row>
          ))}
        </Body>
      </Table>
    </ModalContainer>
  );
}

ComparisonModal.propTypes = {
  details: PropTypes.shape({
    name: PropTypes.string,
    category: PropTypes.string,
    id: PropTypes.number,
    price: PropTypes.string,
    features: PropTypes.arrayOf(
      PropTypes.shape({
        feature: PropTypes.string,
        value: PropTypes.string,
      }),
    ),
  }).isRequired,
  closeModal: PropTypes.func.isRequired,
};

const ModalContainer = styled.div`
  max-width: 90vw;
  width: 32rem;
  max-height: 100%;
  border-radius: 3px;
  z-index: 52;
  background-color: ${(props) => props.theme.navBgColor};
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  padding: 1em;
`;

const Table = styled.table`
  table-layout: fixed;
  width: 100%;
  height: 100%;
  border-radius: 3px;
  margin: 0 auto;
  display: block;
  overflow-x: auto;
  border-spacing: 0;
  background-color: ${(props) => props.theme.backgroundColor};
`;
// font-size: 0.83em;

const Caption = styled.caption`
  padding: 1em;
  text-align: start;
  font-size: 400;
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  position: relative;
`;

const CloseButton = styled(Button)`
  top: 0.25em;
`;

const Heading = styled.th`
  padding: 0.5em;
  vertical-align: center;
  font-weight: 400;
  border: 1px solid ${(props) => props.theme.inputPlaceholder};
  border-left-width: 0;
  position: sticky;
  top: 0;
  background-color: ${(props) => props.theme.submitButton};
  &:first-child {
    border-left-width: 1px;
  }
`;

const ProductHeading = styled(Heading)`
  width: 37%;
`;

const FeaturesHeading = styled(Heading)`
  width: 26%;
  background-color: ${(props) => props.theme.submitButton};
`;

const Body = styled.tbody`
  text-align: center;
  border-left: 1px solid ${(props) => props.theme.inputPlaceholder};
  border-right: 1px solid ${(props) => props.theme.inputPlaceholder};
  border-bottom: 1px solid ${(props) => props.theme.inputPlaceholder};
  white-space: no-wrap;
`;

const Row = styled.tr`
  border-left: 1px solid ${(props) => props.theme.inputPlaceholder};
  border-right: 1px solid ${(props) => props.theme.inputPlaceholder};
  &:nth-of-type(even) {
    background-color: ${(props) => props.theme.navBgColor};
  }
`;

const FeatureName = styled.th`
  font-weight: 300;
  border: 1px solid ${(props) => props.theme.inputPlaceholder};
  border-left-width: 0;
  border-top-width: 0;
  padding: 0.5em;
`;

const Cell = styled.td`
  padding: 1em;
  border: 1px solid ${(props) => props.theme.inputPlaceholder};
  border-top-width: 0;
  border-left-width: 0;
  &:last-child {
    border-right-width: 0;
  }
  &:first-child {
    border-left-width: 1px;
  }
  color: ${(props) => props.theme.secondaryFontColor};
`;

export default ComparisonModal;
