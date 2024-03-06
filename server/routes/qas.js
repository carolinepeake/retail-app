const express = require('express');

const {
  getQuestions,
  postQuestion,
  reportQuestion,
  helpfulQuestion,
  helpfulAnswer,
  postAnswer,
  reportAnswer,
} = require('../controllers/Qas');

const qaRouter = express.Router();

qaRouter.get('/questions', getQuestions);
qaRouter.post('/questions', postQuestion);
qaRouter.put('/questions/:questionID/helpful', helpfulQuestion);
qaRouter.put('/questions/:questionID/report', reportQuestion);

qaRouter.post('/questions/:questionID/answers', postAnswer);
qaRouter.put('/anwers/:answerID/helpful', helpfulAnswer);
qaRouter.put('/anwers/:answerID/report', reportAnswer);

module.export = qaRouter;
