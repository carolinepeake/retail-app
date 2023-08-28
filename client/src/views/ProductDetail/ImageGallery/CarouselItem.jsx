import React, {
  useState, useRef, useEffect,
} from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

export default function CarouselItem({
  index,
  handleClickMain,
  photo,
  status,
  alternative
}) {

  const ref = useRef(null);

  function getMap() {
    if (!ref.current) {
      // Initialize the Map on first usage.
      ref.current = new Map();
    }
    return ref.current;
  }

  function scrollToId(itemId) {
    const map = getMap();
    const node = map.get(itemId);
    node.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  }

  useEffect(() => {
    // const scrollToId = () => {
    //   node.scrollIntoView({
    //     behavior: 'smooth',
    //     block: 'nearest',
    //     inline: 'center'
    //   });
    // }
    function scrollToId(itemId) {
      const map = getMap();
      const node = map.get(itemId);
      node.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }

    scrollToId()

    window.addEventListener('resize', scrollToId);

    return () => window.removeEventListener('resize', scrollToId);

  }, []);



  return (
    <Slide
    i={index}
    // id={index}
    // ids don't match up
    id={`seq${index}`}
    onClick={handleClickMain}
    // ref={(node) => {
    //   const map = getMap();
    //   if (node) {
    //     map.set(photo.url, node);
    //   } else {
    //     map.delete(photo.url);
    //   }
    // }}
    ref={(node) => {
      const map = getMap();
      if (node) {
        map.set(index, node);
      } else {
        map.delete(index);
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
      alt={alternative}
      status={status}
      id={`seq${index}`}
    />
  </Slide>
  );
}

const Slide = styled.li`
  scroll-snap-align: start;
  width: 100%;
  height: 100%;
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
`;