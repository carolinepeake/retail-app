import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export const GlobalContext = React.createContext();

export function useGlobalContext() {
  return React.useContext(GlobalContext);
}

export function GlobalContextProvider({ children }) {
  GlobalContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const [productID, setProductID] = useState(40344);
  const [productInfo, setProductInfo] = useState({});
  const [styles, setStyles] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState({});

  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [numQuestions, setNumQuestions] = useState();

  const [reviews, setReviews] = useState([]);

  const [outfits, setOutfits] = useState([]);
  const [currOutfit, setCurrOutfit] = useState({});
  const [cardIndex, setCardIndex] = useState(0);
  const [outfitIndex, setOutfitIndex] = useState(0);
  const [productList, setProductList] = useState([]);
  const [revMeta, setRevMeta] = useState({});

  useEffect(() => {
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

    function getQuestions() {
      axios
        .get('/questions', {
          params: { product_id: productID, count: 1000 },
        })
        .then((results) => {
          setQuestions(results.data.results);
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
    getQuestions();

    getProductInfo();
    setNumQuestions(2);
    scrollToTop();
  }, [productID]);

  useEffect(() => {
    axios.get('/styles', {
      params: {
        product_id: productID,
      },
    }).then((stylesResult) => {
      setSelectedStyle(stylesResult.data.results[0]);
      setStyles(stylesResult.data.results);
    })
      .catch((err) => console.error('error getting product styles', err));
  }, [productID]);

  useEffect(() => {
    setProductList([]);
    axios.get('/related', { params: { productID } })
      .then((results) => {
        // Get all related product IDs
        (results.data).map((id) => {
          const details = axios.get('/relatedItem', { params: { productID: id } });
          const image = axios.get('/relatedImage', { params: { productID: id } });
          const stars = axios.get('/relatedStars', { params: { reviewID: id } });
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
    const stars = axios.get('/relatedStars', { params: { reviewID: productID } });
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
  }, [productID]);

  const dependencies = [
    productID,
    productInfo,
    styles,
    selectedStyle,
    questions,
    filteredQuestions,
    numQuestions,
    reviews,
    outfits,
    currOutfit,
    cardIndex,
    outfitIndex,
    productList,
    revMeta];

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
    reviews,
    setReviews,
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
    revMeta,
    setRevMeta,
  }), dependencies);

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
}
