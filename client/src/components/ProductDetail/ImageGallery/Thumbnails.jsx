import React, {
  useState, useEffect
} from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import {
  MdArrowForwardIos, MdArrowBackIos, MdExpandMore, MdExpandLess,
} from 'react-icons/md';

import { useGlobalContext } from '../../../contexts/GlobalStore';

function Thumbnails({ place, setPlace, status, firstPhotoIndex, setFirstPhotoIndex }) {
  const { selectedStyle } = useGlobalContext();

  // const [thumbnailHeight, setThumbnailHeight] = useState(80);
  // const [thumbnailWidth, setThumbnailWidth] = useState(60);

  // function getThumbnailDimensions(boundaryHeight) {
  //   const thumbnailH = (boundaryHeight - 16 * 7 - 80) / 7;
  //   const thumbnailW = (thumbnailH / 6) * 4;
  //   setThumbnailHeight(() => thumbnailH);
  //   setThumbnailWidth(() => thumbnailW);
  // }

  // useEffect(() => {
  //   window.addEventListener('resize', getThumbnailDimensions);
  //   return () => {
  //     window.removeEventListener('resize', getThumbnailDimensions);
  //   };
  // }, []);

  // const [scrollDistance, setScrollDistance] = useState(0);
  const [forwardDisabled, setForwardDisabled] = useState(false);
  const [backDisabled, setBackDisabled] = useState(true);

  useEffect(() => {
    if (firstPhotoIndex >= 1) {
      setBackDisabled(false);
    }
    if (selectedStyle.photos) {
      if (firstPhotoIndex >= selectedStyle.photos.length - 6) {
        setForwardDisabled(true);
      }
    }
  }, [firstPhotoIndex]);

  function handleScroll(n) {
    if (place === firstPhotoIndex && n === 1) {
      setPlace((prev) => prev + 1);
    }
    if ((place === firstPhotoIndex + 5) && n === -1) {
      setPlace((prev) => prev - 1);
    }
    setFirstPhotoIndex((prevI) => prevI + n);
    if (firstPhotoIndex >= selectedStyle.photos.length - 6) {
      setForwardDisabled(true);
    }
    if (firstPhotoIndex <= 0) {
      setBackDisabled(true);
    }
    // setPlace((prev) => prev + n);
  }

  let thumbnails = [];
  if (selectedStyle.photos) {
    thumbnails = selectedStyle.photos.map((photo, index) => (
      <ThumbnailContainer
        key={photo.thumbnail_url}
        // href={`#seq${index}`}
        index={index}
        alt={`${selectedStyle.name} thumbnail`}
        onClick={() => setPlace(index)}
        place={place}
        setPlace={setPlace}
        type="button"
        status={status}
        length={selectedStyle.photos.length}
      >
        <ThumbnailIcon status={status} place={place} index={index}/>
        <ThumbnailImage
          src={photo.thumbnail_url}
          status={status}
          place={place}
          index={index}
          // thumbnailHeight={thumbnailHeight}
          // thumbnailWidth={thumbnailWidth}
        />
      </ThumbnailContainer>
    ));
  }

  return (
    <ThumbnailsContainer status={status}>

      <ThumbnailsViewport length={thumbnails.length}>
        <ThumbnailsCarousel
          status={status}
          place={place}
          setPlace={setPlace}
          length={thumbnails.length}
          firstPhotoIndex={firstPhotoIndex}
        >
          {thumbnails}
        </ThumbnailsCarousel>
      </ThumbnailsViewport>

      {thumbnails.length > 6 && (
        <>
          <ScrollForward
            status={status}
            disabled={forwardDisabled}
            onClick={(e) => handleScroll(1, e)}
          >
            <MdExpandMore />
          </ScrollForward>

          <ScrollBack
            status={status}
            disabled={backDisabled}
            onClick={(e) => handleScroll(-1, e)}
          >
            <MdExpandLess />
          </ScrollBack>
        </>
      )}


    </ThumbnailsContainer>
  );
}

export default Thumbnails;

// TO-DO: name image id correctly so in url states conextual id and not the entire image url
// TO-DO: add active pseudo-class to thumbnails to change thumbnail style consistently with swiping

const ThumbnailsContainer = styled.div`
  display: ${(props) => (props.status === 'zoomed' ? 'none' : 'block')};
  position: relative;
  @media (min-width: 800px) {
    ${(props) => (props.status === 'default' && css`
      order: -1;
      flex: 1 1 0;
    `)};
  };
`;

const ThumbnailsViewport = styled.div`
  overflow: hidden;
  width: 100%;
  @media (min-width: 800px) {
    height: calc(100% - 5rem);
    height: 90%;
    position: relative;
    top: ${(props) => (props.length > 6 ? '5%' : '0')};
    margin-block-start: -7.5%;
  }
`;
// margin-block-start: 2.5rem;
// margin-block-end: 2.5rem;

