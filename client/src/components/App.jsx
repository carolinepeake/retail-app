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
    backgroundColor: '#f5f7f8',
    secondaryColor: '#becbd2',
    tertiaryColor: '#becbd2',
    navColor: '#becbd2',
    navBarFont: '#000000',
    fontColor: '#000000',
    starBackground: 'lightgrey',
  };

  const themeDark = {
    backgroundColor: '#4d636f',
    secondaryColor: '#3a4b53',
    tertiaryColor: '#3a4b53',
    navColor: '#3a4b53',
    navBarFont: '#fff',
    fontColor: 'white',
    starBackground: '#3a4b53',
  };

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

//should include css classes for things like clickable, dropdowns, stars

const StyledContainer = styled.div`
  font-family: 'Roboto Condensed', sans-serif;
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.fontColor};
  font-size: calc(10px + 1vw);
`;


// const Button = styled.button`
//   font-family: 'Roboto Condensed', sans-serif;
//   font-size:
// `;

//font-size: calc(10px + 0.390625vw);

//grid-template-rows: auto repeat(4, 1fr);
// or overflow hidden? auto?

//should add in safe on the property it belongs so content is not rendered overscreen and unreachable

export default App;
