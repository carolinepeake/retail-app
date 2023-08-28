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

export default function ExpandedView({
  startingIndex,
  setStartingIndex,
  handleClickMain,
  photosLength,
  place,
  setPlace,
  setFirstPhotoIndex,
  firstPhotoIndex,
  handleClickAnchor,
  handleClickBack,
  handleClickForward,
  handleClickExit,
  translate,
}) {
  console.log('[ExpandedView] is running');
  const { productInfo, selectedStyle } = useGlobalContext();


  const carousel = useRef(null);
  const viewport = useRef(null);

  const itemsRef = useRef(null);

  const { md } = useMediaQueries();

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

<CloseButton
              $round
              onClick={handleClickExit}
            >
              &#10005;
            </CloseButton>

            </AnimationContainer>

            <Icons
              place={place}
              ClickAnchor={handleClickAnchor}
            />

      </ImageGalleryContainer>
    );
  } else {
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
                      // onClick={handleClickMain}
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


            <CloseButton
              $round
              onClick={handleClickExit}
            >
              &#10005;
            </CloseButton>

            </AnimationContainer>

            <Icons
              place={place}
              ClickAnchor={handleClickAnchor}
            />
      </ImageGalleryContainer>
    );
  }
}

ExpandedView.propTypes = {

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

    margin: auto;
    height: max-content;
    justify-content: center;
    align-items: center;
    align-content: center;
    position: relative;
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
   /* height: fit-content; */
    max-height: 120vh;
    overflow-x: hidden;
  }
`;

const MainImage = styled.img`
  object-fit: cover;
  overflow: hidden;
  aspect-ratio: 4/6;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  cursor: crosshair;
`;

const Carousel = styled.ul`
  display: flex;
  left: 0;
  position: relative;
  margin: 0;
  padding: 0;
  width: ${(props) => props.photosLength}00%;
 /* transition: translate 0.5s;
  translate: ${(props) => `calc((-100 / ${props.photosLength}) * ${props.place} * 1%)`} 0; */
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

