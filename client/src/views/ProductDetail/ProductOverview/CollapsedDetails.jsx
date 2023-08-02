import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import Features from './Features';
import Collapsable from '../../../components/Collapsable';

import { useGlobalContext } from '../../../contexts/GlobalStore';

// can make each collapsible into an object { header, [ { subheader: content }] }

const RETURN_TEXT = 'Returns must be made within 30 days for refunds to process to the original form of payment.';
const STANDARD_DELIVERY_TEXT = 'For most orders, allow 4-9 business days for delivery. For delivery to Alaska or Hawaii, please allow 10-15 business days for delivery.';
const TWO_DAY_DELIVERY_TEXT = 'Order must be submitted before 12:00pm EST Monday-Friday.';

function CollapsedDetails() {
  const { productInfo } = useGlobalContext();

  return (
    <Container>
      <Collapsable header="Details">
        <Subheader>{productInfo?.slogan}</Subheader>
        <Content>{productInfo?.description}</Content>
        {productInfo?.features?.length > 0 && <Features />}
      </Collapsable>

      <Collapsable header="Shipping">
        <Subheader>Standard</Subheader>
        <Content>{STANDARD_DELIVERY_TEXT}</Content>
        <Subheader>Two Day Delivery</Subheader>
        <Content>{TWO_DAY_DELIVERY_TEXT}</Content>
      </Collapsable>

      <Collapsable header="Returns">
        <Content>{RETURN_TEXT}</Content>
      </Collapsable>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 0.5em;
`;

const Subheader = styled.h3`
  display: block;
  margin-block-end: 0em;
  margin-top: 0px;
  font-weight: 400;
  font-size: 1.0em;
  margin-block-start: 0px;
  margin: 0px;
  padding-top: 0px;
  padding-bottom: 0.75em;
`;

const Content = styled.p`
  padding-left: 0.5em;
  display: block;
  font-weight: 300;
  font-size: 1.0em;
  margin-block-end: 1em;
  margin-block-start: 0px;
  padding-top: 0px;
  color: ${(props) => props.theme.minorFontColor};
`;

export default CollapsedDetails;
