import React, { useState } from 'react';
import styled from 'styled-components';
import AddQuestionModal from './AddQuestionModal';
import { useGlobalContext } from '../../../contexts/GlobalStore';
import Button from '../../reusable/Button.jsx';

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
        <StyledButton primary load type="submit" onClick={() => increaseQuestions()}>
          More Questions
        </StyledButton>
      ) : null}
      <StyledButton primary modal type="submit" onClick={() => setShowModal(true)}>
        Ask a Question +
      </StyledButton>
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

const StyledButton = styled(Button)`
  background-color: ${(props) => props.theme.secondaryColor};
  color: ${(props) => props.theme.fontColor};
`;
// height: 3rem;
// width: 14rem;

export default ExtraButtons;
