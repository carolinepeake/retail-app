const axiosInstance = require('./axiosInstance');

module.exports.getReviews = async (req, res, next) => {
  const id = req.params.productId;
  const count = req.params.numReviews || 100;
  const page = req.params.revPage || 1;
  const sort = req.params.sortOrder || 'helpful';
  try {
    const reviews = await axiosInstance.get(`/reviews/?product_id=${id}&&count=${count}&&page=${page}&&sort=${sort}`);
    if (reviews) {
      res.send(reviews);
      next();
    } else {
      res.status(404).error({ message: 'atellier api route incorrect' });
    }
  } catch (error) {
    res.status(500).error({ message: error.message });
  }
};

module.exports.getReviewsMeta = async (req, res, next) => {
  try {
    const metaData = await axiosInstance.get('reviews/meta', { params: req.query }); // not sure what req.query is here
    if (metaData) {
      res.send(metaData);
      next();
    } else {
      // not sure about this
      res.status(404).send({ message: 'atellier api route incorrect' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports.postReview = async (req, res, next) => {
  const postBody = req.body;
  try {
    const response = await axiosInstance.post('/reviews', postBody);
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

module.exports.putReviewHelpful = async (req, res, next) => {
  const reviewId = req.body.id;
  try {
    const response = await axiosInstance.put(`/reviews/${reviewId}/helpful`);
    if (response.status === 'ok') {
      res.status(201).send({ docId: reviewId });
      next();
    } else {
      res.status(400).send({ message: 'atellier api route incorrect' });
    }
  } catch (err) {
    res.status(201).error({ message: err.message });
  }
};

module.exports.putReviewReport = async (req, res, next) => {
  const reviewId = req.body.id;
  try {
    const response = await axiosInstance.put(`/reviews/${reviewId}/report`);
    if (response.status === 'ok') {
      res.status(201).send({ docId: reviewId });
      next();
    } else {
      res.status(400).send({ message: 'atellier api route incorrect' });
    }
  } catch (err) {
    res.status(201).error({ message: err.message });
  }
};
