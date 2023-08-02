get('/products')

[
  {
        "id": 1,
        "name": "Camo Onesie",
        "slogan": "Blend in to your crowd",
        "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
        "category": "Jackets",
        "default_price": "140"
    },
  {
        "id": 2,
        "name": "Bright Future Sunglasses",
        "slogan": "You've got to wear shades",
        "description": "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.",
        "category": "Accessories",
        "default_price": "69"
    },
  {
        "id": 3,
        "name": "Morning Joggers",
        "slogan": "Make yourself a morning person",
        "description": "Whether you're a morning person or not. Whether you're gym bound or not. Everyone looks good in joggers.",
        "category": "Pants",
        "default_price": "40"
    },
  // ...
]

GET ('/products', {
  product_id: PropTypes.number,isRequired
})

{
  "id": 11,
  "name": "Air Minis 250",
  "slogan": "Full court support",
  "description": "This optimized air cushion pocket reduces impact but keeps a perfect balance underfoot.",
  "category": "Basketball Shoes",
  "default_price": "0",
  "features": [
  {
          "feature": "Sole",
          "value": "Rubber"
      },
  {
          "feature": "Material",
          "value": "FullControlSkin"
      },
  // ...
  ],
}

GET ('/products/:product_id/styles')

productId: {
  "product_id": "1",
  "results": [
  {
          "style_id": 1,
          "name": "Forest Green & Black",
          "original_price": "140",
          "sale_price": "0",
          "default?": true,
          "photos": [
      {
                  "thumbnail_url": "urlplaceholder/style_1_photo_number_thumbnail.jpg",
                  "url": "urlplaceholder/style_1_photo_number.jpg"
              },
      {
                  "thumbnail_url": "urlplaceholder/style_1_photo_number_thumbnail.jpg",
                  "url": "urlplaceholder/style_1_photo_number.jpg"
              }
      // ...
          ],
      "skus": {
                "137": {
                      "quantity": 8,
                      "size": "XS"
                },
                "138": {
                      "quantity": 16,
                      "size": "S"
                },
                "139": {
                      "quantity": 17,
                      "size": "M"
                },
          //...
            }
  },
{
      "style_id": 2,
      "name": "Desert Brown & Tan",
      "original_price": "140",
      "sale_price": "0",
      "default?": false,
      "photos": [
        {
          "thumbnail_url": "urlplaceholder/style_2_photo_number_thumbnail.jpg",
          "url": "urlplaceholder/style_2_photo_number.jpg"
        }
    // ...
      ],
      "skus": {
        "140": {
          "quantity": 8,
          "size": "XS"
        },
        "142": {
          "quantity": 16,
          "size": "S"
        },
        "143": {
          "quantity": 17,
          "size": "M"
        },
          //...
      }
  },
// ...
}

GET ('/products/:product_id/related')

[
  2,
  3,
  8,
  7
],


get('/reviews', {
  page: 1,
  count: 5,
  sort: PropTypes.string,
  product_id: PropTypes.number,isRequired
})

{
  "product": "2",
  "page": 0,
  "count": 5,
  "results": [
    {
      "review_id": 5,
      "rating": 3,
      "summary": "I'm enjoying wearing these shades",
      "recommend": false,
      "response": null,
      "body": "Comfortable and practical.",
      "date": "2019-04-14T00:00:00.000Z",
      "reviewer_name": "shortandsweeet",
      "helpfulness": 5,
      "photos": [{
          "id": 1,
          "url": "urlplaceholder/review_5_photo_number_1.jpg"
        },
        {
          "id": 2,
          "url": "urlplaceholder/review_5_photo_number_2.jpg"
        },
        // ...
      ]
    },
    {
      "review_id": 3,
      "rating": 4,
      "summary": "I am liking these glasses",
      "recommend": false,
      "response": "Glad you're enjoying the product!",
      "body": "They are very dark. But that's good because I'm in very sunny spots",
      "date": "2019-06-23T00:00:00.000Z",
      "reviewer_name": "bigbrotherbenjamin",
      "helpfulness": 5,
      "photos": [],
    },
    // ...
  ]
}

get('/reviews/meta', {
  product_id: PropTypes.number,
})

{ "product_id": "2",
  "ratings": {
    2: 1,
    3: 1,
    4: 2,
    // ...
  },
  "recommended": {
    0: 5
    // ...
  },
  "characteristics": {
    "Size": {
      "id": 14,
      "value": "4.0000"
    },
    "Width": {
      "id": 15,
      "value": "3.5000"
    },
    "Comfort": {
      "id": 16,
      "value": "4.0000"
    },
    // ...
}

get('/qa/questions', {
  productId: PropTypes.number.isRequired,
  page: 1,
  count: 5,
})

{
  "product_id": "5",
  "results": [{
        "question_id": 37,
        "question_body": "Why is this product cheaper here than other sites?",
        "question_date": "2018-10-18T00:00:00.000Z",
        "asker_name": "williamsmith",
        "question_helpfulness": 4,
        "reported": false,
        "answers": {
          68: {
            "id": 68,
            "body": "We are selling it here without any markup from the middleman!",
            "date": "2018-08-18T00:00:00.000Z",
            "answerer_name": "Seller",
            "helpfulness": 4,
            "photos": []
            // ...
          }
        }
      },
      {
        "question_id": 38,
        "question_body": "How long does it last?",
        "question_date": "2019-06-28T00:00:00.000Z",
        "asker_name": "funnygirl",
        "question_helpfulness": 2,
        "reported": false,
        "answers": {
          70: {
            "id": 70,
            "body": "Some of the seams started splitting the first time I wore it!",
            "date": "2019-11-28T00:00:00.000Z",
            "answerer_name": "sillyguy",
            "helpfulness": 6,
            "photos": [],
          },
          78: {
            "id": 78,
            "body": "9 lives",
            "date": "2019-11-12T00:00:00.000Z",
            "answerer_name": "iluvdogz",
            "helpfulness": 31,
            "photos": [],
          }
        }
      },
      // ...
  ]
}

GET ('/qa/questions/:question_id/answers', {
  page: 1,
  count: 5,
})


{
  "question": "1",
  "page": 0,
  "count": 5,
  "results": [
    {
      "answer_id": 8,
      "body": "What a great question!",
      "date": "2018-01-04T00:00:00.000Z",
      "answerer_name": "metslover",
      "helpfulness": 8,
      "photos": [],
    },
    {
      "answer_id": 5,
      "body": "Something pretty durable but I can't be sure",
      "date": "2018-01-04T00:00:00.000Z",
      "answerer_name": "metslover",
      "helpfulness": 5,
      "photos": [{
          "id": 1,
          "url": "urlplaceholder/answer_5_photo_number_1.jpg"
        },
        {
          "id": 2,
          "url": "urlplaceholder/answer_5_photo_number_2.jpg"
        },
        // ...
      ]
    },
    // ...
  ]
}

get('/cart')


[
  {
      "sku_id": 1,
      "count": 2
  },
  {
      "sku_id": 3,
      "count": 1
  },
  {
      "sku_id": 5,
      "count": 33
  },
  //...
]


{
  "id": 40344,
  "name": 'Camo Onesie',
  "slogan": 'Blend in to your crowd',
  "description": 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
  "category": 'Jackets',
  "default_price": '140.00',
  "features": [
  {
          "feature": "Sole",
          "value": "Rubber"
      },
  {
          "feature": "Material",
          "value": "FullControlSkin"
      },
  ],
  characteristics: {
    Fit: {
      id: 135219,
      value: '3.2529411764705882'
    },
    Length: {
      id: 135220,
      value: '3.2911646586345382'
    },
    Comfort: {
      id: 135221,
      value: "3.3357972544878564"
    },
    Quality: {
      id: 135222,
      value: '3.2983367983367983'
    }
  }
  ratings: {
    1: '150',
    2: '207',
    3: '326',
    4: '320',
    5: '705'
  }
  recommended: {
    false: '436',
    true: '1272'
  }
}

{
  id: 40346,
  reviews: [
    {
      review_id: 1277736,
      body: "These morning joggers lift me out of bed. I cannot say enough good things about them.",
      date: "2022-12-09T00:00:00.000Z",
      helpfulness: 27,
      photos: [
        {
          id: 2456791,
          url: 'https://images.unsplash.com/photo-1595392312394-0a…lcnN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60'
        }
        {
          id: 2456793,
          url: 'https://images.unsplash.com/photo-1464660439080-b7…pbmV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60'
        }
        {
          id: 2456792,
          url: '"https://images.unsplash.com/photo-1609138273459-0c945e28fdbf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGpvZ2dlcnN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
        }
      ],
      rating: 4
      recommend: true,
      response: null,
      reviewer_name: "SleepyHead",
      summary: "Wake me up to jog!!!",
    },
  ],
}

{
  id: 40351,
  characteristics: {
    Comfort: {
      id: 135246,
      value: '3.7395833333333333'
    },
    Quality: {
      id: 135247,
      value: '3.8958333333333333'
    },
    Size: {
      id: 135244,
      value: '3.0000000000000000'
    },
    Width: {
      id: 135245,
      value: '3.0515463917525773'
    }
  },
  ratings: {
    1: '16',
    2: '10',
    3: '35',
    4: '12',
    5: '75'
  },
  recommended: {
    false: '38',
    true: '110'
  },
  reviews: [
    {
      review_id: 1278022,
      body: "Shoes were high quality and the material felt great.",
      date: "2022-12-16T00:00:00.000Z",
      helpfulness: 3,
      photos: [],
      rating: 5,
      recommend: true,
      response: null,
      reviewer_name: "shoeguy12",
      summary: "Amazing material"
    },
    {
      review_id: 1275155,
      body: "my favourite pokemon that came out is an olive and this piggo names LECHONK ",
      date: "2022-06-04T00:00:00.000Z",
      helpfulness: 2,
      photos: [
        {
          id: 2455171,
          url: "http://res.cloudinary.com/thejoebro/image/upload/v1654301259/plnshhy2osaqivtnygsh.jpg",
        }
      ],
      rating: 5,
      recommend: true,
      response: null,
      reviewer_name: "pokemonLuver",
      summary: "LeChonk",
    }
  ],
  related: [
    {
      id,
      name,
      price: default_price,
      category,
      // check if first photo of each style, or all photos of one style
      photos: [
        // maybe will want to include styleId as id if one photo per style
        // otherwise might want to include a key
        //to help iterating through and selecting a photo from a carousel at the bottom of each related product card
        style_id: {
          id,
          thumbnail_url,
        },
      ],
      features: [
        {
          name,
          value
        },
      ],
      // get average rating and total number of reviews
      ratings,
    }
  ]
}


}
}




