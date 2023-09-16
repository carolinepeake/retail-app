import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CloseButton } from '../Buttons';

export default function PhotoPreview({
  preview,
  handleClickDeleteFile,
}) {
  const handleClickDelete = () => {
    handleClickDeleteFile(preview);
  };

  const [visible, setVisible] = useState(false);

  const handleMouseOverPreview = () => {
    setVisible(true);
  };

  const handleMousExitPreview = () => {
    setVisible(false);
  };

  return (
    <ImageContainer>
      <ImagePreview
        src={preview.url}
        alt={preview.original_filename}
        onMouseEnter={handleMouseOverPreview}
        onMouseExit={handleMousExitPreview}
      />
      {/* <DeleteButton
        $round
        onClick={handleClickDelete}
      >
        &#10005;
      </DeleteButton> */}
      {/* <Delete
        $round
        onClick={handleClickDelete}
      >
        Delete
      </Delete> */}
      <Overlay
        $square
        onClick={handleClickDelete}
        $visible={visible}

      >
        <TrashIcon
          type="button"
          $square
          onClick={handleClickDelete}
        >
          <svg
            // fill="#000000"
            fill="white"
            // width="12px"
            // height="12px"
            width="24px"
            height="24px"
            viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <title>trash-can</title>
              <path d="M30 6.749h-5.331l-3.628-5.442c-0.228-0.337-0.609-0.556-1.041-0.557h-8c-0 0-0 0-0 0-0.432 0-0.813 0.219-1.037 0.552l-0.003 0.004-3.628 5.442h-5.332c-0.69 0-1.25 0.56-1.25 1.25s0.56 1.25 1.25 1.25v0h2.858l1.897 20.864c0.060 0.64 0.594 1.137 1.245 1.137 0 0 0 0 0.001 0h16c0 0 0 0 0 0 0.65 0 1.184-0.497 1.243-1.132l0-0.005 1.897-20.864h2.859c0.69 0 1.25-0.56 1.25-1.25s-0.56-1.25-1.25-1.25v0zM12.669 3.25h6.661l2.333 3.499h-11.327zM22.859 28.75h-13.718l-1.772-19.5 17.262-0.001zM11 10.75c-0.69 0-1.25 0.56-1.25 1.25v0 14c0 0.69 0.56 1.25 1.25 1.25s1.25-0.56 1.25-1.25v0-14c0-0.69-0.56-1.25-1.25-1.25v0zM16 10.75c-0.69 0-1.25 0.56-1.25 1.25v0 14c0 0.69 0.56 1.25 1.25 1.25s1.25-0.56 1.25-1.25v0-14c0-0.69-0.56-1.25-1.25-1.25v0zM21 10.75c-0.69 0-1.25 0.56-1.25 1.25v14c0 0.69 0.56 1.25 1.25 1.25s1.25-0.56 1.25-1.25v0-14c-0-0.69-0.56-1.25-1.25-1.25h-0z"></path>
            </g>
          </svg>
        </TrashIcon>
      </Overlay>
    </ImageContainer>
  );
}

PhotoPreview.propTypes = {
  preview: PropTypes.shape({
    url: PropTypes.string,
    original_filename: PropTypes.string,
    public_id: PropTypes.string,
  }).isRequired,
  handleClickDeleteFile: PropTypes.func.isRequired,
};

const ImageContainer = styled.div`
  position: relative;
 /* font-size: 0.5em; */

 width: 100%;
 padding: 0.25em;
 border-radius: 3px;
`;

const DeleteButton = styled(CloseButton)`
/*  font-size: 1.5em;
  top: -0.75em;
  right: -0.75em; */
  font-size: 1em;
  top: -0.75em;
  right: -0.75em;
  top: 0.25em
  right: 0.25em;
  background-color: ${(props) => props.theme.blue[5]};
  background: ${(props) => props.theme.font};
  color: ${(props) => props.theme.submitButtonHoverFont};
`;

const Delete = styled.button`
  background: none;
  border: none;
  text-decoration: underline;
  color: inherit;
  line-height: 1.2em;
  font-weight: 300;
  padding: 0.25em 0;
 /* font-size: ${(props) => props.theme.tertiry}; */

  &:hover {
    text-decoration: none;
  }
`;

const Overlay = styled.div`
  display: ${(props) => (props.$visible ? 'flex' : 'none')};
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100% - 0.5em);
  height: calc(100% - 0.5em);
  margin: 0.25em;
  background: rgba(0,0,0,0.3);
  opacity: 0.8;
  color: white;
  border-radius: inherit;
  /* display: flex; */
  flex-direction: column;
  justify-content: center;
  align-items: center;

 /* &:hover ${ImageContainer} {
    display: flex;
  } */
`;

const ImagePreview = styled.img`
/*  width: 100%;
  height: 100%;
  max-width: 140px;
  max-height: 140px;
  object-fit: scale-down; */

  width: 100%;
  height: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: inherit;

  /* &:hover ${Overlay} {
    display: flex;
  } /
`;

const TrashIcon = styled(CloseButton)`
  background: none;
  color: inherit;
  padding: 0.125em;
  line-height: 1em;
  height: 1.25em;
  width: 1.25em;
  position: static;

  &:hover {
    background: none;
    color: inherit;
    transform: scale(1.125);
    transition: scale 0.2s ease;
  }
`;
