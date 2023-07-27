import React, {
  useState, useRef, useEffect,
} from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

export const ScrollButton = ({ visible, onClick }) => {

  return (
    <Buttons
    place={place}
    setPlace={setPlace}
    left
    firstPhotoIndex={firstPhotoIndex}
    setFirstPhotoIndex={setFirstPhotoIndex}
    onClick={() => handleClickArrow(-1)}
    >
    <ArrowBackground />
    <ArrowIcon prev />
    </Buttons>
  )

};

export const CloseButton = ({ onClick }) => {

  return (

  )
};
