import React, { useEffect, useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import { MdArrowForwardIos, MdArrowBackIos, MdExpandMore, MdExpandLess } from 'react-icons/md';

import { useGlobalContext } from '../../../contexts/GlobalStore';

function ImageGallery({ setIsExpanded, isExpanded, setIsDefault, isDefault, setIsZoomed, isZoomed }) {

  const { productInfo, styles, selectedStyle, setSelectedStyle } = useGlobalContext();
  const [imageUrl, setImageUrl] = useState('');
  const [photos, setPhotos] = useState([]);
  const [main, setMain] = useState({});
  const [place, setPlace] = useState(0);
  const [photosLength, setPhotosLength] = useState(0);
  const [isScrollableBothDirection, setIsScrollableBothDirection] = useState(false);
  const imageContainer = useRef(null);
  const [xPerc, setXPerc] = useState('');
  const [yPerc, setYPerc] = useState('');

  useEffect(() => {
    function getPhotos() {
      if (photos) {
        setMain(() => photos[place]);
        setPhotosLength(() => photos.length);
      }
    }
    function getUrl() {
      if (main) {
        setImageUrl(() => main.url);
      }
    }
    setPhotos(() => selectedStyle.photos);
    getPhotos();
    getUrl();
  }, [selectedStyle, photos, main, place]);

  function changeMain(e, value) {
    setPlace(() => value);
  };

  function handleClickArrow(n, e) {
    setPlace((prev) => prev + n);
  };

  function getProportionalZoom(e) {
    let containerWidth = imageContainer.current.clientWidth;
    let x = e.pageX - imageContainer.current.offsetLeft;
    let y = e.pageY - imageContainer.current.offsetTop;
    var xPercent = (x / (containerWidth / 100)) * 1.5 + '%';
    var yPercent = (y / (containerWidth / 100)) * 1.5 + '%';
    setXPerc(() => xPercent);
    setYPerc(() => yPercent);
  };

  function handleExpandMain(e) {
    if (isExpanded && !isZoomed) {
      getProportionalZoom(e);
      setIsExpanded(false);
      setIsZoomed(true);
    } else if (!isExpanded && !isZoomed) {
      setIsExpanded(true);
      setIsDefault(false);
    } else if (isZoomed) {
      setIsExpanded(true);
      setIsZoomed(false);
    }
  };

  function handlePanImage(e) {
    if (isExpanded || isZoomed) {
      getProportionalZoom(e);
    }
  };

  const handleClickExit = async(e) => {
    try {
      await setIsZoomed(false);
      await setIsDefault(true);
      await setIsExpanded(false);
    } catch (err) {
      console.log('error handling click exit expanded view', err);
    }
  };

  return (
    <ImageGalleryContainer expanded={isExpanded} default={isDefault} zoomed={isZoomed} ref={imageContainer}>
      <Main
        src={imageUrl}
        alt={`${productInfo.name} in ${selectedStyle.name} style`}
        onClick={(e) => handleExpandMain(e)}
        onMouseMove={(e) => handlePanImage(e)}
        expanded={isExpanded}
        default={isDefault}
        zoomed={isZoomed}
        xPercent={xPerc}
        yPercent={yPerc}
        style={{cursor: isExpanded ? 'zoom-in' : isZoomed ? 'zoom-out' : isDefault ? 'zoom-in' : 'zoom-in', transform: isDefault ? 'translate(50% 50%) scale(0.4)' : '', }}
      />
      <Side full={photosLength > 7} middle={place !== 0 && place !== photosLength - 1} expanded={isExpanded}
        zoomed={isZoomed} default={isDefault}>
      {(photosLength > 7 && place !== 0)
       && <Buttons scroll
            onClick={(e) => handleClickArrow(-1, e)}
          >
            <MdExpandLess style={{ fontSize: '1.25em' }}/>
          </Buttons>}
      {photos
       && photos.map((photo, index) => {
         if (place <= 6 && index <= 6) {
             return (
              <Thumbnail
                src={photo.thumbnail_url}
                key={photo.url}
                index={index}
                alt={`${selectedStyle.name} thumbnail`}
                onClick={(e) => changeMain(e, index)}
                style={{boxShadow: index === place ? '7px 7px 5px #242424' : '', transform: index === place ? 'scale(1.025)' : '', transition: index === place ? 'transform 0.25s ease' : ''}}
              />
             )
          } else if (index >= place - 6 && index <= place) {
            return (
              <Thumbnail
              src={photo.thumbnail_url}
              key={photo.url}
              index={index}
              alt=""
              onClick={(e) => changeMain(e, index)}
              style={{boxShadow: index === place ? "7px 7px 5px #242424" : '', transform: index === place ? "scale(1.025)" : '', transition: index === place ? "transform 0.25s ease" : ''}}
            />
            )
          } else {
            return;
          }
        })}
      {(photosLength > 7 && place !== photosLength - 1)
      &&  <Buttons scroll
            onClick={(e) => handleClickArrow(1, e)}
          >
            <MdExpandMore style={{ fontSize: '1.25em' }}/>
          </Buttons>}
        </Side>
    {photosLength < 4 && place > 0
    &&  <Buttons left expanded={isExpanded}
          onClick={(e) => handleClickArrow(-1, e)}
          zoomed={isZoomed}
        >
          <MdArrowBackIos style={{ fontSize: '1.5rem', paddingLeft: '0.5rem', paddingTop: '0.25rem' }}/>
        </Buttons>}
    {place > 0 && photosLength >= 4
    &&  <Buttons farLeft expanded={isExpanded}
          onClick={(e) => handleClickArrow(-1, e)}
          zoomed={isZoomed}
        >
          <MdArrowBackIos style={{ fontSize: '1.5rem', paddingLeft: '0.25em', paddingTop: '0.25rem' }} />
        </Buttons>}
    {place < photosLength - 1
    &&  <Buttons right
          onClick={(e) => handleClickArrow(1, e)}
          zoomed={isZoomed}
        >
          <MdArrowForwardIos style={{ fontSize: '1.5rem', paddingTop: '0.25rem' }}/>
        </Buttons>}

      <Exit onClick={(e) => handleClickExit(e)}
      expanded={isExpanded}
      default={isDefault}
      zoomed={isZoomed}
      >&times;</Exit>
      <ThumbnailIcons
        expanded={isExpanded}
        default={!isExpanded}
        zoomed={isZoomed}
      >
      {photos
       && photos.map((photo, index) => {
        return <IconContainer  key={index}
        index={index} onClick={(e) => changeMain(e, index)}
        style={{fontSize: '1.5rem', border: index === place ? "solid black thin" : 'none', transform: index === place ? "scale(1.025)" : '', transition: index === place ? "transform 0.25s ease" : '', cursor: 'pointer', borderRadius: '50px', margin: '0.5em', boxShadow: index === place ? '5px 5px 5px #727272' : ''}}
        >
          <Circle/>
        </IconContainer>
       })
      }
      </ThumbnailIcons>
    </ImageGalleryContainer>
  );
};

const ImageGalleryContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  max-width: 800px;
  max-height: 800px;
  position: relative;
  ${props => props.default && css`
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    grid-template-rows: 100%;
    margin: 0 auto;
    z-index: 1;
    height: 100%;
    width: 100%;
    overflow: hidden;
    position: relative;
  `};
  ${props => props.expanded && css`
  width: 100%;
  display: flex;
  grid-row: 1;
  margin: auto;
  aspect-ratio: 1;
  height: max-content;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  `};
  ${props => props.zoomed && css`
  width: 100%;
  display: flex;
  grid-row: 1;
  margin: auto;
  aspect-ratio: 1;
  height: max-content;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  `};
`;

const Main = styled.img`
  object-fit: cover;
  overflow: hidden;
  position: absolute;
  aspect-ratio: 1;
  width: 100%;
  display: grid;
  max-width: 800px;
  margin: 0 auto;
  z-index: 1;
  height: 100%;
  grid-column: 1 / 8;
  grid-row: 1/ 2;
  overflow: hidden;
  ${props => props.default && css`
  width: 100%;
  display: grid;
  max-width: 800px;
  margin: 0 auto;
  z-index: 1;
  height: 100%;
  grid-column: 1 / 8;
  grid-row: 1/ 2;
  overflow: hidden;
  transition: translate 0.25s smooth transform 0.25s ease;;
  position: absolute;
  `};
  ${props => props.expanded && css`
  z-index: 3;
  `};
  ${props => props.zoomed && css`
    z-index: 3;
    transform: scale(2.5);
    transition: transform 0.25s ease;
    transform-origin: top left;
    transition: translate 0.25s smooth;
    position: absolute;
    translate: ${props => '-' + props.xPercent} ${props=> '-' + props.yPercent};
  `};
`;

// journal: needed to have display: grid (along with position: relative) to display image underneath thumbnail images with larger z-indexes, even though no grid-template columns or rows were set on the background image with display: grid;

// MVP journal: cannot select by fields in a mongodb document that is simply referenced by objectID in another schema.  you have to run the populate method to get the fields of the nested schema to populate in the outer model, and cannot then find by a certain field or value. instead, have to denormalize the data when you design your schemas.

// fill is a css property you can use to color in icons

// to make font-size responsive, set the root font-size to be a porportion of the view width, i.e. html {
 //font-size: () => 15px + 0.3vw;  // not 100% on my syntax but that's the jist
//},
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
  ${props => (props.full && props.middle) && css`
    height: 100%;
    justify-items: space-evenly;
  `};
  ${props => props.expanded && css`
    display: none;
  `};
  ${props => props.zoomed && css`
    display: none;
  `};
`;

const Thumbnail = styled.img`
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
`;

const Buttons = styled.button`
  background-color: rgba(225, 225, 225, 0.5);
  &:hover {
    background-color: rgba(225, 225, 225, 0.8);
    cursor: pointer;
  };
  padding: 0;
  color: black;
  border: none;
  border-radius: 2.5px;
  width: 3rem;
  height: 3rem;
  z-index: 3;
  top: 48%;
  position: absolute;
  left: ${props => props.left && '2%'};
  right: ${props => props.right && '2%'};
  left: ${props => props.farLeft && '15%'};
  ${props => props.scroll && css`
    height: 1rem;
    width: 1rem;
    align-self: center;
    top: 0;
    z-index: 4;
    position: relative;
  `};
  left: ${props => props.expanded && '2%'};
  ${props => props.zoomed && css`
    display: none;
  `};
`;

const Exit = styled.button`
  position: absolute;
  right: 1%;
  top: 1%;
  z-index: 4;
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
  display: none;
  ${props => props.expanded && css`
    display: block;
  `};

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
  ${props => (props.default || props.zoomed) && css`
    display: none;
  `};
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





