import React, {
  useState, useEffect,
} from 'react';
import styled, { css } from 'styled-components';

import { useGlobalContext } from '../../../contexts/GlobalStore';

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

  const [forwardDisabled, setForwardDisabled] = useState(false);
  const [backDisabled, setBackDisabled] = useState(true);

  useEffect(() => {
    if (firstPhotoIndex >= 1) {
      setBackDisabled(false);
    }
    if (selectedStyle.photos) {
      if (firstPhotoIndex >= selectedStyle.photos.length - 6) {
        setForwardDisabled(true);
      }
    }
  }, [firstPhotoIndex]);

  function handleScroll(n) {
    if (place === firstPhotoIndex && n === 1) {
      setPlace((prev) => prev + 1);
    }
    if ((place === firstPhotoIndex + 5) && n === -1) {
      setPlace((prev) => prev - 1);
    }
    setFirstPhotoIndex((prevI) => prevI + n);
    if (firstPhotoIndex >= selectedStyle.photos.length - 6) {
      setForwardDisabled(true);
    }
    if (firstPhotoIndex <= 0) {
      setBackDisabled(true);
    }
  }

  console.log('place in TB ', place);

  let thumbnails = [];
  if (selectedStyle.photos) {
    thumbnails = selectedStyle.photos.map((photo, index) => (
      <ThumbnailContainer
        key={photo.thumbnail_url}
        href={`#seq${index + 1}`}
        index={index}
        alt={`${selectedStyle.name} thumbnail`}
        onClick={() => handleClickThumbnail(index)}
        place={place}
        setPlace={setPlace}
        type="button"
        status={status}
        length={selectedStyle.photos.length}
      >
        <ThumbnailIcon status={status} place={place} index={index} href={`#seq${index + 1}`} />
        <ThumbnailImage
          src={photo.thumbnail_url}
          status={status}
          place={place}
          index={index}
          href={`#seq${index + 1}`}
        />
      </ThumbnailContainer>
    ));
  }

  return (
    <ThumbnailsContainer status={status}>

      <ThumbnailsViewport length={thumbnails.length} status={status}>
        <ThumbnailsCarousel
          status={status}
          place={place}
          setPlace={setPlace}
          length={thumbnails.length}
          firstPhotoIndex={firstPhotoIndex}
        >
          {thumbnails}
        </ThumbnailsCarousel>
      </ThumbnailsViewport>

      {thumbnails.length > 6 && (
        <>
          <ScrollForward
            status={status}
            disabled={forwardDisabled}
            onClick={(e) => handleScroll(1, e)}
          >
            <ArrowBackground />
            <ArrowIcon next />
          </ScrollForward>

          <ScrollBack
            status={status}
            disabled={backDisabled}
            onClick={(e) => handleScroll(-1, e)}
          >
            <ArrowBackground />
            <ArrowIcon prev />
          </ScrollBack>
        </>
      )}

    </ThumbnailsContainer>
  );
}

export default Thumbnails;

// TO-DO: name image id correctly so in url states conextual id and not the entire image url
// TO-DO: add active pseudo-class to thumbnails to change thumbnail style consistently with swiping

const ThumbnailsContainer = styled.div`
  display: ${(props) => (props.status === 'zoomed' ? 'none' : 'block')};
  position: relative;
  @media (min-width: 800px) {
    ${(props) => (props.status === 'default' && css`
      order: -1;
      flex: 1 1 0;
    `)};
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

  ${(props) => (props.status === 'default' && css`
    width: 100%;
  `)};
  @media (min-width: 800px) {
    ${(props) => (props.status === 'default' && css`
      flex-direction: column;
      align-items: flex-end;
      justify-content: flex-start;
      height: calc((100% / 6) * ${props.length});
      gap: 0;
      transform: translateY(calc((-100% / ${props.length}) * ${props.firstPhotoIndex}));
      transition: 0.5s ease;
    `)};
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
        height: calc(100% / ${props.length});
      `};
    };

    ${(props) => props.status === 'expanded' && css`
      justify-content: center;
      align-items: center;
      margin: 0.5em 0;
      border-radius: 50px;
      color: ${props.theme.submitButton};
    `};

  &:focus {
    color: ${(props) => props.theme.submitButtonHover};
    border: black solid 1.5px;
    transform: scale(1.05) ease;
    padding: 1.5px;
  };

    &:link {
      border: none;
    };

    &:visited {
      color: ${(props) => props.theme.submitButtonHover};
      border: black solid 1.5px;
      transform: scale(1.05) ease;
      padding: 1.5px;
    };

    &:hover {
      box-shadow: box-shadow: 5px 5px 5px #727272;
      transform:   transform: scale(1.05) ease;
    };

    &:active {
      color: ${(props) => props.theme.submitButtonHover};
      border: black solid 1.5px;
      transform: scale(1.05) ease;
      padding: 1.5px;
    };

    &:target {
      color: ${(props) => props.theme.submitButtonHover};
      border: black solid 1.5px;
      transform: scale(1.05) ease;
      padding: 1.5px;
    };
`;

const ThumbnailIcon = styled.span`
  border-radius: 50px;
  background-color: currentColor;
  aspect-ratio: 1/1;
  height: 2vh;
  height: minmax(8px, 2vh);
  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.darkBlueHover};
  }

  @media (min-width: 800px) {
    display: ${(props) => (props.status !== 'expanded' && 'none')};
  }
  ${(props) => ((props.index === props.place) && css`
    background-color: ${props.theme.submitButtonHover};
  `)};
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
    display: ${(props) => (props.status === 'default' ? 'block' : 'none')};
    ${(props) => ((props.index === props.place) && css`
      border: black solid 1.5px;
      padding: 1.5px;
      transform: scale(1.05);
      transition: scale 0.2s ease;
    `)};
  }
`;

const Scroll = styled.button`
  display: none;
  position: absolute;
  padding: 0;
  border: none;
  background-color: transparent;
  background-color: ${(props) => props.theme.navBgColor};
  line-height: 1;
  font-size: 1em;
  aspect-ratio: 1;
  height: 1.5em;
  @media (min-width: 700px) {
    font-size: 1.17em;
  }
  @media (min-width: 800px) {
    display: ${(props) => props.status === 'default' && 'flex'};
  }
  @media (min-width: 900px) {
    font-size: 1.5em;
  }

  z-index: 2;
  left: 42.5%;
  transform: translateX(-50%);
  color: ${(props) => props.theme.fontColor};
  cursor: pointer;

  &:hover {
    background-color: rgba(225, 225, 225, 0.9);
  }
  &:disabled {
    opacity: 0.3;
    cursor: initial;
  }
`;
// background-color: ${(props) => props.theme.navBgColor};

const ScrollBack = styled(Scroll)`
  top: 0;
`;

const ScrollForward = styled(Scroll)`
  bottom: 0;
`;

const ArrowBackground = styled.span`
  aspect-ratio: 1;
  display: flex;
  position: relative;
  height:100%;
`;

const ArrowIcon = styled.span`
  position: absolute;
  height: 100%;
  width: 100%;

  ${(props) => (props.prev && css`
    &::before {
      content: '〈';
      right: 50%;
      position: absolute;
      top: 12.5%;
      width: max-content;
      transform: rotate(0.25turn) translate(-25%,-50%);
      font-family: futura-pt, sans-serif;
      box-sizing: border-box;
    }
  `)};

  ${(props) => (props.next && css`
    top: 50%;
    &::before {
      content: '﹀';
      position: absolute;
      height: 25%;
      width: 100%;
      transform: translate(-50%,-50%);
      font-family: futura-pt, sans-serif;
    }
  `)};
`;
