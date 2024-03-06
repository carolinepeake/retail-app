import { useState, useEffect, useCallback } from 'react';

// using ref.scrollIntoView() method:
// assign each carousel item a ref https://react.dev/learn/manipulating-the-dom-with-refs
// when navigation pointer is clicked, scroll associated ref into view
// when arrows are clicked calculate next or prev ref id and scroll that into view
// can multiply by scroll size when calculating next or prev ref
// can name associated navigation pointer with prefix and same id and scroll into view when arrows clicked
// using ref.scrollIntoView() method and conditionally setting ref to stored index
// https://react.dev/learn/manipulating-the-dom-with-refs

// use translation css & href for navigation_pointer icons

// https://blog.logrocket.com/building-carousel-component-react-hooks/

// If your Effect animates something in, the cleanup function should reset the animation to the initial values:
// https://react.dev/learn/synchronizing-with-effects
// useEffect(() => {
//   const node = ref.current;
//   node.style.opacity = 1; // Trigger the animation
//   return () => {
//     node.style.opacity = 0; // Reset to the initial value
//   };
// }, []);

// maybe use debounce value so everything is consistent
// between thumbnails, url, main image
// if wrap handlers in useCallback will imageGallery re-render every time click arrow in thumbnails?

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

const useCarouselNavigation = (
  carouselRef,
  // viewportRef,
  length,
  startingIndex,
  // scrollSize,
) => {
  const [active, setActive] = useState(startingIndex || 0);
  const [styles, setStyles] = useState({
    // left: 0,
    translate: 0,
  });
  // const [active, setActive] = useState(0);
  // const [styles, setStyles] = useState({});
  // const [visibleElements, setVisibleElements] = useState([]);
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
    setActive(() => currentItemIndex);
    // setActive(currentItemIndex);
    console.log('handling scroll , active index: ', currentItemIndex);
    setStyles({
      translate: 0,
      // left: 0,
    });
    // set translate to 0 (or left offset to 0)
    // setTranslate()
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

  const handleClickArrow = (arrowDirection) => {
    // onClickArrow(arrowDirection, );
    // useEffect w/ ref?
    // const scrollSize ?? galleryWidth;
    const scrollSize = 1;
    // const styles = getTranslation();
    const updatedTransform = (-100 / length) * active + (arrowDirection * scrollSize);
    setStyles({
      // left: 0,
      translate: updatedTransform,
    });
    setActive((prev) => prev + (arrowDirection * scrollSize));
    // setStyle(styles);
    // will want to make this a function so updates even when pressing quickly
    // const updatedTransform = (-100 / length) * index * 1;
    // setStyles({
    //   // left: 0,
    //   translate: updatedTransform,
    // });

    // stop at end
    // if newPoint is outside of visible track, move track

    // stop at begininng
    //
  };

  // const galleryWidth = visibleElements?.length || 0;
// on resize?
  // const viewportDimensions = viewportRef.current?.getBoundingClientRect();
  // const carouselDimens = carouselRef.current?.getBoundingClientRect();
  // const carouselWidth = carouselDimens && carouselDimens.width;
  // const viewportWidth =  viewportDimensions &&  viewportDimensions.width;

  // const itemWidth = carouselWidth / length;

  // const galleryWidth = Math.floor( viewportWidth / itemWidth);

  // should maybe exclude this for now,
  // b/c using active state and style state is setting 2 diff states off 1 change
  // could lead to error if one state updates and the other doesn't
  // would want to factor scrollSize in this
  // const getCarouselAnimation = (scrollAmount) => {
  //   const remainingItems = length - active;
  //   let translation;
  //   const translate = -100 / length;
  //   if (remainingItems < scrollSize) {
  //     translation = translate * active + (translate * (length % galleryWidth));
  //   } else {
  //     translation = translate * (active + scrollAmount)* galleryWidth;
  //   }
  //   const width = galleryWidth === 1 ? `${length}00%` : `calc((100% + 2.5vw) / ${galleryWidth} * ${length})`;
  //   return {
  //     // which direction translation, i.e. translateX or translateY
  //     translate: `${translation}% 0`,
  //     transition: 'translate 0.5s',
  //     width: `${width}`,
  //   };
  // };

  // const handleClickBackArrow = () => {
  //   // const scrollSize = galleryWidth;
  //   const scrollSize = 1;
  //   const scrollAmount = scrollSize * -1;
  //   const stylesTemp = getCarouselAnimation(scrollAmount);
  //   setStyles(stylesTemp);
  //   setActive(prev => prev - scrollSize);
  //   console.log('active: ', active, 'scrollSize: ', scrollSize);
  // };

  // const handleClickForwardArrow = () => {
  //    // const scrollSize = galleryWidth;
  //    const scrollSize = 1;
  //    const scrollAmount = scrollSize * 1;
  //   const stylesTemp = getCarouselAnimation(scrollAmount);
  //   setStyles(stylesTemp);
  //   setActive(prev => prev + scrollSize);
  //   console.log('active: ', active, 'scrollSize: ', scrollSize);
  // };

  // const handleClickPointer = useCallback((index) => {
  //   setActive(index);
  // }, [index]);

  // should prolly wrap in useCallback b/c handed down?
  const handleClickPointer = (index) => {
    // const updatedTransform = (-100 / length) * index * 1;
    setStyles({
      left: 0,
      // translate: updatedTransform,
    });
    // setActive(() => index);
    setActive(index);
    // scrollToId(index);
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
  //   transform: translate(`-${(100 / length) * active}%`) 0,
  //   transition: translate 0.5s;
  //   // width: `${100 * (length + 2)}%`,
  //  //  width: width,
  //   width: `${100 * length}%`,
  //   // left: `-${(active) * 100}%`,
  //   left: 0,
  // };


  // could return handlers in an object
  console.log('active: ', active, 'setActive: ', setActive, 'handleClickArrow: ', handleClickArrow, 'handleClickPointer: ', handleClickPointer);

  return [
    active,
    setActive,
    styles,
    // setStyles,
    handleScroll,
    handleClickArrow,
    // handleClickPrev,
    // handleClickNext,
    // showBackArrow,
    // setShowBackArrow,
    // showForwardArrow,
    // setShowForwardArrow,
    handleClickPointer,
    // thumbnail, anchor
  ];
};

export default useCarouselNavigation;
