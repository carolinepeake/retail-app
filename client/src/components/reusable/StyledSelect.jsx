import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

function StyledSelect({
  placeholder,
  options,
  handleSelect,
  initialValue = null,
  disabled = false,
  initialDropdownPosition = false,
}) {
  const [dropdownOpened, setDropdownOpened] = useState(initialDropdownPosition);
  const [selectedValue, setSelectedValue] = useState(initialValue);

  function handleClick(value) {
    setSelectedValue(value);
    handleSelect(value);
    setDropdownOpened(false);
  }

  // TO-DO: props validation to ensure options is irriterable

  const dropdownOptions = options ? options.map((option, i) => (
    <DropdownOption
      type="button"
      value={option.value}
      name={option.label}
      i={i}
      key={option.id}
      onClick={(e) => handleClick(option.value, e)}
      selectedValue={selectedValue}
     // selected={option.selected}
    >
      {option.label}
    </DropdownOption>
  )) : null;

  return (
    <CustomSelect
      dropdownOpened={dropdownOpened}
      disabled={disabled}
      onMouseEnter={() => setDropdownOpened(true)}
      onMouseLeave={() => setDropdownOpened(false)}
    >
      <InputWrapper>
        <SortBy>Sort by</SortBy>
        <SelectedValue>{selectedValue}</SelectedValue>
        <DropdownIcon dropdownOpened={dropdownOpened}>
          &#8964;
        </DropdownIcon>
      </InputWrapper>
      {/* <Input
          // placeholder={placeholder}
          // value={selectedValue || placeholder || ''}
          // selectedValue={selectedValue}
          // dropdownOpened={dropdownOpened}
          // onChange={(event) => setSelectedValue(event.target.value)}
        />{selectedValue} */}
      {/* <DropdownIcon>
        {/* type="button"
        onClick={clickHandler}
        dropdownOpened={dropdownOpened} */}
      {/* &#8963; */}
      {/* &#8964;
        </DropdownIcon> */}
      {/* </InputWrapper> */}
      <Dropdown dropdownOpened={dropdownOpened}>
        {dropdownOptions}
      </Dropdown>
    </CustomSelect>
  );
}

// TO-DO: make bigger on focus (for mobile)

const CustomSelect = styled.div`
  border: 1px solid currentColor;
  border-radius: 5px;
  color: ${(props) => props.theme.secondaryFontColor};
  font-size: 1rem;
  font-weight: 400;
  background-color: ${(props) => props.theme.backgroundColor};
  cursor: pointer;
  &:hover {
    border-color: ${(props) => props.theme.visitedColor};
  };
  position: relative;
  width: 12.0em;
`;
// color: #555;

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.25em 0.25em 0.25em 1em;
  transition: 1s ease-in-out;
`;

// const CustomSelect = styled.form`
//   display: flex;
//   justify-content: space-between;
//   padding: 2px;
//   border: 1px solid currentColor;
//   border-radius: 5px;
//   color: #555;
//   background-color: ${(props) => props.theme.backgroundColor};
//   width: 100%;
// font-size: 14px;
// margin: 0.5rem;
// `;

// const InputWrapper = styled.div`
//   width: 100%;
//   display: flex;
//   flex-direction: row;
//   justify-content: space-around;
//   position: relative;
//   border: currentColor solid 1px;
//   border-radius: 5px;
//   cursor: pointer;
//   background-color: ${(props) => props.theme.backgroundColor};
//   &:hover {
//     border-color: ${(props) => props.theme.visitedColor};
//   };
//   transition: 1s ease-in-out;
// `;

// const Input = styled.div`
//   border: none;
//   background: transparent;
//   margin: 0;
//   padding: 7px 8px;
//   font-size: ${(props) => props.theme.input};
//   color: ${(props) => props.theme.fontColor};
//   border: 1px solid transparent;
//   border-radius: inherit;
//  ::placeholder {
//    color: ${(props) => props.theme.inputPlaceholder};
//   };
// `;

const SortBy = styled.div`
  padding-right: 0.25em;
  height: 1em;
  line-height: 1em;
  width: 3.75em;
`;

const SelectedValue = styled.div`
  padding-right: 1.0em;
  height: 1em;
  font-weight: 600;
  line-height: 1em;
  width: 5.0em;
`;

const DropdownIcon = styled.div`
  font-size: 2em;
  opacity: 0.7;
  height: 1em;
  width: 1em;
  position: relative;
  bottom: 0.25em;
  font-weight: 400;
  line-height: 1em;
  ${(props) => props.dropdownOpened && css`
    transform: translateY(0.5em) rotateX(-180deg);
    opacity: 1;
  `};
`;
// ${InputWrapper}:hover & {};

const Dropdown = styled.div`
  z-index: 4;
  flex-direction: column;
  display: ${(props) => (props.dropdownOpened ? 'flex' : 'none')};
  position: absolute;
  background-color: ${(props) => props.theme.navColor};
  max-height: 10em;
  top: calc(2.5em + 1.5px);
  border-bottom: lightgrey solid 1px;
  width: 100%
`;
// box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.35);
// box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
// border-radius: 5px;
// ${InputWrapper}:hover & {
//   display: flex;
// };
// overflow-y: auto;
// overflow-x: hidden;

const DropdownOption = styled.div`
  padding: 0.75em 0.5em 0.75em 4.5em;
  line-height: 1em;
  border-left: lightgrey solid 1px;
  border-right: lightgrey solid 1px;
  border-top: lightgrey solid 1px;
  transition: transform 0.25s ease;
  font-weight: 400;
  &:hover {
    color: ${(props) => props.theme.fontColor};
    border: currentColor solid 1px;
    transform: scale(1.025);
    background-color: ${(props) => props.theme.submitButton};
  };
  ${(props) => (props.selectedValue === props.value) && css`
    border: currentColor solid 1px;
    font-weight: 600;
    padding-left: 0.5em;
    &::before {
      content: '\\2713';
      padding-right: 2.75em;
      padding-left: 0.5em;
    };
    ${Dropdown}:hover && {
      color: ${props.theme.fontColor};
      border: lightgrey solid 1px;
      &:hover {
        border: currentColor solid 1px;
      };
    };
  `};
`;
// color: ${(props) => props.theme.submitButtonFont};
// color: ${(props) => props.theme.submitButtonHoverFont};
// background-color: ${(props) => props.theme.submitButtonHover};

export default StyledSelect;
