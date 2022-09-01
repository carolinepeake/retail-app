import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MdArrowForwardIos, MdArrowBackIos } from 'react-icons/md'

import { useGlobalContext } from '../../../contexts/GlobalStore';

import StyleSelector from '../StyleSelector/StyleSelector';

// eslint-disable-next-line react/prop-types
function ImageGallery() {
  const {
    productID, setProductID, selectedStyle, productInfo, setProductInfo, styles, setStyles, setSelectedStyle,
  } = useGlobalContext();

  const [imageUrl, setImageUrl] = useState('');
  const [photos, setPhotos] = useState([]);
  const [main, setMain] = useState({});
  const [place, setPlace] = useState(0);
  const [photosLength, setPhotosLength] = useState(0);

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
    e.preventDefault();
    setPlace(() => value);
  }

  function handleClickBack(e) {
    e.preventDefault();
    setPlace((prev) => prev - 1);
  }

  function handleClickForward(e) {
    e.preventDefault();
    setPlace((prev) => prev + 1);
  }

  return (
    <>
      <Gallery>
        {imageUrl
          ? (
            // <Main>
            <>
               <Side>
                {photos
              && photos.map((photo, index) => (

                    <img
                      src={photo.thumbnail_url}
                      key={photo.url}
                      index={index}
                      alt=""
                      style={{
                        width: '100%',
                        height: '100%',
                        border: '.5px black solid',
                        marginLeft: '2%',
                        justifyContent: 'center'
                      }}
                      onClick={(e) => changeMain(e, index)}
                    />
                  </div>
              ))}
              </Side>
              <Back>
                {place > 0
                ? <Button type="button" onClick={handleClickBack}>
                    <MdArrowBackIos />
                  </Button>
                : <PlaceholderButton type="button" visibility="hidden" disabled>
                    <MdArrowBackIos style={{color: 'rgba(0, 0, 0, 0)',}} />
                  </PlaceholderButton>}
              </Back>
              <Photo
                src={imageUrl}
                alt={`${productInfo.name} in ${selectedStyle.name} style`}
              />
              <Forward>
                {place < photosLength - 1
              ? <Button type="button" onClick={handleClickForward}>
                  <MdArrowForwardIos />
                </Button>
              : <PlaceholderButton type="button" visibility="hidden" disabled>
                  <MdArrowForwardIos style={{color: 'rgba(0, 0, 0, 0)',}}/>
                </PlaceholderButton>}
              </Forward>
            {/* </Main> */}
            </>
          )
          : (
            <div>No Image Available</div>
          )}
      </Gallery>
      <ProductDescription>
       <h4>{productInfo.slogan}</h4>
        <p>{productInfo.description}</p>
      </ProductDescription>
    </>
  );
}

export default ImageGallery;

const Gallery = styled.div`
  width: 100%;
  height: auto;
  display: grid;
  // content-distribution: space-around;
  grid-template-columns: 3fr 1fr 6fr 1fr;
  align-items: start;
  grid-row: 2 / 3;
`;

// const Main = styled.img`
//   // display: f;
//   // align-items: center;
//   margin-top: 10%;
//   width: auto;
//   height: auto;
//   justify-content: center;
//   content-distribution: space-around;
//   flex: f1;
//   z-index: 2;
// `;

const Photo = styled.img`


`;


const Side = styled.div`
  margin-left: 1%;
  // width: 10%;
  // display: inline-block;
  justify-content: left;
  text-align: left;
  padding-right: 2%;
  positioning: absolute;
  margin-top: 5%;
  align-items: center space-around;
  z-index: 2;
  display: flex;
`;

const Button = styled.button`
  background-color: rgba(0, 0, 0, 0);
  border: none;
  z-index:
  position: relative;
`;

const PlaceholderButton = styled.button`
  background-color: transparent;
  border: none;
  color: none;
`;

const Back = styled.span`
  margin-inline-start: 50%
  display: inline-block;
  margin-inline: auto;
  z-index: 2;
`;

const Forward = styled.span`
  display: inline-block;
  margin-inline-end: 1%
  margin-inline-left: 1%
  z-index: 2;
  justify-self: center;
  align-self: end;
`;

const ProductDescription = styled.div`
  grid-row: 3 / 4;
`;


