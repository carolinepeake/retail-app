/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useGlobalContext } from '../../../contexts/GlobalStore';

function ComparisonModal({ details }) {
  const {
    currOutfit,
  } = useGlobalContext();
  const currentProduct = currOutfit.details.data.features;
  const comparedProduct = details.data.features;
  const modal = {};
  for (let i = 0; i < currentProduct.length; i += 1) {
    modal[currentProduct[i].feature] = [];
    modal[currentProduct[i].feature][0] = currentProduct[i].value;
  }
  for (let i = 0; i < comparedProduct.length; i += 1) {
    // Create the "feature" property in modal if it doesn't exist in current product
    if (modal[comparedProduct[i].feature] === undefined) {
      modal[comparedProduct[i].feature] = [];
    }
    modal[comparedProduct[i].feature][1] = comparedProduct[i].value;
  }
  const outcome = [];
  outcome[0] = [];
  outcome[1] = [];
  outcome[2] = [];
  console.log(modal);
  for (const key in modal) {
    if (!((modal[key][0] === undefined || modal[key][0] === null) && (modal[key][1] === undefined || modal[key][1] === null))) {
      outcome[0].push(modal[key][0]);
      if (modal[key][0] !== undefined) {
        outcome[1].push(modal[key][0]);
      } else {
        outcome[1].push(modal[key][1]);
      }
      outcome[2].push(modal[key][1]);
    }
  }
  return (
    <Modal>
      <Product>
        {currOutfit.details.data.name}
        {outcome[0].map((feature, i) => (feature ? <Product key={i}>&#10003;</Product> : <div key={i}>&nbsp;</div>))}
      </Product>
      <Product>
        Features
        {outcome[1].map((feature, i) => (feature ? <Product key={i}>{feature}</Product> : <div key={i}>&nbsp;</div>))}
      </Product>
      <Product>
        {details.data.name}
        {outcome[2].map((feature, i) => (feature ? <Product key={i}>&#10003;</Product> : <div key={i}>&nbsp;</div>))}
      </Product>
    </Modal>
  );
}

ComparisonModal.propTypes = {
  details: PropTypes.shape({
    data: PropTypes.shape({
      features: PropTypes.arrayOf(PropTypes.shape({
        feature: PropTypes.string,
        value: PropTypes.string,
      })),
      name: PropTypes.string,
    }),
  }).isRequired,
};

const Modal = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  width: 400px;
  height: 150px;
  top: 20%;
  right: -35%;
  border: solid black thin;
  background-color: gray;
  overflow: auto;
  z-index: 9;
`;

const Product = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.75rem;
`;

export default ComparisonModal;
