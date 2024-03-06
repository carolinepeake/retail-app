import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import AnswerEntry from './AnswerEntry';
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

  allAnswers.sort(sortSellerFirst);

  // TO-DO: make this a CSS change so can animate it to make it appear smooth; also animate the chevron
  const [showMoreAnswers, setShowMoreAnswers] = useState(false);

  const endingSlice = showMoreAnswers ? 100 : 2;

  const visibleAnswers = Object.values(allAnswers).slice(0, endingSlice);

  const answersList = () => {
    if (allAnswers.length === 0) {
      return (
        <AnswerNone>
          This question has not been answered yet!
        </AnswerNone>
      );
    }


  const moreAnswersButtonText = showMoreAnswers ? 'Collapse Answers' : 'See More Answers';

  const handleClickMoreAnswers = () => {
    setShowMoreAnswers((prev) => !prev);
  };

  const moreAnswers = (
    <MoreAnswers type="button" onClick={handleClickMoreAnswers}>
      <MoreAnswersButtonText>
        {moreAnswersButtonText}
      </MoreAnswersButtonText>
      <Arrow $expanded={showMoreAnswers}>&#9662;</Arrow>
    </MoreAnswers>
  );

    const list = visibleAnswers.map((answer) => (
      <AnswerEntry answer={answer} key={answer.id} />
    ));
    return (
      <>
      {/* <Container>
          <WrappingFlexBox> */}
        <Answer id="answer_header">
          {/* Answers */}
          A:
        </Answer>
        {/* <AddAnswer
          // onClick={answerQuestion}
        >
            Add Answer
          </AddAnswer> */}
          {/* </WrappingFlexBox> */}
        <AnswersListContainer
          id="question_answers"
        >
          {list}
          {allAnswers?.length > 2 && moreAnswers}
        </AnswersListContainer>
       {/* </Container> */}
      </>
    );
  };

  // const moreAnswersButtonText = showMoreAnswers ? 'Collapse Answers' : 'See More Answers';

  // const handleClickMoreAnswers = () => {
  //   setShowMoreAnswers((prev) => !prev);
  // };

  // const moreAnswers = (
  //   <MoreAnswers type="button" onClick={handleClickMoreAnswers}>
  //     <MoreAnswersButtonText>
  //       {moreAnswersButtonText}
  //     </MoreAnswersButtonText>
  //     <Arrow $expanded={showMoreAnswers}>&#9662;</Arrow>
  //   </MoreAnswers>
  // );

  return (
    <Answers>
      {answersList()}
      {/* {allAnswers?.length > 2 && moreAnswers} */}
    </Answers>
  );
}

const Container = styled.div`
  display: flex;
  margin: 1rem 0;
`;

const Answer = styled.h4`
 /* font-size: 1.0em; */
  padding-right: 0.5rem;
  margin: 0;
  line-height: 1.5rem;
 /* min-width: calc(2em + 1px); */
  width: max-content;
 /* bottom-border: 1px lightgrey solid; */
  font-weight: 300;
  font-size: 1.17em;
 /* min-width: calc(2em + 1px); */
  min-width: calc(1.5em + 1px);

  @media (min-width: 600px) {
    padding-right: 1rem;
    min-width: calc(2em + 1px);
  }
`;

const Answers = styled.div`
 /* padding-bottom: 1rem; */
  font-size: 1.0em;
  display: flex;
/*  margin: 1rem 0; */
  margin-top: 1rem;
`;

const AnswersListContainer = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  text-align: justify;
/*  padding-bottom: 0.1rem; */
 /* margin-top: 0.5rem; */
  width: 100%;
`;

const WrappingFlexBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
`;

const AddAnswer = styled.button`
  cursor: pointer;
  &:hover {
    font-weight: 500;
  }
  &:visited {
    color: ${(props) => props.theme.clicked};
  }
  border: 1px lightgrey solid;
  padding: 0.25rem 1rem;
  border-radius: 25px;
  background: transparent;
  font-size:  ${(props) => props.theme.tertiary};
  font-weight: 300;
`;

const AnswerNone = styled.p`
  /* padding-bottom: 1rem; */
  padding-left: 0;
  /* margin-block-end: 0.5em; */
  margin-top: 0;
  margin-bottom: 0;
 /* padding-bottom: 0.875em; */
`;

const MoreAnswers = styled(Button)`
  display: flex;
  gap: 0.375em;
  cursor: pointer;
 /* background-color: ${(props) => props.theme.backgroundColor}; /
  background-color: inherit;
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
  ${MoreAnswers}&:hover {
    text-decoration: underline;
  };
  &:hover {
    text-decoration: underline;
  }
`;

const Arrow = styled.span`
  font-size: 1.25em;
  margin-top: -0.125rem;
  ${(props) => props.$expanded && css`
    transform: translateY(0.125em) rotateX(-180deg);
  `}
`;
