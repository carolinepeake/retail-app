![Item Shop - Product Zoom](https://user-images.githubusercontent.com/100883305/208582528-d3841018-27c5-4cb6-b6af-057f5575f2dd.gif)

 <img src="https://imgur.com/DjbSPnD.gif" alt="Product Zoom"/>
 
<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

These are instructions on how to get started fast!

To support the upload of user pictures for the ratings and reviews section, you will need to create a Cloudinary account (optional).

### Installation

1. Clone repo & install dependencies 
   ```
   $ git clone https://github.com/carolinepeake/retail-app.git
   $ cd retail-app
   $ npm install
   ```
2. Make a copy of the sample.env file and rename it as .env. Update the .env file with your own environment variables and authentication codes 
   ```
   $ cp ./example.env .env
   ```
3. Create production build & start server
   ```
   $ npm run build
   $ npm run server
   ```
4. Open browser 
   - Open http://localhost:3000 (or whichever port is specified in your .env file)

## Overview
This project has 4 main sections for a product each with various functionalities.
1. Product Overview
  ![Screen Shot 2022-07-23 at 3 48 01 PM](https://user-images.githubusercontent.com/20650665/207993230-649b0cb7-bfed-45a7-ae4a-56ea2cf4d112.png)
  <br>The Product Overview section displays product information, available styles, and an image gallery for the product. Users may select a particular style by clicking on its thumbnail, and view additional images of this style by clicking through the image carousel to the left of the expanded image.
  
2. Related Products
![Screen Shot 2022-07-23 at 3 48 41 PM](https://user-images.githubusercontent.com/20650665/207993311-ad4d0550-598d-402a-9c29-78b62ab68d68.png)
  <br>The Related Products section displays a list of products related to the current item at the top. Users can navigate through the list and click on a product to be redirected to that product's page. Users can utilize the outfit list by adding/removing products they might be interested in.

3. Questions & Answers
![Screen Shot 2022-07-23 at 3 51 58 PM](https://user-images.githubusercontent.com/20650665/207993406-5c12d799-158a-45e7-9bf3-ecc769fc0e48.png)
  <br>The Questions & Answers section allows users to search for, ask, and answer questions related to a product. Each question can be marked as helpful or reported. The search bar will allow the user to filter questions by any specific term they are looking for.

4. Ratings & Reviews
![Screen Shot 2022-07-23 at 3 42 24 PM (1)](https://user-images.githubusercontent.com/20650665/207993515-339f3346-7e5f-4e90-96a7-53a9e582fcaf.png)
  <br>The ratings and reviews section shows all reviews for the current product being displayed, as well as a breakdown of the ratings and product characteristics. The list of reviews can be sorted by relevance, helpfulness, or date. The user can also filter reviews by their star ratings. A user may add their own review to the list. Reviews can also be marked as helpful or reported.
  

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
* **Front-end**: React, JavaScript, HTML
* **Back-end**: Node.js, Express.js, webpack
* * **API**: Atelier API

## Tech Stack

![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E) 
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)

![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black) 
![Babel](https://img.shields.io/badge/Babel-F9DC3e?style=for-the-badge&logo=babel&logoColor=black) 
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white) 
![Vim](https://img.shields.io/badge/VIM-%2311AB00.svg?style=for-the-badge&logo=vim&logoColor=white) 
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) 
![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white) 
![Visual Studio Code](https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white)

