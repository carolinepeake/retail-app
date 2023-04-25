import React, {
  useState, useRef,
} from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import {
  MdArrowForwardIos, MdArrowBackIos, MdExpandMore, MdExpandLess,
} from 'react-icons/md';

import { useGlobalContext } from '../../../contexts/GlobalStore';

function ImageGallery({ status, setStatus }) {
  const { productInfo, selectedStyle } = useGlobalContext();

  const imageContainer = useRef(null);

  const [place, setPlace] = useState(0);
  const [firstPhotoIndex, setFirstPhotoIndex] = useState(0);

  function handleClickArrow(n) {
    if (place === firstPhotoIndex && n === -1) {
      setFirstPhotoIndex((prev) => prev - 1);
    }
    if ((place === firstPhotoIndex + 6) && n === 1) {
      setFirstPhotoIndex((prev) => prev + 1);
    }
    setPlace((prev) => prev + n);
  }

  function handleScroll(n) {
    if (place === firstPhotoIndex && n === 1) {
      setPlace((prev) => prev + 1);
    }
    if ((place === firstPhotoIndex + 6) && n === -1) {
      setPlace((prev) => prev - 1);
    }
    setFirstPhotoIndex((prevI) => prevI + n);
  }

  const [xPerc, setXPerc] = useState('');
  const [yPerc, setYPerc] = useState('');

  function getProportionalZoom(e) {
    const containerWidth = imageContainer.current.clientWidth;
    const x = e.pageX - imageContainer.current.offsetLeft;
    const y = e.pageY - imageContainer.current.offsetTop;
    const xPercent = `${(x / (containerWidth / 100)) * 1.5}%`;
    const yPercent = `${(y / (containerWidth / 100)) * 1.5}%`;
    setXPerc(() => xPercent);
    setYPerc(() => yPercent);
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

  let thumbnails = [];
  if (selectedStyle.photos) {
    thumbnails = selectedStyle.photos.map((photo, index) => (
      <Thumbnail
        src={photo.thumbnail_url}
        key={photo.url}
        index={index}
        alt={`${selectedStyle.name} thumbnail`}
        onClick={() => setPlace(index)}
        place={place}
      />
    ));
  }

  return (
    <ImageGalleryContainer
      status={status}
      ref={imageContainer}
    >

      {status === 'default'
        && (
        <Side
          full={() => thumbnails.length > 7}
          middle={place !== 0 && place !== thumbnails.length - 1}
          status={status}
        >
          {thumbnails.length <= 7
            ? thumbnails
            : (
              <>
                <Buttons
                  scroll
                  onClick={() => handleScroll(-1)}
                  style={{ display: firstPhotoIndex === 0 ? 'none' : '' }}
                >
                  <MdExpandLess style={{ fontSize: '1.25em' }} />
                </Buttons>
                {thumbnails.slice(firstPhotoIndex, firstPhotoIndex + 7)}
                <Buttons
                  scroll
                  onClick={() => handleScroll(1)}
                  style={{ display: firstPhotoIndex < thumbnails.length - 7 ? '' : 'none' }}
                >
                  <MdExpandMore style={{ fontSize: '1.25em' }} />
                </Buttons>
              </>
            )}
        </Side>
        )}

      {selectedStyle.photos
      && (
        <MainWrapper status={status}>
          <Main
            src={selectedStyle.photos[place || 0].url}
            alt={`${productInfo.name} in ${selectedStyle.name} style`}
            onClick={(e) => handleClickMain(e)}
            status={status}
            onMouseMove={(e) => handlePanImage(e)}
            xPercent={xPerc}
            yPercent={yPerc}
          />

          {status !== 'zoomed'
      && (
        <>
          <Buttons
            style={{ left: '2%' }}
            onClick={() => handleClickArrow(-1)}
          >
            <MdArrowBackIos style={{ fontSize: '1.5rem', paddingLeft: '0.5rem', paddingTop: '0.25rem' }} />
          </Buttons>
          <Buttons
            style={{ right: '2%', display: place < thumbnails.length - 1 ? 'block' : 'none' }}
            onClick={() => handleClickArrow(1)}
          >
            <MdArrowForwardIos style={{ fontSize: '1.5rem', paddingTop: '0.25rem' }} />
          </Buttons>
        </>
      )}

          {status === 'expanded'
    && (
    <>
      <Exit
        onClick={() => handleClickExit()}
      >
        &times;
      </Exit>
      <ThumbnailIcons>
        {selectedStyle.photos
        && selectedStyle.photos.map((photo, index) => (
          <IconContainer
            key={photo.url}
            index={index}
            onClick={() => setPlace(index)}
            style={{
              fontSize: '1.5rem', border: index === place ? 'solid black thin' : 'none', transform: index === place ? 'scale(1.025)' : '', transition: index === place ? 'transform 0.25s ease' : '', cursor: 'pointer', borderRadius: '50px', margin: '0.5em', boxShadow: index === place ? '5px 5px 5px #727272' : '',
            }}
          >
            <Circle />
          </IconContainer>
        ))}
      </ThumbnailIcons>
    </>
    )}
        </MainWrapper>
      )}

    </ImageGalleryContainer>
  );
}

ImageGallery.propTypes = {
  status: PropTypes.string.isRequired,
  setStatus: PropTypes.func.isRequired,
};

const ImageGalleryContainer = styled.div`
  width: 100%;
  overflow: hidden;

 @media (min-width: 600px) {
  max-width: 800px;
  max-height: 800px;
 }

  ${(props) => props.status === 'default' && css`
    display: contents;
    grid-columns: 1 / 4
    grid-rows: 1 / 2

  `};
  ${(props) => props.status === 'expanded' && css`
  height: 100%;
  width: 100%;
  display: flex;
  grid-row: 1 / 3;
  grid-column: 2 / 5
  margin: auto;
  height: max-content;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  `};
  ${(props) => props.status === 'zoomed' && css`
  width: 100%;
  height: 100%;
  display: flex;
  grid-row: 1 / 3;
  grid-column: 2 / 5
  margin: auto;
  height: max-content;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  `};
`;
  // aspect-ratio: 4/5;
  // position: relative;

// default
// height: 100%;
// display: grid;
// grid-template-columns: repeat(7, minmax(0, 1fr));
// grid-template-rows: 100%;
// margin: 0 auto;
// z-index: 1;
// width: 100%;
// overflow: hidden;
// position: relative;

const MainWrapper = styled.div`
  object-fit: cover;
  overflow: hidden;
  position: relative;
  aspect-ratio: 4/5;
  width: 100%;
  margin: 0 auto;
  z-index: 1;
  display: flex;
  ${(props) => props.status === 'default' && css`
  max-width: 600px;
  position: relative;
  `};
  ${(props) => props.status === 'expanded' && css`
  position: absolute;
  `};
  ${(props) => props.status === 'zoomed' && css`
    position: absolute;
  `};

  @media (min-width: 600px) {
    height: 100%;
    ${(props) => props.status === 'default' && css`
      width: 100%;
      max-width: 800px;
      grid-column: 2 / 4;
      grid-row: 1/ 2;
    `};
  }

  @media (min-width: 900px) {
    ${(props) => props.status === 'default' && css`
      max-width: initial;
      grid-column: 2 / 4;
      grid-row: 1/ 2;
  `};
  }
`;

const Main = styled.img`
  object-fit: cover;
  overflow: hidden;
  aspect-ratio: 4/5;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  grid-template-rows: 100%;
  margin: 0 auto;
  z-index: 2;
  ${(props) => props.status === 'default' && css`
  max-width: 600px;
  transition: translate 0.25s smooth transform 0.25s ease;;
  position: relative;
  cursor: zoom-in;
  `};
  ${(props) => props.status === 'expanded' && css`
  z-index: 2;
  cursor: crosshair
  `};
  ${(props) => props.status === 'zoomed' && css`
    z-index: 2;
    transform: scale(2.5);
    transition: transform 0.25s ease;
    transform-origin: top left;
    transition: translate 0.25s smooth;
    position: absolute;
    translate: ${(props) => `-${props.xPercent}`} ${(props) => `-${props.yPercent}`};
    cursor: zoom-out;
  `};

  @media (min-width: 600px) {
    height: 100%;
    width: 100%;
    ${(props) => props.status === 'default' && css`
      width: 100%;
      max-width: 800px;
    `};
  }

  @media (min-width: 900px) {
    ${(props) => props.status === 'default' && css`
      max-width: inherit;
  `};
  }
`;
//position: relative;
// if image gallery was our main image container like before
// grid-column: 1 / 8;
// grid-row: 1/ 2;

// position: absolute ?

// transform: translate(50% 50%) scale(0.4);
// translate: ${(props) => `-${props.xPercent}`} ${(props) => `-${props.yPercent}`};

// journal: needed to have display: grid (along with position: relative) to display image underneath thumbnail images with larger z-indexes, even though no grid-template columns or rows were set on the background image with display: grid;

// MVP journal: cannot select by fields in a mongodb document that is simply referenced by objectID in another schema.  you have to run the populate method to get the fields of the nested schema to populate in the outer model, and cannot then find by a certain field or value. instead, have to denormalize the data when you design your schemas.

// fill is a css property you can use to color in icons

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

const Side = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1.0rem;
  align-items: flex-end;
  justify-content: center;
  align-content: center;
  z-index: 3;
  position: absolute;

  @media (min-width: 600px) {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
    place-self: center;
    position: initial;
    max-width: 100%;
    height: 100%;
    padding-top: calc(1px + 0.1em);
  };
`;

const OldSide = styled.div`
  @media (min-width: 600px) {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
    place-self: center;
    position: initial;
    max-width: 100%;
    display: grid;
    grid-auto-rows: 1fr;
    margin: 0 0.75rem;
  };
  flex-direction: column;
  margin: 2% auto 0 auto;
  z-index: 3;
  align-self: start;
  position: absolute;
  grid-column: 1 / 2
  grid-row: 1/ 2;
  max-width: 10%;
  height: 100%;
  margin: 0.75rem;
  row-gap: 0.75rem;
  align-items: stretch;
  height: max-content;
  display: flex;
  ${(props) => (props.full && props.middle) && css`
    height: 100%;
    justify-items: space-evenly;
  `};
`;

const Thumbnail = styled.img`
  aspect-ratio: 4/5;
  max-width: 100%;
  justify-content: center;
  z-index: 2;
  object-fit: cover;
  max-height: 100px;
  cursor: pointer;
  margin: 0 auto;
  &:hover {
    opacity: 0.80;
  };
  ${(props) => (props.place === props.index) && css`
    transform: scale(1.025);
    transition: transform 0.25s ease;
    border: 2px black solid;
    padding: 0.2em;
  `};

  @media (min-width: 600px) {
    max-width: 80%;
    max-height: 175px;
    margin: 0px;
  };

  @media (min-width: 900px) {
    max-height: 250px;
  };
`;


const OldThumbnail = styled.img`
  @media (min-width: 600px) {
    max-width: 80%;
    aspect-ratio: 4/5;
  };
  max-width: 100%;
  border: .5px black solid;
  justify-content: center;
  z-index: 2;
  aspect-ratio: 1;
  object-fit: cover;
  max-height: 100px;
  cursor: pointer;
  margin: 0 auto;
  &:hover {
    opacity: 0.80;
  };
  @media (min-width: 900px) {
    max-height: 250px;
  };
  ${(props) => (props.place === props.index) && css`
    box-shadow: 7px 7px 5px #242424;
    transform: scale(1.025);
    transition: transform 0.25s ease;
  `};
`;

const Buttons = styled.button`
  background-color: rgba(225, 225, 225, 0.75);
  &:hover {
    background-color: rgba(225, 225, 225, 0.9);
    cursor: pointer;
  };
  padding: 0;
  color: black;
  border: none;
  border-radius: 5px;
  width: 3rem;
  height: 3rem;
  z-index: 3;
  align-self: center;
  position: absolute;
  ${(props) => props.scroll && css`
    height: 1rem;
    width: 1rem;
    align-self: center;
    top: 0;
    z-index: 4;
    position: relative;
  `};
  left: ${(props) => props.status === 'expanded' && '2%'};
`;
// position: absolute (not scroll);

const Exit = styled.button`
  position: absolute;
  right: 1%;
  top: 1%;
  z-index: 3;
  background-color: rgba(225, 225, 225, 0.5);
  border-radius: 2.5px;
  font-size: calc(10px + 2vw);
  padding: 0.1em 0.25em;
  display: block;
  color: black;
  &:hover {
    background-color: rgba(225, 225, 225, 0.8);
    cursor: pointer;
  };
  border: none;
  width:1.5em;
  height: 1.5em;
  line-height: 1em;
`;

const ThumbnailIcons = styled.div`
  justify-content: space-between;
  left: 1%;
  top: 1.5%;
  flex-direction: column;
  z-index: 3;
  align-items: center;
  position: absolute;
  display: flex;
  border-radius: 2.5px;
  padding-right: 1em;
`;

const IconContainer = styled.button`
  display: flex;
  align-content: center;
  padding: 0.25rem;
  &:hover {
    background-color: rgba(225, 225, 225, 0.8);
    cursor: pointer;
  };
  background-color: rgba(225, 225, 225, 0.01);
`;

const Circle = styled.span`
  background-color: black;
  border-radius: 50%;
  z-Index: 4;
  width: 0.35em;
  height: 0.35em;
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  };
`;

export default ImageGallery;
