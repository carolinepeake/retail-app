const express = require('express');
const Products = require('./controllers/Products');
const Answers = require('./controllers/Answers');
const Questions = require('./controllers/Questions');
const Related = require('./controllers/Related');
const Reviews = require('./controllers/Reviews');
const Cloudinary = require('./controllers/Cloudinary');

const router = express.Router();

router.get('/products', Products.getProducts);
router.get('/styles', Products.getStyles);

router.get('/related', Related.getRelated);
router.get('/relatedItem', Related.getRelatedItem);
router.get('/relatedImage', Related.getRelatedImage);
router.get('/relatedStars', Related.getRelatedStars);

router.get('/questions', Questions.getQuestions);
router.post('/questions', Questions.postQuestion);
router.put('/questions/helpful', Questions.helpfulQuestion);
router.put('/questions/report', Questions.reportQuestion);

router.post('/answers', Answers.postAnswer);
router.put('/answers/helpful', Answers.helpfulAnswer);
router.put('/answers/report', Answers.reportAnswer);

router.get('/reviews', Reviews.getReviews);
router.get('/reviews/meta', Reviews.getReviewsMeta);
router.post('/reviews', Reviews.postReview);
router.put('/reviews/helpful', Reviews.putReviewHelpful);
router.put('/reviews/report', Reviews.putReviewReport);

router.post('/cloudinary/upload', Cloudinary.uploadFile);

module.exports = router;
