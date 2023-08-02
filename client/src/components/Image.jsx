// import React, { useMemo } from 'react';

// need to have blob somewhere or make url without url api

// function Image({ imageUrl, width }) {
//   // dependency should really be image url path not whole url

//   function getResizedImageUrl() {
//     const url = new URL(imageUrl);
//     const { pathname } = url;
//     console.log('pathname: ', pathname);
//     const { searchParams } = url;
//     searchParams.set('w', width);
//     const paramsString = searchParams.toString();
//     console.log('paramsString: ', paramsString);
//     pathname.search = paramsString;
//     const resizedImage = pathname;
//     console.log('resizedImage: ', resizedImage);
//     return resizedImage;
//   }

//   // function getPathname(imageUrl) {
//   //   const url = new URL(imageUrl);
//   //   const urlPathname = url.pathname;
//   //   console.log('urlPathname: ', urlPathname);
//   //   return urlPathname;
//   // };

//   // useMemo(() => (getPathname()), [imageUrl]);

//   // function getParams(width) {
//   //   const searchParams = new URLSearchParams(paramsObj);
//   //   const paramsString = searchParams.toString();
//   //   console.log('paramsString: ', paramsString);
//   //   return paramsString;
//   // };

//   // max-width: 600px;
//   // transition: translate 0.25s smooth transform 0.25s ease;
//   // position: relative;
//   // cursor: zoom-in;
//   // @media (min-width: 600px) {
//   //   max-height: 840px;
//   // };
//   // @media (min-height: 1200px) {
//   //   max-width: 800px;
//   //   max-height: 1200px;
//   // }
//   // could bring in an object with coressponding media queries & widths

//   useMemo(() => (getResizedImageUrl()), [imageUrl, width]);

//   return (
//     <picture>
//       <source srcset="image-large.jpg" media="(min-height: 1200px)" />
//       <source srcset="image-medium.jpg" media="(min-width: 600px)" />
//       <img src="image-small.jpg" alt="Responsive Image" />
//     </picture>
//   );
// }

// export default Image;

// // I'm doing too much; can hard code estimated sizes in url for each image component
