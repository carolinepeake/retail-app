import React, {
  useState, useRef, useEffect,
} from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { useGlobalContext } from '../../../contexts/GlobalStore';
import Thumbnails from './Thumbnails';
// import useUnsplashUrl from '../../utils/useUnsplash';
import { StyledExitButton } from '../../reusable/Button';

// TO-DO: fix exit button on expanded view
// TO-DO: fix scroll main image index on zoom-in and expanded view and when resizing
// TO-DO: maybe make scroll below 600px and arrow buttons above

// could make path attribute and then params attribute

function ImageGallery({
  status, setStatus, place = 0, setPlace,
}) {
  const { productInfo, selectedStyle } = useGlobalContext();

  const carousel = useRef(null);
  const carouselViewport = useRef(null);

  const [firstPhotoIndex, setFirstPhotoIndex] = useState(0);

  // make a new component just for rendering picture element given a single photo url as a prop or child

  // const [unsplashUrl, setUnsplashUrl] = useUnsplashUrl(80, 'https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80');

  function handleClickArrow(n) {
    if (place === firstPhotoIndex && n === -1) {
      setFirstPhotoIndex((prev) => prev - 1);
    }
    if ((place === firstPhotoIndex + 5) && n === 1) {
      setFirstPhotoIndex((prev) => prev + 1);
    }
    setPlace((prev) => prev + n);
  }

  const imageContainer = useRef(null);

  const [xPerc, setXPerc] = useState('');
  const [yPerc, setYPerc] = useState('');

  function getProportionalZoom(e) {
    if (imageContainer.current) {
      const containerWidth = imageContainer.current.clientWidth;
      const containerHeight = imageContainer.current.clientHeight;
      const x = e.pageX - imageContainer.current.offsetLeft;
      const y = e.pageY - imageContainer.current.offsetTop;
      const xPercent = `${(x / (containerWidth / 100)) * 1.25}%`;
      const yPercent = `${(y / (containerHeight / 100)) * 1.25}%`;
      setXPerc(() => xPercent);
      setYPerc(() => yPercent);
    }
  }

  function handleClickMain(e) {
    e.preventDefault();
    switch (status) {
      case 'default':
        setStatus(() => 'expanded');
        break;
      case 'expanded':
        setStatus(() => 'zoomed');
        getProportionalZoom(e);
        break;
      case 'zoomed':
        setStatus(() => 'expanded');
        break;
      default:
        console.log('error handling expand main');
    }
  }

  function handlePanImage(e) {
    if (status !== 'default') {
      getProportionalZoom(e);
    }
  }

  function handleClickExit() {
    setStatus(() => 'default');
  }

  function scrollHandler(e) {
    e.preventDefault();
    const carouselDimensions = carouselViewport.current
    && carouselViewport.current.getBoundingClientRect();
    const carouselOffsets = carousel.current && carousel.current.getBoundingClientRect();

    const leftPadding = carouselDimensions && carouselDimensions.x;
    const carouselItemWidth = carouselDimensions && carouselDimensions.width;
    const leftOffset = carouselOffsets && carouselOffsets.x;

    const currentItemIndex = Math.floor(Math.abs((leftOffset - leftPadding)
    / Math.floor(carouselItemWidth))) || 0;
    setPlace(currentItemIndex);
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, [carousel, carouselViewport]);

  return (
    <ImageGalleryContainer
      status={status}
      place={place}
      setPlace={setPlace}
    >

      {selectedStyle.photos
      && (
        <>
          {status !== 'zoomed'
           && (
           <AnimationContainer photosLength={selectedStyle.photos.length} place={place}>

             <MainWrapper
               id="carousel-container"
               status={status}
               place={place}
               photosLength={selectedStyle.photos.length}
               onScroll={(e) => scrollHandler(e)}
               ref={carouselViewport}
             >

               <Carousel id="carousel" photosLength={selectedStyle.photos.length} place={place} status={status} ref={carousel}>
                 {selectedStyle.photos.map((photo, index) => (
                   <Slide
                     key={photo.url}
                     i={index}
                     id={`seq${index}`}
                     onClick={(e) => handleClickMain(e)}
                     status={status}
                     setStatus={setStatus}
                   >
                     <Main
                       src={photo.url}
                       alt={`${productInfo.name} in ${selectedStyle.name} style photo number ${index}`}
                       status={status}
                     />
                   </Slide>
                 ))}

               </Carousel>

             </MainWrapper>

             <Buttons
               place={place}
               setPlace={setPlace}
               left
               firstPhotoIndex={firstPhotoIndex}
               setFirstPhotoIndex={setFirstPhotoIndex}
               onClick={() => handleClickArrow(-1)}
             >
               <ArrowBackground />
               <ArrowIcon prev />
             </Buttons>
             <Buttons
               onClick={() => handleClickArrow(1)}
               place={place}
               setPlace={setPlace}
               photosLength={selectedStyle.photos.length}
               right
               firstPhotoIndex={firstPhotoIndex}
               setFirstPhotoIndex={setFirstPhotoIndex}
             >
               <ArrowBackground />
               <ArrowIcon next />
             </Buttons>

             {status === 'expanded'
          && (
          <StyledExitButton
            type="button"
            onClick={() => handleClickExit()}
          >
            &#10005;
            {/* &#9587; */}
          </StyledExitButton>
          )}
           </AnimationContainer>
           )}

          {status === 'zoomed'
          && (
          <MainWrapper ref={imageContainer} status={status}>
            <Main
              src={selectedStyle.photos[place || 0].url}
              onClick={(e) => handleClickMain(e)}
              alt={`${productInfo.name} in ${selectedStyle.name} style photo number ${place}`}
              status={status}
              setStatus={setStatus}
              place={place}
              onMouseMove={(e) => handlePanImage(e)}
              xPercent={xPerc}
              yPercent={yPerc}
            />
          </MainWrapper>
          )}
        </>
      )}

      <Thumbnails
        place={place}
        setPlace={setPlace}
        status={status}
        firstPhotoIndex={firstPhotoIndex}
        setFirstPhotoIndex={setFirstPhotoIndex}
      />

    </ImageGalleryContainer>
  );
}

