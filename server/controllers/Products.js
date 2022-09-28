const axios = require('axios');
require('dotenv').config();

axios.defaults.headers.common.Authorization = process.env.AUTH_TOKEN;

module.exports.getProducts = (req, res) => {
  const productId = req.query.ID || null;
  axios({
    method: 'get',
    url: productId ? `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${productId}` : 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products',
  })
    .then((result) => {
      res.send(result.data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

module.exports.getStyles = (req, res) => {
  const productId = req.query.product_id || 40348;
  axios({
    method: 'get',
    // should use a path method instead so works in all browers for sure
    // or use params
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${productId}/styles`,
  })
    .then((result) => {
      res.send(result.data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};
