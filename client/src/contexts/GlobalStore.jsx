import React, {
  useState, useEffect, useMemo, useContext, createContext,
} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import buildURL from 'axios/lib/helpers/buildURL';

export const GlobalContext = createContext({});

// To-DO: product 40349, a photo url has an extra "u" at the beginning of it

export function useGlobalContext() {
  return useContext(GlobalContext);
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

  const [productID, setProductID] = useState();
  const [products, setProducts] = useState([]);

  // const [productInfo, setProductInfo] = useState({});
  const [styles, setStyles] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState({});

  // getProducts,
  // getStyles,
  // getProductById,
  // getStyleById,
  // getRelated,

  useEffect(() => {
    const fetchProducts = () => {
      axios.get('/products')
        .then((productsData) => setProducts(productsData))
        .catch((error) => console.log('error fetching products: ', error));
    };
    fetchProducts();

    const fetchStyles = () => {
      axios.get('/products/styles')
        .then((stylesData) => setStyles(stylesData))
        .catch((error) => console.log('error fetching products: ', error));
    };
    fetchStyles();
  }, [products, styles]);

  // FETCH PRODUCTS AND STYLES FIRST
  // store in cache or private state (_PRODUCTS, _STYLES)
  // use helper functions to format data correctly from the private states
  // will only need 2 requests to get all product, style, and related ids for every item
  // (and these are unlikely to change frequently)

  // INITIALIZE PRODUCT ID
  // );

  // useEffect(() => {

  // }, [productID])
  // if (!productID) initProductId(); // only need to run once upon startup

  if (!productID) {
    // set productId from url params or default // am I mising window?
    // const initProductId = () => (
    const params = new URL(document.location.href).searchParams;
    const product = params.get('productId');
    // const product = params.get('productId');
    if (typeof product === 'number') {
      setProductID(product);
    } else {
      setProductID(40344);
    }
  }

  // GRAB REVIEWS META AND CALCULATE STAR RATING
  // cache star rating, product details, first photos of each style for viewed products

  // GRAB REVIEWS META FOR RELATED PRODUCTS AND USE HELPER FUNCTIONS TO TRANSFORM AND STORE SURFACE LEVEL INFO ON EACH RELATED PRODUCT. MAINTAIN CACHE OF THIS DATA AND ADD ANY NEW RELATED PRODUCTS TO IT

  // MAINTAIN BAG STATE IN LOCAL STORAGE, OR AT LEAST PRODUCT IDS, BUT MIGHT JUST BE EASIER & FASTER TO DENORMALIZE

  // IF REVEIWS OR QUESTIONS/ANSWERS NOT ON SCREEN, CAN SUSPEND REQUEST OR REQUEST IN BACKGROUND

  // WILL NEED TO SUBSCRIBE TO DB TO LISTEN FOR AND PULL CHANEGS TO REVIEWS AND QUESTIONS/ANSWERS B/C CHANGE FREQUENTLY

  // MAY ONLY NEED 5 DB REQUESTS TO GET ALL THE INFO

  // DISPATCH CONTEXTS:
  // QUESTIONS/ANSWERS/REVIEWS
  // HELPFUL, REPORT, UPLOAD PHOTOS, POST Q, A, OR R

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
  // const [outfits, setOutfits] = useState([]);
  // related products

  useEffect(() => {
    function getStyles() {
      return axios.get(`products/${productID}/styles`)
        .then((stylesResult) => {
          setSelectedStyle(stylesResult.data.results[0]);
          setStyles(stylesResult.data.results);
        })
        .catch((err) => console.error('error getting product styles', err));
    }
    if (productID) {
      const stylesData = getStyles();
      setStyles(stylesData);
      console.log('got styles: ', stylesData);
    }
  }, [productID]);

  // function getQuestions() {
  //   const baseUrl = 'http://localhost:3000/questions/';
  //   const params = {
  //     product_id: productID,
  //     count: numQuestions,
  //     page: questionPage,
  //   };
  //   const requestUrl = buildURL(baseUrl, params);
  //   axios
  //     .get(requestUrl)
  //     .then((results) => {
  //       setQuestions(results.data.results);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  // function getReviews() {
  //   // const {
  //   //   params: {
  //   //     product_id: productID,
  //   //     count: numReviews,
  //   //     page: revPage,
  //   //     sort: sortOrder,
  //   //   },
  //   // })

  //   const params = new URLSearchParams();
  //   params.append('param1', 'value1');
  //   params.append('param2', 'value2');
  //   params.append('param2', 'value2');

  //   axios
  //     .get('/reviews', { params })
  //     .then((result) => {
  //       setReviews(result.data.results);
  //     })
  //     .catch((err) => {
  //       console.log('Error getting reviews: ', err);
  //     });
  // }

  function getReviewsMetaData(id) {
    return axios
      .get('/reviews/meta', {
        params: {
          product_id: id,
        },
      })
      .then((result) => {
        setRevMeta(result.data);
        console.log('review meta data: ', result.data);
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

  // function getRelated() {
  //   setProductList([]);
  //   axios
  //     .get('/products/related', {
  //       params: {
  //         productID,
  //       },
  //     })
  //     .then((results) => {
  //       function filterDuplicates(value, index, array) {
  //         // filter Bright Future Sunglasses
  //         if (value === 40345) {
  //           return false;
  //         }
  //         // filter duplicates
  //         if (value === Number(productID)) {
  //           return false;
  //         }
  //         return array.indexOf(value) === index;
  //       }
  //       const relatedProducts = results.data.filter(filterDuplicates);
  //       relatedProducts.forEach((id) => {
  //         // determine if can fill in info from cache
  //         // if not, request product info, styles, and rev Meta
  //         const details = axios.get('/relatedItem', { params: { productID: id } });
  //         const image = axios.get('/relatedImage', { params: { productID: id } });
  //         const stars = axios.get('/relatedStars', { params: { product_id: id } });
  //         Promise.all([
  //           details,
  //           image,
  //           stars,
  //         ])
  //           .then((object) => {
  //             const tempObj = {
  //               productID: object[0].data.id,
  //               productInfo: object[0].data,
  //               selectedStyle: object[1].data.results[0],
  //               revMeta: object[2].data,
  //             };
  //             setProductList((oldList) => [...oldList, tempObj]);
  //           })
  //           .catch((err) => {
  //             console.log(err);
  //           });
  //       });
  //     })
  //     .catch((error) => console.log('Error getting related products: ', error));
  // }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  useEffect(() => {
    // getProductInfo();
    // getStyles();
    // getQuestions();
    // getReviews();
    getReviewsMetaData();
    // getRelated();
    scrollToTop();
  }, [productID]);

  // don't request again, just filter
  // useEffect(() => {
  //   filterReviews();
  // }, [sortOrder, numReviews, revPage]);

  const dependencies = [
    productID,
    // productInfo,
    // styles,
    // selectedStyle,
    // questions,
    // numQuestions,
    // questionPage,
    // reviews,
    // revMeta,
    // sortOrder,
    // numReviews,
    // revPage,
    // outfits,
    // productList,
  ];

  const value = useMemo(() => ({
    productID,
    setProductID,
    // productInfo,
    // setProductInfo,
    setProducts,
    products,
    styles,
    setStyles,
    selectedStyle,
    setSelectedStyle,
    questions,
    setQuestions,
    numQuestions,
    setNumQuestions,
    // questionPage,
    // setQuestionPage,
    reviews,
    setReviews,
    revMeta,
    setRevMeta,
    // numReviews,
    // setNumReviews,
    // revPage,
    // setRevPage,
    // sortOrder,
    // setSortOrder,
    // outfits,
    // setOutfits,
    // productList,
    // setProductList,
  }), dependencies);

  window.history.replaceState(null, '', `?productId=${productID}`);

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
}
