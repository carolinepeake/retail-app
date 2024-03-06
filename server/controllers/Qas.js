const axiosInstance = require('./axiosInstance');

module.export.getQuestions = async (req, res, next) => {
  const id = req.params.productId;
  const count = req.params.count || 100;
  const page = req.params.page || 1;
  try {
    const questions = await axiosInstance.get(`/qa/questions/?product_id=${id}&&count=${count}&&page=${page}`);
    if (questions) {
      res.send(questions);
      next();
    } else {
      res.status(404).error({ message: 'atellier api route incorrect' });
    }
  } catch (error) {
    res.status(500).error({ message: error.message });
  }
};

module.exports.postQuestion = async (req, res, next) => {
  const postBody = req.body;
  try {
    const response = await axiosInstance.post('/qa/questions', postBody);
    if (response.status === 'ok') { // not sure this is correct
      res.status(201);
      next();
    } else {
      res.status(400).send({ message: 'atellier api route incorrect' });
    }
  } catch (err) {
    res.status(200).error({ message: err.message });
  }
};

module.exports.helpfulQuestion = async (req, res, next) => {
  const questionID = req.body.id;
  try {
    const response = await axiosInstance.put(`qa/questions/${questionID}/helpful`);
    if (response.status === 'ok') {
      res.status(201).send({ docId: questionID });
      next();
    } else {
      res.status(400).send({ message: 'atellier api route incorrect' });
    }
  } catch (err) {
    res.status(201).error({ message: err.message });
  }
};

module.exports.reportQuestion = async (req, res, next) => {
  const questionID = req.body.id;
  try {
    const response = await axiosInstance.put(`qa/questions/${questionID}/report`);
    if (response.status === 'ok') {
      res.status(201).send({ docId: questionID });
      next();
    } else {
      res.status(400).send({ message: 'atellier api route incorrect' });
    }
  } catch (err) {
    res.status(201).error({ message: err.message });
  }
};

module.exports.postAnswer = async (req, res, next) => {
  const questionID = req.body.question_ID;
  const postBody = req.body;
  try {
    const response = await axiosInstance.post(`qa/questions/${questionID}/answers`, postBody);
    if (response.status === 'ok') { // not sure this is correct on any of the post, put, or delete requests
      res.status(201);
      next();
    } else {
      res.status(400).send({ message: 'atellier api route incorrect' });
    }
  } catch (err) {
    res.status(200).error({ message: err.message });
  }
};

module.exports.helpfulAnswer = async (req, res, next) => {
  const answerID = req.body.id;
  try {
    const response = await axiosInstance.put(`qa/answers/${answerID}/helpful`);
    if (response.status === 'ok') {
      res.status(201).send({ docId: answerID });
      next();
    } else {
      res.status(400).send({ message: 'atellier api route incorrect' });
    }
  } catch (err) {
    res.status(201).error({ message: err.message });
  }
};

module.exports.reportAnswer = async (req, res, next) => {
  const answerID = req.body.id;
  try {
    const response = await axiosInstance.put(`qa/answers/${answerID}/report`);
    if (response.status === 'ok') {
      res.status(201).send({ docId: answerID });
      next();
    } else {
      res.status(400).send({ message: 'atellier api route incorrect' });
    }
  } catch (err) {
    res.status(201).error({ message: err.message });
  }
};