ImageGallery.propTypes = {
  status: PropTypes.string.isRequired,
  setStatus: PropTypes.func.isRequired,
  place: PropTypes.number.isRequired,
  setPlace: PropTypes.func.isRequired,
};

const ImageGalleryContainer = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: 1.5em;
  display: flex;
  flex-direction: column;

  @media (min-width: 600px) {
    flex: 1 2 400px;
  };

  ${(props) => props.status === 'default' && css`
    max-height: 820px;

    @media (min-width: 600px) {
      column-gap: 1em;
      position: sticky;
      top: 60px;
      padding-bottom: 0px;
    };

    @media (min-width: 800px) {
      flex: 1 3 500px;
      aspect-ratio: 5/6;
      flex-direction: row;
      column-gap: 0;
      max-width: 700px;
    };
  `};

  ${(props) => props.status === ('expanded' || 'zoomed') && css`
    margin: auto;
    height: max-content;
    justify-content: center;
    align-items: center;
    align-content: center;
  `};
`;

const AnimationContainer = styled.div`
  position: relative;
  height: fit-content;
  flex: 6 1 0;
`;

const MainWrapper = styled.div`
  margin: 0 auto;
  padding: 0;
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  overflow: hidden;
  position: relative;
  aspect-ratio: 4/6;
  z-index: 1;
  overflow-x: scroll;
  --slide-count: ${(props) => props.photosLength};
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    display: none;
  };
  -ms-overflow-style: none;
  scrollbar-width: none;

  @media (min-width: 600px) {
    height: fit-content;
    max-height: 120vh;
  };
  @media (min-width: 800px) {
    overflow-x: hidden;
  };

  ${(props) => props.status === 'default' && css`
    @media (min-width: 600px) {
      max-height: 840px;
    };
    @media (min-width: 800px) {
      flex: 6 1 450px;
      height: initial;
    };
    @media (min-width: 1200px) {
      max-width: 800px;
      max-height: 1200px;
    };
  `};

  ${(props) => props.status === 'zoomed' && css`
    @media (min-width: 600px) {
      max-width: 80vh;
    };
  `};
`;

const Carousel = styled.ul`
  display: flex;
  left: 0;
  position: relative;
  margin: 0;
  padding: 0;
  width: ${(props) => props.photosLength}00%;

  @media (min-width: 600px) {
    transition: translate 0.5s;
    translate: ${(props) => `calc((-100% / ${props.photosLength}) * ${props.place})`} 0;
  };
`;

const Slide = styled.li`
  scroll-snap-align: start;
  width: 100%;
  height: 100%;
`;

const Main = styled.img`
  object-fit: cover;
  overflow: hidden;
  aspect-ratio: 4/6;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  z-index: 2;

  ${(props) => props.status === 'default' && css`
    max-width: 600px;
    transition: translate 0.25s smooth transform 0.25s ease;
    position: relative;
    cursor: zoom-in;
    @media (min-width: 600px) {
      max-height: 840px;
    };
    @media (min-height: 1200px) {
      max-width: 800px;
      max-height: 1200px;
    }
  `};

  ${(props) => props.status === 'expanded' && css`
    cursor: crosshair
  `};

  ${(props) => props.status === 'zoomed' && css`
    transform: scale(2.5);
    transition: transform 0.25s ease;
    transform-origin: top left;
    transition: translate 0.25s smooth;
    position: absolute;
    translate: -${props.xPercent} -${props.yPercent};
    cursor: zoom-out;
  `};
