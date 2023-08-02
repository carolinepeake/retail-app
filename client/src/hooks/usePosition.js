import { useState, useEffect, useCallback } from 'react';

function getPrevElement(list) {
  const sibling = list[0].previousElementSibling;

  if (sibling instanceof HTMLElement) {
    return sibling;
  }

  return sibling;
}

function getNextElement(list) {
  const sibling = list[list.length - 1].nextElementSibling;
  if (sibling instanceof HTMLElement) {
    return sibling;
  }
  return null;
}

function usePosition(ref) {
  const [prevElement, setPrevElement] = useState(null);
  const [nextElement, setNextElement] = useState(null);

  useEffect(() => {
    const carouselElement = ref.current;

    const update = () => {
      const rect = carouselElement.getBoundingClientRect();

      const visibleElements = Array.from(carouselElement.children).filter((child) => {
        const childRect = child.getBoundingClientRect();
        console.log('carousel rect left: ', rect.left, 'child rect left: ', childRect.left, 'carousel rect right: ', rect.right, 'child rect right: ', childRect.right);
        return rect.left <= childRect.left && rect.right >= childRect.right;
      });

      if (visibleElements.length > 0) {
        setPrevElement(getPrevElement(visibleElements));
        setNextElement(getNextElement(visibleElements));
      }
    };

    update();

    carouselElement.addEventListener('scroll', update, { passive: true });

    return () => {
      carouselElement.removeEventListener('scroll', update, { passive: true });
    };
  }, [ref]);

  const scrollToElement = useCallback((element) => {
    const currentNode = ref.current;

    if (!currentNode || !element) return;

    // let newScrollPosition;

    const newScrollPosition = element.offsetLeft
      + element.getBoundingClientRect().width / 2
      - currentNode.getBoundingClientRect().width / 2;

    currentNode.scroll({
      left: newScrollPosition,
      behavior: 'smooth',
    });
  }, [ref]);

  const scrollRight = useCallback(() => scrollToElement(nextElement), [
    scrollToElement,
    nextElement,
  ]);

  const scrollLeft = useCallback(() => scrollToElement(prevElement), [
    scrollToElement,
    prevElement,
  ]);

  // did I mean to return an object and not an array (I think so b/c destructured syntax?)
  return {
    hasItemsOnLeft: prevElement !== null,
    hasItemsOnRight: nextElement !== null,
    scrollRight,
    scrollLeft,
  };
}

export default usePosition;
