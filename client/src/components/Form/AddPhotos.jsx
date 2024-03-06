import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import axios from 'axios';
import { CloseButton } from '../Buttons';
import PhotoPreview from './PhotoPreview';
import { removeFileExtension } from '../../utils/getFormat';

function AddPhotos({
  handleInputChange,
  photos,
}) {
  const [selectedFile, setSelectedFile] = useState(null);

  const [uploadProgress, setUploadProgress] = useState(0);
  const [showProgressBar, setShowProgressBar] = useState(false);

  const [error, setError] = useState(null);

  const [fileInputKey, setFileInputKey] = useState('');

  const handleFileChange = (e) => {
    setError(null);

    const file = e.target.files[0];
    setSelectedFile(file);
    console.log('file: ', file);

    const validateFileInput = (fileInput) => {
      if (fileInput.size === 0) {
        setError('Empty file');
        return false;
      }
      if (!fileInput.type.match('image.*')) {
        setError('You cannot upload this file because it is not an image.');
        return false;
      }
      if (fileInput.size >= 2000000) {
        setError('You cannot upload this file because its size exceeds the maximum limit of 2 MB.');
        return false;
      }
      const uploadedFiles = photos.map((photo) => photo.original_filename);
      const selectedFileName = removeFileExtension(fileInput.name);
      if (uploadedFiles.includes(selectedFileName)) {
        // double check size also same (and thus unlikely to be two diff files in diff directories w/ same name)
        const matchingIndex = uploadedFiles.indexOf(selectedFileName);
        const matchingFileSize = photos[matchingIndex].bytes;
        if (matchingFileSize === fileInput.size) {
          setError('File already uploaded');
          return false;
        }
      }
      if (fileInput.error) {
        setError('Upload failed. Please try again.');
        return false;
      }
      return true;
    };

    if (!validateFileInput(file)) {
      return;
    }

    const handleFileUpload = (fileInput) => {
      setShowProgressBar(true);

      const formData = new FormData();
      formData.append('file', fileInput);
      formData.append('upload_preset', 'retail-app');

      // const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;
      const CLOUD_NAME = 'di0afgxmj';
      const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
      const options = {
        onUploadProgress: (event) => {
          const { loaded, total } = event;
          setUploadProgress((loaded / total) * 100);
        },
      };

      axios.post(url, formData, options)
        .then((response) => response.data)
        .then((uploadedPhoto) => {
          const event = {
            target: {
              name: 'photos',
              value: [...photos, uploadedPhoto],
            },
          };
          handleInputChange(event);
          // to change visible selected file name to "no file chosen"
          // setSelectedFile(null);
          // resetFileInput();
        })
        .catch((err) => {
          console.log('error uploading photo: ', err);
          const message = err.response.data.error.message || 'Image Upload Failed';
          setError(message);
        })
        .finally(() => {
          setShowProgressBar(false);
          setSelectedFile(null);
          resetFileInput();
        });
    };

    // handleFileUpload(file);
  };

  const handleClickDeleteFile = (photo) => {
    const previewsCopy = photos.slice();
    for (let i = 0; i < photos.length; i++) {
      if (photos[i].public_id === photo.public_id) {
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

    const resetFileInput = () => {
      const randomString = Math.random().toString(36);
      setFileInputKey(randomString);
    };

    const selectedFileName = removeFileExtension(selectedFile?.name);
    if (selectedFileName === photo.original_filename) {
      resetFileInput();
      setSelectedFile(null);
      setError(null);
    }
    // TO-DO: use cloudinary delete method if using delete token fails
  };

  const progressBar = (
    <ProgressBar>
      <Progress $width={uploadProgress} />
    </ProgressBar>
  );

  const errorMessage = (
    <Error>
      Error:
      &nbsp;
      {error}
    </Error>
  );

  return (
    <>
      {photos.length < 6
      && (
      <StyledLabel htmlFor="photos">
        Upload Your Photos

        <FileInput
          type="file"
          key={fileInputKey || ''}
          id="photos"
          accept="image/png, image/jpeg"
          onChange={handleFileChange}
          $fileSelected={selectedFile}
          // multiple
          name="photos"
        />

        <Disclaimer>
          You may add up to 6 images at 2MB max per image.
        </Disclaimer>

        {error && errorMessage}

      </StyledLabel>
      )}

      {showProgressBar && progressBar}

      {photos.length > 0 && (
        <PhotoPreviews>
          {photos.map((photo) => (
            <PhotoPreview
              preview={photo}
              handleClickDeleteFile={handleClickDeleteFile}
              key={photo.public_id}
            />
          ))}
        </PhotoPreviews>
      )}
    </>
  );
}

AddPhotos.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      public_id: PropTypes.string,
    }),
  ),
};

AddPhotos.defaultProps = {
  photos: [],
};

export default AddPhotos;

const StyledLabel = styled.label`
  color: rgb(37, 55, 70);
  font-weight: 400;
  font-size: ${(props) => props.theme.body};
  display: block;
`;

const Disclaimer = styled.h5`
  font-style: oblique;
  padding-top: 0;
`;

const Error = styled(Disclaimer)`
  color: ${(props) => props.theme.formError};
  margin-top: 0.25em;
`;

const FileInput = styled.input`
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  display: block;
  width: 100%;
  border-radius: 3px;
  cursor: pointer;
  font-size: ${(props) => props.theme.input};
  color: ${(props) => (props.$fileSelected ? props.theme.fontColor : props.theme.inputPlaceholder)};
  background-color: ${(props) => props.theme.backgroundColor};

  border: ${(props) => props.theme.submitButton} solid thin;

  ::file-selector-button {
    color: ${(props) => props.theme.fontColor};
    background-color: ${(props) => props.theme.submitButton};
    font-weight: 500;
    padding: 1em;
    margin-right: 1.0em;
    width: 10em;
    border: none;
    border-radius: 3px;
    border: ${(props) => props.theme.submitButton} solid thin;

    apperance: none;
    appearance: none;

    &::after {
      height: 2em;
      padding: 0.5em;
      width: 2em;
      line-height: 1em;
      font-size: 1em;
      content: 'X';
      margin-right: 1em;
      border-radius: inherit;
      font-weight: 500;
      border: none;
      background: ${(props) => props.theme.submitButton};
    }

    &:hover {
      color: ${(props) => props.theme.submitButtonHoverFont};
      background-color: ${(props) => props.theme.submitButtonHover};
      border: ${(props) => props.theme.submitButtonHover} solid thin;
    }
  }

  &:focus {
    outline: ${(props) => props.theme.blue[5]} 2px solid;
    outline-offset: 2px;
    border: none;
  }
`;

const ProgressBar = styled.div`
  margin: 0.5em 0em;
  border: 1px ${(props) => props.theme.blue[5]} solid;
  border-radius: 3px;
  height: 1em;
  width: 100%;
  position: relative;
`;

const Progress = styled.div`
  height: 100%;
  background-color: ${(props) => props.theme.blue[5]};
  border-radius: 5px;
  position: absolute;
  width: ${(props) => props.$width}%;
`;

const PhotoPreviews = styled.div`
 /* display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  margin-top: 1.0em;
  gap: 1.0em; */

  margin: 2em 0.25em;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2em;

  @media (min-width: 350px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 450px) {
    gap: 2.5em;
  }


`;
