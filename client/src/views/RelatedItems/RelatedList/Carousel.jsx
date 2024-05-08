import React, {
  useState, useEffect, useLayoutEffect, useRef, useCallback,
} from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import ScrollButton from '../../ProductDetail/ImageGallery/ScrollButton';
import Card from './Card';

import getTranslation from '../../../utils/getTranslation';

// TODO: make font size 1em (instead of 1.25 em for screen widths over 700px) for button in scroll button

function CardCarousel({
  items,
  itemMaxWidth = 220,
  slidesShown,
}) {
  console.log('[CardsList] is running');

  const viewportRef = useRef(null);
  const carouselRef = useRef(null);

  const [visibleItems, setVisibleItems] = useState();

  const [width, setWidth] = useState();

  const [translate, setTranslate] = useState(0);
  const [index, setIndex] = useState(0);

  //  step = # of items scrolled in one click, 1 || a set number || all the visible items
  const handlePrev = (step = 1) => {
    // setIndex((prev) => prev - (1 * step));
    setIndex((prev) => prev - 1);
  };

  const handleNext = (step = 1) => {
    // setIndex((prev) => prev + (1 * step));
    setIndex((prev) => prev + 1);
  };

  const resetCarousel = () => {
    setIndex(0);
  };


  useLayoutEffect(() => {
    function onResize() {
      if (slidesShown) {
        setVisibleItems(slidesShown)
      } else {
        // get updated viewport width
        let viewportWidth
        if (viewportRef.current) {
          const viewportRect = viewportRef.current.getBoundingClientRect();
          if (viewportRect && itemMaxWidth) {
            viewportWidth = viewportRect.width;
            const visibleItems = Math.floor(viewportWidth / itemMaxWidth);
            setVisibleItems(visibleItems);
          }
        }
      }
    }
    onResize();
    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);

  }, [viewportRef.current]);

  useEffect(() => {
    if (items.length && visibleItems) {
      let width = items.length / visibleItems * 100;
      setWidth(width);
    }
  }, [items.length, visibleItems])


  useEffect(() => {
    if (index >= 0) {
      if (items.length > 1) {
        if (typeof visibleItems === 'number') {
          const translateX = getTranslation(items.length, index, visibleItems);
          setTranslate(translateX);
        }
      }
    }
  }, [index]);

  return (
      <Viewport ref={viewportRef}>

         <Carousel
          ref={carouselRef}
          translate={translate}
          visibleItems={visibleItems}
          length={items.length}
          width={width}
        >
          {items}
        </Carousel>

      <ScrollButton
        handleClick={handlePrev}
        position="left"
        overlay
        visible={index !== 0}
      />

      <ScrollButton
        position="right"
        overlay
        handleClick={handleNext}
        visible={index < items?.length - visibleItems}
      />

      </Viewport>
  );
}

CardCarousel.propTypes = {
  productList: PropTypes.arrayOf(
    PropTypes.shape({
      productID: PropTypes.number,
      productInfo: PropTypes.shape({
        name: PropTypes.string,
        category: PropTypes.string,
        default_price: PropTypes.string,
      }),
      selectedStyle: PropTypes.shape({
        style_id: PropTypes.number,
        name: PropTypes.string,
        original_price: PropTypes.string,
        sale_price: PropTypes.string,
        'default?': PropTypes.bool,
        photos: PropTypes.arrayOf(
          PropTypes.shape({
            thumbnail_url: PropTypes.string,
            url: PropTypes.string,
          }),
        ),
        skus: PropTypes.shape({
          quantity: PropTypes.number,
          size: PropTypes.string,
        }),
      }),
    }),
  ).isRequired,
};

const Viewport = styled.div`
  position: relative;
  padding: 1rem 2.5%;
  margin-right: 2.5%;
  overflow-x: hidden;

  @media (min-width: 900px) {
    margin-left: 2.5%;
    padding: 1rem 1.25%;
  }
`;

const Carousel = styled.div`
  display: inline-flex;
  wrap: no-wrap;
  align-items: stretch;
  justify-content: space-between;

  width: ${props => props.width}%;

  position: relative;

  transform: translateX(${(props) => props.translate}%);
  transition: transform 0.4s;
`;

export default CardCarousel;