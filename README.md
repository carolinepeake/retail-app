<h1>
<textAlign="center>
  <a href="#readme-top">Atelier Fashion: Retail Application</a>
<h1/>
    <img align="center" width="950" alt="product_overview" src="https://user-images.githubusercontent.com/100883305/233085638-2442e07a-9868-4fa0-bc14-cb01ee6b42dd.png">

## Overview
This repository is a single-page Javascript application that contains 4 main sections and a navigation bar. The sections include Product Overview, Related Products, Questions and Answers, and Ratings and Reviews. 
                      
<!-- TOC: ADD LINKS FOR THE MAIN SECTIONS HERE -->
                       
In this readme, I will first describe my solo contributions, give an overview of each section with included gifs and screenshots, explain how to get started running the application, list the relevant technologies, and finally, list the developers and their contact information.
                       
 ## My Contributions
                       
I forked this code repository from the our group's repository and made significant changes to it before publishing it to my personal github.

My individual contributions include: <!-- INCLUDE SCREENSHOTS -->
* **Developing the product overview section**
* **Refactoring the related items image carousel to scroll correctly, display arrows only when scrolling is possible, and include a masking effect** 
* **Adding breakpoints to the navigation bar**
* **Standardizing the application's spacing, font, and the sizing and styling of some repeated components**; and
* **Making the application responsive**                    
                                
                        
## Components
1. Product Overview

<!--  ![Product Overview Screenshot](images/product_overview.png)-->
  
 <!-- [Product Overview Image w/ Nav Bar] <img align="center" width="950" alt="product_nav" src="https://user-images.githubusercontent.com/100883305/233090260-aa25d48e-66e7-4305-bf44-644c31c88e5e.png"> -->


  <br>The Product Overview section displays product information, available styles, and an image gallery for the selected product. Users may select a particular style by clicking on its thumbnail, and view additional images of this style by clicking through the image carousel on the left side of the main image or using the forward and back arrows to either side of the main image.Clicking on the main image will expand it and clicking on the expanded image will zoom the image 2.5 times and allow the user to pan the zoom image on hover.Clicking the main image again will exit the enlarged view. 
  
  <!-- Again, to click through the different photographs of the selectded style, use the arrows or click the black circles representing the different images available on the left side of the main image. Users may still view additional images of the selected style by clicking on a corresponding icon on the left side of the main image or using the arrows to either side of the main image. -->
  
