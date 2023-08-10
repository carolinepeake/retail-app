import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import AddQuestionModal from './AddQuestionModal';
import { Button } from '../../../components/Buttons';
import ShowMoreListItems from '../../../components/LargeList/ShowMoreListItems';
import useModal from '../../../hooks/useModal';

// TO-DO: extract this component and use for QA and RR

function ExtraButtons({
  itemsPerPage,
  setItemsPerPage,
  scrollToListTop,
  setPageNum,
  listLength,
}) {
  const [showModal, toggleModal] = useModal();

  return (
    <ButtonContainer>
      {listLength > 2
      && (
        <ShowMoreListItems
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          itemText="Questions"
          scrollToListTop={scrollToListTop}
          setPageNum={setPageNum}
        />
      )}
      <QuestionsButton
        type="button"
        $primary
        onClick={toggleModal}
      >
        Ask a Question +
      </QuestionsButton>
      {showModal && (
        <AddQuestionModal
          toggleModal={toggleModal}
        />
      )}
    </ButtonContainer>
  );
}

ExtraButtons.propTypes = {
  itemsPerPage: PropTypes.number.isRequired,
  setItemsPerPage: PropTypes.func.isRequired,
  setPageNum: PropTypes.func.isRequired,
  scrollToListTop: PropTypes.func.isRequired,
  listLength: PropTypes.number.isRequired,
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
  }
`;

const QuestionsButton = styled(Button)`
  flex: 1;
  margin: 0.5rem 0;

  @media (min-width: 600px) {
    margin: 0;
  }
`;

export default ExtraButtons;
