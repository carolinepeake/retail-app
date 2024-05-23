import React from 'react';
import styled from 'styled-components';
import Features from './Features';
import Collapsable from '../../../components/Collapsable';
import { RETURN_TEXT, STANDARD_DELIVERY_TEXT, TWO_DAY_DELIVERY_TEXT } from '../../../constants/constants';

// TODO: start with details and features and maybe return collapsible open

function CollapsedDetails({ slogan, description, features }) {
  return (
    <Container>
      <Collapsable header="Details">
        <Subheader>{slogan}</Subheader>
        <Content>{description}</Content>
        {features && <Features features={features} />}
      </Collapsable>

      <Collapsable header="Shipping">
        <Subheader>Standard</Subheader>
        <Content>{STANDARD_DELIVERY_TEXT}</Content>
        <Subheader>Two Day Delivery</Subheader>
        <Content style={{ marginBlockEnd: '0px' }}>{TWO_DAY_DELIVERY_TEXT}</Content>
      </Collapsable>

      <Collapsable header="Returns">
        <Subheader>Online</Subheader>
        <Content style={{ marginBlockEnd: '0px' }}>{RETURN_TEXT}</Content>
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
