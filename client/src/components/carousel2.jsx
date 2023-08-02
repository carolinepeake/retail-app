<SlideContainer className="slide-container swiper">
  <SlideContent>
    <div class="card-wrapper swiper-wrapper">
      {content}
    </div>
  </SlideContent>

  <SwiperButton next></SwiperButton>
  <SwiperButton prev></SwiperButton>
  <div class="swiper-pagination"></div>
</SlideContainer>



const SlideContainer = styled.div`
  max-width: 1120px;
  width: 100%;
  padding: 40px 0;
`;

const SlideContent = styled.div`
  margin: 0 40px;
  overflow: hidden;
  border-radius: 25px;
  @media screen and (max-width: 768px) {
    margin: 0 10px;
  };
`;

const SwiperButton = styled.div`
  color: #6E93f7;
  transition: color 0.3s ease;
  &:hover {
    color: #4070F4;
  }
  ::before, ::after {
    font-size: 35px;
  }
  ${(props) => props.next && css`
    right: 0;
  `};
  ${(props) => props.prev && css`
    left: 0;
  `};
  @media screen and (max-width: 768px) {
    display: none;
  };
`;






// content

      <Card class="swiper-slide">
        <Content className="image">
          <Overlay class="overlay"></Overlay>
          <CardImage class="card-image">
            <Image class="card-img" src={image_url} alt={image_title} />
          </CardImage>
        </Content>
        <Content className="card">
          <Name>
            {name}
          </Name>
          <Description>
            {description}
          </Description>
          <button class="button">
            View More
          </button>
        </Content>
      </Card>

  const Card = styled.div`
    border-radius: 25px;
    background-color: #FFF;
  `;

  const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 14px;
    &.image {
      position: relative;
      row-gap: 5px;
      padding: 25px 0;
    }
  `;

  const Overlay = styled.span`
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: #4070F4;
    border-radius: 25px 25xp 0 25px;
    ::before, ::after {
      content: '';
      position: absolute;
      right: 0;
      bottom: -40px;
      height: 40px;
      width: 40px;
      background-color: #4070F4;
    };
    ::after {
      border-radius: 0 25px 0 0 ;
      background-color: #FFF;
    }
  `;

  const CardImage = styled.div`
    position: relative;
    height: 150px;
    width: 150px;
    border-radius: 50%;
    background: #FFF;
    padding: 3px;
  `;

  const Image = styled.img`
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 50%;
    border: 4px solid #4070F4;
  `;

  const Name = styled.h2`
    font-size: 18px;
    font-weight: 500;
    color: #333;
  `;

  const Description = styled.p`
    font-size: 14px;
    color: #707070;
    text-align: center;
  `;

  var swiper = new Swiper(".slide-content", {
    slidesPerView: 3,
    spaceBetween: 25,
    loop: true,
    centerSlide: 'true',
    fade: 'true',
    grabCursor: 'true',
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      520: {
        slidesPerView: 2,
      },
      950: {
        slidesPerView: 3,
      },
    }
  });



