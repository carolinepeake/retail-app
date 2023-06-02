import { useState, useEffect } from 'react';

// compress images
// get sprites (request multiple at 1 time)
// lazy load non-main images (and maybe main too?)
// for related items that are clicked and become main item,
// should already have most of the info I need - don't need to request it all again
// reduce # of DOM elements. to count run this script snippet: document.querySelectorAll('*').length
// use additional css classes instead of complex selectors & avoid layout changes
// reduce paint areas. To see which parts of a page are repainted, go to the Rendering tab and enable Paint flashing.
// https://webtips.dev/10-critical-performance-optimization-steps-you-should-take#use-cdn

// export default const useUnsplash = ({ oldUrl, width }) => {

export const usePathname = (oldUrl) => {
  const [pathname, setPathname] = useState('');

  // const getPathname = async (oldUrl) => {
  //   const url = new URL(oldUrl);
  //   const urlPathname = url.pathname;
  //   console.log('urlPathname: ', urlPathname);
  //   setPathname(urlPathname);
  //   return urlPathname;
  // };

  useEffect(() => {
    getPathname(oldUrl);
  }, [oldUrl]);

  return [pathname, setPathname];
};

export const useParams = (width) => {
  const [params, setParams] = useState('');

  const getParams = async (width) => {
    const paramsObj = {
      ixlib: 'rb-1.2.1',
      ixid: 'eyJhcHBfaWQiOjEyMDd9',
      auto: 'format',
      fit: 'crop',
      w: width,
      q: '80',
    };

    // try {
    const searchParams = await new URLSearchParams(paramsObj);
    const paramsString = await searchParams.toString();
    console.log('paramsString: ', paramsString);
    await setParams(paramsString);
    return paramsString;
    // } catch (error) {
    console.log('error getting params: ', error);
    // };
  };

  useEffect(() => {
    getParams(width);
  }, [width]);

  return [params, setParams];
};

function getPathname(oldUrl) {
  const url = new URL(oldUrl);
  const urlPathname = url.pathname;
  console.log('urlPathname: ', urlPathname);
  return urlPathname;
}

function getParams(width) {
  const paramsObj = {
    ixlib: 'rb-1.2.1',
    ixid: 'eyJhcHBfaWQiOjEyMDd9',
    auto: 'format',
    fit: 'crop',
    w: width,
    q: '80',
  };

  const searchParams = new URLSearchParams(paramsObj);
  const paramsString = searchParams.toString();
  console.log('paramsString: ', paramsString);
  return paramsString;
}

// get like 3 diff width sizes:
// questions & answers
// xs
// sm
// reviews
// xs
// sm
// md
// thumbnails
// sm
// md
// styles
// xs
// sm
// main image
// small
// medium
// lg
// outfit list
// small
// medium
// related imges
// small
// medium

// <picture>
//     <source srcset="image-large.jpg" media="(min-width: 1200px)" />
//     <source srcset="image-medium.jpg" media="(min-width: 768px)" />
//     <img src="image-small.jpg" alt="Responsive Image" />
//   </picture>

// useEffect(() => {
//   setPathname(getPathname(oldUrl));

// }, [oldUrl]);

// export default function useUnsplash(oldUrl, width) {
//   const [pathname, setPathname] = useState(null);
//   const [params, setParams] = useState(null);

//   useEffect(() => {
//     setParams(getParams(width));
//   }, [width]);

// };

// return [setPathname, setParams, ]

// export default function useUnsplash({ originalUrl, width }) {
//   const [newUrl, setNewUrl] = useState(null);

//   let url;

//   const unsplashUrl = newUrl ? newUrl.toString() : originalUrl;

//   const setUnsplashUrl = () => {
//     const oldParamsString = url.search;
//     console.log('oldParamsString: ', oldParamsString);
//     const searchParams = new URLSearchParams(oldParamsString);
//     searchParams.set('w', width);
//     const newParamsString = searchParams.toString();
//     console.log('params string: ', newParamsString);
//     url.search = newParamsString;
//     setNewUrl(url);
//   };

//   useEffect(() => {
//     if (width && originalUrl) {
//       url = new URL(originalUrl);
//       console.log('original unsplash url', url.href);
//       setUnsplashUrl();
//     }
//   }, [width, originalUrl]);

//   return [unsplashUrl, setUnsplashUrl];
// }

// const parsedUrl = new URL(window.location.href);
// console.log(parsedUrl.searchParams.get("id")); // "123"

// const [unsplashUrl, setUnsplashUrl] = useUnsplash(originalUrl, width);
