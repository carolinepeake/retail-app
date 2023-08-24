export const filterReviews = (reviews, filters) => {
  if (filters.length > 0) {
    return reviews.filter(review => filters.includes(review.rating));
  }
  return reviews;
};