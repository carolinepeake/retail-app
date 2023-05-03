import React, { useState } from 'react';
import styled from 'styled-components';
import AddQuestionModal from './AddQuestionModal';
import { useGlobalContext } from '../../../contexts/GlobalStore';
import Button from '../../reusable/Button';

function ExtraButtons() {
  const [showModal, setShowModal] = useState(false);
  const { questions, numQuestions, setNumQuestions } = useGlobalContext();

  function increaseQuestions() {
    const container = document.getElementById('scrollable-container');
    setNumQuestions(numQuestions + 2);

    const prevMaxHeight = container.scrollHeight;
    setTimeout(() => {
      container.scrollTop = prevMaxHeight;
    }, 0);
  }

  return (
    <ButtonContainer>
      {numQuestions < questions.length ? (
        <QuestionsButton type="button" onClick={() => increaseQuestions()}>
          More Questions
        </QuestionsButton>
      ) : null}
      <QuestionsButton type="button" modal onClick={() => setShowModal(true)}>
        Ask a Question +
      </QuestionsButton>
      {showModal ? (
        <AddQuestionModal setShowModal={setShowModal} />
      ) : null}
    </ButtonContainer>
  );
}

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 600px) {
    flex-direction: row;
    column-gap: 2rem;
    justify-content: space-evenly;
    align-items: center;
  };
`;

  // margin-left: 1rem;
  // margin-right: 1rem;
  // margin-top: 0.3rem;

const QuestionsButton = styled(Button)`
  flex: 1;
  margin: 0.5rem 0;

  @media (min-width: 600px) {
    margin: 0;
  };
`;
// padding: 12px;
// padding: calc(7.5px + 0.75vw);
// font-size: 12px;
// padding: calc(4px + 1.2vw) calc(10px + 1vw);
export default ExtraButtons;
