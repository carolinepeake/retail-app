import React, {
  useState
} from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import {
  MdArrowForwardIos, MdArrowBackIos, MdExpandMore, MdExpandLess,
} from 'react-icons/md';

import { useGlobalContext } from '../../../contexts/GlobalStore';

function Thumbnails({ place, setPlace, status }) {
  const { selectedStyle } = useGlobalContext();

  let thumbnails = [];
  if (selectedStyle.photos) {
    thumbnails = selectedStyle.photos.map((photo, index) => (
      <ThumbnailContainer
        key={photo.thumbnail_url}
        index={index}
        alt={`${selectedStyle.name} thumbnail`}
        onClick={() => setPlace(index)}
        place={place}
        setPlace={setPlace}
        type="button"
        status={status}
      >
        <ThumbnailIcon status={status} place={place} index={index} />
        <ThumbnailImage
          src={photo.thumbnail_url}
          status={status}
        />
      </ThumbnailContainer>
    ));
  }

  return (
    <ThumbnailsContainer
      status={status}
      place={place}
      setPlace={setPlace}
    >
      {thumbnails}
    </ThumbnailsContainer>
  );
}

export default Thumbnails;

const ThumbnailsContainer = styled.div`
  display: ${(props) => (props.status === 'zoomed' ? 'none' : 'flex')};
  flex-direction: row;
  gap: 0.75em;
  align-items: center;
  justify-content: center;
  align-content: center;
  z-index: 2;
  margin: 0 auto;
  box-sizing: border-box;


  @media (min-width: 800px) {
    ${(props) => (props.status === 'default' && css`
      order: -1;
      flex-direction: column;
      flex: 1 1 0;
      align-items: flex-start;
      justify-content: flex-end;
      column-gap: 1.0em;
      aspect-ratio: 4/56;
      min-width: 70px;
    `)};
  };
`;
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

const ThumbnailContainer = styled.button`
    display: flex;
    background-color: transparent;
    border: none;
    overflow: hidden;

    @media (max-width: 800px) {
      justify-content: center;
      align-items: center;
      margin: 0.5em 0;
      border-radius: 50px;
      color: ${(props) => props.theme.submitButton};
    };

    @media (min-width: 800px) {
      margin: 0;
      padding: 0;
    };

    ${(props) => props.expanded && css`
      justify-content: center;
      align-items: center;
      margin: 0.5em 0;
      border-radius: 50px;
      color: ${props.theme.submitButton};
    `};
`;
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
    color: ${props.theme.submitButtonHover};
 `)};
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
  max-height: 90px;
  margin: 0 auto;
  display: none;

  @media (min-width: 800px) {
    display: ${(props) => (props.status === 'default' ? 'block' : 'none')};
  };
`;

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
