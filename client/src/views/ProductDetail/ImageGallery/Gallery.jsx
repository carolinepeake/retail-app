


  if (status === 'zoomed') {
    return (
        <ZoomedImage
          handleClickMain={handleClickMain}
          photo={selectedStyle?.photos[place || 0]?.url}
          alternative={`${productInfo?.name} in ${selectedStyle?.name} style photo number ${place}`}
        />
    );
  }

  return (
    <>
    <AnimationContainer>

    <MainWrapper
      id="carousel-container"
      status={status}
      place={place}
      photosLength={selectedStyle?.photos?.length}
      ref={viewport}
      onScroll={handleScroll}
    >

      <Carousel
        id="carousel"
        // photosLength={photosLength}
        photosLength={selectedStyle?.photos?.length}
        place={place}
        status={status}
        ref={carousel}
        translate={translate}
      >

        {selectedStyle?.photos?.map((photo, index) => (
          <Slide
            key={photo.url}
            // key={index}
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
              alt={`${productInfo?.name} in ${selectedStyle?.name} style photo number ${index}`}
              status={status}
              id={`seq${index}`}
            />
          </Slide>
          // <CarouselItem
          //   key={photo.url}
          //   index={index}
          //   handleClickMain={handleClickMain}
          //   photo={photo}
          //   status={status}
          //   alternative={`${productInfo?.name} in ${selectedStyle?.name} style photo number ${index}`}
          // />
        ))}

      </Carousel>

    </MainWrapper>

    <ScrollButton
      visible={place > 0}
      position="left"
      handleClick={handleClickBack}
      overlay
    />

    <ScrollButton
      visible={place < photosLength - 1}
      position="right"
      handleClick={handleClickForward}
      overlay
    />

  {status === 'expanded'
  && (
    <CloseButton
      $round
      onClick={handleClickExit}
    >
      &#10005;
    </CloseButton>
  )}

  </AnimationContainer>

<Thumbnails
        place={place}
        setPlace={setPlace}
        status={status}
        firstPhotoIndex={firstPhotoIndex}
        setFirstPhotoIndex={setFirstPhotoIndex}
        handleClickThumbnail={handleClickAnchor}
        // handleClickThumbnail={handleClickThumbnail}
      />
      </>
  );
}

const AnimationContainer = styled.div`
  position: relative;
  height: fit-content;
  flex: 6 1 0;
`;

const MainWrapper = styled.div`
 /* margin: 0 auto;
  padding: 0;
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  overflow: hidden;
  position: relative;
  z-index: 1; */

  aspect-ratio: 4/6;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  @media (min-width: 600px) {
   /* height: fit-content; */
    max-height: 120vh;
    overflow-x: hidden;
  }

  ${(props) => props.status === 'default' && css`
    @media (min-width: 600px) {
      max-height: 840px;
    }
    @media (min-width: 800px) {
      flex: 6 1 450px;
     /* height: initial; */
    }
    @media (min-width: 1200px) {
      max-width: 800px;
      max-height: 1200px;
    }
  `};
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

const Carousel = styled.ul`
  display: flex;
  left: 0;
  position: relative;
  margin: 0;
  padding: 0;
  width: ${(props) => props.photosLength}00%;
 /* transition: translate 0.5s;
  translate: ${(props) => `calc((-100 / ${props.photosLength}) * ${props.place} * 1%)`} 0; */
  @media (min-width: 600px) {
    transition: translate 0.5s;
   /* translate: ${(props) => `calc((-100 / ${props.photosLength}) * ${props.place} * 1%)`} 0; */
    translate: ${(props) => props.translate}% 0;
  }
`;

const Slide = styled.li`
  scroll-snap-align: start;
  width: 100%;
  height: 100%;
`;