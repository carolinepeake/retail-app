import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import RadioButton from './RadioButton';

function Characteristics({
  name,
  characteristic,
  handleInputChange,
  inputState,
}) {
  // wrap in useCallback
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedCharacteristics = { ...inputState, [name]: value };
    const event = {
      target: {
        name: 'characteristics',
        value: updatedCharacteristics,
      },
    };
    handleInputChange(event);
  };

  const id = `${characteristic.id}`;
  const selectedValue = inputState[id];
  let selectedIndex;
  let selectedLabel;
  if (selectedValue) {
    selectedIndex = Number(selectedValue) - 1;
    selectedLabel = characteristic.values[selectedIndex].label;
  }

  return (
    <>
      <Subheader>
        <CharacteristicName>
          {name}
        </CharacteristicName>
        <Required>*</Required>
        {selectedValue
          ? (
            <SelectedLabel>
              {selectedLabel}
            </SelectedLabel>
          )
          : (
            <Placeholder>
              None Selected
            </Placeholder>
          )}
      </Subheader>

      <RadioButtonsContainer>

        {characteristic.values.map(({ value, label }) => (
          <RadioButton
            required
            value={value}
            label={label}
            name={id}
            handleChange={handleChange}
            checked={Number(selectedValue) === value}
          />
        ))}
      </RadioButtonsContainer>
    </>
  );
}

Characteristics.propTypes = {
  revMeta: PropTypes.shape({
    characteristics: PropTypes.shape({}),
  }).isRequired,
  handleInputChange: PropTypes.func.isRequired,
  characteristics: PropTypes.shape({}).isRequired,
};

export default Characteristics;

const Subheader = styled.div`
  margin-bottom: 1em;
`;

const CharacteristicName = styled.span``;

const Required = styled.sup`
  color: ${(props) => props.theme.formError}
`;

const Placeholder = styled.span`
  color: ${(props) => props.theme.inputPlaceholder};
  display: block;
  margin-top: 0.75em;
  font-size: ${(props) => props.theme.input};
  font-weight: 400;
`;

const SelectedLabel = styled(Placeholder)`
  color: ${(props) => props.theme.secondaryFontColor};
`;

const RadioButtonsContainer = styled.div`
  display: flex;
  position: relative;
  border-top: 1px ${(props) => props.theme.secondaryFontColor} solid;
  justify-content: space-between;
  min-height: calc(2em + 24px);
  margin: 0 4px;
`;
