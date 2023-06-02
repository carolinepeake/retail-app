import React, { useState } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
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
    // secondaryBackgroundColor: 'rgb(210,218,236)',
    secondaryBackgroundColor: '#becbd2',
    // same as above but 0.3 transparency
    // iconHoverBackgroundColor: 'rgb(210,218,236,0.3)',
    iconHoverBackgroundColor: 'rgba(190, 203, 210, 0.3)',
    // light grey
    // navBgColor: 'rgb(209,217,235)',
    navBgColor: '#f5f7f8',
    // light grey
    // tertiaryBackgroundColor: 'rgb(195,205,229)',
    tertiaryBackgroundColor: '#f5f7f8',
    // blue steel logo rgb(77, 99, 111, 0.7)
    // secondaryColor: 'rgb(32,45,74)',
    secondaryColor: '#4d636f',
    // dark steel
    tertiaryColor: '#3a4b53',
    fontColor: '#000000',
    // dark blue
    // secondaryFontColor: 'rgb(25,34,56)',
    secondaryFontColor: '#374e62',
    // navFontColor: 'rgb(32,45,74)',
    navFontColor: '#4d636f',
    // navActiveFontColor: 'rgb(25,34,56)',
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
    submitButton: '#becbd2',
    // blue steel
    // submitButtonHover: 'rgb(63,88,145)',
    submitButtonHover: '#4d636f',
    submitButtonHoverFont: 'white',
    // light grey
    disabledButton: '#f5f7f8',
    clicked: '#3a4b53',
    visitedColor: '#3a4b53',
    formError: '#ff0000',
    inputPlaceholder: '#bbb',
    // darkBlueHover: 'rgb(25,34,56)',
    darkBlueHover: '#374e62',
    // backup #303e45
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
  };

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
    body: 'clamp(1rem, calc(0.875rem + 0.268vw), 1.25rem)',
    secondary: 'clamp(14px, 1.6vw, 18px)',
    tertiary: '0.83em',
    header: 'clamp(32px, 4vw, 42px)',
    input: 'clamp(14px, 1.6vw, 22px)',
  };
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
    font-size: clamp(1rem, calc(0.875rem + 0.268vw), 1.25rem);
    margin: 0px;
    padding: 0px;
  };

  h1 {
    font-size: 2em;
    font-weight: 500;
  };

  h2 {
    font-size: 1.5em;
    font-weight: 300;
  };

  h3 {
    font-size: 1.17em;
    font-weight: 600;
  };

  h4 {
    font-size: clamp(1rem, calc(1rem + 0.2vw), 1.25rem);
    font-weight: 400;
    margin-block-start: 1em;
    margin-block-end: 1em;
  };

  h5 {
    font-size: ${(props) => props.theme.tertiary};
    font-weight: 300;
    padding-top: 0.5em;
    margin: auto 0;
    color: ${(props) => props.theme.minorFontColor};
  };

  h6 {
    font-size: 0.83em;
    font-weight: 300;
    padding-top: 0.5em;
    margin: auto 0;
    text-decoration: underline;
    &:hover {
      text-decoration: initial;
    };
    &:clicked {
      color: ${(props) => props.theme.clicked};
    };
  };

  p {
    font-size: 1em;
    font-weight: 300;
  };

  input {
    font-size: clamp(16px, 1.6vw, 22px);
  };

  button, select, link, a {
    cursor: pointer;
    font-family: futura-pt, sans-serif;
    font-style: normal;
    font-weight: 300;
  };

  button {
    font-size: clamp(1rem, calc(0.875rem + 0.268vw), 1.25rem);
    font-weight: 500;
  };

  ol, ul {
    list-style-type: none;
  }
`;
// h2 {
//   font-size: 1.5em;
//   font-weight: 300;
//   margin-top: 3rem;
//   padding-bottom: 1.5rem;
// };

// should add in safe on the property it belongs so content is not rendered overscreen and unreachable

export default App;
