const axios = require('axios');
require('dotenv').config();

axios.defaults.headers.common.Authorization = process.env.AUTH_TOKEN;

module.exports.getReviews = (req, res) => {
  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews', { params: req.query })
    .then((result) => {
      res.send(result.data);
    })
    .catch((err) => {
      console.error('There was an error in the getReviews controller function:\n', err);
      res.sendStatus(400);
    });
};

module.exports.getReviewsMeta = (req, res) => {
  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta', { params: req.query })
    .then((result) => {
      res.send(result.data);
    })
    .catch((err) => {
      console.error('There was an error in the getReviewsMeta controller function:\n', err);
      res.sendStatus(400);
    });
};

module.exports.postReview = (req, res) => {
  console.log(req.body);
  axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews', req.body)
    .then((result) => {
      // API does not send back posted data
      res.status(201).send(result.data);
    })
    .catch((err) => {
      console.error('There was an error in the postReview controller function:\n', err);
      res.sendStatus(400);
    });
};

module.exports.putReviewHelpful = (req, res) => {
  console.log(req.params);
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/${req.params.review_id}/helpful`)
    .then((result) => {
      res.status(204).send(result.data);
    })
    .catch((err) => {
      console.error('There was an error in the putReviewHelpful controller function:\n', err);
      res.sendStatus(400);
    });
};

module.exports.putReviewReport = (req, res) => {
  console.log(req.params);
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/${req.params.review_id}/report`)
    .then((result) => {
      res.status(204).send(result.data);
    })
    .catch((err) => {
      console.error('There was an error in the putReviewReport controller function:\n', err);
      res.sendStatus(400);
    });
};
