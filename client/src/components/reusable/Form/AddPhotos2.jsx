import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import axios from 'axios';
// import { Button } from '../../reusable/Button';
import { StyledExitButton } from '../../reusable/Button';
import PhotoPreview from './PhotoPreview';

// TO-DO: make error if file already uploaded

// fileUpload can use file name as it's id
// have a status div
  // can have a useEffect function that listens for onloadstart (status before is pending or something),
  // tracks progress, and returns either the cloudinary image data, in which case a success message is rendered,
  // or returns an error, in which case an error message is rendered
  // the submit button for the form is disabled until all the upload file promises have returned;
  // after each promise returns, can loop through the status of all the promises
  // via an reducing function and see if any are still resolving
  // or can keep an array of all the remaining promises and delete each promise when it's finished
  // or simply maintain a count and subtract one every time a promise finishes

// also once have successfully uploaded max number of files, have a function to check if any files still resolving and abort

// can have a big file component that is going to include
// methods:
  // abort
  // check if still resolving
  // useStatus
    // utils:
      // getErrorMessage
      // get progress value
  // handleUpload
  // process image / get image url
  // state:
    // id
    // type
    // size
    // lastModified
    // status: {

    // }
    // data, error, progress?
    // should maybe keep time stamp at onloadstart (and maybe on selection too) {
      // can abort the process if takes too long using settimeout
   //  }
     // maybe should make my own promise using setTimeout, and result of upload handler
     // once have either data or error
      // can pass that down to children preview and errorMessage components
        // which respectively have a geterrormessage or a getimageurl function
        // can also have a progress bar component with a getprogress function

function AddPhotos2({ photos, setPhotos }) {
  // function handlePreviews(event) {
  //   if (preview.length >= 5 || event.target.files.length === 0) {
  //     return;
  //   }

  // const [ImageUpload, setImageUplod] = useState({
  //   selectedFile: null,
  //   inputError: null,
  //   uploadedImage: null,
  //   imagePreview:
  // })

  const [selectedFile, setSelectedFile] = useState(null);
  const [inputError, setInputError] = useState(null);
  // might want to move error, uploadedImage, progress into one state object, because for example when upload completes,
  // both uploadProgress and either uploadError or uploadImage state will update
  const [uploadError, setUploadError] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [error, setError] = useState(null);

  const [fileInputKey, setFileInputKey] = useState('');

  const resetFileInput = () => {
    let randomString = Math.random().toString(36);

    setFileInputKey(randomString);
  };

  // const validateFileInput = (file) => {
  //   const error = {
  //     name: file.name,
  //   };
  //   if (!file) {
  //     error.message = 'No file selected';
  //   }
  //   else if (file.size === 0) {
  //     error.message = 'Empty file';
  //   }
  //   else if (file.error) {
  //     error.message = 'Upload failed. Please try again.';
  //   }
  //   else if (!file.type.match('image.*')) {
  //     error.message = 'You cannot upload this file because it’s not an image.';
  //   }
  //   else if (file.size >= 2000000) {
  //     error.message = 'You cannot upload this file because its size exceeds the maximum limit of 2 MB.';
  //   }
  //   return error.message ? error : null;
  // };

  const validateFileInput = (file) => {
    // if (!file) {
    //   // setInputError('No file selected');
    //   setError('No file selected');
    //   return false;
    // }
    if (file.size === 0) {
      // setInputError('Empty file');
      setError('Empty file');
      return false;
    }
    if (file.error) {
      // setInputError('Upload failed. Please try again.');
      setError('Upload failed. Please try again.');
      return false;
    }
    if (!file.type.match('image.*')) {
      // setInputError('You cannot upload this file because it’s not an image.');
      setError('You cannot upload this file because it’s not an image.');
      return false;
    }
    if (file.size >= 2000000) {
      // setInputError('You cannot upload this file because its size exceeds the maximum limit of 2 MB.');
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
      setUploadProgress(50);
    }
  };

  const handleFileUpload = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'retail-app');

    axios.post(url, formData, options)
    .then((response) => {
      // if (!response.ok) {
      //   throw Error(response.json());
      // }
      return response.data;
    })
    .then((uploadedPhoto) => {
      console.log('uploadedPhoto: ', uploadedPhoto);

      setUploadedImage(uploadedPhoto);
      setPhotos([...photos, uploadedPhoto]);
    })
    .catch((error) => {

      console.log('error uploading photo: ', error);
      const message = error.response?.data?.error?.message ?? 'Image Upload Failed';
      setUploadError(message);
    });
  }

  function processImage(id) {
    var options = {
      client_hints: true,
    };
    return '<img src="'+ $.cloudinary.url(id, options) +'" style="width: 100%; height: auto"/>';
  }

  // use callback?
  const handleFileChange = (e) => {
    setError(null);
    const file = e.target.files[0];
    setSelectedFile(file);
    console.log('file :', file);
    // if (!validateFileInput(file)) {
    //   return;
    // }
    handleFileUpload(file);
  }

  const progressBar = (
    <ProgressBar>
      <Progress uploadProgress={uploadProgress} style={{width: `${uploadProgress}%`}}></Progress >
    </ProgressBar>
  );

  // use handleInputChange in useForm to save file input value to state
  // then on focus out validate and set preview urls

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
            // inputError={inputError}
          />
          {error && <Error>Error: {error}</Error>}
        </FormField>)}
        {/* {progressBar} */}

      {photos.length > 0 && (
        <PhotoPreviews>
          {photos.map((photo) => (
            <PhotoPreview
              photo={photo}
              photos={photos}
              setPhotos={setPhotos}
              resetFileInput={resetFileInput}
              key={photo.public_id}
            />))}
        </PhotoPreviews>
      )}
{/*
      {uploadedImage && (
      <ImageContainer
        key={uploadedImage.public_id}
      >
        <ImagePreview
          src={uploadedImage.url}
          alt={uploadedImage.original_filename}
        />
        <StyledExitButton
          type="button"
          onClick={(deleteToken, publicId) => handleClickDeleteFile(deleteToken, publicId)}
          deleteToken={uploadedImage.delete_token}
          publicId={uploadedImage.public_id}
        >
          &#10005;
        </StyledExitButton>
        <span>{uploadedImage.original_filename}</span>
        <span>Image Upload Successfully</span>
      </ImageContainer>
      )} */}
     {uploadError && <Error>Error: {uploadError}</Error>}
      {/* <AddButton disabled onClick={() => handleAddPhotos()}>
        Add Photos
      </AddButton> */}
    </>
  );
}

// AddPhotos.propTypes = {
//   preview: PropTypes.arrayOf(PropTypes.string).isRequired,
//   setPreview: PropTypes.func.isRequired,
// };

export default AddPhotos2;

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
// content: '`${props.inputError}`';
// ${(props) => props.inputError && css`
// &::after {
//   content: 'error';
//   color: ${props.theme.formError};
//   font-style: oblique;
// }
// `};

const ProgressBar = styled.div`
  margin: 0.5em 1em;
  border: 1px black solid;
  border-radius: 5px;
  height: 1em;
  width: 100%;
  position: relative;
`;

const Progress = styled.div`
  height: 100%;
  background-color: blue;
  border-radius: 5px;
  position: absolute;
`;
// width: ${(props) => `${props.width}%`};

const PhotoPreviews = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1.0em;
`;

// const AddButton = styled(Button)`
// `;

// const AddPhotosBackground = styled.div`
//   height: 100vw;
//   width: 100vw;
//   background: #1fe0;
//   position: fixed;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   top: 0; left: 0;
// `;
