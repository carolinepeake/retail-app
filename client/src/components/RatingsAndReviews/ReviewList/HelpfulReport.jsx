import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';

function HelpfulReport({ review }) {
  const [helpfulness, setHelpfulness] = useState(review.helpfulness);
  const [helpfulClicked, setHelpfulClicked] = useState(false);
  const [reportClicked, setReportClicked] = useState(false);
  const [report, setReport] = useState('Report');

  const putRequester = function putRequester(reviewID, helpOrReport) {
    return (axios.put(`/reviews/${reviewID}/${helpOrReport}`)
      .then((result) => {
        console.log(`put to change ${helpOrReport} value of review ${reviewID} was sent:\n`, result);
      })
      .catch((err) => {
        console.log(`error for put to change ${helpOrReport} of review ${reviewID}:\n`, err);
      }));
  };

  const handleHelpfulClick = function handleHelpfulClick() {
    const reviewID = review.review_id;
    if (!helpfulClicked) {
      putRequester(reviewID, 'helpful')
        .then(() => {
          setHelpfulness(helpfulness + 1);
          setHelpfulClicked(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleReport = function handleReport() {
    const reviewID = review.review_id;
    if (!reportClicked) {
      putRequester(reviewID, 'report')
        .then(() => {
          setReportClicked(true);
        })
        .catch((err) => {
          console.log(err);
        });
      setReport('Reported');
    }
  };

  return (
    <HelpfulnessDiv>
      <div>Helpful?</div>
      <YesButton helpfulClicked={helpfulClicked} onClick={() => handleHelpfulClick()}>
        <div>Yes</div>
        &nbsp;
        {`(${helpfulness})`}
      </YesButton>
      <div>|</div>
      <ReportButton reportClicked={reportClicked} onClick={() => handleReport()}>
        <div>{report}</div>
        {/* need to add functionality that changes this to reported once clicked */}
      </ReportButton>
    </HelpfulnessDiv>
  );
}

HelpfulReport.propTypes = {
  review: PropTypes.shape({
    body: PropTypes.string,
    review_id: PropTypes.number,
    summary: PropTypes.string,
    helpfulness: PropTypes.number,
  }).isRequired,
};

export default HelpfulReport;

const HelpfulnessDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 40%;
  overflow-wrap: break-word;
  margin-bottom: 1rem;
  font-size: 0.75rem;
`;

const YesButton = styled.div`
  display: flex;
  cursor: ${(props) => (!props.helpfulClicked ? 'pointer' : 'default')};
  font-weight: ${(props) => (!props.helpfulClicked ? 'normal' : 'bold')};
  text-decoration: ${(props) => (!props.helpfulClicked ? 'underline' : 'normal')};
  margin: 0 0.5rem;
`;

const ReportButton = styled.div`
  display: flex;
  cursor: ${(props) => (!props.reportClicked ? 'pointer' : 'default')};
  font-weight: ${(props) => (!props.reportClicked ? 'normal' : 'bold')};
  text-decoration: ${(props) => (!props.reportClicked ? 'underline' : 'normal')};
  margin-left: 0.5rem;
`;
