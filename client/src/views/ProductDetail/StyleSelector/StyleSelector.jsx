import React from 'react';
import styled from 'styled-components';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { useGlobalContext } from '../../../contexts/GlobalStore';

function StyleSelector() {
  console.log('[StyleSelector] is running');
  const { styles, selectedStyle, setSelectedStyle } = useGlobalContext();

  return (
    <StyleContainer>
      <StyleName>
        <b style={{ fontWeight: '500' }}>{'Style > '}</b>
        {selectedStyle.name}
      </StyleName>
      <ThumbnailsContainer>
        {styles.map((style, i) => (
          <ThumbnailContainer
            key={style.style_id}
            i={i}
            style={style}
            onClick={() => setSelectedStyle(style)}
          >
            <ThumbnailImg
              src={style.photos[0].thumbnail_url}
              alt={style.name}
              $selected={selectedStyle.style_id === style.style_id}
            />
            {selectedStyle.style_id === style.style_id
            && (
              // <div
              //   style={{
              //     aspectRatio: '1',
              //     height: '25%',
              //     borderRadius: '50px',
              //     zIndex: 2,
              //     position: 'absolute',
              //     top: '0%',
              //     right: '0%',
              //     color: 'rgba(255,255,255, 0.9)',
              //     backgroundColor: '#101010',
              //     border: '1.5px currentColor solid',
              //     overflow: 'hidden',
              //     display: 'flex',
              //     justifyContent: 'center',
              //     alignItems: 'center',
              //     opacity: '0.9',
              //   }}
              // >
              //   <span
              //     style={{
              //       // fontSize: '0.5em',
              //       fontSize: '0.6em',
              //       position: 'absolute',
              //       // transform: 'translateY(12.25%)',
              //       fontWeight: '400',
              //     }}
              //   >
              //     &#x2713;
              //   </span>
              // </div>
            <IoIosCheckmarkCircle
              style={{
                width: '25%',
                height: '25%',
                borderRadius: '50px',
                zIndex: 2,
                position: 'absolute',
                top: '0%',
                right: '0%',
                color: 'rgba(255,255,255, 0.9)',
                backgroundColor: '#101010',
                opacity: '0.9',
              }}
            />
            )}
          </ThumbnailContainer>
        ))}
      </ThumbnailsContainer>
    </StyleContainer>
  );
}

export default StyleSelector;

const StyleContainer = styled.div`
  display: block;
  margin-right: 10%;
  margin-block-end: 0.5em;

  @media (min-width: 400px) {
    margin-right: 25%;
  }

  @media (min-width: 600px) {
    margin-right: 10%;
  }

  @media (min-width: 1200px) {
    margin-right: 25%;
  }
`;

const StyleName = styled.h4`
  margin-block-start: 0.5em;
  margin-block-end: 1em;
  font-weight: 300;
`;

const ThumbnailsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 1em;
  grid-row-gap: 1em;
  position: relative;
  z-index: 1;

  @media (min-width: 200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 250px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 450px) {
    grid-column-gap: 1.5em;
  }

  @media (min-width: 600px) {
    padding-bottom: initial;
    grid-column-gap: 1em;
  }
`;

const ThumbnailContainer = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`;

const ThumbnailImg = styled.img`
  width: 100%;
  object-fit: cover;
  aspect-ratio: 1;
  cursor: pointer;
  border-radius: 50%;
  &:hover {
    opacity: 0.80;
  }
  transform: scale(1.025);
  transition: scale 0.25s ease;
  border: solid black thin;
  box-shadow: ${(props) => props.$selected && '5px 5px 5px #727272'};
`;
