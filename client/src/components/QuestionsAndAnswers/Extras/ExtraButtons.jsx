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
        <Button onClick={() => increaseQuestions()}>
          More Questions
        </Button>
      ) : null}
      <Button modal onClick={() => setShowModal(true)}>
        Ask a Question +
      </Button>
      {showModal ? (
        <AddQuestionModal setShowModal={setShowModal} />
      ) : null}
    </ButtonContainer>
  );
}

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-top: 0.3rem;
  border-radius: 5px;
`;

export default ExtraButtons;
