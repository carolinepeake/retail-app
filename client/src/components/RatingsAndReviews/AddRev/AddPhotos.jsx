import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// const cloudinary = require('cloudinary').v2;
// require('dotenv').config();
import Button from '../../reusable/Button';

function AddPhotos() {
  //
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

  // TO-DO: implement add photos functionality
  const handleAddPhotos = function handleAddPhotos(event) {
    //
    console.log(event.target.files);
  };

  return (
    <div>
      <div>Upload your photos</div>
      <FileInput
        type="file"
        id="photos"
        accept="image/png, image/jpeg"
        onChange={(event) => handleAddPhotos(event)}
      />
      <br />
      {/* <AddButton disabled>
        Add Photos
      </AddButton> */}
    </div>
  );
}

// AddPhotos.propTypes = {
//   revMeta: PropTypes.shape({
//     product_id: PropTypes.string,
//   }).isRequired,
// };

export default AddPhotos;

const AddButton = styled(Button)`
`;

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

const AddPhotosBackground = styled.div`
  height: 100vw;
  width: 100vw;
  background: #1fe0;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0; left: 0;
`;
