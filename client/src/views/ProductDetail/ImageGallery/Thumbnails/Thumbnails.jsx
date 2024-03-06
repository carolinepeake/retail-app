import React, {
  useState, useEffect,
} from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import ScrollButton from '../ScrollButton';
import Images from './Images';
import useMediaQueries from '../../../../hooks/useMediaQueries';

import { useGlobalContext } from '../../../../contexts/GlobalStore';

// TO-DO: uninstall react-icons/md

function Thumbnails({
  place,
  setPlace,
  status,
  firstPhotoIndex,
  setFirstPhotoIndex,
  handleClickThumbnail,
}) {
  const { selectedStyle } = useGlobalContext();

  // should optomize this better
  // https://react.dev/learn/manipulating-the-dom-with-refs

  // will want to put with scroll arrows
  // useEffect(() => {
  //   if (place < firstPhotoIndex) {
  //     setFirstPhotoIndex((prev) => prev - 1);
  //   }
  //   if (place > firstPhotoIndex + 5) {
  //     setFirstPhotoIndex((prev) => prev + 1);
  //   }
  // }, [place]);

  const thumbnailsCount = selectedStyle?.photos?.length;

  // function handleScroll(n) {
  //   if (place === firstPhotoIndex && n === 1) {
  //     setPlace((prev) => prev + 1);
  //   }
  //   if ((place === firstPhotoIndex + 5) && n === -1) {
  //     setPlace((prev) => prev - 1);
  //   }
  //   setFirstPhotoIndex((prevI) => prevI + n);
  // }

  const handleClickNext = () => {
    if (place === firstPhotoIndex) {
      setPlace((prev) => prev + 1);
    }
    setFirstPhotoIndex((prev) => prev + 1);
  };

  const handleClickPrev = () => {
    if (place === firstPhotoIndex + 5) {
      setPlace((prev) => prev - 1);
    }
    setFirstPhotoIndex((prev) => prev - 1);
  };

  const clickThumbnail = (i) => {
    handleClickThumbnail(i);
  };

  const { sm } = useMediaQueries();

  let thumbnails;
  if (sm) {
    thumbnails = selectedStyle?.photos?.map((photo, index) => (
      <ThumbnailContainer
        key={photo?.thumbnail_url}
        // href={`#seq${index + 1}`}
        // href={`#seq${index}`}
        // href={`#${index}`}
        // index={index}
        alt={`${selectedStyle?.name} thumbnail`}
        // onClick={() => handleClickThumbnail(index)}
        onClick={() => clickThumbnail(index)}
        // onClick={() => setPlace(index)}
        // onClick={() => handleClickThumbnail(photo.url)}
        // place={place}
        // setPlace={setPlace}
        type="button"
        status={status}
        length={thumbnailsCount}
      >
        <ThumbnailIcon
          status={status}
          place={place}
          index={index}
          // href={`#seq${index + 1}`}
          // href={`#seq${index}`}
        />
        <ThumbnailImage
          src={photo?.thumbnail_url}
          status={status}
          place={place}
          index={index}
          // href={`#seq${index + 1}`}
        />
      </ThumbnailContainer>
    ));
  } else {
    thumbnails = selectedStyle?.photos?.map((photo, index) => (
    <ThumbnailContainer
      key={photo?.thumbnail_url}
      // href={`#seq${index + 1}`}
      // href={`#seq${index}`}
      // href={`#${index}`}
      // index={index}
      alt={`${selectedStyle?.name} thumbnail`}
      onClick={() => clickThumbnail(index)}
      // onClick={() => setPlace(index)}
      // onClick={() => handleClickThumbnail(photo.url)}
      // place={place}
      // setPlace={setPlace}
      type="button"
      status={status}
      length={thumbnailsCount}
    >
      <ThumbnailIcon
        status={status}
        place={place}
        index={index}
        // href={`#seq${index + 1}`}
        // href={`#seq${index}`}
      />
      <ThumbnailImage
        src={photo?.thumbnail_url}
        status={status}
        place={place}
        index={index}
        // href={`#seq${index + 1}`}
      />
    </ThumbnailContainer>
  ));
  }

  return (
    <ThumbnailsContainer
      status={status}
    >

      <ThumbnailsViewport
        length={thumbnails?.length}
        status={status}
      >
        <ThumbnailsCarousel
          status={status}
          // place={place}
          // setPlace={setPlace}
          length={thumbnails?.length}
          firstPhotoIndex={firstPhotoIndex}
        >
          {thumbnails}
        </ThumbnailsCarousel>
      </ThumbnailsViewport>

      {selectedStyle?.photos?.length > 6 && (
    <>
      <ScrollButton
        disabled={firstPhotoIndex >= thumbnailsCount - 6}
        handleClick={handleClickNext}
        position="bottom"
        background
        visible
        // visible={true}
        // visible={true}
      />

      <ScrollButton
        disabled={firstPhotoIndex < 1}
        handleClick={handleClickPrev}
        position="top"
        background
        visible
      />
    </>
  )}

    </ThumbnailsContainer>
  );
}

