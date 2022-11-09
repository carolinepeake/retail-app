# retail-app
from an external API.
## How to start
Install dependencies
```
npm run install
```
Create a production build
```
npm run build
```
Start the server
```
npm run server
```
## Components
This project has 4 main sections for a product each with various functionalities.
1. Product Overview
  <br>The Product Overview section displays product information, available styles, and an image gallery for the product. Users may select a particular style by clicking on its thumbnail, and view additional images of this style by clicking through the image carousel to the left of the expanded image. updating the expanded image gallery and product informationthe selected style shown in an expanded image on the left. To click through different images of the selected style, one can click on the thumbnails to the left of the expanded image or use the forward and back arrows to either side of the expanded image.
2. Related Products
  <br>The Related Products section displays a list of products related to the current item at the top. Users can navigate through the list and click on a product to be redirected to that product's page. Users can utilize the outfit list by adding/removing products they might be interested in.
3. Questions & Answers
  <br>The Questions & Answers section contains a search bar, questions and answers, as well as many more features. Users are also able to add their own question they have about a product. Each question can be marked as helpful or reported, and can also be answered. The search bar will allow the user to filter out questions for any specific term they want to look for.
4. [Ratings & Reviews](https://github.com/HR-Zelda/retail-app/blob/main/Project%20Screenshots/Screen%20Shot%202022-07-23%20at%203.42.24%20PM.png)
  <br>The ratings and reviews section shows all reviews for the current product being displayed, as well as a breakdown of the ratings and product characteristics.. The list of reviews can be sorted by relevance, helpfulness, or date. The user can also filter reviews by their star ratings. A user may add their own review to the list. Reviews can also be marked as helpful or reported.
## Technologies
* **API**: Atelier API
* **Back-end**: Node.js, Express.js, webpack
* **Front-end**: React, JavaScript, HTML
