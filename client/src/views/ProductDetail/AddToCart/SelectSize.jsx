import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default function SelectSize({ skus }) {
  console.log('[SelectSize] is running');

  // const availableSizes = filter by quantity above 0 and onlyUnique // sort


  const inStock = availableSizes?.length > 0;

  return (
    <StyleSelect
      disabled={!inStock}
      as="select"
      ref={sizeDropdown}
      select
      error={error}
      name="sku"
      value={selectedSize.sku || ''}
      onChange={(e) => handleChangeSize(e)}

    >
      <SelectOption
        value=" "
        name={sku}
      >
        {inStock ? 'Select Size' : 'Out of Stock'}
      </SelectOption>
    </StyleSelect>
    <Option
      name={name}
      value={value}
    >
      {label}
    </Option>
  );
}

SelectSize.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const Option = styled.option`
  min-height: 0;
  padding: 0;
`;
