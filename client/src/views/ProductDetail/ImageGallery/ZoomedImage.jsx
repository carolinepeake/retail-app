import React, {
  useState, useRef, useEffect,
} from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

// TODO: initialize position using initial mouse position
// https://react.dev/reference/react/useEffect  handleMove

export default function ZoomedImage({
  handleClickMain,
  photo,
  alternative,
}) {
  const imageContainer = useRef(null);
  const mainImageRef = useRef(null);

  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    console.log('useEffect in main image');
    function handlePanImage(e) {
      console.log('e: ', e);
      const zoomContainer = imageContainer.current;
      const containerWidth = zoomContainer.clientWidth;
      const containerHeight = zoomContainer.clientHeight;
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

    mainImageRef?.current?.addEventListener('mousemove', handlePanImage);

    return () => {
      mainImageRef?.current?.removeEventListener('mousemove', handlePanImage);
    };

  }, [imageContainer]);

  return (
    <MainWrapper
      ref={imageContainer}
      onClick={handleClickMain}
    >
      <MainImage
        src={photo}
        alt={alternative}
        position={position}
        ref={mainImageRef}
      />
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
 /* padding: 0;
  display: block;
  object-fit: cover;
  z-index: 1; */

  aspect-ratio: 4/6;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
 /* position: absolute; */

  @media (min-width: 600px) {
    max-height: 120vh;
    overflow-x: hidden;
    max-width: 80vh;
  }
`;

const MainImage = styled.img`
  object-fit: cover;
  overflow: hidden;
  aspect-ratio: 4/6;
  width: 100%;
  height: 100%;
  margin: 0 auto;

  position: absolute;
  z-index: 2;
  cursor: zoom-out;
  transform: scale(2.5);
  transition: transform 0.25s ease;
  transform-origin: top left;
  transition: translate 0.25s smooth;
  translate: -${(props) => props.position.x} -${(props) => props.position.y};
`;
