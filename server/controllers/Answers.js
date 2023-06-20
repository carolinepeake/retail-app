const axios = require('axios');

axios.defaults.headers.common.Authorization = process.env.AUTH_TOKEN;

module.exports.postAnswer = (req, res) => {
  // send all information in body
  const questionID = req.body.question_ID;
  const postBody = {
    body: req.body.body,
    name: req.body.name,
    email: req.body.email,
  };

  if (req.body.photos) {
    postBody.photos = req.body.photos;
  }

  axios
    .post(
      `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${questionID}/answers`,
      postBody,
    )
    .then((result) => {
      res.status(201).send(result.data);
       // API does not send back posted data
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

module.exports.helpfulAnswer = (req, res) => {
  const answerID = req.body.answer_id;

  axios
    .put(
      `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/answers/${answerID}/helpful`,
    )
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

module.exports.reportAnswer = (req, res) => {
  const answerID = req.body.answer_id;

  axios
    .put(
      `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/answers/${answerID}/report`,
    )
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};
