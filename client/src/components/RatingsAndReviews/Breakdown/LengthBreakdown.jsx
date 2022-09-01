import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function LengthBreakdown({ revMeta, productInfo }) {
  if (!revMeta.product_id) {
    return (
      <div />
    );
  }

  return (
    <div>
      {/* <h4>Product Characteristics</h4> */}
      <br />
      {Object.entries(revMeta.characteristics).map((charEntry) => (
        <div key={charEntry[1].id}>
          <div>
            {charEntry[0]}
            :&nbsp;
          </div>
          <BarsContainter>
            <Row1>
              <DotDiv width={parseInt(charEntry[1].value, 10) * 4.9}>
                &#9660;
              </DotDiv>
              <Bar width={100 - (parseInt(charEntry[1].value, 10) / 5) * 100} />
              <HorizontalProgFill width={(parseInt(charEntry[1].value, 10) / 5) * 100}>
                {/* {Math.round(charEntry[1].value * 100) / 100} */}
              </HorizontalProgFill>
              <Bar width={100 - (parseInt(charEntry[1].value, 10) / 5) * 100} />
            </Row1>
            <Row2>
              <DescDiv>
                {charEntry[0] === 'Size'
                  ? 'Small'
                  : charEntry[0] === 'Width'
                    ? 'Narrow'
                    : charEntry[0] === 'Comfort'
                      ? 'Bad'
                      : charEntry[0] === 'Quality'
                        ? 'Poor'
                        : charEntry[0] === 'Length'
                          ? 'Short'
                          : 'Tight'}
              </DescDiv>
              <DescDiv>
                {charEntry[0] === 'Comfort' || charEntry[0] === 'Quality'
                  ? 'Ok'
                  : 'Perfect'}
              </DescDiv>
              <DescDiv>
                {charEntry[0] === 'Size' || charEntry[0] === 'Width'
                  ? 'Wide'
                  : charEntry[0] === 'Comfort' || charEntry[0] === 'Quality'
                    ? 'Perfect'
                    : 'Long'}
              </DescDiv>
            </Row2>
          </BarsContainter>
          <br />
        </div>
      ))}
    </div>
  );
}

LengthBreakdown.propTypes = {
  revMeta: PropTypes.shape({
    characteristics: PropTypes.shape({}),
    product_id: PropTypes.string,
    ratings: PropTypes.shape({}),
    recommended: PropTypes.shape({
      true: PropTypes.string,
      false: PropTypes.string,
    }),
  }).isRequired,
};

export default LengthBreakdown;

const BarsContainter = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row1 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

const Row2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const HorizontalProgFill = styled.div`
  background: lightgrey;
  height: 0.5rem;
  margin: 2px;
  color: #fff;
  text-align: center;
  font-family: "Lato","Verdana",sans-serif;
  font-size: 0.75rem;
  line-height: 1rem;
  width: ${(props) => props.width - 1}%
`;

const Bar = styled.div`
  background: lightgrey;
  height: 10px;
  margin: 2px;
  width: ${(props) => props.width - 2}%
`;

const DescDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 33%;
`;

const DotDiv = styled.div`
  color: #666;
  position: absolute;
  font-size: 13px;
  left: ${(props) => props.width}%;
`;
