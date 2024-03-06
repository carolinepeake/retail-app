const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports.uploadFile = async (req, res, next) => {
  const file = req.body.image;
  try {
    const uploadedResponse = await cloudinary.uploader.upload({
      // upload_preset: 'retail-app',
      file,
      return_delete_token: true,
    });
    if (uploadedResponse) {
      res.status(201).send(uploadedResponse);
      next();
    } else {
      res.status(404).error({ message: 'cloudinary api route or data form incorrect' });
    }
  } catch (error) {
    res.status(500).error({ message: error.message });
  }
};
