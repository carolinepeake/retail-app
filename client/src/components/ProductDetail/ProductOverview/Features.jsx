import React from 'react';
import styled from 'styled-components';

import { useGlobalContext } from '../../../contexts/GlobalStore';

function Features({ collapsed }) {
  const { productInfo } = useGlobalContext();

  let features = [];
  if (productInfo.features) {
    features = productInfo.features.map((feature, index) => (
      <Feature key={`${productInfo.id}feature${index}`}>
        <Text>&#x2713;</Text>
        <Text>{`${feature.value} ${feature.feature}`}</Text>
      </Feature>
    ));
  }

  return (
    <Container role="list" collapsed={collapsed}>
      { features }
    </Container>
  );
}

const Container = styled.ul`
  list-style-type: none;
  font-size: 1.0em;
  display: ${(props) => (props.collapsed ? 'none' : 'flex')};
  flex-direction: column;
  align-items: flex-start;

  @media (min-width: 700px) {
    grid-column: 4 / span 2;
    grid-row: 3 / 4;
    padding-left: 2rem;
    height: 100%
    margin-bottom: 0px;
    margin-top: 0px;
    border-left: black thin solid;
    margin-bottom: 0px;
  };

  @media (min-width: 1200px) {
    padding-left: 15%;
  };
`;
// display: flex;

const Feature = styled.li`
  list-style-type: none;
  padding-bottom: 1rem;
  padding-top: 0px;
  display: list-item;
  &:last {
    padding-bottom: 0px
  };
  display: flex;
  justify-content: flex-start;
  margin: 0px;
`;
// &:before {
//   content: "+ ";
// };
// TO-DO: implement grid so checkmark and text spans outwards as screen grows


const Text = styled.span`
  padding-left: 0.5em;
`;

export default Features;
