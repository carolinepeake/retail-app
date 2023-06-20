import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export const GlobalContext = React.createContext();

export function useGlobalContext() {
  return React.useContext(GlobalContext);
}
// TO-DO: test performance of requesting 2 questions and reviews initially
// and then requesting more as the user scrolls through the pages of reviews
// v. requesting all reviews initially
// think about how can store state info in url query parameters so as not to require round trip to backend to share/persist state

// TO-DO: request product info, default image url, reviews meta data first
// cache above info for current product and related products
// don't request data from same endpoints to which data is posted until necessary

export function GlobalContextProvider({ children }) {
  GlobalContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  // Works when ready to hook up API with URL
  // setProductID(window.location.pathname || 40348);

  const params = new URL(document.location).searchParams;
  const product = params.get('productId');
  console.log('product: ', product);
  const [productID, setProductID] = useState(product || 40344);

  // const [productID, setProductID] = useState(40344);
  const [productInfo, setProductInfo] = useState({});
  const [styles, setStyles] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState({});

  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [numQuestions, setNumQuestions] = useState(100);
  const [questionPage, setQuestionPage] = useState(1);

  const [reviews, setReviews] = useState([]);
  const [revMeta, setRevMeta] = useState({});
  const [sortOrder, setSortOrder] = useState('relevant');
  const [numReviews, setNumReviews] = useState(100);
  const [revPage, setRevPage] = useState(1);

  // can use productInfo
  const [outfits, setOutfits] = useState([]);
  const [currOutfit, setCurrOutfit] = useState({});
  const [cardIndex, setCardIndex] = useState(0);
  const [outfitIndex, setOutfitIndex] = useState(0);
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
      });
  }

  function getStyles() {
    axios.get('/styles', {
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
        // should prolly deal with this conditionally in the component instead
        setFilteredQuestions(results.data.results);
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
        console.log('reviews: ', result.data);
      })
      .catch((err) => {
        console.log('Error getting reviews: ', err);
      });
  }

  function getReviewsMetaData() {
    axios
      .get('/reviews/meta', {
        params: {
          product_id: productID,
        },
      })
      .then((result) => {
        setRevMeta(result.data);
        console.log('reviews meta: ', result.data);
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
        (results.data).forEach((id) => {
          const details = axios.get('/relatedItem', { params: { productID: id } });
          const image = axios.get('/relatedImage', { params: { productID: id } });
          const stars = axios.get('/relatedStars', { params: { productID: id } });
          return Promise.all([details, image, stars])
            .then((object) => {
              const tempObj = {
                details: object[0],
                image: object[1],
                stars: object[2],
              };
              setProductList((oldList) => [...oldList, tempObj]);
            })
            .catch((err) => {
              console.log(err);
            });
        });
      })
      .catch((error) => console.log('Error here:', error));
    // Get data for current product ID for user to add outfit
    const details = axios.get('/relatedItem', { params: { productID } });
    const image = axios.get('/relatedImage', { params: { productID } });
    const stars = axios.get('/relatedStars', { params: { productID } });
    Promise.all([details, image, stars])
      .then((object) => {
        const outfitObj = {
          details: object[0],
          image: object[1],
          stars: object[2],
        };
        setCurrOutfit(outfitObj);
      })
      .catch((err) => {
        console.log(err);
      });
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
    getReviewsMetaData();
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
    filteredQuestions,
    numQuestions,
    questionPage,
    reviews,
    revMeta,
    sortOrder,
    numReviews,
    revPage,
    outfits,
    currOutfit,
    cardIndex,
    outfitIndex,
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
    filteredQuestions,
    setFilteredQuestions,
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
    currOutfit,
    setCurrOutfit,
    cardIndex,
    setCardIndex,
    outfitIndex,
    setOutfitIndex,
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
