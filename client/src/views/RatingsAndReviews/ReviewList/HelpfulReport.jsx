import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import axios from 'axios';

export default function HelpfulReport({
  name,
  id,
  helpfulCount,
  children,
  margin,
}) {
  console.log('[HelpfulReport] is running');
  const [helpfulness, setHelpfulness] = useState(helpfulCount);
  const [helpfulClicked, setHelpfulClicked] = useState(false);
  const [reportClicked, setReportClicked] = useState(false);

  const handleHelpfulClick = () => {
    if (helpfulClicked) return;

    axios
      .put(`/${name}/helpful`, {
        id,
      })
      .then(() => {
        setHelpfulness((prev) => prev + 1);
        setHelpfulClicked(true);
      })
      .catch((err) => {
        console.log(`error clicking helpful for ${name} ${id}`, err);
      });
  };

  const handleReport = () => {
    if (reportClicked) return;

    axios
      .put(`/${name}/report`, {
        id,
      })
      .then(() => {
        setReportClicked(true);
      })
      .catch((err) => {
        console.log(`error reporting ${name} ${id}`, err);
      });
  };

  return (
    <HelpfulnessDiv
      $topMargin={margin}
    >
      {name === 'answers' && children}
      <Helpful>
        <span>
          Helpful?
        </span>
        <YesButton
          $clicked={helpfulClicked}
          onClick={handleHelpfulClick}
        >
          <span>
            Yes
          </span>
        </YesButton>
        &nbsp;
        {`(${helpfulness})`}
      </Helpful>
      <div>|</div>
      <ReportButton
        $clicked={reportClicked}
        onClick={handleReport}
      >
        {reportClicked
          ? 'Reported'
          : 'Report'}
      </ReportButton>
      {name === 'questions' && children}
    </HelpfulnessDiv>
  );
}

HelpfulReport.propTypes = {
  name: PropTypes.oneOf(['reviews', 'questions', 'answers']).isRequired,
  id: PropTypes.number.isRequired,
  helpfulCount: PropTypes.number.isRequired,
  children: PropTypes.node,
};

HelpfulReport.defaultProps = {
  children: null,
};

const HelpfulnessDiv = styled.h6`
  display: flex;
  justify-content: flex-start;
  overflow-wrap: break-word;
  flex-wrap: wrap;
  gap: 1.0em;
 /* margin-bottom: 1rem; */
  margin-top: 1rem;
  margin-top: ${(props) => props.$topMargin};
  text-decoration: none;
  font-size: 0.875rem;
  font-size: ${(props) => props.theme.tertiary};
  cursor: default;

  padding: 0;
`;

const Helpful = styled.div`
  display: flex;
`;

const YesButton = styled.span`
  display: flex;
  margin-left: 0.5em;
  cursor: pointer;
  font-weight: 300;
  text-decoration: underline;

  &:hover {
    text-decoration: initial;
  }

  ${(props) => props.$clicked && css`
    cursor: default;
    font-weight: bold;
    text-decoration: none;
    color: ${props.theme.clicked};
  `};
`;

const ReportButton = styled(YesButton)`
  margin-left: 0;
`;
