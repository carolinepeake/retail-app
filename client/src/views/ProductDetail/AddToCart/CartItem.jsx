import React from 'react';
import styled from 'styled-components';
import { Button, StyledExitButton } from '../../../components/Button';

export default function CartItem({ item }) {
  const price = (
    <PriceContainer>
    {item?.salePrice
      ? (
        <Price>
          <SalePrice>
            {`$${item?.salePrice}    `}
          </SalePrice>
          <s>{item?.originalPrice}</s>
        </Price>
      )
      : (
        <Price>{`$${item?.originalPrice}`}</Price>
      )}
  </PriceContainer>
  );

  return (
    <Container>
      <Thumbnail src={item?.photo} alt={item?.name}/>
      <div>
        <Name>
          {item?.name}
        </Name>
        <Sku>{item?.sku}</Sku>
        <h5>{item?.size}</h5>
        <h5>{item?.styleName}</h5>
        {price}
      </div>
      <Delete> &#x2715;</Delete>
    </Container>
  );
}

const Container = styled.div`
  height: 10em;
  width: 100%;
  overflow: hidden;
  display: flex;
  gap: 0.5em;
  position: relative;
`;

const Thumbnail = styled.img`
  height: 7em;
  aspect-ratio: 4/6;
  object-fit: scale-down;
`;

const Name = styled.h4`
  margin: 0;
  font-size: 1em;
`;

const Sku = styled.h6`
  text-decoration: none;
`;

const PriceContainer = styled.div`
  font-size: ${(props) => props.theme.body};
  font-weight: 300;
`;

const Price = styled.h4`
  margin: 0;
`;

const SalePrice = styled.span`
  color: ${(props) => props.theme.formError};;
`;

const Delete = styled(StyledExitButton)`
  height: 1em;
  font-size: 1em;
  top: 0;
`;
