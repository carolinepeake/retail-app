import React, { useState } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import ProductDetail from './views/ProductDetail/ProductDetail';
import RelatedItems from './views/RelatedItems/RelatedItems';
import RatingsAndReviews from './views/RatingsAndReviews/RatingsAndReviews';
import QuestionsAndAnswers from './views/QuestionsAndAnswers/QuestionsAndAnswers';
import SocialMedia from './views/ProductDetail/ProductOverview/SocialMedia';
import NavBar from './views/NavBar/NavBar';
import { GlobalContextProvider } from './contexts/GlobalStore';

// TO-DO: download futura-pt font sheet and link to html stylesheet
// TO-DO: separate questions context,
// answers context, reviews context,
// product_detail/global context (rev_meta, styles, product_id, product_info)
// related_products context, outfits_list context => test performance before & after
// TO-DO: useItems hook (for reviews, answers, questions)
// TO-DO: cache each product and related product global context is pulled for Redis
// TO-DO: delete roboto font preload and style sheet and replace with futura
// TO-DO: add nodemon to dependencies

// log 7/11/23, 4:23 pm, global store ran 9 times;

function App() {
  const [theme, setTheme] = useState('light');

  // almost black: rgb(2,0,8)

  // dark grey: rgb(41,40,47)

  // medium grey: rgb(98,94,110)

  // rgb(85, 85, 85)

  // white


  // dark primary color: rgb(26,0,106)

  // dark primary color: rgb(32,0,128)

  // primary color: rgb(51, 0, 204)

  //   rgb(51, 0, 204, 0.6)

  //   rgb(51, 0, 204, 0.3)

  // light primary color: rgb(83,26,255)



  // light: rgb(231,224,255)

  // lightest: rgb(246,243,255)





  // primary button



  // secondary button


  // neutral: white, light grey, dark grey, black
  // color: spacing line, nav bckground, hovered icon background, other button, color text/submit button, hovered color text/hovered submit button


  const themeLight = {
    // blue[0] is ligt blue, nav bg, add outfit button bg
    // blue[1] is icon hover bg & inset box shadow, same color as 3 but 0.3 transparency
    // blue[2] is inset box shadow, same color as 3 but 0.5 transparency
    // blue[3] is nav logo hover bg, primary buttons, thumbnail icons, hovered nav bar
    // blue[4] is primary buttons (including submit) hover bg, thumbnail icon hover, hovered list nav, nav font color
    // blue[5] is submit buttons bg & blue text, selected thumbnail icon
    blue: ['rgb(209,217,235)', 'rgba(190, 203, 210, 0.3)', 'rgba(190, 203, 210, 0.5)', '#becbd2', 'rgb(32,45,74)', 'rgb(55, 78, 98)'],
    green: ['#cff7cd', '#70e869', '#0ec305', '#0a8203', '#054102', '#032b01', '#021601'],
    darkBlue: ['#d1d1e2', '#7575a9', '#47478d', '#171765', '#0f0f43', '#03030b'],
    UIBlue: ['rgb(239,246,255)', 'rgb(219,234,254)', 'rgb(191,219,254)', 'rgb(147,197,253)', 'rgb(96,165,250)', 'rgb(59,130,246)', 'rgb(37,99,235)', 'rgb(29,78,216)', 'rgb(30,64,175)', 'rgb(30,58,138)'],
    neutral: ['white', '#C2C2C2', '#5C6166', '#424242', '#2A3642', '#000005'],
    greenCompliment: '#006633',
    backgroundColor: 'white',
    navBgColor: '#f5f7f8',
    secondaryBackgroundColor: 'rgba(190, 203, 210)',
    submitButton: '#becbd2',
    iconHoverBackgroundColor: 'rgba(190, 203, 210, 0.3)',
    insetBoxShadow: 'rgba(190, 203, 210, 0.5)',
    // blue steel logo rgb(77, 99, 111, 0.7)
    // 'rgb(32,45,74)'
    secondaryColor: '#4d636f',
    navFontColor: '#4d636f',
    submitButtonHover: '#4d636f',
    // dark steel
    tertiaryColor: '#3a4b53',
    clicked: '#3a4b53',
    visitedColor: '#3a4b53',
    fontColor: 'rgb(58, 58, 57)',
    // fontColor: '#000000',
    // rgb(25,34,56)
    secondaryFontColor: '#374e62',
    darkBlueHover: '#374e62',
    navActiveFontColor: '#374e62',
    // dark grey
    minorFontColor: '#555',
    starBackground: 'lightgrey',
    starFilled: 'gold',
    submitButtonFont: '#000000',
    // light blue
    // submitButton: 'rgb(157,208,219)',
    // 'rgb(155,216,244)',
    // 'rgb(168,183,217)',
    // 'rgb(128,150,200)',
    // blue steel
    // submitButtonHover: 'rgb(63,88,145)',
    submitButtonHoverFont: 'white',
    // light grey
    disabledButton: '#f5f7f8',
    formError: '#ff0000',
    inputPlaceholder: '#bbb',
    // backup #303e45
    focusColor: 'rgb(37, 55, 70)',
    body: 'clamp(1rem, calc(0.875rem + 0.268vw), 1.25rem)',
    // check to see if using this
    secondary: 'clamp(12px, 1.6vw, 18px)',
    tertiary: '0.83em',
    header: '2em',
    // might just want to use tertiary
    input: '0.875em',
    button: '1em',
    // check to see if got rid of these
    cardTitle: 'clamp(16px, 1.6vw, 18px)',
    cardText: 'clamp(12px, 1.4vw, 14px)',
    lightBorder: 'thin lightgrey solid',
  };

  // TO-DO: make borders of thumbnails font color
  // TO-DO: change font color on sort select
  // TO-DO: style scroll bar

  const themeDark = {
    // submit button: rgb(48, 62, 69)
    // submit button hover: rgb(62, 79, 89);
  // #090e11
  // rgb(9,14,17)
  //  #0e1418
  // rgb(14,20,24)
    // #1c2931
    // should maybe make a default background color
    backgroundColor: '#090e11',
    // make input backgrounds, maybe submit buttons, maybe nav links
    // rgb(28,41,49)',
    secondaryBackgroundColor: '#becbd2',
    iconHoverBackgroundColor: 'rgba(190, 203, 210, 0.3)',
    tertiaryBackgroundColor: '#3a4b53',
    secondaryColor: '#4d636f',
    tertiaryColor: '#3a4b53',
    navBgColor: 'rgb(28,41,49)',
    // '#3a4b53',
    navFontColor: '#f5f7f8',
    navActiveFontColor: '#becbd2',
    fontColor: 'rgb(232, 230, 227)',
    secondaryFontColor: '#becbd2',
    minorFontColor: 'rgb(178, 172, 162)',
    // #f5f7f8',
    starBackground: '#3a4b53',
    starFilled: 'gold',
    submitButtonFont: 'white',
    submitButton: '#3a4b53',
    // #4d636f',
    // submitButton: '#becbd2',
    // submitButton: 'rgb(28,41,49)',
    submitButtonHover: '#becbd2',
    submitButtonHoverFont: '#000000',
    disabledButton: '#f5f7f8',
    clicked: '#becbd2',
    visitedColor: '#becbd2',
    formError: '#ff0000',
    inputPlaceholder: '#f5f7f8',
    // currently same as light theme
    darkBlueHover: '#374e62',
    focusColor: '#f5f7f8',
    body: 'clamp(1rem, calc(0.875rem + 0.268vw), 1.25rem)',
    secondary: 'clamp(14px, 1.6vw, 18px)',
    tertiary: '0.83em',
    header: 'clamp(32px, 4vw, 42px)',
    // input: 'clamp(14px, 1.6vw, 22px)',
    input: 'clamp(16px, 1.6vw, 22px)',
    button: '1em',
    // check to see if got rid of these
    cardTitle: 'clamp(16px, 1.6vw, 18px)',
    cardText: 'clamp(12px, 1.4vw, 14px)',
  };

  const toggleTheme = () => {
    setTheme((curr) => (curr === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme === 'light' ? themeLight : themeDark}>
      <StyledContainer id="styled-container" />
      <GlobalContextProvider>
        <NavBar
          toggleTheme={toggleTheme}
        />
        <ProductDetail />
        <RelatedItems />
        <QuestionsAndAnswers />
        <RatingsAndReviews />
        <SocialMedia mobile />
      </GlobalContextProvider>
    </ThemeProvider>
  );
}

// TODO: make sure heading sizes and fonts and appearance on page / in element properly hierarchical

// TODO: add 'safe' on appropriate property so content is not rendered overscreen and unreachable

const StyledContainer = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: Lato,Verdana, futura-pt, sans-serif;
  }

  html {
    scroll-padding-top: 6rem;
    scroll-behavior: smooth;
  }

  body {
    /*font-family: Lato,Verdana, futura-pt, sans-serif;*/
    font-style: normal;
    font-weight: 300;
   /* background-color: ${(props) => props.theme.backgroundColor}; */
    color: ${(props) => props.theme.fontColor};
    font-size: clamp(1rem, calc(0.875rem + 0.268vw), 1.25rem);
    line-height: 1.2;
    margin: 0px;
    padding: 0px;
  }

  /* PRODUCT NAME IN PRODUCT DETAIL & FORM MODAL */
  h1 {
    font-size: 2em;
    font-weight: 500;
    color: ${(props) => props.theme.blue[5]};
    margin: 0.5em 0;
  }

  /* MODAL HEADING */
  h2 {
    font-size: 1.5em;
    font-weight: 300;
    color: ${(props) => props.theme.fontColor};
    height: 1em;
    margin: 0;
  }

  h3 {
    font-size: 1.17em;
    font-weight: 600;
  }

  h4 {
    font-size: clamp(1em, calc(1em + 0.2vw), 1.25em);
    font-weight: 400;
    margin-block-start: 1em;
    margin-block-end: 1em;
  }

  h5 {
    font-size: ${(props) => props.theme.tertiary}; /* 0.83em */
    font-weight: 300;
    padding-top: 0.5em;
    margin: auto 0;
    color: ${(props) => props.theme.minorFontColor};
  }

  /* READ REVIEWS, HELPFULNESS */
  h6 {
    font-size: 0.83em;
    font-weight: 300;
    padding-top: 0.5em;
    margin: auto 0;
    text-decoration: underline;
    &:hover {
      text-decoration: initial;
    }
    &:clicked {
      color: ${(props) => props.theme.clicked};
      text-decoration: initial;
    }
  }

  p {
    font-size: 1em;
    font-weight: 300;
    line-height: 1.5;
  }

  input {
    font-size: clamp(16px, 1.6vw, 22px);
    &::placeholder {
      color: ${(props) => props.theme.inputPlaceholder};
    /*  font-size: 0.875em; */
    }
  }

  button, select, link, a {
    cursor: pointer;
    font-family: Lato,Verdana, futura-pt, sans-serif;
    font-style: normal;
    font-weight: 300;
    box-sizing: border-box;
  }

  button {
    font-size: clamp(1em, calc(0.875em + 0.268vw), 1.25em);
    font-weight: 500;
  }

  ol, ul {
    list-style-type: none;
  }
`;

export default App;
