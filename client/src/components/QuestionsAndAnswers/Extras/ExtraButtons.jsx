import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import AddQuestionModal from './AddQuestionModal';
import { useGlobalContext } from '../../../contexts/GlobalStore';
import Button from '../../reusable/Button';
import ShowMoreListItems from '../../reusable/LargeList/ShowMoreListItems';

// TO-DO: extract this component and use for QA and RR

function ExtraButtons({
  itemsPerPage,
  setItemsPerPage,
  scrollToListTop,
  setPageNum,
}) {
  const [showModal, setShowModal] = useState(false);
  const {
    filteredQuestions,
    numQuestions,
    setNumQuestions,
  } = useGlobalContext();

  // previously used to increase scroll container by 2 each time it was clicked
  // could do this until reach 10 and then show all questions with 10 per page
  // should return the id canceling the setTimeout?
  const increaseQuestions = () => {
    // useRef?
    const container = document.getElementById('scrollable-container');
    // prev + 2?
    setNumQuestions(numQuestions + 2);

    const prevMaxHeight = container.scrollHeight;
    setTimeout(() => {
      container.scrollTop = prevMaxHeight;
    }, 0);
  };

  return (
    <ButtonContainer>
      {filteredQuestions.length > 2
      && (
        <ShowMoreListItems
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          itemText="Questions"
          scrollToListTop={scrollToListTop}
          setPageNum={setPageNum}
        />
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
  itemsPerPage: PropTypes.number.isRequired,
  setItemsPerPage: PropTypes.func.isRequired,
  setPageNum: PropTypes.func.isRequired,
  scrollToListTop: PropTypes.func.isRequired,
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
