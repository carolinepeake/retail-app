import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';
// import { Button } from '../../../components/Button';

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

function FileUpload({ photos, setPhotos }) {
  // function handlePreviews(event) {
  //   if (preview.length >= 5 || event.target.files.length === 0) {
  //     return;
  //   }
  //   const file = event.target.files[0];
  //   console.log('file: ', file);
  //   const reader = new FileReader();
  //   // reader.readAsDataURL(file);
  //   reader.readAsArrayBuffer(file);
  //   reader.onloadend = () => {
  //     const dataStream = reader.result;
  //     setPreview([...preview, dataStream]);
  //   };
  // }

  // separate into file component
  const [file, setFile] = useState({
    name: '',
    type: '',
    size: null,
    lastModified: '',
  })

  const [status, setStatus] = useState('');

  // const [immediateError, setImmediateError] = useState('');

  const checkForImmediateError = (file) => {
    // file exists

    // check type

    // check size



    return;
  }

  const immediateError = checkforImmediateError(file);

  immediateError && return (

  ) : return null;


  const handleFile = (fileInput) => {

    function validateInput(file) {
      if (!file) {
        setImmediateError('No file selected');
        return false;
      }
      if (!file.type.match('image.*')) {
        setImmediateError('You cannot upload this file because it’s not an image.');
        return false;
      }
      if (file.size >= 2000000) {
        setImmediateError('You cannot upload this file because its size exceeds the maximum limit of 2 MB.');
        return false;
      }
      if (file.error) {
        setImmediateError('Upload failed. Please try again.');
        return false;
      }
    }

    if (!validateInput(fileInput)) {
      handleFileUpload(fileInput);
    }
  }

  const handleFileUpload = async (event) => {
    const { files } = event.target;
    // const file = event.target.value;
    console.log('files: ', files);
    const file = files[0];
    console.log('file: ', file);
    // files.forEach((file) => {
    // })
    // make file select button disabled

    setStatus('Loading...');
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    let dataStream;
    await reader.onloadend = () => {
      dataStream = reader.result;

      // setPreview([...preview, dataStream]);
    };
    // axios.post('/cloudinary/upload', {
    //   image: file.name,
    // })
    axios.post('/cloudinary/upload', {
      image: dataStream,
    })
    .then((result) => {
      setPhotos([...photos, result.data]);
      setStatus('upload successful');
      console.log('cloudinaryImage: ', result.data);
      // postBody.photos.push(result.data.url);
      })
    .catch((err) => {
      const errorMessage = err?.message ?? 'Image upload failed';
      setStatus(errorMessage);
    })
    .finally(() => {
      // make input select active again
    })
  }

  function processImage(id) {
    var options = {
      client_hints: true,
    };
    return '<img src="'+ $.cloudinary.url(id, options) +'" style="width: 100%; height: auto"/>';
  }



     //   async function validatePhotos(previews) {
  //     const promises = [];
  //     for (let i = 0; i < previews.length; i += 1) {
  //       const promise = axios.post('/cloudinary/upload', {
  //         image: previews[i],
  //       });
  //       promises.push(promise);
  //     }
  // }

  // TO-DO: implement add photos functionality
  // function handleAddPhotos() {
  //   console.log(preview);
  // };

  // use handleInputChange in useForm to save file input value to state
  // then on focus out validate and set preview urls

  return (
    <>
      {photos.length < 5 ? (
        <FormField htmlFor="photos">
          Upload Your Photos
          <FileInput
            type="file"
            id="photos"
            accept="image/png, image/jpeg"
            onChange={(event) => handleFileUpload(event)}
            multiple
            // label="Select File"
            name="photos"
          />
          <Disclaimer>
            Optional, max 5
          </Disclaimer>
        </FormField>
      ) : null}
      <div>{status}</div>
      {photos.length > 0 ? (
        <PhotoPreviews>
          {photos.map((photo) => (
            <ImagePreview src={photo.url} alt="" key={photo.id} />
          ))}
        </PhotoPreviews>
      ) : null}
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
// display: block;
// width: 100%;

const PhotoPreviews = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 1.0em;
`;

const ImagePreview = styled.img`
  width: 20%;
  height: 100%;
  margin-right: 1%;
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
