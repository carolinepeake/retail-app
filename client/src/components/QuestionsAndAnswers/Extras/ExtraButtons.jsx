import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import AddQuestionModal from './AddQuestionModal';
import { useGlobalContext } from '../../../contexts/GlobalStore';
import Button from '../../reusable/Button';
import ShowMoreListItems from '../../reusable/LargeList/ShowMoreListItems';

function ExtraButtons({ setItemsPerPage }) {
  const [showModal, setShowModal] = useState(false);
  const { filteredQuestions, numQuestions, setNumQuestions, questions } = useGlobalContext();

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
      {/* {numQuestions < questions.length && ( */}
      {filteredQuestions.length > 2
      && (
        <ShowMoreListItems setItemsPerPage={setItemsPerPage} itemText="Questions" />
      //   <QuestionsButton type="button" onClick={() => increaseQuestions()}>
      //     More Questions
      //   </QuestionsButton>
      )}
      <QuestionsButton type="button" modal onClick={() => setShowModal(true)}>
        Ask a Question +
      </QuestionsButton>
      {showModal && (
        <AddQuestionModal setShowModal={setShowModal} />
      )}
    </ButtonContainer>
  );
}

ExtraButtons.propTypes = {
  setItemsPerPage: PropTypes.func.isRequired,
};

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 1.0em;

  @media (min-width: 600px) {
    flex-direction: row;
    column-gap: 2rem;
    justify-content: space-evenly;
    align-items: center;
    padding: 1.0em 0 1.0em 0;
  };
`;

const QuestionsButton = styled(Button)`
  flex: 1;
  margin: 0.5rem 0;

  @media (min-width: 600px) {
    margin: 0;
  };
`;

export default ExtraButtons;
