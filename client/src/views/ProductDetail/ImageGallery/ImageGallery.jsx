import React, {
  useState, useRef, useEffect,
} from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { useGlobalContext } from '../../../contexts/GlobalStore';
import Thumbnails from './Thumbnails/Thumbnails';
import Images from './Thumbnails/Images';
import ZoomedImage from './ZoomedImage';
import CarouselItem from './CarouselItem';
import ScrollButton from './ScrollButton';
import { CloseButton } from '../../../components/Buttons';
import useCarouselNavigation from '../../../hooks/useCarouselNavigation';
import useMediaQueries from '../../../hooks/useMediaQueries';

// TO-DO: fix scroll main image index on zoom-in and expanded view and when resizing
// TO-DO: maybe make scroll below 600px and arrow buttons above
// could make path attribute and then params attribute
// starting index is not staying the same when switching in and out of zoomed-in view
// need to add an onResize event handler

// try using ref and scrolling to ref

// try resetting left offset on clicking arrow

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

  // const itemsRef = useRef(null);
  // function getMap() {
  //   if (!itemsRef.current) {
  //     // Initialize the Map on first usage.
  //     itemsRef.current = new Map();
  //   }
  //   return itemsRef.current;
  // }
  // function scrollToId(itemId) {
  //   const map = getMap();
  //   const node = map.get(itemId);
  //   node.scrollIntoView({
  //     behavior: 'smooth',
  //     block: 'nearest',
  //     inline: 'center'
  //   });
  // }
  // // const handleClickThumbnail = (url) => {
  // //   // setActive(index);
  // //   scrollToId(url);
  // // };


  // function handleClickArrow(n) {
  //   if (place === firstPhotoIndex && n === -1) {
  //     setFirstPhotoIndex((prev) => prev - 1);
  //   }
  //   if ((place === firstPhotoIndex + 5) && n === 1) {
  //     setFirstPhotoIndex((prev) => prev + 1);
  //   }
  //   setPlace((prev) => prev + n);
  // // }

  const [
    place,
    setPlace,
    // firstPhotoIndex,
    // setFirstPhotoIndex,
    styles,
    // setStyles,
    handleScroll,
    // handleClickBackArrow,
    // handleClickForwardArrow,
    // handleClickThumbnail,
    handleClickArrow,
    handleClickAnchor,
  // ] = useCarouselNavigation(startingIndex, carousel, galleryWidth, photosLength, 1);
  ] = useCarouselNavigation(carousel, startingIndex);
  console.log('place: ', place, 'styles: ', styles);

  const handleClickThumbnail = (index) => {
    carousel.current.children[index].scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
    // unnecessary b/c detect on scroll
    // setPlace(index);
  };


  const handleClickBack = () => {
    if (place < firstPhotoIndex + 1) {
      setFirstPhotoIndex((prev) => prev - 1);
    }
    // handleClickArrow(-1);
    carousel.current.children[place - 1].scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
    // unnecessary b/c detect on scroll
    // setPlace(prev => prev - 1);
  };

  const handleClickForward = () => {
    if (place > firstPhotoIndex + 4) {
      setFirstPhotoIndex((prev) => prev + 1);
    }
    // handleClickArrow(1);
    carousel.current.children[place + 1].scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
    // unnecessary b/c detect on scroll
    // setPlace(prev => prev + 1);
  };

  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0});
  // function handlePanImage(e) {
  //   console.log('e: ', e);
  //   const zoomContainer = viewport.current;
  //   const containerWidth = viewport.clientWidth;
  //   const containerHeight = viewport.clientHeight;
  //   console.log('zoomContainer: ', zoomContainer);
  //   const x = e.pageX - zoomContainer.offsetLeft;
  //   const y = e.pageY - zoomContainer.offsetTop;
  //   const translateX = `${(x / (containerWidth / 100)) * 1.25}%`;
  //   const translateY = `${(y / (containerHeight / 100)) * 1.25}%`;
  //   setInitialPosition({
  //     x: translateX,
  //     y: translateY,
  //   });
  // };
  const handleZoomPosition = (e) => {
    // handlePanImage(e);
    const scaledX = `${e.offsetX * 1.5}px`;
    const scaledY = `${e.offsetY * 1.5}px`;
    console.log('zoom position: ', {x: scaledX, y: scaledY}, 'click event: ', e);
    setInitialPosition({
      x: scaledX,
      y: scaledY,
    });
  };

  const handleClickMain = (e) => {
    switch (status) {
      case 'default':
        setStatus('expanded');
        break;
      case 'expanded':
        setStatus('zoomed');
        // handleZoom(e);
        handleZoomPosition(e);
        // handlePanImage(e);
        break;
      case 'zoomed':
        setStatus('expanded');
        // scrollToId(place);
        break;
      default:
        console.log('error handling expand main');
    }
  };

  const handleClickExit = () => {
    setStatus('default');
  };

  console.log('place in IG: ', place);

  const translate = ((-100 / photosLength) * place) || 0;
  console.log('photosLength: ', photosLength);
  console.log('translate: ', translate);

  // useEffect(() => {
  //   const scrollToId = () => {
  //     node.scrollIntoView({
  //       behavior: 'smooth',
  //       block: 'nearest',
  //       inline: 'center'
  //     });
  //   }

  //  window.addEventListener('resize', scrollToId);

  //   return (
  //     window.removeEventListener('resize', scrollToId);
  //   )

  // }, []);

  const { sm, md, lg } = useMediaQueries();


  if (status === 'zoomed') {
    return (
      <ImageGalleryContainer
        status={status}
      >
        <ZoomedImage
          handleClickMain={handleClickMain}
          photo={selectedStyle?.photos[place || 0]?.url}
          alternative={`${productInfo?.name} in ${selectedStyle?.name} style photo number ${place}`}
          initialPosition={initialPosition}
        />
      </ImageGalleryContainer>
    );
  }

  // if (sm) {
  //   return (
  //     <ImageGalleryContainer
  //       status={status}
  //     >
  //     </ImageGalleryContainer>
  //   )
  // }

  return (
    <ImageGalleryContainer
      status={status}
    >
      {/* <Gallery
      />
      </Gallery> */}

          <AnimationContainer>

            <MainWrapper
              id="carousel-container"
              status={status}
              place={place}
              photosLength={selectedStyle?.photos?.length}
              ref={viewport}
              onScroll={handleScroll}
              onClick={handleClickMain}
            >

              <Carousel
                id="carousel"
                // photosLength={photosLength}
                photosLength={selectedStyle?.photos?.length}
                place={place}
                status={status}
                ref={carousel}
                translate={translate}
                styles={styles}
              >

                {selectedStyle?.photos?.map((photo, index) => (
                  <Slide
                    key={photo.url}
                    // key={index}
                    i={index}
                    id={index}
                    // ids don't match up
                    // id={`seq${index}`}
                    // id={`seq${index + 1}`}
                    // onClick={handleClickMain}
                    // ref={(node) => {
                    //   const map = getMap();
                    //   if (node) {
                    //     map.set(index, node);
                    //   } else {
                    //     map.delete(index);
                    //   }
                    // }}
                    // could also keep the same main component and change css for zoomed & expanded
                    // or could pass photo.url to the other main components, or update place with scroll
                  >
                    <MainImage
                      // fullsize={photo?.url}
                      // thumbnail={photo?.thumbnail}
                      src={photo?.url}
                      // use url to store productName, selectedStyle and seq#
                      alt={`${productInfo?.name} in ${selectedStyle?.name} style photo number ${index}`}
                      status={status}
                      // id={`seq${index}`}
                      // id={`seq${index + 1}`}
                      // id={index}
                    />
                  </Slide>
                  // <CarouselItem
                  //   key={photo.url}
                  //   index={index}
                  //   handleClickMain={handleClickMain}
                  //   photo={photo}
                  //   status={status}
                  //   alternative={`${productInfo?.name} in ${selectedStyle?.name} style photo number ${index}`}
                  // />
                ))}

              </Carousel>

            </MainWrapper>

            <ScrollButton
              visible={place > 0}
              position="left"
              handleClick={handleClickBack}
              overlay
            />

            <ScrollButton
              visible={place < photosLength - 1}
              position="right"
              handleClick={handleClickForward}
              overlay
            />

          {status === 'expanded'
          && (
            <CloseButton
              $round
              onClick={handleClickExit}
            >
              &#10005;
            </CloseButton>
          )}

          </AnimationContainer>

      <Thumbnails
        place={place}
        setPlace={setPlace}
        status={status}
        firstPhotoIndex={firstPhotoIndex}
        setFirstPhotoIndex={setFirstPhotoIndex}
        // handleClickThumbnail={handleClickAnchor}
        handleClickThumbnail={handleClickThumbnail}
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
  position: relative;

  @media (min-width: 600px) {
    flex: 1 2 400px;
  }

  ${(props) => props.status === 'default' && css`
    max-height: 820px;

    @media (min-width: 600px) {
    /*  column-gap: 1em; */
      position: sticky;
      top: 60px;
      padding-bottom: 0px;
    }

    @media (min-width: 800px) {
      flex: 1 3 500px;
      aspect-ratio: 5/6;
      flex-direction: row;
     /* column-gap: 0; */
      max-width: 700px;
    }
  `};

  ${(props) => props.status === ('expanded' || 'zoomed') && css`
    margin: auto;
    height: max-content;
    justify-content: center;
    align-items: center;
    align-content: center;
    position: relative;
    position: fixed;
    height: 100vh;
    width: 100vw;
    background-color: white;
    top: 0;
    left: 0;
    padding: 0.25em;
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
  overflow: clip;
  overflow: hidden;
  position: relative;
  z-index: 1;
  aspect-ratio: 4/6;

  @media (min-width: 600px) {
   /* height: fit-content; */
   /* max-height: 120vh; */
  }

  ${(props) => props.status === 'default' && css`
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;

   @media (min-width: 600px) {
     /* max-height: 840px; */
    /*  overflow-x: clip; */
    /*  overflow-x: hidden; */
    }

    @media (min-width: 800px) {
      flex: 6 1 450px;
     /* height: initial; */
    }

    @media (min-width: 1200px) {
      max-width: 800px;
      max-height: 1200px;
    }
  `};

  ${(props) => props.status === 'expanded' && css`
    max-height: 100vh;
    max-width: 100vw;
  `}
`;

const MainImage = styled.img`
  object-fit: cover;
  overflow: hidden;
  aspect-ratio: 4/6;
  width: 100%;
  height: 100%;
  margin: 0 auto;

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
    position: relative;
  /*  max-height: 100vh;
    max-width: 100vw; */
  `};
`;

const Carousel = styled.ul`
  display: flex;
  /* don't want resetting left to previous left value after scrolled */
  /* so maybe just return styles object and don't specifically set left */
  /* left: ${(props) => props.styles.left}; */
 /* left: -${(props) => props.place}00%; */
 /* left: 0; */
  position: relative;
  margin: 0;
  padding: 0;
  width: ${(props) => props.photosLength}00%;
 /* transition: translate 0.5s;
  translate: ${(props) => `calc((-100 / ${props.photosLength}) * ${props.place} * 1%)`} 0; */
  /* translate: ${(props) => props.styles.translate};
  transition: translate 0.5s; */

 /* @media (min-width: 600px) {
    transition: translate 0.5s;
    translate: ${(props) => props.translate}% 0;
    left: 0;
  } */

/*  ${(props) => props.status === 'expanded' && css`
    left: 0;
    translate: ${(props) => props.translate}% 0;
  `}; */
`;

const Slide = styled.li`
  scroll-snap-align: start;
  width: 100%;
  height: 100%;
`;



// journal: needed to have display: grid (along with position: relative) to display image underneath thumbnail images with larger z-indexes, even though no grid-template columns or rows were set on the background image with display: grid;

// MVP journal: cannot select by fields in a mongodb document that is simply referenced by objectID in another schema.  you have to run the populate method to get the fields of the nested schema to populate in the outer model, and cannot then find by a certain field or value. instead, have to denormalize the data when you design your schemas.


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
