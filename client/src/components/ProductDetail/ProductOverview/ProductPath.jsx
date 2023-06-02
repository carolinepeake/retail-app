import React from 'react';
import styled from 'styled-components';

import { useGlobalContext } from '../../../contexts/GlobalStore';

function ProductPath() {
  const { productInfo } = useGlobalContext();

  // TO-DO: diff css if clicked

  return (
    <Path>
      <SubPath>Home</SubPath>
      <span>&gt;</span>
      <SubPath>{productInfo.category}</SubPath>
      <span>&gt;</span>
      <SubPath>{productInfo.name}</SubPath>
    </Path>
  );
}

export default ProductPath;

const Path = styled.div`
  order: -1;
  font-weight: 300;
  font-size: ${(props) => props.theme.tertiary};
  padding-bottom: 1em;
`;

const SubPath = styled.span`
  padding: 0 0.5em;
  &:hover {
    text-decoration: underline;
  };
  &: first-child {
    padding-left: 0px;
  };
  cursor: pointer;
`;
