import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import DropdownChevron from './DropdownChevron';
import { capitalizeFirstLetter } from '../utils/capitalize';

function StyledSelect({
  placeholder = 'Select Dropdown Option',
  options = [],
  initialValue = null,
  disabled = false,
  initialDropdownPosition = false,
  getLabel = () => 'Select Dropdown Option',
  handleSelect = (value) => console.log(value),
}) {
  const [dropdownOpened, setDropdownOpened] = useState(initialDropdownPosition);
  const [selectedValue, setSelectedValue] = useState(initialValue);

  function handleClick(option) {
    setSelectedValue(option);
    handleSelect(option);
    setDropdownOpened(false);
  }

  const dropdownOptions = options.map((value, i) => (
    <DropdownOption
      type="button"
      value={value}
      index={i}
      key={value}
      onClick={() => handleClick(value)}
      selectedValue={selectedValue}
      placeholder={placeholder}
      active={selectedValue === value}
    >
      {capitalizeFirstLetter(value)}
    </DropdownOption>
  ));

  return (
    <CustomSelect
      dropdownOpened={dropdownOpened}
      disabled={disabled}
      onMouseEnter={() => setDropdownOpened(true)}
      onMouseLeave={() => setDropdownOpened(false)}
    >
      <InputWrapper>
        <SortBy>
          {getLabel(selectedValue)}
        </SortBy>
        <DropdownChevron dropdownOpened={dropdownOpened} />
      </InputWrapper>
      <Dropdown dropdownOpened={dropdownOpened}>
        {dropdownOptions}
      </Dropdown>
    </CustomSelect>
  );
}

StyledSelect.propTypes = {
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
      value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
      label: PropTypes.string,
    }),
  ])),
  initialValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.any,
  ]),
  disabled: PropTypes.bool,
  initialDropdownPosition: PropTypes.bool,
  getLabel: PropTypes.func,
  handleSelect: PropTypes.func,
};

StyledSelect.defaultProps = {
  placeholder: 'Select Dropdown Option',
  options: [],
  initialValue: null,
  disabled: false,
  initialDropdownPosition: false,
  getLabel: () => 'Select Dropdown Option',
  handleSelect: (value) => console.log(value),
};

// TO-DO: make bigger on focus (for mobile)

const CustomSelect = styled.div`
  border: thin solid currentColor;
  border-radius: 5px;
  color: ${(props) => props.theme.secondaryFontColor};
  font-size: 1rem;
  font-weight: 400;
  background-color: ${(props) => props.theme.backgroundColor};
  cursor: pointer;
  &:hover {
    border-color: ${(props) => props.theme.visitedColor};
  }
  position: relative;
  width: 12.0em;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.25em 0.25em 0.25em 1em;
  transition: 1s ease-in-out;
`;

const SortBy = styled.div`
  padding-right: 0.25em;
  height: 1em;
  line-height: 1em;
 /* width: 3.75em; */
`;

const Dropdown = styled.div`
  z-index: 10;
  flex-direction: column;
  display: ${(props) => (props.dropdownOpened ? 'flex' : 'none')};
  position: absolute;
  background-color: ${(props) => props.theme.navBgColor};
  max-height: 10em;
  top: calc(2.5em + 1.5px);
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-bottom: ${(props) => props.theme.fontColor} solid 1px;
  border-top: ${(props) => props.theme.fontColor} solid 1px;
`;
// box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.35);
// border-radius: 5px;
// overflow-y: auto;
// overflow-x: hidden;

const DropdownOption = styled.div`
  padding: 0.75em 0.5em 0.75em 4.5em;
  line-height: 1em;
  border-left: ${(props) => props.theme.fontColor} solid 1px;
  border-right: ${(props) => props.theme.fontColor} solid 1px;
  border-top: lightgrey solid 1px;
  transition: transform 0.25s ease;
  font-weight: 400;
  &:hover {
    color: ${(props) => props.theme.fontColor};
    border: currentColor solid 1px;
    transform: scale(1.025);
    background-color: ${(props) => props.theme.submitButton};
  }
  ${(props) => (props.selectedValue === props.value) && css`
    font-weight: 600;
    padding-left: 0.5em;
    &::before {
      content: '\\2713';
      padding-right: 2.75em;
      padding-left: 0.5em;
    }
    ${Dropdown}:hover && {
      color: ${props.theme.fontColor};
      border: ${props.theme.fontColor} solid 1px;
      &:hover {
        border: ${props.theme.fontColor} solid 1px;
      }
    }
  `};
`;

export default StyledSelect;