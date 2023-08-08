import React from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../../contexts/GlobalStore';

function Features() {
  const { features } = useGlobalContext().productInfo;

  const featuresComponents = features.map(({ feature, value }, index) => (
    <Feature key={feature} index={index}>
      <Text>&#x2713;</Text>
      <Text>
        {value?.match(/[A-Z][a-z]+/g).join(' ').concat(' ')}
        {feature}
      </Text>
    </Feature>
  ));

  return (
    <Container role="list">
      Features
      { featuresComponents }
    </Container>
  );
}

const Container = styled.ul`
  list-style-type: none;
  font-size: 1.0em;
  font-weight: 400;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 0px;
  margin-top: 0px;
`;

const Feature = styled.li`
  padding-top: 0.75em;
  display: list-item;
  font-weight: 300;
  font-size: 1.0em;
`;

const Text = styled.span`
  padding-left: 0.5em;
`;

export default Features;
