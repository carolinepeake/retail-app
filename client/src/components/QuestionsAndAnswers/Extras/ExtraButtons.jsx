import React, { useState } from 'react';
import styled from 'styled-components';
import AddQuestionModal from './AddQuestionModal';
import { useGlobalContext } from '../../../contexts/GlobalStore';

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
      <Button type="submit" onClick={() => setShowModal(true)}>
        Ask a Question
      </Button>
      {numQuestions < questions.length ? (
        <Button type="submit" onClick={() => increaseQuestions()}>
          More Questions
        </Button>
      ) : null}
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
  border-radius: 10px;
`;

const Button = styled.button`
  height: 2.5rem;
  width: 14rem;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
  background-color: ${(props) => props.theme.secondaryColor};
  color: ${(props) => props.theme.fontColor};
`;

export default ExtraButtons;
