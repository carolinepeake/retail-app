/* eslint-disable block-spacing */
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

  // TO-DO: props validation to ensure options is irriterable

  const dropdownOptions = options ? options.map((option, i) => (
    <DropdownOption
      type="button"
      value={option.value}
      i={i}
      key={option.id}
      onClick={(e) => { setSelectedValue(e.target.value); setdropdownOpened(false);}}
      selected={option.selected}
    >
      {option.label}
    </DropdownOption>
  )) : null;

  return (
    <CustomSelect
      dropdownOpened={dropdownOpened}
    // disabled={disabled}
      onMouseEnter={() => setDropdownOpened(true)}
      onMouseLeave={() => setDropdownOpened(false)}
    >
      {/* <InputWrapper
      // onMouseMove={() => setDropdownOpened(!dropdownOpened)}
      > */}
      <InputWrapper>
        <div>Sort by</div>
        <div>{selectedValue}</div>
        <DropdownIcon dropdownOpened={dropdownOpened}>
          &#8964;
          </DropdownIcon>
      </InputWrapper>
      {/* <div>Sort by</div>
        <div>{selectedValue}</div> */}
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

const collapseDropdownArrowAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(180deg);
  }
`;

const reverseCollapseDropdownArrowAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const CustomSelect = styled.div`
  border: 1px solid currentColor;
  border-radius: 5px;
  color: #555;
  font-size: 1rem;
  font-weight: 400;
  background-color: ${(props) => props.theme.backgroundColor};
  cursor: pointer;
  &:hover {
    border-color: ${(props) => props.theme.visitedColor};
  };
  position: relative;
  width: max-content;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 1.0em 0.5em 1.0em 0.5em;
  transition: 1s ease-in-out;
`;
// transition: 1s ease-in-out;
// animation: 0.25sec linear normal forwards ${reverseCollapseDropdownArrowAnimation}, animation: 0.25sec linear normal forwards ${reverseCollapseDropdownArrowAnimation};
// transition: 1s ease-in-out;
// const CustomSelect = styled.form`
//   display: flex;
//   justify-content: space-between;
//   padding: 2px;
//   border: 1px solid currentColor;
//   border-radius: 5px;
//   color: #555;
//   background-color: ${(props) => props.theme.backgroundColor};
//   width: 100%;
// `;
// font-size: 14px;
// margin: 0.5rem;

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

// const InputWrapper = styled.span`
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
// padding: 0.5em 1em;
// width: 100%;
// border: currentColor solid 1px;

// TO-DO: make bigger on focus (for mobile)

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

const DropdownIcon = styled.div`
  opacity: 0.7;
  font-size: 40px;
  height: 40px;
  width: 40px;
  ${InputWrapper}:hover & {
    transform: translateY(20px) rotateX(-180deg);
  };
`;
// translateY(-40)
// rotate: x -180deg;
// ${(props) => props.dropdownOpened && css`
//      content: '\&#8963';
//   `};
//   ${(props) => props.dropdownOpened && css`
//   content: '\&#8963';
// `};

// ${(props) => !props.dropdownOpened && css`
// content: '\&#8964';
// animation: 0.25sec linear normal forwards ${reverseCollapseDropdownArrowAnimation};
// `};

// animation: 0.25sec linear normal forwards ${collapseDropdownArrowAnimation};
// border: 1px solid transparent;
// padding: 0;
// margin: 0;
// border-radius: inherit;

// ${CustomSelect}:hover & {
//   rotate: x -180deg;
//   opacity: 1;
//   background-color: ${(props) => props.theme.backgroundColor};
// };

const Dropdown = styled.div`
  z-index: 10;
  flex-direction: column;
  display: ${(props) => (props.dropdownOpened ? 'flex' : 'none')};
  position: absolute;
  height: 8em;
  box-shadow: 5px 5px 5px #242424;
  background-color: ${(props) => props.theme.backgroundColor};
  max-height: 10em;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  top: 4em;
  border-radius: 5px;
  border-left: lightgrey solid 1px;
  border-right: lightgrey solid 1px;
`;
// ${InputWrapper}:hover & {
//   display: flex;
// };



const DropdownOption = styled.div`
  padding: 0.5em;
  height: 2em;
  border-top: lightgrey solid 1px;
  border-bottom: lightgrey solid 1px;
  ${(props) => props.selected && css`
    font-weight: 400;
    &::before {
      content: '\&#10003';
    };
  `};
  &:hover {
    background-color: ${(props) => props.theme.submitButtonHover};
    color: ${(props) => props.theme.submitButtonHoverFont};
  };
  left: 2em;
`;

export default StyledSelect;
