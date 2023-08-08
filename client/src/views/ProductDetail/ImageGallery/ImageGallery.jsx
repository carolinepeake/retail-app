import React, {
  useState, useRef, useEffect,
} from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { useGlobalContext } from '../../../contexts/GlobalStore';
import Thumbnails from './Thumbnails';
import ScrollButton from './ScrollButton';
import { StyledExitButton } from '../../../components/Button';
import useCarouselNavigation from '../../../hooks/useCarouselNavigation';

// TO-DO: fix scroll main image index on zoom-in and expanded view and when resizing
// TO-DO: maybe make scroll below 600px and arrow buttons above
// could make path attribute and then params attribute
// starting index is not staying the same when switching in and out of zoomed-in view
// need to add an onResize event handler

function ImageGallery({
  status,
  setStatus,
  startingIndex,
  setStartingIndex,
}) {
  console.log('[ImageGallery] is running');
  const { productInfo, selectedStyle } = useGlobalContext();

  // if thumbnail with corresponding href value is clicked, should automatically scroll to that image

  const [firstPhotoIndex, setFirstPhotoIndex] = useState(0);

  const photosLength = selectedStyle?.photos?.length || 0;

  const carousel = useRef(null);
  const viewport = useRef(null);

  const itemsRef = useRef(null);

  function scrollToId(itemId) {
    const map = getMap();
    const node = map.get(itemId);
    node.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  }

  function getMap() {
    if (!itemsRef.current) {
      // Initialize the Map on first usage.
      itemsRef.current = new Map();
    }
    return itemsRef.current;
  }

  const handleClickThumbnail = (url) => {
    // setActive(index);
    scrollToId(url);
  };


  // function handleClickArrow(n) {
  //   if (place === firstPhotoIndex && n === -1) {
  //     setFirstPhotoIndex((prev) => prev - 1);
  //   }
  //   if ((place === firstPhotoIndex + 5) && n === 1) {
  //     setFirstPhotoIndex((prev) => prev + 1);
  //   }
  //   setPlace((prev) => prev + n);
  // // }

  // const onClickArrow = (arrowDirection, currentIndex, firstPhotoIndex, setFirstPhotoIndex) => {

  // }

  // const [
  //   showBackArrow,
  //   setShowBackArrow,
  //   showForwardArrow,
  //   setShowForwardArrow,
  //   // currentIndex,
  //   place,
  //   setPlace,
  //   // setCurrentIndex,
  //   handleClickArrow,
  // ] = useArrows(listLength, startingIndex);

  // const [
  //   place,
  //   setPlace,
  //   // firstPhotoIndex,
  //   // setFirstPhotoIndex,
  //   handleScroll,
  //   handleClickArrow,
  // ] = useCarouselNavigation(carousel, listLength,
  //   // startingIndex
  // );

  const [
    place,
    setPlace,
    // styles,
    // setStyles,
    handleScroll,
    // handleClickBackArrow,
    // handleClickForwardArrow,
    // handleClickThumbnail,
    handleClickArrow,
    handleClickAnchor,
  // ] = useCarouselNavigation(startingIndex, carousel, viewport, photosLength, 1);
  ] = useCarouselNavigation(carousel, startingIndex);
  console.log('place: ', setPlace, 'handleClickArrow: ', handleClickArrow, 'handleClickAnchor: ', handleClickAnchor);

  // could do useEffect based on status
  // to determine whether to add scroll handler or moveMouse handler
  // need to initialize xPerc and yPerc once status is expanded
  // is being called, but maybe rendering before x and y set
  // might want to use useCallback or useMemo to make quicker?
  // can make useMeasurements hook

  // https://react.dev/learn/reusing-logic-with-custom-hooks
// export function usePointerPosition() {
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   useEffect(() => {
//     function handleMove(e) {
//       setPosition({ x: e.clientX, y: e.clientY });
//     }
//     window.addEventListener('pointermove', handleMove);
//     return () => window.removeEventListener('pointermove', handleMove);
//   }, []);
//   return position;
// }

  const handleClickBack = () => {
    handleClickArrow(-1);
  };

  const handleClickForward = () => {
    handleClickArrow(1);
  };

  const imageContainer = useRef(null);
  const mainImageRef = useRef(null);

  const [position, setPosition] = useState({ x: '', y: '' });

  useEffect(() => {
    console.log('useEffect in main image');
    function handlePanImage(e) {
      const zoomContainer = imageContainer.current;
      // if (imageContainer.current) {
        // const containerWidth = imageContainer.current.clientWidth;
        const containerWidth = zoomContainer.clientWidth;
        // const containerHeight = imageContainer.current.clientHeight;
        const containerHeight = zoomContainer.clientHeight;
        // should maybe do offset from parent element, not page, b/c if scroll
        // const x = e.pageX - imageContainer.current.offsetLeft;
        // const y = e.pageY - imageContainer.current.offsetTop;
        console.log('zoomContainer: ', zoomContainer);
        const x = e.pageX - zoomContainer.offsetLeft;
        const y = e.pageY - zoomContainer.offsetTop;
        const translateX = `${(x / (containerWidth / 100)) * 1.25}%`;
        const translateY = `${(y / (containerHeight / 100)) * 1.25}%`;
        setPosition({
          x: translateX,
          y: translateY,
        });
      }

      mainImageRef?.current?.addEventListener('mousemove', handlePanImage);

      return () => {
        mainImageRef?.current?.removeEventListener('mousemove', handlePanImage);
      };

  }, [imageContainer]);
  // const imageContainer = useRef(null);

  // const [position, setPosition] = useState({ x: '', y: '' });

  // function getProportionalZoom(e) {
  //   const zoomContainer = imageContainer.current;
  //   // if (imageContainer.current) {
  //     // const containerWidth = imageContainer.current.clientWidth;
  //     const containerWidth = zoomContainer.clientWidth;
  //     // const containerHeight = imageContainer.current.clientHeight;
  //     const containerHeight = zoomContainer.clientHeight;
  //     // should maybe do offset from parent element, not page, b/c if scroll
  //     // const x = e.pageX - imageContainer.current.offsetLeft;
  //     // const y = e.pageY - imageContainer.current.offsetTop;
  //     console.log('zoomContainer: ', zoomContainer);
  //     const x = e.pageX - zoomContainer.offsetLeft;
  //     const y = e.pageY - zoomContainer.offsetTop;
  //     const translateX = `${(x / (containerWidth / 100)) * 1.25}%`;
  //     const translateY = `${(y / (containerHeight / 100)) * 1.25}%`;
  //     setPosition({
  //       x: translateX,
  //       y: translateY,
  //     });
  //   }
  // https://react.dev/reference/react/useEffect  handleMove

  function handleProportionalZoom(e) {
    if (imageContainer.current) {
      const containerWidth = imageContainer.current.clientWidth;
      const containerHeight = imageContainer.current.clientHeight;
      // should maybe do offset from parent element, not page, b/c if scroll
      const x = e.pageX - imageContainer.current.offsetLeft;
      const y = e.pageY - imageContainer.current.offsetTop;
      const translateX = `${(x / (containerWidth / 100)) * 1.25}%`;
      const translateY = `${(y / (containerHeight / 100)) * 1.25}%`;
      setPosition({
        x: translateX,
        y: translateY,
      });
    }
  }

  // wrap getProportionalZoom in an effectEvent and call it in a useEffects
  // as the handler for the mousemove event listeners
  // add the event listeners if the status is zoomed
  // if the status is not zoomed, add a scroll(specify direction) event listener
  // add a ref to the carouselviewport and thats the element I should attach the event listeners to

  function handlePanImage(e) {
    if (status !== 'default') {
      handleProportionalZoom(e);
    }
  }

  function handleClickMain(e) {
    // find out default behavior
    e.preventDefault();
    switch (status) {
      case 'default':
        setStatus(() => 'expanded');
        break;
      case 'expanded':
        setStatus(() => 'zoomed');
        // handleZoom(e);
         handlePanImage(e);
        break;
      case 'zoomed':
        setStatus(() => 'expanded');
        break;
      default:
        console.log('error handling expand main');
    }
  }

  function handleClickExit() {
    setStatus(() => 'default');
  }

  // function scrollHandler(e) {
  //   // const carouselDimensions = carouselViewport.current
  //   // && carouselViewport.current.getBoundingClientRect();
  //   const carouselDimensions = e.currentTarget.getBoundingClientRect();

  //   const carouselOffsets = carousel.current && carousel.current.getBoundingClientRect();

  //   const leftPadding = carouselDimensions && carouselDimensions.x;
  //   const carouselItemWidth = carouselDimensions && carouselDimensions.width;
  //   const leftOffset = carouselOffsets && carouselOffsets.x;

  //   const currentItemIndex = Math.floor(Math.abs((leftOffset - leftPadding)
  //   / Math.floor(carouselItemWidth))) || 0;
  //   setPlace(currentItemIndex);
  // }

  console.log('place in IG: ', place);

  return (
    <ImageGalleryContainer
      status={status}
    >
          {status !== 'zoomed'
          && (
          <AnimationContainer>

            <MainWrapper
              id="carousel-container"
              status={status}
              place={place}
              photosLength={selectedStyle?.photos?.length}
              ref={viewport}
              onScroll={handleScroll}
            >

              <Carousel
                id="carousel"
                // photosLength={photosLength}
                photosLength={selectedStyle?.photos?.length}
                place={place}
                status={status}
                ref={carousel}
              >

                {selectedStyle?.photos?.map((photo, index) => (
                  <Slide
                    key={photo.url}
                    // key={index}
                    i={index}
                    // id={index}
                    // ids don't match up
                    id={`seq${index}`}
                    onClick={(e) => handleClickMain(e)}
                    ref={(node) => {
                      const map = getMap();
                      if (node) {
                        map.set(photo.url, node);
                      } else {
                        map.delete(photo.url);
                      }
                    }}

                    // id={`seq${index + 1}`}
                     // could also keep the same main component and change css for zoomed & expanded
                     // or could pass photo.url to the other main components, or update place with scroll
                  >
                    <MainImage
                      fullsize={photo?.url}
                      thumbnail={photo?.thumbnail}
                      src={photo?.url}
                       // use url to store productName, selectedStyle and seq#
                      alt={`${productInfo?.name} in ${selectedStyle?.name} style photo number ${index}`}
                      status={status}
                      setStatus={setStatus}
                      // id={`seq${index}`}
                      place={place}
                      index={index}
                    />
                  </Slide>
                ))}

              </Carousel>

            </MainWrapper>

            <ScrollButton
              visible={place > 0}
              position="left"
              handleClick={handleClickBack}
            />

            <ScrollButton
              visible={place < photosLength - 1}
              position="right"
              handleClick={handleClickForward}
            />

          {status === 'expanded'
          && (
            <StyledExitButton
              type="button"
              onClick={() => handleClickExit()}
            >
              &#10005;
            </StyledExitButton>
          )}
          </AnimationContainer>
        )}

          {status === 'zoomed'
          && (
            <MainWrapper
              ref={imageContainer}
              status={status}
              // onClick={(e) => handleClickMain(e)}
            >
              <MainImage
                src={selectedStyle?.photos[place || 0]?.url}
                alt={`${productInfo?.name} in ${selectedStyle?.name} style photo number ${place}`}
                status={status}
                setStatus={setStatus}
                place={place}
                onMouseMove={(e) => handlePanImage(e)}
                position={position}
                ref={mainImageRef}
                onClick={(e) => handleClickMain(e)}
              />
            </MainWrapper>
          )}

      <Thumbnails
        place={place}
        setPlace={setPlace}
        status={status}
        firstPhotoIndex={firstPhotoIndex}
        setFirstPhotoIndex={setFirstPhotoIndex}
        handleClickThumbnail={handleClickAnchor}
        // handleClickThumbnail={handleClickThumbnail}

      />

    </ImageGalleryContainer>
  );
}

ImageGallery.propTypes = {
  status: PropTypes.string.isRequired,
  setStatus: PropTypes.func.isRequired,
  startingIndex: PropTypes.number.isRequired,
  setStartingIndex: PropTypes.func.isRequired,
};

const ImageGalleryContainer = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: 1.5em;
  display: flex;
  flex-direction: column;

  @media (min-width: 600px) {
    flex: 1 2 400px;
  }

  ${(props) => props.status === 'default' && css`
    max-height: 820px;

    @media (min-width: 600px) {
      column-gap: 1em;
      position: sticky;
      top: 60px;
      padding-bottom: 0px;
    }

    @media (min-width: 800px) {
      flex: 1 3 500px;
      aspect-ratio: 5/6;
      flex-direction: row;
      column-gap: 0;
      max-width: 700px;
    }
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
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  @media (min-width: 600px) {
    height: fit-content;
    max-height: 120vh;
    overflow-x: hidden;
  }

  ${(props) => props.status === 'default' && css`
    @media (min-width: 600px) {
      max-height: 840px;
    }
    @media (min-width: 800px) {
      flex: 6 1 450px;
      height: initial;
    }
    @media (min-width: 1200px) {
      max-width: 800px;
      max-height: 1200px;
    }
  `};

  ${(props) => props.status === 'zoomed' && css`
    /*    overflow-x: hidden; */
    @media (min-width: 600px) {
      max-width: 80vh;
    }
  `};
`;

const MainImage = styled.img`
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
    }
    @media (min-height: 1200px) {
      max-width: 800px;
      max-height: 1200px;
    }
  `};

  ${(props) => props.status === 'expanded' && css`
    cursor: crosshair;
  `};

  ${(props) => props.status === 'zoomed' && css`
    transform: scale(2.5);
    transition: transform 0.25s ease;
    transform-origin: top left;
    transition: translate 0.25s smooth;
    /* position: relative; */
    position: absolute;
    translate: -${props.position.x} -${props.position.y};
    cursor: zoom-out;
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
    /* translate: ${(props) => `calc(-100%  * ${props.place})`} 0; */
    translate: ${(props) => `calc((-100 / ${props.photosLength}) * ${props.place} * 1%)`} 0;
  }
`;
// translate: ${(props) => `calc(-100%  * ${props.place})`} 0;
// @media (min-width: 600px) {
//   transition: translate 0.5s;
//   translate: ${(props) => `calc((-100% / ${props.photosLength}) * ${props.place})`} 0;
// }

const Slide = styled.li`
  scroll-snap-align: start;
  width: 100%;
  height: 100%;
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

// arrow: &#9587;
