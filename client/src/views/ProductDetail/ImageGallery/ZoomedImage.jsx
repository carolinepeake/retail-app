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
  initialPosition,
}) {

  // could also not include translation in styles until mouse moved

  const imageContainer = useRef(null);
  const mainImageRef = useRef(null);

  // const [position, setPosition] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: initialPosition?.x, y: initialPosition?.y });


  // could do useEffect based on status
  // to determine whether to add scroll handler or moveMouse handler
  // need to initialize xPerc and yPerc once status is expanded
  // is being called, but maybe rendering before x and y set
  // might want to use useCallback or useMemo to make quicker?
  // can make useMeasurements hook

// https://react.dev/learn/reusing-logic-with-custom-hooks
// export function usePointerPosition() {
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   useEffect(() => {
//     function handleMove(e) {
//       setPosition({ x: e.clientX, y: e.clientY });
//     }
//     window.addEventListener('pointermove', handleMove);
//     return () => window.removeEventListener('pointermove', handleMove);
//   }, []);
//   return position;
// }

  useEffect(() => {
    console.log('useEffect in main image');
    function handlePanImage(e) {
      console.log('e: ', e);
      const zoomContainer = imageContainer.current;
      const containerWidth = zoomContainer.clientWidth;
      const containerHeight = zoomContainer.clientHeight;
      console.log('zoomContainer: ', zoomContainer);
      // const x = e.pageX - zoomContainer.offsetLeft;
      // const y = e.pageY - zoomContainer.offsetTop;
      const x = e.offsetX;
      const y = e.offsetY;
      // const translateX = `${(x / (containerWidth / 100)) * 1.25}%`;
      // const translateY = `${(y / (containerHeight / 100)) * 1.25}%`;
      // const translateX = `${(x / (containerWidth / 100)) * 1.5}%`;
      // const translateY = `${(y / (containerHeight / 100)) * 1.5}%`;
      const translateX = `${x * 1.5}px`;
      const translateY = `${y * 1.5}px`;
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

  console.log('position x: ', position.x, 'position y: ', position.y);

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
