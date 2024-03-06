const express = require('express');

const {
  getReviews,
  getReviewsMeta,
  postReview,
  putReviewHelpful,
  putReviewReport,
} = require('../controllers/Reviews');

const reviewsRouter = express.Router();

reviewsRouter.get('/', getReviews);
reviewsRouter.get('/meta', getReviewsMeta);
reviewsRouter.post('/', postReview);
reviewsRouter.put('helpful', putReviewHelpful);
reviewsRouter.put('/report', putReviewReport);

module.export = reviewsRouter;
