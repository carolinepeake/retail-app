import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import RadioButton from './RadioButton';

function Characteristics({
  // id,
  name,
  characteristic,
  handleInputChange,
  inputState,
}) {
  // const [productCharacteristics, setProductCharacteristics] = useState({});

  console.log('name: ', name, 'characteristic: ', characteristic, 'handleInputChange: ', handleInputChange, 'inputState: ', inputState);

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
    // setProductCharacteristics({ ...productCharacteristics, [e.target.name]: e.target.value });
  };

  // const { id } = CHARACTERISTICS[characteristic];
  // const characteristic = CHARACTERISTICS[id];

  const id = '' + characteristic.id;
  const selectedValue = inputState[id];
  let selectedIndex;
  let selectedLabel;
  if (selectedValue) {
    selectedIndex = Number(selectedValue) - 1;
    selectedLabel = characteristic.values[selectedIndex].label;
  };

  console.log('selectedValue: ', selectedValue, 'selectedIndex: ', selectedIndex, 'inputState: ', inputState, 'id: ', id);
  // const selectedLabel = characteristic?.values?[Number(selectedValue) - 1]?.label;

  return (
    <>
      <Subheader>
        {name}
        {/* : */}
        <Required>*</Required>
        {selectedValue
          ? <SelectedLabel>
              {/* &nbsp; */}
              {selectedLabel}
            </SelectedLabel>
          : <Placeholder>
              {/* &nbsp; */}
              None Selected
            </Placeholder>
        }
      </Subheader>

      <RadioButtonsContainer>

        {characteristic?.values?.map(({ value, label }) => (
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
  margin-bottom: 0.75em;
`;

const Required = styled.sup`
  color: ${(props) => props.theme.formError}
`;

const Placeholder = styled.span`
  color: ${(props) => props.theme.inputPlaceholder};
  display: block;
  margin-top: 0.5em;
  font-size: 0.83em
  /* margin-left: 0.5em;
  color: #555;
  font-style: oblique; */
`;

const SelectedLabel = styled(Placeholder)`
  color: ${(props) => props.theme.secondaryFontColor};
  font-weight: 400;
`;

const RadioButtonsContainer = styled.div`
  margin: 0 5%;
  display: flex;
  position: relative;
  border-top: 1px ${(props) => props.theme.secondaryFontColor} solid;
  justify-content: space-between;
`;