![Product Zoom Demo] (https://user-images.githubusercontent.com/100883305/233085544-081dd73e-ced4-42be-997a-ca6defee1bcd.gif)
 
 <h3>Gif demonstrating the product overview's zoom and pan features</h3>
 
 <!-- ![Product Zoom Demo] (images/zoom_demo.gif)-->
 
  <img width="950" align="center" alt="product_nav" src="https://user-images.githubusercontent.com/100883305/233085544-081dd73e-ced4-42be-997a-ca6defee1bcd.gif">
  
  
2. Related Products
<!--![Related Products Screenshot](images/related_new.png)-->
   
    <img width="950" align="center" alt="new_related" src="https://user-images.githubusercontent.com/100883305/233085678-8e730dc7-8c6d-46c0-a64c-9538456da3a9.png">

  <br>The Related Products section displays an image carousel of products related to the product currently being viewed. The carousel displays a maximum of 4 items at a time, and users can navigate through any additional related items by clicking the arrows on the right and left side of the carousel, unless the first or last item is showing. Clicking on a product card redirects to that product's page. Users can utilize the outfit list by adding/removing products they might be interested in. 
  
![Related Products Screenshot](https://user-images.githubusercontent.com/100883305/233085678-8e730dc7-8c6d-46c0-a64c-9538456da3a9.png)
     
    <img width="950" align="center" alt="new_related" src="https://user-images.githubusercontent.com/100883305/233085678-8e730dc7-8c6d-46c0-a64c-9538456da3a9.png">

3. Questions & Answers
<!--![Questions and Answers Screenshot](images/qa.png)-->

<img width="950" align="center" alt="questions and answers src="https://user-images.githubusercontent.com/100883305/233085608-99418387-8828-49e0-9506-a422b7b0260d.png">
  <br>The Questions & Answers section contains a search bar, questions and answers, as well as many more features. Users are also able to add their own question they have about a product. Each question can be marked as helpful or reported, and can also be answered. The search bar will allow the user to filter out questions for any specific term they want to look for.
  
  <!--![Questions and Answers Screenshot](images/qa.png)-->

4. Ratings & Reviews
<!--![Ratings and Reviews Screenshot](images/review.png)-->
     
<img width="950" align="center" alt="ratings and reviews" src="https://user-images.githubusercontent.com/100883305/233085585-5bdfec2f-ac1d-46e8-a786-4a4383b41fa5.png">
  <br>The ratings and reviews section shows all reviews for the current product being displayed, as well as a breakdown of the ratings and product characteristics.. The list of reviews can be sorted by relevance, helpfulness, or date. The user can also filter reviews by their star ratings. A user may add their own review to the list. Reviews can also be marked as helpful or reported.
            
  <p align="right">(<a href="#readme-top">back to top</a>)</p>
  
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
            
 <p align="right">(<a href="#readme-top">back to top</a>)</p>

  
## Technologies
* **Front-End**: React, JavaScript, HTML, Styled-Components
* **Back-End**: Node.js, Express.js, WebPack
* **API**: Atelier API
            
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contributors

<table>
  <tr>
    <th>Caroline P.</th>
    <th>Andy </th>
    <th>Gary</th>
    <th>Ibrahem</th>
  </tr>
  <!-- Sections -->
   <tr>
    <td>
     <th>Product Overview & Related Items Carousel</th>
    <th>Related Items Cards & Outfit List</th>
    <th>Questions & Answers</th>
    <th>Ratings & Reviews</th>
    </td>
   </tr>
  <tr>
    <td>
<!-- GITHUB LINKS      -->
      <a href="https://github.com/carolinepeake"> <!-- Caroline    -->
        <img src="https://img.shields.io/badge/github%20-%23121011.svg?&style=for-the-badge&logo=github&logoColor=white"/>
      </a>
    <td>
      <a href="https://github.com/andy"> <!-- Andy    -->
        <img src="https://img.shields.io/badge/github%20-%23121011.svg?&style=for-the-badge&logo=github&logoColor=white"/>
      </a>
    </td>
    <td>
      <a href="https://github.com/gary"> <!-- Gary    -->
        <img src="https://img.shields.io/badge/github%20-%23121011.svg?&style=for-the-badge&logo=github&logoColor=white"/>
      </a>
    </td>
    <td>
      <a href="https://github.com/ibr"> <!-- Ibr    -->
        <img src="https://img.shields.io/badge/github%20-%23121011.svg?&style=for-the-badge&logo=github&logoColor=white"/>
      </a>
    </td>
    </td>
  <tr>
      <!-- LINKEDIN LINKS      -->
    <td>
      <a href="https://www.linkedin.com/in/carolinepeake/"> <!-- Caroline    -->
        <img src="https://img.shields.io/badge/linkedin%20-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white"/>
      </a>
    </td>
    <td>
      <a href="https://www.linkedin.com/in/andy/">  <!-- Andy    -->
        <img src="https://img.shields.io/badge/linkedin%20-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white"/>
      </a>
    </td>
    <td>
      <a href="https://www.linkedin.com/in/gary/">  <!-- Gary    -->
        <img src="https://img.shields.io/badge/linkedin%20-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white"/>
      </a>
    </td>
     <td>
      <a href="https://www.linkedin.com/in/Ibr/"> <!-- Ibr    -->
        <img src="https://img.shields.io/badge/linkedin%20-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white"/>
      </a>
    </td>
</table>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

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

