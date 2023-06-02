import React, { useState } from 'react';
import styled from 'styled-components';

import ProductOverview from './ProductOverview/ProductOverview';
import StyleSelector from './StyleSelector/StyleSelector';
import ImageGallery from './ImageGallery/ImageGallery';
import AddToCart from './AddToCart/AddToCart';
import Features from './ProductOverview/Features';
import ProductPath from './ProductOverview/ProductPath';
import Collapsable from '../reusable/Collapsable';

import { useGlobalContext } from '../../contexts/GlobalStore';

const RETURN_TEXT = 'Returns must be made within 30 days for refunds to process to the original form of payment.';
const STANDARD_DELIVERY_TEXT = 'For most orders, allow 4-9 business days for delivery. For delivery to Alaska or Hawaii, please allow 10-15 business days for delivery.';
const TWO_DAY_DELIVERY_TEXT = 'Order must be submitted before 12:00pm EST Monday-Friday.';

function ProductDetail() {
  const { productInfo } = useGlobalContext();
  const [status, setStatus] = useState('default');
  const [place, setPlace] = useState(0);

  return (
    <ProductSec id="product-details">
      {status === 'default'
        ? (
          <>
            <ProductPath />
            <ProductContainer>
              <ImageGallery
                status={status}
                setStatus={setStatus}
                place={place}
                setPlace={setPlace}
              />

              <RightColumn>
                <ProductOverview />
                <StyleSelector />
                <AddToCart />

                <div>
                  <Collapsable header="Details">
                    {productInfo.slogan
                  && <ProductSlogan>{productInfo.slogan}</ProductSlogan>}
                    {productInfo.description
                  && <ProductDescription>{productInfo.description}</ProductDescription>}
                    {productInfo.features && <Features />}
                  </Collapsable>

                  <Collapsable header="Shipping">
                    <ProductSlogan>Standard</ProductSlogan>
                    <ProductDescription>{STANDARD_DELIVERY_TEXT}</ProductDescription>
                    <ProductSlogan>Two Day Delivery</ProductSlogan>
                    <ProductDescription>{TWO_DAY_DELIVERY_TEXT}</ProductDescription>
                  </Collapsable>

                  <Collapsable header="Returns">
                    <ProductDescription style={{ marginBlockStart: '0px', paddingTop: '0.75em' }}>{RETURN_TEXT}</ProductDescription>
                  </Collapsable>
                </div>
              </RightColumn>
            </ProductContainer>
          </>
        ) : (
          <Expanded>
            <ImageGallery
              status={status}
              setStatus={setStatus}
              place={place}
              setPlace={setPlace}
            />
          </Expanded>
        )}
    </ProductSec>
  );
}

export default ProductDetail;

const ProductSec = styled.div`
  padding-left: 5%;
  padding-right: 5%;
  margin-top: 1.5rem;

  @media (min-width: 1200px) {
    margin-right: auto;
    margin-left: auto;
  }
`;

const ProductContainer = styled.div`
  width: 100%;
  height: 100%;

@media (min-width: 600px) {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
};
`;

const RightColumn = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  flex: 1 1 300px;
  max-width: 450px;

  @media (min-width: 600px) {
    display: flex;
    flex-direction: column;
    align-items: space-between;
    justify-content: space-evenly;
    padding-left: 0.5em;
  };

  @media (min-width: 700px) {
    padding-left: 1em;
  };
`;

const ProductSlogan = styled.h3`
  display: block;
  margin-block-end: 0em;
  margin-top: 0px;
  font-weight: 400;
  font-size: 1.0em;
  margin-block-start: 0px;
  margin: 0px;
  padding-top: 0px;
  padding-bottom: 0px;
`;

const ProductDescription = styled.p`
  padding-left: 0.5em;
  display: block;
  font-weight: 300;
  font-size: 1.0em;
  margin-block-end: 1em;
  margin-block-start: 0px;
  padding-top: 0.75em;
  color: ${(props) => props.theme.minorFontColor};
`;

const Expanded = styled.div`
  overflow: none;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;
