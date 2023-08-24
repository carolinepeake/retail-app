import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function CharactersticRating({
  label,
  value,
}) {
  return (
    <Container>
      {/* <h4>Product Characteristics</h4> */}
      <div>
        {label}
        :&nbsp;
      </div>
      <Row1>
        <DotDiv
          width={(parseInt(value, 10) / 5) * 100}
        >
          &#9660;
        </DotDiv>
        <HorizontalProgFill />
      </Row1>
      <Row2>
        <DescDiv>
          {label === 'Size'
            ? 'Small'
            : label === 'Width'
              ? 'Narrow'
              : label === 'Comfort'
                ? 'Bad'
                : label === 'Quality'
                  ? 'Poor'
                  : label === 'Length'
                    ? 'Short'
                    : 'Tight'}
        </DescDiv>
        <DescDiv>
          {label === 'Size' || label === 'Width'
            ? 'Wide'
            : label === 'Comfort' || label === 'Quality'
              ? 'Perfect'
              : 'Long'}
        </DescDiv>
      </Row2>
    </Container>
  );
}

CharactersticRating.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default CharactersticRating;

const Container = styled.div`
  margin-bottom: 1.0em;
`;

const Row1 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  margin-bottom: 0.15em;
   margin-top: 0.25em;
`;

const DotDiv = styled.div`
  color: ${(props) => props.theme.blue[5]};
  position: absolute;
  left: ${(props) => props.width}%;
  font-size: 1.1em;
  line-height: 1em;
  top: -0.05em;
`;

const HorizontalProgFill = styled.div`
  background: lightgrey;
  height: 1em;
  border-radius: 3px;
  overflow: hidden;
  color: #fff;
  text-align: center;
  width: 100%;
  line-height: 1em;
`;

const Row2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const DescDiv = styled.div`
  display: flex;
  justify-content: center;
  font-size: 0.9em;
`;