export default Thumbnails;

// TO-DO: name image id correctly so in url states conextual id and not the entire image url
// TO-DO: add active pseudo-class to thumbnails to change thumbnail style consistently with swiping

Thumbnails.propTypes = {
  place: PropTypes.number.isRequired,
  setPlace: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  firstPhotoIndex: PropTypes.number.isRequired,
  setFirstPhotoIndex: PropTypes.func.isRequired,
  handleClickThumbnail: PropTypes.func.isRequired,
};

const ThumbnailsContainer = styled.div`
/*  display: ${(props) => (props.status === 'zoomed' ? 'none' : 'block')};
  padding: 0.5em; */
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  @media (min-width: 800px) {
    ${(props) => props.status === 'default' && css`
      order: -1;
      flex: 1 1 0;
    `};
  }
`;

const ThumbnailsViewport = styled.div`
  overflow: hidden;
  width: 100%;
  @media (min-width: 800px) {
    ${(props) => props.status === 'default' && css`
      height: 90%;
      position: relative;
      top: ${props.length > 6 ? '5%' : '0'};
      margin-block-start: -7.5%;
    `};
  }
`;

const ThumbnailsCarousel = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.75em;
  padding-left: 1.5px;
  padding-bottom: 3px;
  align-items: center;
  justify-content: center;
  align-content: center;
  z-index: 2;
  margin: 0 auto;
  box-sizing: border-box;
  overflow: hidden;

  ${(props) => props.status === 'default' && css`
    width: 100%;
  `};

  @media (min-width: 800px) {
    ${(props) => props.status === 'default' && css`
      flex-direction: column;
      align-items: flex-end;
      justify-content: flex-start;
      height: calc((100% / 6) * ${props.length});
      gap: 0;
      transform: translateY(calc((-100% / ${props.length}) * ${props.firstPhotoIndex}));
      transition: 0.5s ease;
    `};
  }
`;

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
    }

    @media (min-width: 800px) {
      ${(props) => props.status === 'default' && css`
        padding-right: 15%;
        padding-top: 15%;
      /*  margin-right: 15%;
        margin-top: 15%; */
        height: calc(100% / ${props.length});
      `};
    }

    ${(props) => props.status === 'expanded' && css`
      justify-content: center;
      align-items: center;
      margin: 0.5em 0;
      border-radius: 50px;
      color: ${props.theme.submitButton};
    `};

  /* &:focus {
    color: ${(props) => props.theme.submitButtonHover};
    border: black solid 1.5px;
    transform: scale(1.05) ease;
    padding: 1.5px;
  }

    &:link {
      border: none;
    }

    &:visited {
      color: ${(props) => props.theme.submitButtonHover};
      border: black solid 1.5px;
      transform: scale(1.05) ease;
      padding: 1.5px;
    }

    &:hover {
      box-shadow: box-shadow: 5px 5px 5px #727272;
      transform: transform: scale(1.05) ease;
    }

    &:active {
      color: ${(props) => props.theme.submitButtonHover};
      border: black solid 1.5px;
      transform: scale(1.05) ease;
      padding: 1.5px;
    }

    &:target {
      color: ${(props) => props.theme.submitButtonHover};
      border: black solid 1.5px;
      transform: scale(1.05) ease;
      padding: 1.5px;
    } */
`;

const ThumbnailIcon = styled.span`
  border-radius: 50px;
  background-color: currentColor;
  aspect-ratio: 1/1;
  height: 2vh;
  height: minmax(8px, 2vh);
  height: 1em;
  width: 1em;
  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.darkBlueHover};
  }

  @media (min-width: 800px) {
    display: ${(props) => props.status !== 'expanded' && 'none'};
  }

  ${(props) => props.index === props.place && css`
    background-color: ${props.theme.submitButtonHover};
  `};

  &::active {
    color: ${(props) => props.theme.submitButtonHover};
  }
`;

const ThumbnailImage = styled.img`
  aspect-ratio: 4/5;
  max-width: 100%;
  justify-content: center;
  object-fit: cover;
  margin: 0 auto;
  display: none;

  @media (min-width: 800px) {
    padding: 1.5px;
    display: ${(props) => (props.status === 'default' ? 'block' : 'none')};
    ${(props) => props.index === props.place && css`
      border: black solid 1.5px;
     /* padding: 1.5px; */
     /* transform: scale(1.05);
      transition: scale 0.2s ease; */
    `};
  }
`;



