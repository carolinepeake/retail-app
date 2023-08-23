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

  const resetFileInput = () => {
    const randomString = Math.random().toString(36);
    setFileInputKey(randomString);
  };

  const handleFileChange = (e) => {
    setError(null);

    const file = e.target.files[0];
    setSelectedFile(file);

    const validateFileInput = (file) => {
      if (file.size === 0) {
        setError('Empty file');
        return false;
      }
      if (!file.type.match('image.*')) {
        setError('You cannot upload this file because it is not an image.');
        return false;
      }
      if (file.size >= 2000000) {
        setError('You cannot upload this file because its size exceeds the maximum limit of 2 MB.');
        return false;
      }
      const uploadedFiles = photos.map(photo => photo.original_filename);
      const selectedFileName = removeFileExtension(file.name);
      if (uploadedFiles.includes(selectedFileName)) {
        // double check size also same (and thus unlikely to be two diff files in diff directories w/ same name)
        const matchingIndex = uploadedFiles.indexOf(selectedFileName);
        const matchingFileSize = photos[matchingIndex].bytes;
        console.log('photos: ', photos, 'selectedFileName: ', selectedFileName, 'matching index: ', matchingIndex, 'matching file size: ', matchingFileSize);
        console.log('matchingFileSize: ', matchingFileSize, 'file size: ', file.size);
        if (matchingFileSize === file.size) {
          setError('File already uploaded');
          return false;
        }
      }
      if (file.error) {
        setError('Upload failed. Please try again.');
        return false;
      }
      return true;
    };

    if (!validateFileInput(file)) {
      return;
    }

    const handleFileUpload = (file) => {
      setShowProgressBar(true);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'retail-app');

      // const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;
      const CLOUD_NAME = 'di0afgxmj';
      const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
      const options = {
        onUploadProgress: (e) => {
          const { loaded, total } = e;
          setUploadProgress(loaded / total * 100);
        },
      };

      axios.post(url, formData, options)
        .then((response) => response.data)
        .then((uploadedPhoto) => {
          const e = {
            target: {
              name: 'photos',
              value: [...photos, uploadedPhoto],
            },
          };
          handleInputChange(e);
          // changes visible selected file name to "no file chosen"
          // setSelectedFile(null);
          // resetFileInput();
        })
        .catch((error) => {
          console.log('error uploading photo: ', error);
          const message = error.response.data.error.message || 'Image Upload Failed';
          setError(message);
        })
        .finally(() => {
          setShowProgressBar(false);
        });
    };

    handleFileUpload(file);
  };

  const progressBar = (
    <ProgressBar>
      <Progress $width={uploadProgress} />
    </ProgressBar>
  );

  return (
    <>
      {photos.length < 5
      && (
      <StyledLabel htmlFor="photos">
        Upload Your Photos

        <FileInput
          type="file"
          key={fileInputKey || ''}
          id="photos"
          accept="image/png, image/jpeg"
          onChange={handleFileChange}
          $fileSelected={selectedFile?.name?.length > 0}
          // multiple
          name="photos"
        />

        <Disclaimer>
          You may add up to 5 images at 2MB max per image.
        </Disclaimer>

        {error && (
        <Error>
          Error:
          &nbsp;
          {error}
        </Error>
        )}

      </StyledLabel>
      )}

      {showProgressBar && progressBar}

      {photos.length > 0 && (
        <PhotoPreviews>
          {photos.map((photo) => (
            <PhotoPreview
              preview={photo}
              previews={photos}
              resetFileInput={resetFileInput}
              key={photo.public_id}
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
              handleInputChange={handleInputChange}
              setError={setError}
            />
          ))}
        </PhotoPreviews>
      )}
    </>
  );
}

AddPhotos.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  photos: PropTypes.arrayOf(PropTypes.string),
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
  padding-top: 0.25em;
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
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  margin-top: 1.0em;
  gap: 1.0em;
`;
