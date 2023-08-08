import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function LengthBreakdown({ revMeta }) {
  if (!revMeta.product_id) {
    return (
      <div />
    );
  }

  return (
    <div>
      {/* <h4>Product Characteristics</h4> */}
      {Object.entries(revMeta.characteristics).map(([label, { id, value }]) => (
        <div key={id}>
          <div>
            {label}
            :&nbsp;
          </div>
          <BarsContainter>
            <Row1>
              <DotDiv width={(parseInt(value, 10) / 5) * 100}>
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
          </BarsContainter>
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
  margin-bottom: 1rem;
  margin-top: 0.25em;
`;

const Row1 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 1rem;
  position: relative;
  marign-bottom: 0.1em;
`;

const Row2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 0.9rem;
`;

const HorizontalProgFill = styled.div`
  background: lightgrey;
  height: 10px;
  margin: 2px 0;
  color: #fff;
  text-align: center;
  font-size: 0.75rem;
  line-height: 1rem;
  width: 100%
`;

const DescDiv = styled.div`
  display: flex;
  justify-content: center;
  font-size: 0.9rem;
`;

const DotDiv = styled.div`
  color: #666;
  position: absolute;
  font-size: 13px;
  left: ${(props) => props.width}%;
`;
