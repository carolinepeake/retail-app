import React from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../../contexts/GlobalStore';

function StyleSelector() {
  const { styles, selectedStyle, setSelectedStyle, productID, productInfo } = useGlobalContext();

  return (
    <StyleContainer>
      <StyleName>
        <b>{'Style > '}</b>
        {selectedStyle.name}
      </StyleName>
      <ThumbnailsContainer>
        {styles.map((style, i) => (
          <ThumbnailContainer key={style.style_id} i={i} value={style} style={style} onClick={() => setSelectedStyle(style)}>
            <ThumbnailClass
            src={style.photos[0].thumbnail_url}
            alt=""
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
            }}
            />
          </ThumbnailContainer>
        ))}
      </ThumbnailsContainer>
    </StyleContainer>
  );
}

// const StyleName = styled.h4`
//   margin-inline-start: 1em;
//   margin-block-end: 0px;
// `;


// function Thumbnail({i, style, value, props}) {
//   const { styles, selectedStyle, setSelectedStyle, productID, productInfo } = useGlobalContext();

//   return(
//       <ThumbnailContainer onClick={() => setSelectedStyle(style)} >
//           <ThumbnailClass
//             src={style.photos[0].thumbnail_url}
//             alt=""
//             style={{
//               width: '100%',
//               height: '100%',
//             }}
//           ></ThumbnailClass>
//       </ThumbnailContainer>
//   );
// }

export default StyleSelector;

// const Styles = styled.div`
//   display: contents;
//   grid-row: 1;
//   grid-column: 4;
// `;

// const StyleName = styled.h4`
//   grid-row:
//   grid-column: 4;
// `;

const StyleContainer = styled.div`
  display: block;
  margin-right: 25%;
`;


const StyleName = styled.h5`
  grid-row: 1;
  grid-column: 4;
  margin-block-start: 0em;
  margin-block-end: 1rem;
  font-size: 1.0rem;
`;

const ThumbnailsContainer = styled.div`
  grid-row: 1;
  grid-column: 4;
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 1rem;
  //width: auto;
  grid-row-gap: 1rem;
  align-items: center;
  justify-content: center;
  align-content: center;
`;


const ThumbnailContainer = styled.div`
  display: contents;
  height: 50%;
  overflow: hidden;
  justify-content: space-around;
  text-align: center;
  align-content:center;
`;


const ThumbnailClass = styled.img`
  width: 100%;
  object-fit: cover;
  aspect-ratio: 1;
  cursor: pointer;
  border-radius: 50%;
  &:hover {
    opacity: 0.80;
  }
`;




