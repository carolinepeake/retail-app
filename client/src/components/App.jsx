import React, { useState } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import ProductDetail from './ProductDetail/ProductDetail';
import RelatedItems from './RelatedItems/RelatedItems';
import RatingsAndReviews from './RatingsAndReviews/RatingsAndReviews';
import QuestionsAndAnswers from './QuestionsAndAnswers/QuestionsAndAnswers';
import SocialMedia from './ProductDetail/ProductOverview/SocialMedia';
import NavBar from './NavBar';
import { GlobalContextProvider } from '../contexts/GlobalStore';

function App() {
  const [theme, setTheme] = useState('light');

  const themeLight = {
    backgroundColor: 'white',
    // light blue
    secondaryBackgroundColor: '#becbd2',
    navColor: '#f5f7f8',
    // navColor: '#e1eef5',
    // light grey
    tertiaryBackgroundColor: '#f5f7f8',
    // blue steel
    secondaryColor: '#4d636f',
    // dark steel
    tertiaryColor: '#3a4b53',
    // black
    fontColor: '#000000',
    // dark blue, also rgb(55, 78, 98)
    secondaryFontColor: '#374e62',
    navBarFont: '#374e62',
    // dark grey, also rgb(85 85 85)
    minorFontColor: '#555',
    starBackground: 'lightgrey',
    starFilled: 'gold',
    // white
    submitButtonFont: '#000000',
    // light blue
    submitButton: '#becbd2',
    // blue steel
    submitButtonHover: '#4d636f',
    submitButtonHoverFont: 'white',
    // light grey
    disabledButton: '#f5f7f8',
    clicked: '#3a4b53',
    visitedColor: '#3a4b53',
    formError: '#ff0000',
    inputPlaceholder: '#bbb',
    darkBlueHover: '#374e62',
    // backup #303e45
    body: 'clamp(16px, 1.8vw, 20px)',
    secondary: 'clamp(12px, 1.6vw, 18px)',
    tertiary: 'clamp(14px, 1.5vw, 16px)',
    header: 'clamp(32px, 4vw, 42px)',
    input: 'clamp(14px, 1.5vw, 22px)',
  };
  // body: 'clamp(16px, 2vw, 24px)',
  // secondary: 'clamp(14px, 1.8vw, 20px)',
  // header: 'clamp(32px, 4vw, 42px)',
  // input: 'clamp(14px, 1.5vw, 22px)',

  const themeDark = {
    backgroundColor: '#4d636f',
    secondaryBackgroundColor: '#4d636f',
    tertiaryBackgroundColor: '#becbd2',
    secondaryColor: '#3a4b53',
    tertiaryColor: '#3a4b53',
    navColor: '#3a4b53',
    navBarFont: '#fff',
    fontColor: 'white',
    minorFontColor: 'white',
    starBackground: '#3a4b53',
    starFilled: 'gold',
    submitButtonFont: '#000000',
    submitButton: '#becbd2',
    submitButtonHover: '#becbd2',
    submitButtonHoverFont: '#000000',
    disabledButton: '#f5f7f8',
    visitedColor: '#3a4b53',
    formError: '#ff0000',
    inputPlaceholder: 'white',
    body: 'clamp(16px, 1.8vw, 20px)',
    secondary: 'clamp(14px, 1.6vw, 18px)',
    tertiary: 'clamp(14px, 1.5vw, 16px)',
    header: 'clamp(32px, 4vw, 42px)',
    input: 'clamp(14px, 1.6vw, 22px)',
  };

  // const themeFont = {
  //   body: 'clamp (16px 2vw 24px)',
  //  secondary: 'clamp(14px 1rem - 4px 20px)',
  //  header: 'clamp (22px 1.5vw 42px)'
  //  input: 'minmax(16px 1.8vw 22px)'

  //   @media (min-width: 900px) {
  //     font-size: calc(7px + 1vw);
  //   };

  //   @media (min-width: 1500px) {
  //     font-size: 24px;
  //   };
  // };

  // TO-DO: name backup fonts
  // choose one color and generate about 9 shades of it using a color swatch

  //   const HorizontalProgFill = styled.div`
  //   background: lightgrey;
  //   height: 0.5rem;
  //   margin: 2px;
  //   color: #fff;
  //   text-align: center;
  //   font-family: "Lato","Verdana",sans-serif;
  //   font-size: 0.75rem;
  //   line-height: 1rem;
  //   width: ${(props) => props.width - 1}%
  // `;

  // CeraPro
  // Muli, sans-serif
  // Arial, sans-serif
  // Futura PT light

  const toggleTheme = () => {
    setTheme((curr) => (curr === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme === 'light' ? themeLight : themeDark}>
      <StyledContainer id="styled-container" />
      <GlobalContextProvider>
        <NavBar
          // theme={theme}
          theme={{ input: '14px' }}
          toggleTheme={toggleTheme}
        />
        <ProductDetail />
        <RelatedItems />
        <QuestionsAndAnswers />
        <RatingsAndReviews />
        <SocialMedia mobile />
      </GlobalContextProvider>
      {/* </StyledContainer> */}
    </ThemeProvider>
  );
}

// h1 = product name
// h2 = section heading
// h3 = question heading, review heading
// h4 = review recommendation & "question", "answer", reviewer date/name
// h6 = helpful links
// p = review body, answer body

const StyledContainer = createGlobalStyle`
  * {
    box-sizing: border-box;
  };

  body {
    font-family: futura-pt, sans-serif;
    font-style: normal;
    font-weight: 300;
    background-color: ${(props) => props.theme.backgroundColor};
    color: ${(props) => props.theme.fontColor};
    font-size: clamp(16px, 1.8vw, 20px);
    margin: 0px;
    padding: 0px;
  };

  h1 {
    font-size: 2rem;
    font-weight: 500;
  };

  h2 {
    font-size: 1.5rem;
    font-weight: 300;
    margin-top: 3rem;
    padding-bottom: 1.5rem;
  };

  h3 {
    font-size: 1.17em;
    font-weight: 600;
  };

  h4 {
    font-size: 1rem;
    font-weight: 400;
    margin-block-start: 1em;
    margin-block-end: 1em;
  };

  h5 {
    font-size: ${(props) => props.theme.tertiary};
    font-weight: 300;
  };


  h6 {
    font-size: 0.83rem;
    font-weight: 300;
    padding-top: 0.5em;
    margin: auto 0;
    color: ${(props) => props.theme.minorFont};
    text-decoration: underline;
    &:hover {
      text-decoration: initial;
    };
    &:clicked {
      color: ${(props) => props.theme.clicked};
    };
  };

  p {
    font-size: 1rem;
    font-weight:300;
  };

  input {
    font-size: clamp(16px, 1.6vw, 22px);
  };

  button, select, link, a {
    cursor: pointer;
  };

  ol, ul {
    list-style-type: none;
  }

`;

/* font-weight: bold is 600 */

// helpful div:
  // font-size: 0.83rem;
  // font-weight: 300;
  // color: ${(props) => props.theme.minorFont};
  // &:clicked {
    // color: ${(props) => props.theme.clicked};
  // };
  // &:hover {
    // text-decoration: initial
  // }




// const StyledContainer = styled.div`
//   font-family: futura-pt, sans-serif;
//   font-style: normal;
//   font-weight: 300;
//   background-color: ${(props) => props.theme.backgroundColor};
//   color: ${(props) => props.theme.fontColor};
//   font-size: clamp (16px 2vw 24px);
// `;
// font-size: 16px;

//   @media (min-width: 600px) {
//     font-size: calc(10px + 1vw);
//   };

//   @media (min-width: 1500px) {
//     font-size: 24px;
//   };
// font-size: calc(6px + 1.2vw);
// font-size: calc(10px + 1vw);

// font-family: 'Roboto Condensed', sans-serif;
// font-family: 'CeraPro', sans-serif;
// font-family: futura-pt, sans-serif;

// font-size: calc(10px + 0.390625vw);
// font-size: calc(8px + 0.5vw);

// should add in safe on the property it belongs so content is not rendered overscreen and unreachable

export default App;
