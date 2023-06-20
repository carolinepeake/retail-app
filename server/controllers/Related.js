const axios = require('axios');
require('dotenv').config();

axios.defaults.headers.common.Authorization = process.env.AUTH_TOKEN;

module.exports.getRelated = (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${req.query.productID}/related`, {
    headers: {
      Authorization: process.env.AUTH_TOKEN,
    },
  })
    .then((result) => {
      res.send(result.data);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
};

module.exports.getRelatedItem = (req, res) => {
  // const { productID } = req.query;
  // const endpoints = [
  //   `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${productID}`,
  //   `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${productID}/styles`,
  //   `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/?product_id=${productID}`,
  // ];

  // Promise.all(endpoints.map((endpoint) => axios.get(endpoint, {
  //   headers: {
  //     Authorization: process.env.AUTH_TOKEN,
  //   },
  // })))
  //   .then(([{ data: details }, { data: image }, { data: stars }]) => {
  //     console.log('details: ', details, 'image: ', image, 'stars: ', stars);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.sendStatus(400);
  //   });

  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${req.query.productID}`, {
    headers: {
      Authorization: process.env.AUTH_TOKEN,
    },
  })
    .then((result) => {
      res.send(result.data);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
};

// can re-use getStyles controllers
module.exports.getRelatedImage = (req, res) => {
  // console.log('Get Image:', req.query);
  if (req.query.productID) {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${req.query.productID}/styles`, {
      headers: {
        Authorization: process.env.AUTH_TOKEN,
      },
    })
      .then((result) => {
        // console.log('Related Image:', result);
        res.send(result.data);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  }
};

// can re-use getRevMeta controller
module.exports.getRelatedStars = (req, res) => {
  // console.log('Get Image:', req.query);
  if (req.query.productID) {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/?product_id=${req.query.productID}`, {
      headers: {
        Authorization: process.env.AUTH_TOKEN,
      },
    })
      .then((result) => {
        // console.log('Related Image:', result);
        res.send(result.data);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  }
};
