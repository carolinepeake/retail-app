import React, {
  useState, useRef, useEffect,
} from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { useGlobalContext } from '../../../contexts/GlobalStore';
import ScrollButton from './ScrollButton';
import Thumbnails from './Thumbnails';
import { CloseButton } from '../../../components/Buttons';
import useCarouselNavigation from '../../../hooks/useCarouselNavigation';

export default function View({
  status, photosLength, startingIndex, children, handleClickExit,
}) {
  const carousel = useRef(null);
  const viewport = useRef(null);
  const [firstPhotoIndex, setFirstPhotoIndex] = useState(0);

  const [
    place,
    setPlace,
    handleScroll,
    handleClickArrow,
    handleClickAnchor,
  ] = useCarouselNavigation(carousel, startingIndex);
  console.log('place: ', setPlace, 'handleClickArrow: ', handleClickArrow, 'handleClickAnchor: ', handleClickAnchor);

  const handleClickBack = () => {
    handleClickArrow(-1);
  };

  const handleClickForward = () => {
    handleClickArrow(1);
  };

  return (
    <>
      {status !== 'zoomed'
        ? (
          <AnimationContainer status={status}>
            <MainWrapper
              id="carousel-container"
              status={status}
              place={place}
              photosLength={photosLength}
              ref={viewport}
              onScroll={handleScroll}
            >
              <Carousel
                id="carousel"
                photosLength={photosLength}
                place={place}
                status={status}
                ref={carousel}
              >
                {children}
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
        )
        : (
          <AnimationContainer status={status}>
            { children }
          </AnimationContainer>
        )}
      <Thumbnails
        place={place}
        setPlace={setPlace}
        status={status}
        firstPhotoIndex={firstPhotoIndex}
        setFirstPhotoIndex={setFirstPhotoIndex}
        handleClickThumbnail={handleClickAnchor}
      />
    </>
  );
}

const AnimationContainer = styled.div`
${(props) => props.status !== 'zoomed' && css`
  position: relative;
  height: fit-content;
  flex: 6 1 0;
`};

  ${(props) => props.status === 'zoomed' && css`
  /*position: relative; */
 /* height: 80vh; */
  margin: 0 auto;
  aspect-ratio: 4/6;
  position: relative;
  overflow: hidden;
`};
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

  /*${(props) => props.status === 'zoomed' && css`
    @media (min-width: 600px) {
      max-width: 80vh;
    }
  `}; */
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
