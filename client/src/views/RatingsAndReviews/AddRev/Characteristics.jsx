import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import RadioButton from './RadioButton';

function Characteristics({
  title,
  characteristic,
  handleInputChange,
  inputState,
}) {
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
          {title}
          *
        </CharacteristicName>
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
            key={`${label}${value}`}
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
  handleInputChange: PropTypes.func.isRequired,
  characteristic: PropTypes.shape({
    id: PropTypes.number,
    values: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.number,
        label: PropTypes.string,
      }),
    ),
  }).isRequired,
  title: PropTypes.string.isRequired,
  inputState: PropTypes.shape({}).isRequired,
};

export default Characteristics;

const Subheader = styled.div`
  margin-bottom: 1em;
`;

const CharacteristicName = styled.span`
  font-weight: 400;
  color: rgb(37, 55, 70);
  font-size: ${(props) => props.theme.body};
  display: block;
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
