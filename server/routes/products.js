const express = require('express');
const {
  getProducts,
  getStyles,
  getProductById,
  getStyleById,
  getRelated,
} = require('../controllers/Products');

console.log('getProducts: ', getProducts);

const productsRouter = express.Router();

productsRouter.get('/', getProducts);
productsRouter.get('/:product_id', getProductById);
productsRouter.get('/:productId/styles', getStyleById);
productsRouter.get('/styles', getStyles);
productsRouter.get('/:productID/related', getRelated);

module.export = productsRouter;
