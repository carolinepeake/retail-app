import React, {
  useState, useRef, useEffect,
} from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { useGlobalContext } from '../../../contexts/GlobalStore';
import Thumbnails from './Thumbnails';
import View from './View';
import ScrollButton from './ScrollButton';
import { StyledExitButton } from '../../../components/Button';
import useCarouselNavigation from '../../../hooks/useCarouselNavigation';

// TO-DO: fix scroll main image index on zoom-in and expanded view and when resizing
// TO-DO: maybe make scroll below 600px and arrow buttons above
// could make path attribute and then params attribute
// starting index is not staying the same when switching in and out of zoomed-in view
// need to add an onResize event handler

function ImageGallery2({
  status,
  setStatus,
  startingIndex,
  setStartingIndex,
}) {
  console.log('[ImageGallery2] is running');
  const { productInfo, selectedStyle } = useGlobalContext();

  // if thumbnail with corresponding href value is clicked, should automatically scroll to that image

  // const [firstPhotoIndex, setFirstPhotoIndex] = useState(0);

  const photosLength = selectedStyle?.photos?.length || 0;

  const itemsRef = useRef(null);

  const imageRef = useRef(null);

  // function scrollToId(itemId) {
  //   const map = getMap();
  //   const node = map.get(itemId);
  //   node.scrollIntoView({
  //     behavior: 'smooth',
  //     block: 'nearest',
  //     inline: 'center'
  //   });
  // }

  function getImageWrapperMap() {
    if (!itemsRef.current) {
      // Initialize the Map on first usage.
      itemsRef.current = new Map();
    }
    return itemsRef.current;
  }

  function getImageMap() {
    if (!imageRef.current) {
      // Initialize the Map on first usage.
      imageRef.current = new Map();
    }
    return imageRef.current;
  }

  // const handleClickThumbnail = (url) => {
  //   // setActive(index);
  //   scrollToId(url);
  // };


  const [position, setPosition] = useState({ x: '', y: '' });

  const imageContainer = useRef(null);

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
      if (status !== 'default') {
        imageRef?.current?.addEventListener('mousemove', handlePanImage);

        return () => {
          imageRef?.current?.removeEventListener('mousemove', handlePanImage);
        };
      }

  }, [imageContainer]);


  const handleProportionalZoom = (e) => {
    if (imageContainer.current) {
      console.log('image container ref: ', imageContainer.current);
      console.log('image e: ', e);
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

  const handlePanImage = (e) => {
    if (status !== 'default') {
      handleProportionalZoom(e);
    }
  };

  const handleClickMain = (e) => {
    switch (status) {
      case 'default':
        setStatus('expanded');
        break;
      case 'expanded':
        setStatus('zoomed');
        // handleZoom(e);
         handlePanImage(e);
        break;
      case 'zoomed':
        setStatus('expanded');
        break;
      default:
        console.log('error handling expand main');
    }
  };

  const handleClickExit = () => {
    setStatus('default');
  };


  return (
    <ImageGalleryContainer
      status={status}
      ref={imageContainer}

    >
          {/* {status !== 'zoomed'
          && ( */}

    <View
      photosLength={selectedStyle?.photos?.length}
      status={status}
      // place={place}
      handleClickExit={handleClickExit}
      startingIndex={startingIndex}
    >
          {/* <AnimationContainer> */}

            {/* <MainWrapper
              id="carousel-container"
              status={status}
              place={place}
              photosLength={selectedStyle?.photos?.length}
              ref={viewport}
              onScroll={handleScroll}
            > */}

              {/* <Carousel
                id="carousel"
                // photosLength={photosLength}
                photosLength={selectedStyle?.photos?.length}
                place={place}
                status={status}
                ref={carousel}
              > */}

                {selectedStyle?.photos?.map((photo, index) => (
                  <Slide
                    key={photo.url}
                    // key={index}
                    i={index}
                    // id={index}
                    // ids don't match up
                    // ref={imageContainer}
                    // status={status}
                    // onClick={handleClickMain}
                    id={`seq${index}`}
                    onClick={handleClickMain}
                    ref={(node) => {
                      const map = getImageWrapperMap();
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
                      onMouseMove={handlePanImage}
                      position={position}
                      // ref={mainImageRef}
                      ref={(node) => {
                        const map = getImageMap();
                        if (node) {
                          map.set(photo.url, node);
                        } else {
                          map.delete(photo.url);
                        }
                      }}
                      // id={`seq${index}`}
                    />
                  </Slide>
                ))}

              {/* </Carousel>

            </MainWrapper> */}

            {/* <ScrollButton
              visible={place > 0}
              position="left"
              handleClick={handleClickBack}
            />

            <ScrollButton
              visible={place < photosLength - 1}
              position="right"
              handleClick={handleClickForward}
            /> */}

          {/* {status === 'expanded'
          && (
            <StyledExitButton
              type="button"
              handleClickExit={handleClickExit}
            >
              &#10005;
            </StyledExitButton>
          )} */}

          {/* </AnimationContainer> */}
        {/* )} */}

        </View>

          {/* {status === 'zoomed'
          && (
            <MainWrapper
              ref={imageContainer}
              status={status}
              onClick={handleClickMain}
            >
              <MainImage
                src={selectedStyle?.photos[place || 0]?.url}
                alt={`${productInfo?.name} in ${selectedStyle?.name} style photo number ${place}`}
                status={status}
                onMouseMove={handlePanImage}
                position={position}
                ref={mainImageRef}
                // onClick={handleClickMain}
              />
            </MainWrapper>
          )} */}

      {/* <Thumbnails
        place={place}
        setPlace={setPlace}
        status={status}
        firstPhotoIndex={firstPhotoIndex}
        setFirstPhotoIndex={setFirstPhotoIndex}
        handleClickThumbnail={handleClickAnchor}
        // handleClickThumbnail={handleClickThumbnail}

      /> */}

    </ImageGalleryContainer>
  );
}

ImageGallery2.propTypes = {
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

   ${(props) => props.status === ('zoomed') && css`
   /* margin: auto;
    height: max-content;
    justify-content: center;
    align-items: center;
    align-content: center;
    flex: row; */
    display: block;
    overflow: hidden;
    padding-bottom: 0;
    position: relative;
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
    overflow: hidden;
   /* @media (min-width: 600px) {
      max-width: 80vh;
    } */
  `};
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
  `};

  ${(props) => props.status === 'zoomed' && css`
    position: absolute;
    z-index: 2;
    cursor: zoom-out;
    transform: scale(2.5);
    transition: transform 0.25s ease;
    transform-origin: top left;
    transition: translate 0.25s smooth;
    translate: -${props.position.x} -${props.position.y};
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
  width: 100%;
  height: 100%;
  list-style: none;

  ${(props) => props.status !== 'zoomed' && css`
    scroll-snap-align: start;
  `};

  ${(props) => props.status === 'zoomed' && css`
    margin: 0 auto;
    padding: 0;
    display: block;
    object-fit: cover;
    overflow: hidden;
    position: relative;
    aspect-ratio: 4/6;
    max-width: 80vh;
    max-height: 120vh;
    z-index: 1;
    /* overflow-x: scroll;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none; */

   /* @media (min-width: 600px) {
      height: fit-content;
      max-height: 120vh;
      /* overflow-x: hidden; */
      max-width: 80vh;
    } */
  `};
`;

export default ImageGallery2;


