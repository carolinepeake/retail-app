import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CloseButton } from '../Buttons';
import { removeFileExtension } from '../../utils/getFormat';

export default function PhotoPreview({
  preview,
  previews,
  resetFileInput,
  selectedFile,
  setSelectedFile,
  handleInputChange,
  setError,
}) {
  const handleClickDeleteFile = () => {
    const previewsCopy = previews.slice();
    for (let i = 0; i < previews.length; i++) {
      if (previews[i].public_id === preview.public_id) {
        previewsCopy.splice(i, 1);
      }
    }
    const e = {
      target: {
        name: 'photos',
        value: previewsCopy,
      },
    };
    handleInputChange(e);
    const selectedFileName = removeFileExtension(selectedFile.name);
    if (selectedFileName === preview.original_filename) {
      resetFileInput();
      setSelectedFile(null);
      setError(null);
    }
    // TO-DO: use cloudinary delete method if using delete token fails
  };

  return (
    <ImageContainer>
      <ImagePreview
        src={preview?.url}
        alt={preview?.original_filename}
      />
      <DeleteButton
        $round
        onClick={handleClickDeleteFile}
      >
        &#10005;
      </DeleteButton>
    </ImageContainer>
  );
}

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
