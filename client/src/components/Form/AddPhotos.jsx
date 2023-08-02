import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import axios from 'axios';
import { StyledExitButton } from '../Button';
import PhotoPreview from './PhotoPreview';

// TO-DO: make error if file already uploaded
// Done: resized photos on cloudinary upload so ease posting or whatever its'c called instead of lazily loading requested assets

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
    let randomString = Math.random().toString(36);
    setFileInputKey(randomString);
  };

  const validateFileInput = (file) => {
    if (file.size === 0) {
      setError('Empty file');
      return false;
    }
    if (file.error) {
      setError('Upload failed. Please try again.');
      return false;
    }
    if (!file.type.match('image.*')) {
      setError('You cannot upload this file because it’s not an image.');
      return false;
    }
    if (file.size >= 2000000) {
      setError('You cannot upload this file because its size exceeds the maximum limit of 2 MB.');
      return false;
    }
    return true;
  };

  // const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;
  const CLOUD_NAME = 'di0afgxmj';
  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
  const options = {
    onUploadProgress: (e) => {
      const { loaded, total } = e;
      setUploadProgress(loaded/total * 100);
    }
  };

  const handleFileUpload = (file) => {
    setShowProgressBar(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'retail-app');

    axios.post(url, formData, options)
    .then((response) => {
      return response.data;
    })
    .then((uploadedPhoto) => {
      const e = {
        target: {
          name: 'photos',
          value: [...photos, uploadedPhoto],
        },
      };
      handleInputChange(e);
      setShowProgressBar(false);
    })
    .catch((error) => {
      console.log('error uploading photo: ', error);
      const message = error.response.data.error.message ?? 'Image Upload Failed';
      setError(message);
      setShowProgressBar(false);
    });
  }

  // use callback?
  const handleFileChange = (e) => {
    setError(null);
    const file = e.target.files[0];
    setSelectedFile(file);
    if (!validateFileInput(file)) {
      return;
    }
    handleFileUpload(file);
  }

  const progressBar = (
    <ProgressBar>
      <Progress uploadProgress={uploadProgress} style={{width: `${uploadProgress}%`}}></Progress >
    </ProgressBar>
  );

  return (
    <>
      {photos.length < 5 && (
        <FormField htmlFor="photos">
          <span>Upload Your Photos</span>
            <Disclaimer>
              Max 5
            </Disclaimer>
          <FileInput
            type="file"
            key={fileInputKey || ''}
            id="photos"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
            // multiple
            // label="Select File"
            name="photos"
          />

          {error && <Error>Error: {error}</Error>}
        </FormField>)}

        {showProgressBar && progressBar}

      {photos.length > 0 && (
        <PhotoPreviews>
          {photos.map((photo) => (
            <PhotoPreview
              preview={photo}
              previews={photos}
              // setPreviews={setPreviews}
              resetFileInput={resetFileInput}
              key={photo.public_id}
              selectedFile={selectedFile}
              handleInputChange={handleInputChange}
            />))}
        </PhotoPreviews>
      )}
    </>
  );

  //for photo previews containing component, have it include delete button
}

AddPhotos.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  photos: PropTypes.array.isRequired,
};

export default AddPhotos;

const FormField = styled.label`
  font-size: 1rem;
  cursor: initial;
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
  color: ${(props) => props.theme.fontColor};
  margin-top: 0.25em;
  font-size: 1em;
  font-family: inherit;
  display: block;
  width: 100%;

  ::file-selector-button {
    color: ${(props) => props.theme.fontColor};
    background-color: ${(props) => props.theme.navBgColor};
    cursor: pointer;
    padding: 0.5em 1em;
    margin-right: 0.5em;
    border: 1px solid ${(props) => props.theme.fontColor};
    border-radius: 5px;
  }

  ::placeholder {
    color: ${(props) => props.theme.inputPlaceholder};
  }
`;

const ProgressBar = styled.div`
  margin: 0.5em 0em;
  border: 1px ${(props) => props.theme.fontColor} solid;
  border-radius: 5px;
  height: 1em;
  width: 100%;
  position: relative;
`;

const Progress = styled.div`
  height: 100%;
  background-color: ${(props) => props.theme.submitButton};
  border-radius: 5px;
  position: absolute;
`;

const PhotoPreviews = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1.0em;
`;
