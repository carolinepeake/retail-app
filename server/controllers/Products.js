const axiosInstance = require('./axiosInstance');

module.export = {
  getProducts: async (req, res, next) => {
    try {
      const products = await axiosInstance.get('/products');
      if (products) {
        res.send(products);
        next();
      } else {
        res.status(404).error({ message: 'atellier api route incorrect' });
      }
    } catch (error) {
      res.status(500).error({ message: error.message });
    }
  },

  getProductById: async (req, res, next) => {
    const id = req.params.product_id;
    try {
      const product = await axiosInstance.get(`/product/${id}`);
      if (product) {
        res.send(product);
        next();
      } else {
      // not sure about this
        res.status(404).send({ message: 'atellier api route incorrect' });
      }
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },

  getStyles: async (req, res, next) => {
    try {
      const styles = await axiosInstance.get('/products/styles');
      if (styles) {
        res.send(styles);
        next();
      } else {
        res.status(404).error({ message: 'atellier api route incorrect' });
      }
    } catch (error) {
      res.status(500).error({ message: error.message });
    }
  },

  getStylesById: async (next, req, res) => {
    const id = req.params.product_id;
    try {
      const style = await axiosInstance.get(`/products/${id}/styles`);
      if (style) {
        res.send(style);
        next();
      } else {
        res.status(404).error({ message: 'atellier api route incorrect' });
      }
    } catch (error) {
      res.status(500).error({ message: error.message });
    }
  },

  getRelated: async (req, res, next) => {
    const id = req.params.productID;
    try {
      const related = await axiosInstance.get(`/products/${id}/related`);
      if (related) {
        res.send(related);
        next();
      } else {
      // not sure about this
        res.status(404).send({ message: 'atellier api route incorrect' });
      }
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },
};
