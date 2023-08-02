import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default function SelectOption({ label, value, name, key }) {
  console.log('[SelectOption] is running');
  return (
    <Option
      name={name}
      value={value}
      key={key}
    >
      {label}
    </Option>
  );
}

SelectOption.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const Option = styled.option`
  min-height: 0;
  padding: 0;
`;
