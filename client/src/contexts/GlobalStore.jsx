import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export const GlobalContext = React.createContext();

// To-DO: product 40349, a photo url has an extra "u" at the beginning of it

export function useGlobalContext() {
  return React.useContext(GlobalContext);
}
// TO-DO: test performance of requesting 2 questions and reviews initially
// and then requesting more as the user scrolls through the pages of reviews
// v. requesting all reviews initially
// think about how can store state info in url query parameters
// so as not to require round trip to backend to share/persist state

// TO-DO: request product info, default image url, reviews meta data first
// cache above info for current product and related products
// don't request data from same endpoints to which data is posted until necessary

export function GlobalContextProvider({ children }) {
  GlobalContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const params = new URL(document.location).searchParams;
  const product = params.get('productId');

  const [productID, setProductID] = useState(product || 40344);

  const [productInfo, setProductInfo] = useState({});
  const [styles, setStyles] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState({});

  const [questions, setQuestions] = useState([]);
  // consider making useFilter custom hook for filtering data list by 1 or many conditions
  // would want to memoize useFilter result
  // can return filtered data
  // would remove filteredQuestions from context
  // but might want to keep any selected filters or searched terms in context
  const [numQuestions, setNumQuestions] = useState(100);
  const [questionPage, setQuestionPage] = useState(1);

  const [reviews, setReviews] = useState([]);
  const [revMeta, setRevMeta] = useState({});
  const [sortOrder, setSortOrder] = useState('relevant');
  const [numReviews, setNumReviews] = useState(100);
  const [revPage, setRevPage] = useState(1);

  // should just store productId and get product info when need it,
  // but will store product info in outfits too, for now
  const [outfits, setOutfits] = useState([]);
  // related products
  const [productList, setProductList] = useState([]);

  function getProductInfo() {
    axios
      .get('/products', {
        params: {
          ID: productID,
        },
      })
      .then((results) => {
        setProductInfo(results.data);
      })
      .catch((err) => {
        console.error('error getting product info for product ', productID, ': ', err);
      });
  }

  function getStyles() {
    return axios.get('/styles', {
      params: {
        product_id: productID,
      },
    }).then((stylesResult) => {
      setSelectedStyle(stylesResult.data.results[0]);
      setStyles(stylesResult.data.results);
    })
      .catch((err) => console.error('error getting product styles', err));
  }

  function getQuestions() {
    axios
      .get('/questions', {
        params: {
          product_id: productID,
          count: numQuestions,
          page: questionPage,
        },
      })
      .then((results) => {
        setQuestions(results.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getReviews() {
    axios
      .get('/reviews', {
        params: {
          product_id: productID,
          count: numReviews,
          page: revPage,
          sort: sortOrder,
        },
      })
      .then((result) => {
        setReviews(result.data.results);
      })
      .catch((err) => {
        console.log('Error getting reviews: ', err);
      });
  }

  function getReviewsMetaData(id) {
    return axios
      .get('/reviews/meta', {
        params: {
          product_id: id,
        },
      })
      .then((result) => {
        setRevMeta(result.data);
        return result.data;
      })
      .catch((err) => {
        console.log('Error getting reviews meta data: ', err);
      });
  }

  // function getRelated() {
  //   axios
  //     .get('/related', {
  //       params: {
  //         productID,
  //       },
  //     })
  //     .then((results) => {
  //       const relatedItems = [];
  //       // Get all related product IDs
  //       (results.data).forEach((id) => {
  //         const relatedItem = axios.get('/relatedItem', { params: { productID: id } });
  //         relatedItems.push(relatedItem);
  //       });
  //       return Promise.all(relatedItems);
  //     })
  //     .then((items) => {
  //       setProductList(items);
  //     })
  //     .catch((error) => console.log('Error here: ', error));
  //   }

  function getRelated() {
    setProductList([]);
    axios
      .get('/related', {
        params: {
          productID,
        },
      })
      .then((results) => {
        function filterDuplicates(value, index, array) {
          if (value === Number(productID)) {
            return false;
          }
          return array.indexOf(value) === index;
        }
        const relatedProducts = results.data.filter(filterDuplicates);
        relatedProducts.forEach((id) => {
          const details = axios.get('/relatedItem', { params: { productID: id } });
          const image = axios.get('/relatedImage', { params: { productID: id } });
          const stars = axios.get('/relatedStars', { params: { product_id: id } });
          Promise.all([
            details,
            image,
            stars,
          ])
            .then((object) => {
              const tempObj = {
                productID: object[0].data.id,
                productInfo: object[0].data,
                selectedStyle: object[1].data.results[0],
                revMeta: object[2].data,
              };
              setProductList((oldList) => [...oldList, tempObj]);
            })
            .catch((err) => {
              console.log(err);
            });
        });
      })
      .catch((error) => console.log('Error getting related products: ', error));
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  useEffect(() => {
    getProductInfo();
    getStyles();
    getQuestions();
    getReviews();
    getReviewsMetaData(productID);
    getRelated();
    scrollToTop();
  }, [productID]);

  useEffect(() => {
    getReviews();
  }, [sortOrder, numReviews, revPage]);

  const dependencies = [
    productID,
    productInfo,
    styles,
    selectedStyle,
    questions,
    numQuestions,
    questionPage,
    reviews,
    revMeta,
    sortOrder,
    numReviews,
    revPage,
    outfits,
    productList,
  ];

  const value = useMemo(() => ({
    productID,
    setProductID,
    productInfo,
    setProductInfo,
    styles,
    setStyles,
    selectedStyle,
    setSelectedStyle,
    questions,
    setQuestions,
    numQuestions,
    setNumQuestions,
    questionPage,
    setQuestionPage,
    reviews,
    setReviews,
    revMeta,
    setRevMeta,
    numReviews,
    setNumReviews,
    revPage,
    setRevPage,
    sortOrder,
    setSortOrder,
    outfits,
    setOutfits,
    productList,
    setProductList,
  }), dependencies);

  window.history.replaceState(null, '', `?productId=${productID}`);

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
}
