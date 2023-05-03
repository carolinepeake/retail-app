import React from 'react';
import styled, { css } from 'styled-components';

import { useGlobalContext } from '../../../contexts/GlobalStore';

function Features({ collapsed }) {
  const { productInfo } = useGlobalContext();
  // const [features, setFeatures] = useState([]);



  // useEffect(() => {

  // }, [productInfo])

  // function getFeatures() {
  //   if (productInfo.features) {
  //     return productInfo.features.map((feature) => `${feature.value} ${feature.feature}`);
  //   }
  //   return [];
  // }

  // const featuresTexts = getFeatures();
  // let features = [];
  let features;
  if (productInfo.features) {
    features = productInfo.features.map((feature, index) => (
      <Feature key={`${productInfo.id}feature${index}`}>
        <Text>&#x2713;</Text>
        <Text>{`${feature.value} ${feature.feature}`}</Text>
      </Feature>
    ));
  }

  // }
  // const features = productInfo.features ? (
  //   <Container>
  //     <Header>Features</Header>
  //     {featuresTexts.map((text, index) => (
  //       <Feature key={`${productInfo.id}feature${index}`}>
  //         {text}
  //       </Feature>
  //     ))}
  //   </Container>
  // ) : null;

  return (
    <Container role="list" collapsed={collapsed}>
      { features }
    </Container>
  );
}

const Container = styled.ul`
  list-style-type: none;
  font-size: 1.0rem;
  display: ${(props) => (props.collapsed ? 'none' : 'flex')};
  flex-direction: column;
  align-items: flex-start;

  @media (min-width: 700px) {
    grid-column: 4 / span 2;
    grid-row: 2 / 3;
    padding-left: 2rem;
    height: 100%
    margin-bottom: 0px;
    margin-top: 0px;
    border-left: black thin solid;
    margin-bottom: 0px;
    display: flex;
  };

  @media (min-width: 1200px) {
    padding-left: 15%;
  };
`;

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
