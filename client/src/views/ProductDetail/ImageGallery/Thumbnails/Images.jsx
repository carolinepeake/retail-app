import React, {
  useState, useEffect,
} from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import ScrollButton from '../ScrollButton';
import Thumbnail from './Thumbnail';
import { useGlobalContext } from '../../../../contexts/GlobalStore';

export default function Images({
  place,
  setPlace,
  firstPhotoIndex,
  setFirstPhotoIndex,
  clickAnchor
}) {
  const { selectedStyle } = useGlobalContext();

  useEffect(() => {
    if (place < firstPhotoIndex) {
      setFirstPhotoIndex((prev) => prev - 1);
    }
    if (place > firstPhotoIndex + 5) {
      setFirstPhotoIndex((prev) => prev + 1);
    }
  }, [place]);

  const thumbnailsCount = selectedStyle?.photos?.length;

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
    clickAnchor(i);
  };

  return (
  <ThumbnailsContainer>

  <ThumbnailsViewport
    length={thumbnailsCount}
  >
    <ThumbnailsCarousel
      length={thumbnailsCount}
      firstPhotoIndex={firstPhotoIndex}
    >
       {selectedStyle?.photos?.map((photo, index) => (
          <Thumbnail
            key={photo?.thumbnail_url}
            selected={index === place}
            photo={photo.thumbnail_url}
            alternative={`${selectedStyle?.name} thumbnail`}
            index={index}
            length={thumbnailsCount}
            clickThumbnail={clickThumbnail}
          />
        ))
       }
    </ThumbnailsCarousel>
  </ThumbnailsViewport>

  {selectedStyle?.photos?.length > 6 && (
    <>
      <ScrollButton
        disabled={firstPhotoIndex >= thumbnailsCount - 6}
        handleClick={handleClickNext}
        position="bottom"
        background
      />

      <ScrollButton
        disabled={firstPhotoIndex < 1}
        handleClick={handleClickPrev}
        position="top"
        background
      />
    </>
  )}

</ThumbnailsContainer>
);
}

// TO-DO: name image id correctly so in url states conextual id and not the entire image url
// TO-DO: add active pseudo-class to thumbnails to change thumbnail style consistently with swiping

Images.propTypes = {
  place: PropTypes.number.isRequired,
  setPlace: PropTypes.func.isRequired,
  firstPhotoIndex: PropTypes.number.isRequired,
  setFirstPhotoIndex: PropTypes.func.isRequired,
};

const ThumbnailsContainer = styled.div`
  position: relative;
  order: -1;
  flex: 1 1 0;
`;

const ThumbnailsViewport = styled.div`
  overflow: hidden;
  width: 100%;
  height: 90%;
  position: relative;
  top: ${(props) => props.length > 6 ? '5%' : '0'};
  margin-block-start: -7.5%;
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
  width: 100%;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  height: calc((100% / 6) * ${(props) => props.length});
  gap: 0;
  transform: translateY(calc((-100% / ${(props) => props.length}) * ${(props) => props.firstPhotoIndex}));
  transition: 0.5s ease;
`;