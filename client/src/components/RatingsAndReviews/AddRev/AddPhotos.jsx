import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// const cloudinary = require('cloudinary').v2;
// require('dotenv').config();

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

  const handleAddPhotos = function handleAddPhotos(event) {
    //
    console.log(event.target.files);
  };

  return (
    <div>
      <div>Upload your photos</div>
      <input
        type="file"
        id="photos"
        accept="image/png, image/jpeg"
        onChange={(event) => handleAddPhotos(event)}
      />
      <br />
    </div>
  );
}

// AddPhotos.propTypes = {
//   revMeta: PropTypes.shape({
//     product_id: PropTypes.string,
//   }).isRequired,
// };

export default AddPhotos;

const AddButton = styled.button`
  padding: 0.75em;
  font-size: 1.17em;
  font-weight: bold;
  background-color: ${(props) => props.theme.secondaryColor};
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
