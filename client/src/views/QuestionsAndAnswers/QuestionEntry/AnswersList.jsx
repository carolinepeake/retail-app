import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import AnswerEntry from './AnswerEntry';
import HelpfulReport from '../../RatingsAndReviews/ReviewList/HelpfulReport';
import { Button } from '../../../components/Buttons';

export default function AnswersList({ answers }) {
  const allAnswers = Object.values(answers);

  const sortByHelpfulness = (a, b) => {
    return b.helpfulness - a.helpfulness;
  };

  const sortSellerFirst = (a, b) => {
    if (a.answerer_name.toLowerCase() === 'seller') return -1;
    if (b.answerer_name.toLowerCase() === 'seller') return 1;
    return sortByHelpfulness(a, b);
  };

  // allAnswers.sort(helpfulnessFirst);
  allAnswers.sort(sortSellerFirst);

  const [numAnswers, setNumAnswers] = useState(2);
  const visibleAnswers = Object.values(allAnswers).slice(0, numAnswers);

  // TO-DO: make this a CSS change so can animate it to make it appear smooth; also animate the chevron
  const [moreAnswersShown, setMoreAnswersShown] = useState(false);

  const changeNumAnswers = (val) => {
    const count = Math.max(2, numAnswers + val);
    setNumAnswers(count);
  };
  const handleScroll = (e) => {
    if (moreAnswersShown) {
      const bottom = 0.9 * (e.target.scrollHeight - e.target.scrollTop) <= e.target.clientHeight;
      if (bottom && allAnswers.length > numAnswers) {
        changeNumAnswers(2);
      }
    }
  };

  const answersList = () => {
    if (allAnswers.length === 0) {
      return (
        <AnswerNone>
          This question has not been answered yet!
        </AnswerNone>
      );
    }
    const list = visibleAnswers.map((answer, index) => (
      <AnswerEntry answer={answer} key={answer.id} />
    ));
    return (
      <AnswersListContainer
        id="question_answers"
        // onScroll={handleScroll}
      >
        {list}
      </AnswersListContainer>
    );
  };

  const moreAnswersButtonText = moreAnswersShown ? 'Collapse Answers' : 'See More Answers';

  const handleClickMoreAnswers = () => {
    // const newAnswersNum = moreAnswersShown ? -100 : 2;
    const newAnswersNum = moreAnswersShown ? 2 : 100;
    // changeNumAnswers(newAnswersNum);
    setNumAnswers(newAnswersNum);
    setMoreAnswersShown((prev) => !prev);
  };

  const moreAnswers = (
    <MoreAnswers type="button" onClick={handleClickMoreAnswers}>
      <MoreAnswersButtonText>
        {moreAnswersButtonText}
      </MoreAnswersButtonText>
      <Arrow moreAnswersShown={moreAnswersShown}>&#9662;</Arrow>
    </MoreAnswers>
  );

  return (
    <Answers>
      {answersList()}
      {allAnswers?.length > 2 && moreAnswers}
    </Answers>
  );
}

const Answers = styled.div`
  padding-bottom: 1rem;
  font-size: 1.0em;
/*  width: 90%; */
`;

const AnswersListContainer = styled.div`
/*  max-height: 25em; */
  overflow-x: hidden;
  overflow-y: auto;
  text-align: justify;
  padding-bottom: 0.1rem;
`;

const AnswerNone = styled.p`
  padding-bottom: 1rem;
  padding-left: 0;
  margin-block-end: 0.5em;
`;

const MoreAnswers = styled(Button)`
  display: flex;
  cursor: pointer;
  background-color: ${(props) => props.theme.backgroundColor};
  }
  border: none;
  font-family: inherit;
  font-weight: bold;
  font-size: 0.83em;
  &:hover {
    box-shadow: none;
  }
  padding: 0.5em 0;
  margin: 0;
  transition: 1s ease-in-out;
`;

const MoreAnswersButtonText = styled.span`
  padding-right: 0.25em;
  ${MoreAnswers}&:hover {
    text-decoration: underline;
  }
`;

const Arrow = styled.span`
  margin-top: -0.1rem;
  ${(props) => props.moreAnswersShown && css`
    transform: translateY(0.5em) rotateX(-180deg);
  `}
`;
