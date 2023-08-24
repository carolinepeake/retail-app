import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CloseButton } from '../Buttons';

export default function PhotoPreview({
  preview,
  handleClickDeleteFile,
}) {
  const handleClickDelete = () => {
    handleClickDeleteFile(preview);
  };

  return (
    <ImageContainer>
      <ImagePreview
        src={preview.url}
        alt={preview.original_filename}
      />
      <DeleteButton
        $round
        onClick={handleClickDelete}
      >
        &#10005;
      </DeleteButton>
    </ImageContainer>
  );
}

PhotoPreview.propTypes = {
  preview: PropTypes.shape({
    url: PropTypes.string,
    original_filename: PropTypes.string,
    public_id: PropTypes.string,
  }).isRequired,
  handleClickDeleteFile: PropTypes.func.isRequired,
};

const ImageContainer = styled.div`
  position: relative;
  font-size: 0.5em;
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  max-width: 140px;
  max-height: 140px;
  object-fit: scale-down;
`;

const DeleteButton = styled(CloseButton)`
  font-size: 1.5em;
  top: -0.75em;
  right: -0.75em;
  background-color: ${(props) => props.theme.blue[5]};
  color: ${(props) => props.theme.submitButtonHoverFont};
`;
