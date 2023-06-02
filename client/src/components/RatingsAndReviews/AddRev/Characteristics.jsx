import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function Characteristics({ revMeta, charVal, setCharVal, charObj, setCharObj }) {
  const handleCharChange = function handleCharChange(numInput, curChar) {
    const numVal = parseInt(numInput, 10);
    if (curChar === 'Size') {
      setCharObj((prevCharObj) => ({ ...prevCharObj, 135232: numVal }));
      if (numVal === 1) {
        setCharVal((prevCharVal) => ({ ...prevCharVal, Size: 'A size too small', sizeNum: numVal }));
      } else if (numVal === 2) {
        setCharVal((prevCharVal) => ({ ...prevCharVal, Size: '1/2 size too small', sizeNum: numVal }));
      } else if (numVal === 3) {
        setCharVal((prevCharVal) => ({ ...prevCharVal, Size: 'Perfect', sizeNum: numVal }));
      } else if (numVal === 4) {
        setCharVal((prevCharVal) => ({ ...prevCharVal, Size: '1/2 size too big', sizeNum: numVal }));
      } else if (numVal === 5) {
        setCharVal((prevCharVal) => ({ ...prevCharVal, Size: 'A size too wide', sizeNum: numVal }));
      }
    }

    if (curChar === 'Width') {
      setCharObj((prevCharObj) => ({ ...prevCharObj, 135233: numVal }));
      if (numVal === 1) {
        setCharVal((prevCharVal) => ({ ...prevCharVal, Width: 'Too narrow', widthNum: numVal }));
      } else if (numVal === 2) {
        setCharVal((prevCharVal) => ({ ...prevCharVal, Width: 'Slightly narrow', widthNum: numVal }));
      } else if (numVal === 3) {
        setCharVal((prevCharVal) => ({ ...prevCharVal, Width: 'Perfect', widthNum: numVal }));
      } else if (numVal === 4) {
        setCharVal((prevCharVal) => ({ ...prevCharVal, Width: 'Slightly wide', widthNum: numVal }));
      } else if (numVal === 5) {
        setCharVal((prevCharVal) => ({ ...prevCharVal, Width: 'Too wide', widthNum: numVal }));
      }
    }

    if (curChar === 'Comfort') {
      setCharObj((prevCharObj) => ({ ...prevCharObj, 135230: numVal }));
      if (numVal === 1) {
        setCharVal((prevCharVal) => ({ ...prevCharVal, Comfort: 'Uncomfortable', comfortNum: numVal }));
      } else if (numVal === 2) {
        setCharVal((prevCharVal) => ({ ...prevCharVal, Comfort: 'Slightly comfortable', comfortNum: numVal }));
      } else if (numVal === 3) {
        setCharVal((prevCharVal) => ({ ...prevCharVal, Comfort: 'Ok', comfortNum: numVal }));
      } else if (numVal === 4) {
        setCharVal((prevCharVal) => ({ ...prevCharVal, Comfort: 'Comfortable', comfortNum: numVal }));
      } else if (numVal === 5) {
        setCharVal((prevCharVal) => ({ ...prevCharVal, Comfort: 'Perfect', comfortNum: numVal }));
      }
    }

    if (curChar === 'Quality') {
      setCharObj((prevCharObj) => ({ ...prevCharObj, 135231: numVal }));
      if (numVal === 1) {
        setCharVal((prevCharVal) => ({ ...prevCharVal, Quality: 'Poor', qualityNum: numVal }));
      } else if (numVal === 2) {
        setCharVal((prevCharVal) => ({ ...prevCharVal, Quality: 'Below Average', qualityNum: numVal }));
      } else if (numVal === 3) {
        setCharVal((prevCharVal) => ({ ...prevCharVal, Quality: 'What I expected', qualityNum: numVal }));
      } else if (numVal === 4) {
        setCharVal((prevCharVal) => ({ ...prevCharVal, Quality: 'Pretty Great', qualityNum: numVal }));
      } else if (numVal === 5) {
        setCharVal((prevCharVal) => ({ ...prevCharVal, Quality: 'Perfect', qualityNum: numVal }));
      }
    }

    if (curChar === 'Length') {
      setCharObj((prevCharObj) => ({ ...prevCharObj, 135229: numVal }));
      if (numVal === 1) {
        setCharVal((prevCharVal) => ({ ...prevCharVal, Length: 'Runs Short', lengthNum: numVal }));
      } else if (numVal === 2) {
        setCharVal((prevCharVal) => ({ ...prevCharVal, Length: 'Runs slightly short', lengthNum: numVal }));
      } else if (numVal === 3) {
        setCharVal((prevCharVal) => ({ ...prevCharVal, Length: 'Perfect', lengthNum: numVal }));
      } else if (numVal === 4) {
        setCharVal((prevCharVal) => ({ ...prevCharVal, Length: 'Runs slightly long', lengthNum: numVal }));
      } else if (numVal === 5) {
        setCharVal((prevCharVal) => ({ ...prevCharVal, Length: 'Runs long', lengthNum: numVal }));
      }
    }

    if (curChar === 'Fit') {
      setCharObj((prevCharObj) => ({ ...prevCharObj, 135228: numVal }));
      if (numVal === 1) {
        setCharVal((prevCharVal) => ({ ...prevCharVal, Fit: 'Runs Short', fitNum: numVal }));
      } else if (numVal === 2) {
        setCharVal((prevCharVal) => ({ ...prevCharVal, Fit: 'Runs slightly short', fitNum: numVal }));
      } else if (numVal === 3) {
        setCharVal((prevCharVal) => ({ ...prevCharVal, Fit: 'Perfect', fitNum: numVal }));
      } else if (numVal === 4) {
        setCharVal((prevCharVal) => ({ ...prevCharVal, Fit: 'Runs slightly long', fitNum: numVal }));
      } else if (numVal === 5) {
        setCharVal((prevCharVal) => ({ ...prevCharVal, Fit: 'Runs long', fitNum: numVal }));
      }
    }
  };

  return (
    <div>
      <div>
        Product characteristics*
      </div>

      {Object.keys(revMeta.characteristics).map((char) => (
        <CharDiv key={char}>
          <div>
            {char}
            :&nbsp;
            {
            !charVal[char]
              ? 'none selected'
              : charVal[char]
            }
          </div>
          <RadioButtonsContainer onChange={(event) => handleCharChange(event.target.value, char)}>
            <input type="radio" value={1} name={char} />
            {/* remember to make above input required */}
            1
            <input type="radio" value={2} name={char} />
            2
            <input type="radio" value={3} name={char} />
            3
            <input type="radio" value={4} name={char} />
            4
            <input type="radio" value={5} name={char} />
            5
          </RadioButtonsContainer>
        </CharDiv>
      ))}
    </div>
  );
}

Characteristics.propTypes = {
  revMeta: PropTypes.shape({
    characteristics: PropTypes.shape({}),
  }).isRequired,
  charVal: PropTypes.shape({}).isRequired,
  setCharVal: PropTypes.func.isRequired,
};

export default Characteristics;

const CharDiv = styled.div`
  margin-left: 1rem;
  margin-top: 0.5em;
`;

const RadioButtonsContainer = styled.div`
  margin-top: 0.25em;
`;
