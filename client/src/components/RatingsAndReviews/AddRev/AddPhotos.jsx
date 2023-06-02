import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// const cloudinary = require('cloudinary').v2;
// require('dotenv').config();
// import Button from '../../reusable/Button';

function AddPhotos({ preview, setPreview }) {
  // cloudinary.config({
  //   cloud_name: process.env.CLOUDINARY_NAME,
  //   api_key: process.env.CLOUDINARY_API_KEY,
  //   api_secret: process.env.CLOUDINARY_API_SECRET,
  // });

  // const uploadFile = async (req, res) => {
  //   try {
  //     const file = req.body.image;
  //     const uploadedResponse = await cloudinary.uploader.upload(file, {
  //       upload_preset: 'retail-app',
  //     });
  //     res.status(201).send(uploadedResponse);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  function handlePreviews(event) {
    if (event.target.files.length === 0) {
      return;
    }
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64image = reader.result;
      setPreview([...preview, base64image]);
    };
  }

  // TO-DO: implement add photos functionality
  // function handleAddPhotos() {
  //   console.log(preview);
  // };

  return (
    <div>
      <div>Upload your photos</div>
      <FileInput
        type="file"
        id="photos"
        accept="image/png, image/jpeg"
        onChange={(event) => handlePreviews(event)}
      />
      <br />
      <PhotoPreviews>
        {preview.map((photo) => (
          <ImagePreview src={photo} alt="" key={photo} />
        ))}
      </PhotoPreviews>
      {/* <AddButton disabled onClick={() => handleAddPhotos()}>
        Add Photos
      </AddButton> */}
    </div>
  );
}

AddPhotos.propTypes = {
  preview: PropTypes.arrayOf(PropTypes.string).isRequired,
  setPreview: PropTypes.func.isRequired,
};

export default AddPhotos;

const FileInput = styled.input`
  color: ${(props) => props.theme.fontColor};
  margin-top: 0.25em;
  ::file-selector-button {
    color: ${(props) => props.theme.fontColor};
    background-color: ${(props) => props.theme.navBgColor};
    cursor: pointer;
    padding: 0.5em 1em;
    margin-right: 0.5em;
    border: 1px solid ${(props) => props.theme.fontColor};
    border-radius: 5px;
  };
  ::placeholder {
    color: ${(props) => props.theme.inputPlaceholder};
  };
  font-size: 1em;
  font-family: inherit;
`;

const PhotoPreviews = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 1.0em;
`;

const ImagePreview = styled.img`
  width:20%;
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
