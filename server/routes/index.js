const express = require('express');
const productsRouter = require('./products');
const reviewsRouter = require('./reviews');
const qasRouter = require('./qas');

const { uploadFile } = require('../controllers/Cloudinary');

const cloudinaryRouter = express.Router();
cloudinaryRouter.post('/', uploadFile);
module.export.cloudinaryRouter = cloudinaryRouter;

module.export.productsRouter = productsRouter;
module.export.reviewsRouter = reviewsRouter;
module.export.qasRouter = qasRouter;
