const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports.uploadFile = async (req, res) => {
  try {
    const file = req.body.image;
    // const uploadedResponse = await cloudinary.uploader.upload(file, {
    //   upload_preset: 'retail-app',
    // });
    const uploadedResponse = await cloudinary.uploader.upload(file);
    res.status(201).send(uploadedResponse);
  } catch (err) {
    console.log(err);
  }
};