const ThumbnailsCarousel = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.75em;
  align-items: center;
  justify-content: center;
  align-content: center;
  z-index: 2;
  margin: 0 auto;
  box-sizing: border-box;
  overflow: hidden;

  ${(props) => (props.status === 'default' && css`
    width: 100%;
  `)};
  @media (min-width: 800px) {
    ${(props) => (props.status === 'default' && css`
      flex-direction: column;
      align-items: flex-end;
      justify-content: flex-start;
      height: max(100%, calc((100% / 6) * ${props.length}));
      gap: 0;
      transform: translateY(calc((-100% / ${props.length}) * ${props.firstPhotoIndex}));
      transition: 0.5s ease;
    `)};
  };
`;
// column-gap: 1.0em;
// min-width: 70px;
// aspect-ratio: 4/56;
// margin-right: 2.5%;

// @media (min-width: 700px) {
//   grid-column: 1 / 2;
//   grid-row: 2 / 3;
//   place-self: center;
//   position: initial;
//   max-width: 100%;
//   height: 100%;
//   padding-top: calc(1px + 0.1em);
// };

const ThumbnailContainer = styled.a`
    display: flex;
    background-color: transparent;
    border: none;
    color: ${(props) => props.theme.submitButton};

    @media (max-width: 800px) {
      justify-content: center;
      align-items: center;
      margin: 0.5em 0;
      border-radius: 50px;
      color: ${(props) => props.theme.submitButton};
    };

    @media (min-width: 800px) {
      ${(props) => props.status === 'default' && css`
        padding-right: 15%;
        padding-top: 15%;
        height: calc(100% / ${props.length});
      `};
    };

    ${(props) => props.status === 'expanded' && css`
      justify-content: center;
      align-items: center;
      margin: 0.5em 0;
      border-radius: 50px;
      color: ${props.theme.submitButton};
    `};

  &:focus {
    color: ${(props) => props.theme.submitButtonHover};
    border: black solid 5px;
    transform: scale(1.05) ease;
    padding: 1px;
  };

    &:link {
      border: none;
    };

    &:visited {
      color: ${(props) => props.theme.submitButtonHover};
      border: black solid 5px;
      transform: scale(1.05) ease;
      padding: 1px;
    };

    &:hover {
      box-shadow: box-shadow: 5px 5px 5px #727272;
      transform:   transform: scale(1.05) ease;
    };

    &:active {
      color: ${(props) => props.theme.submitButtonHover};
      border: black solid 5px;
      transform: scale(1.05) ease;
      padding: 1px;
    };

    &:target {
      color: ${(props) => props.theme.submitButtonHover};
      border: black solid 5px;
      transform: scale(1.05) ease;
      padding: 1px;
    };
`;
// overflow: hidden;
// @media (min-width: 800px) {
//   ${(props) => props.status === 'default' && css`
//     height: 180px;
//     width: 120px;
//   `};
// };
// &:hover {
//   opacity: 0.80;
//   box-shadow: 5px 5px 5px #727272;
// };
//   ${(props) => ((props.index === props.place) && css`
// border: 1px currentColor solid;
// padding: 1px;
// box-shadow: 5px 5px 5px #727272;
//   border: 2px black solid;
//   padding: 1px;
//   transform: scale(1.025);
//   transition: transform 0.25s ease;
//   box-shadow: 5px 5px 5px #727272;
// `)};

//   ${(props) => props.icon && css`
//   justify-content: center;
//   padding-bottom: 1.5em;
//   align-items: center;
//   display: flex;
//   border-radius: 2.5px;
// `}

const ThumbnailIcon = styled.span`
    border-radius: 50px;
    background-color: currentColor;
    aspect-ratio: 1/1;
    height: 2vh;
    height: minmax(8px, 2vh);
    &:hover {
      cursor: pointer;
      background-color: ${(props) => props.theme.darkBlueHover};
    };

    @media (min-width: 800px) {
      display: ${(props) => (props.status !== 'expanded' && 'none')};
    };
    ${(props) => ((props.index === props.place) && css`
    background-color: ${props.theme.submitButton};
 `)};
  &::active {
    color: ${(props) => props.theme.submitButtonHover};
  };
  `;
  // light grey
  // &:hover {
  //   background-color: rgba(225, 225, 225, 0.8);
// &:hover {
//   background-color: rgba(0, 0, 0, 0.8);
// };
  // };
  // dark grey
  // &:hover {
  //   background-color: rgba(0, 0, 0, 0.8);
  // };

