import React from 'react';
import styled from 'styled-components';

import { useGlobalContext } from '../../../contexts/GlobalStore';

// TO-DO: don't display null feature values, make sure spaces between words

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
  list-style-type: none;
  padding-top: 0.75em;
  padding-bottom: 0px;
  display: list-item;
  font-weight: 300;
  font-size: 1.0em;
  &:last {
    padding-bottom: 0px
  };
  display: flex;
  justify-content: flex-start;
  margin: 0px;
`;

const Text = styled.span`
  padding-left: 0.5em;
`;

export default Features;
