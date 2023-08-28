import React, {
  useState, useRef, useEffect,
} from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { useGlobalContext } from '../../../contexts/GlobalStore';
// import Thumbnails from './Thumbnails';
import Images from './Thumbnails/Images';
import Icons from './Thumbnails/Icons';
import ZoomedImage from './ZoomedImage';
import CarouselItem from './CarouselItem';
import ScrollButton from './ScrollButton';
import { CloseButton } from '../../../components/Buttons';
import useCarouselNavigation from '../../../hooks/useCarouselNavigation';
import useMediaQueries from '../../../hooks/useMediaQueries';

export default function DefaultView({
  handleClickMain,
  handleClickBack,
  handleClickForward,
  handleScroll,
  place,
  photosLength,
  handleClickAnchor,
  translate,
  setPlace,
  firstPhotoIndex,
  setFirstPhotoIndex,
}) {
  console.log('[DefaultView] is running');
  const { productInfo, selectedStyle } = useGlobalContext();

  const carousel = useRef(null);
  const viewport = useRef(null);

  const itemsRef = useRef(null);


  console.log('place in IG: ', place);

  const { sm, md, lg } = useMediaQueries();

  if (md) {
    return (
      <ImageGalleryContainer>
            <AnimationContainer>
              <MainWrapper
                id="carousel-container"
                place={place}
                photosLength={selectedStyle?.photos?.length}
                ref={viewport}
              >

                <Carousel
                  id="carousel"
                  // photosLength={photosLength}
                  photosLength={selectedStyle?.photos?.length}
                  place={place}
                  ref={carousel}
                  translate={translate}
                >

                  {selectedStyle?.photos?.map((photo, index) => (
                    <Slide
                      key={photo.url}
                      i={index}
                      id={`seq${index}`}
                      onClick={handleClickMain}
                    >
                      <MainImage
                        src={photo?.url}
                        alt={`${productInfo?.name} in ${selectedStyle?.name} style photo number ${index}`}
                      />
                    </Slide>
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

            </AnimationContainer>

        <Images
          place={place}
          setPlace={setPlace}
          firstPhotoIndex={firstPhotoIndex}
          setFirstPhotoIndex={setFirstPhotoIndex}
          ClickAnchor={handleClickAnchor}
        />

      </ImageGalleryContainer>
    );
  } else if (sm) {
    return (
      <ImageGalleryContainer>
            <AnimationContainer>
              <MainWrapper
                id="carousel-container"
                status={status}
                place={place}
                photosLength={selectedStyle?.photos?.length}
                ref={viewport}
              >

                <Carousel
                  id="carousel"
                  // photosLength={photosLength}
                  photosLength={selectedStyle?.photos?.length}
                  place={place}
                  status={status}
                  ref={carousel}
                  translate={translate}
                >
                  {selectedStyle?.photos?.map((photo, index) => (
                    <Slide
                      key={photo.url}
                      i={index}
                      id={`seq${index}`}
                      onClick={handleClickMain}
                    >
                      <MainImage
                        src={photo?.url}
                        alt={`${productInfo?.name} in ${selectedStyle?.name} style photo number ${index}`}
                      />
                    </Slide>
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
            </AnimationContainer>

            <Icons
              place={place}
              ClickAnchor={handleClickAnchor}
            />
      </ImageGalleryContainer>
    );
  }
  return (
    <ImageGalleryContainer>
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
                    i={index}
                    id={`seq${index}`}
                    onClick={handleClickMain}
                  >
                    <MainImage
                      src={photo?.url}
                      alt={`${productInfo?.name} in ${selectedStyle?.name} style photo number ${index}`}
                    />
                  </Slide>
                ))}

              </Carousel>
            </MainWrapper>
          </AnimationContainer>
          <Icons
              place={place}
              ClickAnchor={handleClickAnchor}
            />
    </ImageGalleryContainer>
  );
}

DefaultView.propTypes = {

};

const ImageGalleryContainer = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: 1.5em;
  display: flex;
  flex-direction: column;
  position: relative;
  max-height: 820px;

    @media (min-width: 600px) {
      flex: 1 2 400px;
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
`;

const AnimationContainer = styled.div`
  position: relative;
  height: fit-content;
  flex: 6 1 0;
`;

const MainWrapper = styled.div`
 /* margin: 0 auto;
  padding: 0;
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  overflow: hidden;
  position: relative;
  z-index: 1; */

  aspect-ratio: 4/6;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

    @media (min-width: 600px) {
      max-height: 840px;
      overflow-x: hidden;
    }

    @media (min-width: 800px) {
      flex: 6 1 450px;
    }

    @media (min-width: 1200px) {
      max-width: 800px;
      max-height: 1200px;
    }
`;

const MainImage = styled.img`
  object-fit: cover;
  overflow: hidden;
  aspect-ratio: 4/6;
  width: 100%;
  height: 100%;
  margin: 0 auto;

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
   /* translate: ${(props) => `calc((-100 / ${props.photosLength}) * ${props.place} * 1%)`} 0; */
    translate: ${(props) => props.translate}% 0;
  }
`;

const Slide = styled.li`
  scroll-snap-align: start;
  width: 100%;
  height: 100%;
`;

