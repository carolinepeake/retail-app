const express = require('express');
const { getProducts, getStyles } = require('./controllers/Products');
const { helpfulAnswer, postAnswer, reportAnswer } = require('./controllers/Answers');
const { getQuestions, postQuestion, reportQuestion, helpfulQuestion } = require('./controllers/Questions');
const { getRelatedItem, getRelatedImage, getRelatedStars } = require('./controllers/Related');
const { postReview, getReviews, getReviewsMeta, putReviewHelpful, postsRouter, putReviewReport } = require('./controllers/Reviews');
const { uploadFile } = require('./controllers/Cloudinary');

const router = express.Router();
const answersRouter = express.Router();
const productsRouter = express.Router();
const questionsRouter = express.Router();
const reviewsRouter = express.Router();
const relatedRouter = express.Router();
const stylesRouter = express.Router();
const cloudinaryRouter = express.Router();

module.exports = { answersRouter, productsRouter, questionsRouter, reviewsRouter, relatedRouter, stylesRouter, cloudinaryRouter, router };

// postsRouter.delete('/:postId', deletePost);

// module.exports.Router = {
//   router,
//   cloudinary: cloudinaryRouter,
//   products: productsRouter,
//   questions: questionsRouter,
//   reviews: reviewsRouter,
//   related: relatedRouter,
//   answers: answersRouter,
//   styles: stylesRouter,
// };

// router.get('/products' params: { productId: 40344 }, Products.getProducts);
productsRouter.get('/', getProducts);
productsRouter.get('/:productId/styles', getStyles);

// router.get('/related', (req, res) => (Related.getRelated);
relatedRouter.get('/relatedItem', getRelatedItem);
relatedRouter.get('/relatedImage', getRelatedImage);
relatedRouter.get('/relatedStars', getRelatedStars);

questionsRouter.get('/', getQuestions);
questionsRouter.post('/', postQuestion);
questionsRouter.put('/:questionID/helpful', helpfulQuestion);
questionsRouter.put('/:questionID/report', reportQuestion);

answersRouter.post('/', postAnswer);
answersRouter.put('/helpful', helpfulAnswer);
answersRouter.put('/report', reportAnswer);

reviewsRouter.get('/', getReviews);
reviewsRouter.get('/meta', getReviewsMeta);
reviewsRouter.post('/', postReview);
reviewsRouter.put('helpful', putReviewHelpful);
reviewsRouter.put('/report', putReviewReport);

cloudinaryRouter.post('/upload', uploadFile);

