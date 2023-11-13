import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import DropdownChevron from './DropdownChevron';
import { capitalizeFirstLetter } from '../utils/getFormat';

// TO-DO: make bigger on focus (for mobile)

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

const CustomSelect = styled.div`
  border: thin solid currentColor;
  border-radius: 5px;
  color: ${(props) => props.theme.secondaryFontColor};
  font-size: 1em;
  font-weight: 400;
  background-color: ${(props) => props.theme.backgroundColor};
  cursor: pointer;
  &:hover {
    border-color: ${(props) => props.theme.visitedColor};
  }
  position: relative;
  width: 12.0em;

  @media (min-width: 600px) AND (max-width: 700px) {
    width: 10em;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.25em 0.25em 0.25em 1em;
  transition: 1s ease-in-out;

  @media (min-width: 600px) AND (max-width: 700px) {
    padding: 0.25em;
  }
`;

const SortBy = styled.div`
  padding-right: 0.25em;
  line-height: 1em;
 /* width: 3.75em; */

 @media (min-width: 600px) AND (max-width: 700px) {
    padding-right: 0;
  }
`;

const Dropdown = styled.div`
  z-index: 10;
  flex-direction: column;
  display: ${(props) => (props.dropdownOpened ? 'flex' : 'none')};
  position: absolute;
  background-color: ${(props) => props.theme.backgroundColor};
  max-height: 10em;
  top: calc(2.5em + 1.5px);
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
 /* border-bottom: ${(props) => props.theme.fontColor} solid 1px;
  border-top: ${(props) => props.theme.fontColor} solid 1px; */
  border-radius: 3px
`;
// box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.35);
// border-radius: 5px;
// overflow-y: auto;
// overflow-x: hidden;

const DropdownOption = styled.div`
  padding: 0.75em 0.5em 0.75em 2.75em;
  line-height: 1em;
 /* border-left: ${(props) => props.theme.fontColor} solid 1px;
  border-right: ${(props) => props.theme.fontColor} solid 1px; */
 /* border-top: lightgrey solid 1px; */
  transition: transform 0.25s ease;
  /* font-weight: 400; */
  font-weight: 300;
  &:hover {
  /*  color: ${(props) => props.theme.fontColor}; */
    font-weight: 400;
  /*  border: currentColor solid 1px;
    transform: scale(1.025); */
    background-color: ${(props) => props.theme.submitButton};
  /*  background-color: ${(props) => props.theme.navBgColor}; */
  }
  ${(props) => (props.selectedValue === props.value) && css`
    font-weight: 600;
    padding-left: 0.5em;
    background-color: ${props.theme.navBgColor};
    &::before {
      content: '\\2713';
      padding-right: 2.75em;
      padding-right: 1em;
      padding-left: 0.5em;
    }
  `};
`;

export default StyledSelect;