const ThumbnailImage = styled.img`
  aspect-ratio: 4/5;
  max-width: 100%;
  justify-content: center;
  object-fit: cover;
  margin: 0 auto;
  display: none;

  @media (min-width: 800px) {
    display: ${(props) => (props.status === 'default' ? 'block' : 'none')};
    ${(props) => (props.index === props.place) && css`
      border: black solid 2px;
      padding: 2px;
      transform: scale(1.05);
      transition: scale 0.2s ease;
    `};


  };
`;
// width: ${(props) => props.thumbnailWidth}px;
// height: ${(props) => props.thumbnailHeight}px;



const Scroll = styled.button`
  position: absolute;
  padding: 0;
  border: none;
  background-color: transparent;
  font-size: 2em;
  z-index: 2;
  left: 42.5%;
  transform: translateX(-50%);
  color: ${(props) => props.theme.fontColor};
  cursor: pointer;
  display: none;
  &:hover {

  };
  &:disabled {
    opacity: 0.3;
    cursor: initial;
  }
  @media (min-width: 800px) {
    display: ${(props) => props.status === 'default' && 'flex'};
  };
`;

const ScrollBack = styled(Scroll)`
  top: 0;
`;

const ScrollForward = styled(Scroll)`
  bottom: 0;
`;

// max-height: 90px;
// @media (min-width: 1200px) {
//   max-height: 110px;
// };
// @media (min-width: 800px) {
//   max-height: 100px;
//   margin: 0px 1px;
//   max-width: 80px;
//   display: ${(props) => (props.status === 'default' ? 'initial' : 'none')};
// };

// @media (min-width: 800px) {
//   max-height: 100%;
//   max-width: 100%;
// };

// const ThumbnailIcons = styled.div`
// justify-content: center;
// padding-bottom: 1.5em;
// align-items: center;
// display: flex;
// border-radius: 2.5px;

// @media (min-width: 700px) {
//   display: none;
// };
// `;
// // position: absolute;

// const IconContainer = styled.button`
// display: flex;
// align-content: center;
// padding: 0.25rem;
// &:hover {
//   background-color: rgba(225, 225, 225, 0.8);
//   cursor: pointer;
// };
// background-color: rgba(225, 225, 225, 0.01);
// `;

//       {status === 'default'
//         && (
//         <Side
//           status={status}
//         >
//           {thumbnails.length <= 7
//             ? thumbnails
//             : (
//               <>
//                 <Buttons
//                   scroll
//                   onClick={() => handleScroll(-1)}
//                   style={{ display: firstPhotoIndex === 0 ? 'none' : '' }}
//                 >
//                   <MdExpandLess style={{ fontSize: '1.25em' }} />
//                 </Buttons>
//                 {thumbnails.slice(firstPhotoIndex, firstPhotoIndex + 7)}
//                 <Buttons
//                   scroll
//                   onClick={() => handleScroll(1)}
//                   style={{ display: firstPhotoIndex < thumbnails.length - 7 ? '' : 'none' }}
//                 >
//                   <MdExpandMore style={{ fontSize: '1.25em' }} />
//                 </Buttons>
//               </>
//             )}
//         </Side>
//         )}

//       {selectedStyle.photos
//       && (
//         <MainWrapper status={status}>

//           {status !== 'zoomed'
//           && (
//             <>
//               <Buttons
//                 style={{ left: '2%', display: place > 0 ? 'block' : 'none' }}
//                 onClick={() => handleClickArrow(-1)}
//               >
//                 <MdArrowBackIos style={{ fontSize: '1.5rem', paddingLeft: '0.5rem', paddingTop: '0.25rem' }} />
//               </Buttons>
//               <Buttons
//                 style={{ right: '2%', display: place < thumbnails.length - 1 ? 'block' : 'none' }}
//                 onClick={() => handleClickArrow(1)}
//               >
//                 <MdArrowForwardIos style={{ fontSize: '1.5rem', paddingTop: '0.25rem' }} />
//               </Buttons>
//             </>
//           )}

//           {status === 'expanded'
//           && (
//               <ThumbnailIcons>
//                 {selectedStyle.photos
//                 && selectedStyle.photos.map((photo, index) => (
//                   <IconContainer
//                     key={photo.url}
//                     index={index}
//                     onClick={() => setPlace(index)}
//                     style={{
//                       fontSize: '1.5rem', border: index === place ? 'solid black thin' : 'none', transform: index === place ? 'scale(1.025)' : '', transition: index === place ? 'transform 0.25s ease' : '', cursor: 'pointer', borderRadius: '50px', margin: '0.5em', boxShadow: index === place ? '5px 5px 5px #727272' : '',
//                     }}
//                   >
//                     <Circle />
//                   </IconContainer>
//                 ))}
//               </ThumbnailIcons>
//           )}

//         </MainWrapper>

//       )}

//   );
// }
