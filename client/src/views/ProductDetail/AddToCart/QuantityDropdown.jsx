import React from 'react';
import styled from 'styled-components';

export default function QuantityDropdown({ availableQuantity }) {
  if (!availableQuantity) {
    return null;
  }

  const maxQuantity = availableQuantity > 15 ? 15 : availableQuantity;
  const quantities = [...Array(maxQuantity + 1).keys()].slice(1);

  return (
    <>
      {quantities.map((value) => (
        <Option
          value={value}
          name="quantity"
          key={value}
        >
          Qty:
          {' '}
          {value}
        </Option>
      ))}
    </>
  );
}

const Option = styled.option`
  min-height: 0;
  padding: 0;
`;
