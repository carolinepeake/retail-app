import React from 'react';
import styled from 'styled-components';
import { IoMdCheckmarkCircleOutline, IoIosCheckmarkCircle } from 'react-icons/io';
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
            {selectedStyle.style_id === style.style_id
            ? <ThumbnailImg
                src={style.photos[0].thumbnail_url}
                alt=""
                style={{
                  boxShadow: '5px 5px 5px #727272',
                  // borderWidth: 'medium',
                }}
              />
            : <ThumbnailImg src={style.photos[0].thumbnail_url} alt="" />}
            {selectedStyle.style_id === style.style_id
            && <IoIosCheckmarkCircle
                style={{
                  width: '25%',
                  height: '25%',
                  borderRadius: '50px',
                  // border: `solid black thin`,
                  zIndex: 2,
                  position: 'absolute',
                  top: '0%',
                  right: '0%',
                  color: 'rgba(255,255,255, 0.9)',
                  backgroundColor: '#101010',
                  opacity: '0.9',
                }}
              />}
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
  position: relative;
  z-index: 1;
`;


const ThumbnailContainer = styled.div`
  height: 100%;
  width: 100%;
  justify-content: space-around;
  text-align: center;
  align-content: center;
  position: relative;
`;

// display: contents;


const ThumbnailImg = styled.img`
  width: 100%;
  object-fit: cover;
  aspect-ratio: 1;
  cursor: pointer;
  border-radius: 50%;
  &:hover {
    opacity: 0.80;
  };
  transform: scale(1.025);
  transition: transform 0.25s ease;
  border: solid black thin;
  maxHeight: '100%';
`;




