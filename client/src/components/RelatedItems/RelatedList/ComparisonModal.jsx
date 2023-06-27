/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useGlobalContext } from '../../../contexts/GlobalStore';

// TO-DO: if value of feature is true, make checkmark, if value false, blank
// make algorithim less complicated
// maybe just make undefined if no value

function ComparisonModal({ details }) {
  const {
    productInfo,
  } = useGlobalContext();
  const currentProduct = productInfo.features;
  const comparedProduct = details.features;

  // make array of all features
  // at least 3n, right? 1 for each array and then at least one to filter
  // find out time constant for filter method
  // make object for each product, with feature as key and value as value
  //
  // iterate through features array, and if product object has value for feature, mark in comparison, otherwise leave blank

  // go through current product features
  // make object with feature as key and object as property with current product name as key and feature value as value,
  // go through compared product features, if

  const modal = {};
  for (let i = 0; i < currentProduct.length; i += 1) {
    if (typeof currentProduct[i].value === 'boolean') {
      modal[currentProduct[i].feature] = {
        [productInfo.name]: currentProduct[i].value,
        [details.name]: false,
        feature: currentProduct[i].feature,
      };
    } else {
      modal[currentProduct[i].feature] = {
        [productInfo.name]: currentProduct[i].value,
        [details.name]: '',
        feature: currentProduct[i].feature,
      };
    }
    // modal[currentProduct[i].feature][0] = currentProduct[i].value;
  }
  for (let i = 0; i < comparedProduct.length; i += 1) {
    // Create the "feature" property in modal if it doesn't exist in current product
    if (modal[comparedProduct[i].feature] === undefined) {
      if (typeof comparedProduct[i].value === 'boolean') {
        modal[comparedProduct[i].feature] = {
          [details.name]: comparedProduct[i].value,
          [productInfo.name]: false,
          feature: comparedProduct[i].feature,
        };
      } else {
        modal[comparedProduct[i].feature] = {
          [details.name]: comparedProduct[i].value,
          [productInfo.name]: '',
          feature: comparedProduct[i].feature,
        };
      }
      // modal[comparedProduct[i].feature] = { [details.name]: comparedProduct[i].value };
    } else {
      modal[comparedProduct[i].feature][details.name] = comparedProduct[i].value;
    }
    // modal[comparedProduct[i].feature][1] = comparedProduct[i].value;
  }
  console.log('modal: ', modal);
  const allFeatures = Object.values(modal);
  console.log('allFeatures: ', allFeatures);
  // const outcome = [];
  // outcome[0] = [];
  // outcome[1] = [];
  // outcome[2] = [];
  // for (const key in modal) {

  //   if (!((modal[key][0] === undefined || modal[key][0] === null) && (modal[key][1] === undefined || modal[key][1] === null))) {
  //     outcome[0].push(modal[key][0]);
  //     if (modal[key][0] !== undefined) {
  //       outcome[1].push(modal[key][0]);
  //     } else {
  //       outcome[1].push(modal[key][1]);
  //     }
  //     outcome[2].push(modal[key][1]);
  //   }
  // }
  return (
    <ModalBackground>
      <ModalContainer>
        <Table>
          <thead>
            <tr>
              <Heading id={productInfo.name}>
                {productInfo.name}
              </Heading>
              <Heading>
                Features
              </Heading>
              {/* <td>
            &nbsp;
            </td> */}
              <Heading id={details.name}>
                {details.name}
              </Heading>
            </tr>
          </thead>
          <Body>
            {allFeatures.map((feature) => (
              <tr key={feature.feature}>
                <Cell headers={`${productInfo.name} ${feature.feature}`}>
                  {feature[productInfo.name]}
                </Cell>
                <FeatureName id={feature.feature}>
                  {feature.feature}
                </FeatureName>
                <Cell headers={`${details.name} ${feature.feature}`}>
                  {feature[details.name]}
                </Cell>
              </tr>
            ))}
          </Body>
        </Table>

        {/*
      <Product>
        <Heading>{productInfo.name}</Heading>
        {outcome[0].map((feature, i) => (feature ? <Product key={i}>&#10003;</Product> : <div key={i}>&nbsp;</div>))}
      </Product>
      <br />
      <Product>
        <Heading>Features</Heading>
        {outcome[1].map((feature, i) => (feature ? <Product key={i}>{feature}</Product> : <div key={i}>&nbsp;</div>))}
      </Product>
      <Product>
        <Heading>{details.name}</Heading>
        {outcome[2].map((feature, i) => (feature ? <Product key={i}>&#10003;</Product> : <div key={i}>&nbsp;</div>))}
      </Product> */}
      </ModalContainer>
    </ModalBackground>
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
`;
// @media (min-width: 50rem) {
//   z-index: 20;
// };

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
  };

  @media (min-width: 50rem) {
    max-height: 80vh;
    width: 60vw;
    top: 1.5rem;
  };
`;
// @media (min-width: 50rem) {
//   max-height: 80vh;
//   width: 60vw;
//   z-index: 21;
//   top: 1.5rem;
// };

const Modal = styled.div`
  position: absolute;
  overflow: auto;
  top: 20%;
  border: solid currentColor thin;
  background-color: ${(props) => props.theme.navBgColor};;
  z-index: 9;
  border-radius: 5px;
  min-width: 90%;
  width: 600px;
  max-width: 800px;
`;
// right: -35%;
// height: 150px;
// width: 400px;
// display: flex;
// justify-content: center;

const Table = styled.table`
  padding: 0.5em 1em;
  table-layout: fixed;
  width: 100%;
`;

const Heading = styled.th`
  width: 33%;
  padding: 0.25em;
  vertical-align: top;
`;

const Body = styled.tbody`
  text-align: center;
`;

const FeatureName = styled.th`
  font-weight: 300;
`;

const Cell = styled.td`
  padding: 0.25em;
`;

// const Heading = styled.div`
//   padding-bottom: 1em;
// `;
// const Product = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   font-size: 1.0rem;
//   padding: 0.25rem 0.25rem;
// `;

export default ComparisonModal;
