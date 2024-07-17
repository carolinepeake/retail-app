const axiosInstance = require('./axiosInstance');

module.exports = {
  getProducts: async (req, res, next) => {
    const { page, count } = req.params;
    try {
      const products = await axiosInstance.get(`/products/?page=${page}&&count=${count}`);
      res.send(products.data);
      next();
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  getProductById: async (req, res, next) => {
    const id = req.params.product_id;
    try {
      const product = await axiosInstance.get(`/products/${id}`);
      res.send(product.data);
      next();
    } catch (err) {
      console.log('error fetching product info from API: ', err);
      res.status(500).send({ message: err.message });
    }
  },

  getProductStyles: async (req, res, next) => {
    const id = req.params.product_id;
    try {
      const styles = await axiosInstance.get(`/products/${id}/styles`);
      res.send(styles.data);
      next();
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  // TODO: save in related data obj with product id as key or add to productId data obj
  getRelated: async (req, res, next) => {
    const id = req.params.product_id;
    try {
      const related = await axiosInstance.get(`/products/${id}/related`);
      res.send(related.data);
      next();
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },
};
