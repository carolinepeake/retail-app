import { useState, useEffect } from 'react';

// instead of using place/currentIndex, use translate amount
// use current translation amount / place / if on the edge
// and amount translating by
// if index is no longer showing, rotate carousel

// carouselState: {
//   viewpointWidth: '',
//   itemWidth: '', (inlcuding padding)
//   currentOffset: '',
//   active: '',
// }

// carouselProps: {
//   listLength,
//   offsetPerScroll: {
//     viewportWidth ||
//     itemWidth
//   }
// }

// function getItemsVisible
// // viewportwidth / itemWidth

// // after scrolling right, check if another right translation will scroll past end, and if so, hide right arrow
// function checkRightBoundary

// // same but for other side
// function checkLeftBoundary

// // if translation amount will scroll past end, stop at end of items carousel
// function checkScrollEnd

// function scroll/clickforward
// // show back button

// function scroll/click back
// show forward button

// move active translation amount
// if active is now offscreen, move carousel until just back on screen

// with every scroll, check that active

// check whether back or forward arrow needs to be hidden

const useCarouselNavigation = (carouselRef, viewportRef, length = 0,
  // startingIndex
) => {
  // const [active, setActive] = useState(startingIndex || 0);
  const [active, setActive] = useState(0);
  const [styles, setStyles] = useState({});
  const [visibleElements, setVisibleElements] = useState([]);
  // const [firstPhotoIndex, setFirstPhotoIndex] = useState(0);

  // const initCurrentIndex = () => {
  //   if (startingIndex) {
  //     setCurrentIndex(startingIndex);
  //   } else {
  //     setCurrentIndex(0);
  //   }
  // };

  // const carouselDimensions2 = viewportRef.current && viewportRef.current.getBoundingClientRect();
  // console.log('carouselDimensions2: ', carouselDimensions2, 'viewportRef: ', viewportRef.current);
  // const rect = carouselRef.current && carouselRef.current.getBoundingClientRect();

  // const visibleElements = Array.from(carouselDimensions2.children).filter((child) => {
  //   const childRect = child.getBoundingClientRect();
  //   console.log('carousel rect left: ', rect.left, 'child rect left: ', childRect.left, 'carousel rect right: ', rect.right, 'child rect right: ', childRect.right);
  //   return rect.left <= childRect.left && rect.right >= childRect.right;
  // });

  //  useEffect(() => {
  //   // const carouselElement = carouselRef.current;

  //   const update = () => {
  //     const rect = carouselRef.current?.getBoundingClientRect();
  //     const carouselDimensions = viewportRef.current?.getBoundingClientRect();
  //     console.log('carouselDimensions: ', carouselDimensions, 'viewportRef: ', viewportRef.current);
  //     // let visibleElements;
  //     const visibleElements = carouselDimensions && Array.from(carouselDimensions.children).filter((child) => {
  //     // const visibleElements = Array.from(carouselDimensions.children).filter((child) => {
  //       const childRect = child.getBoundingClientRect();
  //       console.log('carousel rect left: ', rect.left, 'child rect left: ', childRect.left, 'carousel rect right: ', rect.right, 'child rect right: ', childRect.right);
  //       return rect.left <= childRect.left && rect.right >= childRect.right;
  //     });
  //     setVisibleElements(visibleElements);
  //   };

  //   update();

  //   window.addEventListener('resize', update);

  //   return () => {
  //     window.removeEventListener('resize', update);
  //   };
  // }, [viewportRef, carouselRef]);

  // useEffect(() => {
  //   const carouselElement = ref.current;

  //   const update = () => {
  //     const rect = carouselElement.getBoundingClientRect();

  //     const visibleElements = Array.from(carouselDimensions.children).filter((child) => {
  //       const childRect = child.getBoundingClientRect();
  //       console.log('carousel rect left: ', rect.left, 'child rect left: ', childRect.left, 'carousel rect right: ', rect.right, 'child rect right: ', childRect.right);
  //       return rect.left <= childRect.left && rect.right >= childRect.right;
  //     });
  //   };

  //   update();

  //   carouselElement.addEventListener('scroll', update, { passive: true });

  //   return () => {
  //     carouselElement.removeEventListener('scroll', update, { passive: true });
  //   };
  // }, [ref]);

  // const scrollToElement = useCallback((element) => {
  //   const currentNode = ref.current;

  //   if (!currentNode || !element) return;

  //   // let newScrollPosition;

  //   const newScrollPosition = element.offsetLeft
  //     + element.getBoundingClientRect().width / 2
  //     - currentNode.getBoundingClientRect().width / 2;

  //   currentNode.scroll({
  //     left: newScrollPosition,
  //     behavior: 'smooth',
  //   });
  // }, [ref]);

  // const itemsVisible = Math.floor(viewportWidth / itemWidth);

  // only works for carousels where only one item visible
  // but should be fine b/c only on mobile view
  const handleScroll = (e) => {
    // same as carouselViewport ref
    const carouselDimensions = e.currentTarget.getBoundingClientRect();
    const carouselOffsets = carouselRef.current && carouselRef.current.getBoundingClientRect();

    const leftPadding = carouselDimensions && carouselDimensions.x;
    const carouselItemWidth = carouselDimensions && carouselDimensions.width;
    const leftOffset = carouselOffsets && carouselOffsets.x;

    // use href maybe to make thumbnail icon highlighted
    const currentItemIndex = Math.floor(Math.abs((leftOffset - leftPadding)
    / Math.floor(carouselItemWidth))) || 0;
    // setCurrentIndex(currentItemIndex);
    setActive(() => currentItemIndex);
  };

  // const useArrows = () => {
  //   const [showBackArrow, setShowBackArrow] = useState(false);
  //   const [showForwardArrow, setShowForwardArrow] = useState(true);

  // const arrowCallback = (newIndex) => {
  //   if (newIndex > 0) {
  //     setShowBackArrow(true);
  //   } else {
  //     setShowBackArrow(false);
  //   }
  //   if (newIndex < listLength - 1) {
  //     setShowForwardArrow(true);
  //   } else {
  //     setShowForwardArrow(false);
  //   }
  // };

  // const handleClickArrow = (arrowDirection) => {
  //   // onClickArrow(arrowDirection, );
  //   const scrollSize ?? galleryWidth;
  //   const styles = getTranslation();
  //   setActive((prev) => prev - (arrowDirection * scrollSize));
  //   setStyle(styles);

  //   setCurrentIndex((prev) => prev + arrowDirection);

  //   // stop at end
  //   // if newPoint is outside of visible track, move track

  //   // stop at begininng
  //   //
  // };

  // const galleryWidth = visibleElements?.length || 0;

  const viewportDimensions = viewportRef.current?.getBoundingClientRect();
  const carouselDimens = carouselRef.current && carouselRef.current.getBoundingClientRect();
  const carouselWidth = carouselDimens && carouselDimens.width;
  const viewportWidth =  viewportDimensions &&  viewportDimensions.width;

  const itemWidth = carouselWidth / length;

  const galleryWidth = Math.floor( viewportWidth / itemWidth);

  const getTranslation = (scrollSize = galleryWidth) => {
    let translation;
    const translate = -100 / length;
    if (galleryWidth === 1) {
      translation = 100;
    }
    const remainingItems = length - active;
    if (remainingItems < scrollSize) {
      translation = translate * active + (translate * (length % galleryWidth));
    }
    translation = translate * active * galleryWidth;
    const width = galleryWidth === 1 ? `${length}%` : `calc((100% + 2.5vw) / ${galleryWidth} * ${length})`;
    return {
      translate: `${translation}`,
      transition: 'translate 0.5s',
      width: `${width}`,
    };
  };

  const handleClickBackArrow = (scrollSize = galleryWidth) => {
    const stylesTemp = getTranslation();
    setActive(prev => prev - scrollSize);
    setStyles(stylesTemp);
  };

  const handleClickFowardArrow = (scrollSize = galleryWidth) => {
    const stylesTemp = getTranslation();
    setActive(prev => prev + scrollSize);
    setStyles(stylesTemp);
  };

  const handleClickThumbnail = (index) => {
    setActive(index);
  };

  // for translate instead of doing media queries can multiply by how many cards could fit

  // could make translate previous +/- item width, length remainder gallleryWidth
  //   length = 4;
  //   const translate = -100 / length; // -25
  //   transform: (length - (galleryWidth * active) < galleryWidth) ? `translateX(calc(${translate}% * ${active - 1}  + (${translate}% * (${length % galleryWidth}))))` : `translateX(calc(${translate}% * ${active} * ${galleryWidth}))`)};
  // transition: transform 0.4s;

  // let width = galleryWidth === 1 ? `${length}%` : `calc((100% + 2.5vw) / ${galleryWidth} * ${length})`;

  //   @media (min-width: 600px) {
  //     transition: translate 0.5s;
  //     translate: ${(props) => `calc((-100% / ${length}) * ${active})`} 0;
  //   }

  // const style = {
  //   transform: ,
  //   // width: `${100 * (length + 2)}%`,
  //   width: width,
  //   // left: `-${(active) * 100}%`,
  //   // left: `-${(state.active + 1) * 100}%`,
  // };

  //   return [
  //     showBackArrow,
  //     setShowBackArrow,
  //     showForwardArrow,
  //     setShowForwardArrow,
  //     currentIndex,
  //     setCurrentIndex,
  //     handleClickArrow,
  //   ];
  // };

  // return [currentIndex, setCurrentIndex, handleScroll, handleClickPrev, handleClickNext, handleClickThumbnail];
  return [active, setActive, styles, setStyles, handleScroll, handleClickBackArrow, handleClickFowardArrow, handleClickThumbnail];
};

export default useCarouselNavigation;
