import axios from 'axios';

export const calcAverageRating = (ratingsObj) => {
  // console.log('ratingsObj: ', ratingsObj);
  let totalRatings = 0;
  let totalVotes = 0;
  const entries = Object.entries(ratingsObj);
  entries.forEach((entry) => {
    const rating = parseInt(entry[0], 10);
    const votes = parseInt(entry[1], 10);
    totalVotes += votes;
    totalRatings += (rating * votes);
  });
  console.log('totalRatings: ', totalRatings, 'totalVotes: ', totalVotes);
  const averageRating = Math.round((totalRatings / totalVotes) * 100) / 100;
  console.log('averageRating: ', averageRating);
  return averageRating;
};

export const calculateStars = (rating) => {
  const average = rating * 4;
  const partialStarCount = Math.round(average) * 5;
  console.log('average in stars: ', average, 'partialTemp: ', partialStarCount);
  return partialStarCount;
};

export const getProductInfo = (id) => {
  axios
    .get('/products', {
      params: {
        ID: id,
      },
    })
    .then((results) => results.data)
  // setProductInfo(results.data);
    .catch((err) => {
      console.error('error getting product info for product ', id, ': ', err);
    });
};

export const getReviewsMetaData = (id) => axios
  .get('/reviews/meta', {
    params: {
      product_id: id,
    },
  })
  .then((result) => {
    // setRevMeta(result.data);
    console.log('reviews meta: ', result.data);
    return result.data;
  })
  .catch((err) => {
    console.log('Error getting reviews meta data: ', err);
  });
