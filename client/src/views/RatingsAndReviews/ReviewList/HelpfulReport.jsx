import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import axios from 'axios';

export default function HelpfulReport({
  name,
  id,
  helpfulCount,
  children,
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
    <HelpfulnessDiv>
      {name === 'answers' && children}
      <Helpful>
        <Subheader>
          Helpful?
        </Subheader>
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
  margin-bottom: 1em;
  text-decoration: none;
  font-size: 0.875em;
  cursor: default;
`;

const Helpful = styled.div`
  display: flex;
`;

const Subheader = styled.span`
`;

const YesButton = styled.span`
  display: flex;
  margin-left: 0.5rem;
  cursor: pointer;
  font-weight: 300;
  text-decoration: underline;
  ${(props) => props.$clicked && css`
    cursor: default;
    font-weight: bold;
    text-decoration: none;
    color: ${props.theme.clicked};
  `};
  &:hover {
    text-decoration: initial;
  }
`;

const ReportButton = styled(YesButton)`
  margin-left: 0;
`;
