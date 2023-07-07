const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports.uploadFile = async (req, res) => {
  try {
    // const file = req.body.image;
    const uploadedResponse = await cloudinary.uploader.upload({
      // upload_preset: 'retail-app',
      file: req.body.image,
      return_delete_token: true,

    });
    // const uploadedResponse = await cloudinary.uploader.upload(file, {
    //   // upload_preset: 'retail-app',
    //   return_delete_token: true,
    // });
    // const uploadedResponse = await cloudinary.uploader.upload(file);
    res.status(201).send(uploadedResponse);
  } catch (err) {
    console.log(err);
    // send error message and code
    // { message: 'Missing required parameter - file',
  // name: 'Error',
  // http_code: 400
// }
    res.status(400).send(err);
  }
};
