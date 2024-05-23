import React from 'react';
import styled from 'styled-components';

function Features({ features }) {
  function getFeaturesComponents(featuresList) {
    return featuresList.map(({ feature, value }, index) => (
      <Feature key={feature} index={index}>
        <Text>&#x2713;</Text>
        <Text>
          {value.match(/[A-Z][a-z]+/g).join(' ').concat(' ')}
          {feature}
        </Text>
      </Feature>
    ));
  }

  if (!features) {
    return null;
  }

  return (
    <Container role="list">
      Features
      {getFeaturesComponents(features)}
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
  margin-bottom: 0px; */ if content has padding of content background color */
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
