import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import ProductDetail from './ProductDetail/ProductDetail';
import RelatedItems from './RelatedItems/RelatedItems';
import RatingsAndReviews from './RatingsAndReviews/RatingsAndReviews';
import QuestionsAndAnswers from './QuestionsAndAnswers/QuestionsAndAnswers';
import NavBar from './NavBar';
import { GlobalContextProvider } from '../contexts/GlobalStore';

function App() {
  const [theme, setTheme] = useState('light');

  const themeLight = {
    backgroundColor: 'white',
    secondaryBackgroundColor: '#f5f7f8',
    tertiaryBackgroundColor: '#becbd2',
    secondaryColor: 'white',
    tertiaryColor: '#3a4b53',
    navColor: '#f5f7f8',
    navBarFont: '#000000',
    fontColor: '#000000',
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

  const toggleTheme = () => {
    setTheme((curr) => (curr === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme === 'light' ? themeLight : themeDark}>
      <StyledContainer id="styled-container">
        <GlobalContextProvider>
          <NavBar theme={theme} toggleTheme={toggleTheme} />
          <ProductDetail />
          <RelatedItems />
          <QuestionsAndAnswers />
          <RatingsAndReviews />
        </GlobalContextProvider>
      </StyledContainer>
    </ThemeProvider>
  );
}

const StyledContainer = styled.div`
  font-family: 'Roboto Condensed', sans-serif;
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.fontColor};
  font-size: calc(10px + 1vw);
`;

//font-size: calc(10px + 0.390625vw);
// font-size: calc(8px + 0.5vw);

//should add in safe on the property it belongs so content is not rendered overscreen and unreachable

export default App;