`;

// journal: needed to have display: grid (along with position: relative) to display image underneath thumbnail images with larger z-indexes, even though no grid-template columns or rows were set on the background image with display: grid;

// MVP journal: cannot select by fields in a mongodb document that is simply referenced by objectID in another schema.  you have to run the populate method to get the fields of the nested schema to populate in the outer model, and cannot then find by a certain field or value. instead, have to denormalize the data when you design your schemas.

// to make font-size responsive, set the root font-size to be a porportion of the view width, i.e. html {
// font-size: () => 15px + 0.3vw;  // not 100% on my syntax but that's the jist
// },
// buttons, inputs, selects and some other elements have default broswer font-size, padding, and other settings that are not overridden by a general font-size change and using rem or em

// file input elements should work for mobile, and suggest file, access camera, access photos

// advice to incoming HR students:
// pay special attentiom to data structures and algorithims
// time management is key
// what stack overflow is
// theres youtube videos with instructions/lessons
// almost everything you are going to do has been done before
// be careful not to spin your wheels too much/too long
// get a solid note taking strategy /organization strategy down before class starts (recs; notation)
// second monitor

const Buttons = styled.button`
  display: none;
  @media (min-width: 600px) {
    ${(props) => props.left && css`
      left: 0%;
      display: ${props.place > 0 ? 'block' : 'none'};
    `};
    ${(props) => props.right && css`
      right: 0%;
      display: ${props.place < props.photosLength - 1 ? 'block' : 'none'};
    `};
  };
  z-index: 3;
  align-self: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: ${(props) => props.theme.navBgColor};
  opacity: 0.8;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    opacity: 1;
  };
  font-weight: 500;
  padding: 0;
  color: ${(props) => props.theme.fontColor};;
  border: none;
  line-height: 1;
  font-size: 1em;
  aspect-ratio: 1;
  height: 2em;
  @media (min-width: 700px) {
    font-size: 1.17em;
  };
  @media (min-width: 900px) {
    font-size: 1.5em;
  };
  ${(props) => props.scroll && css`
    top: initial;
    height: 2rem;
    width: 3rem;
    align-self: center;
    top: 0;
    z-index: 4;
    position: relative;
    background-color: initial;
    &:hover {
      background-color: rgba(225, 225, 225, 0.75);
    };
    font-size: 2rem;
  `};
`;
// &:hover {
//   background-color: rgba(225, 225, 225, 0.9);
// };

const ArrowBackground = styled.span`
  aspect-ratio: 1;
  display: flex;
  position: relative;
`;

const ArrowIcon = styled.span`
  ${(props) => props.prev && css`
    &::before {
      content: '〈';
      right: 75%;
      position: absolute;
      top: 50%;
      height: 50%;
      width: 50%;
      transform: translate(50%,-50%);
      padding: 0 6.25%;
      font-family: futura-pt, sans-serif;
      box-sizing: border-box;
    }
  `};

  ${(props) => props.next && css`
    &::before {
      /* could also use &#x27E9; it's centered */
      content: ' 〉';
      left: 50%;
      position: absolute;
      top: 50%;
      height: 50%;
      width: 25%;
      transform: translate(-50%,-50%);
      padding: 0 12.5%;
      font-family: futura-pt, sans-serif;
    }
  `};
`;

// const Exit = styled.button`
//   position: absolute;
//   right: 0.5em;
//   top: 0.5em;
//   z-index: 3;
//   background-color: ${(props) => props.theme.navBgColor};
//   opacity: 0.8;
//   &:hover {
//     opacity: 1;
//     box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
//   };
//   display: block;
//   color: ${(props) => props.theme.darkBlueHover};
//   border: none;
//   border-radius: 50px;
//   padding: 0;
//   line-height: 1;
//   font-size: 1em;
//   aspect-ratio: 1;
//   height: 2em;
//   align-self: center;
//   @media (min-width: 700px) {
//     font-size: 1.17em;
//   };
//   @media (min-width: 800px) {
//     font-size: 1.5em;
//   };
// `;

export default ImageGallery;

// left arrow &#8592;
// up arrow &#8593;
// right arrow &#8594;
// down arrow &#8595;

// x in a rectangular box &#8999;

// up arrowhead / collapse arrow &#8963;

// horizontal line &#9472;
// plus 	&#43;
// fullwidth hyphen minus 	&#65293;
