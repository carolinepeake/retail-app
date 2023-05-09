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
    secondaryBackgroundColor: '#f5f7f8',
    navColor: '#f5f7f8',
    tertiaryBackgroundColor: '#becbd2',
    secondaryColor: '#4d636f',
    tertiaryColor: '#3a4b53',
    fontColor: '#000000',
    navBarFont: '#000000',
    minorFontColor: '#555',
    starBackground: 'lightgrey',
    starFilled: 'gold',
    submitButtonFont: '#000000',
    submitButton: '#becbd2',
    submitButtonHover: '#4d636f',
    submitButtonHoverFont: 'white',
    disabledButton: '#f5f7f8',
    clicked: '#3a4b53',
    visitedColor: '#3a4b53',
    formError: '#ff0000',
    inputPlaceholder: '#bbb',
    darkBlueHover: '#303e45',
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
    font-size: clamp(32px, 4vw, 42px);
  };

  p {

  };

  input {
    font-size: clamp(14px, 1.6vw, 22px);
  };

  button, select, link, a {
    cursor: pointer;
  };

`;

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
