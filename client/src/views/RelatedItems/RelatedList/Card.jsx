import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { useGlobalContext } from '../../../contexts/GlobalStore';
import StarRating from '../../../components/StarRating';
import CardButton from './CardButton';
import ComparisonModal from './ComparisonModal';
import { calcAverageRating } from '../../../utils/getAverageRating';

const DEFAULT_IMAGE = 'https://www.escapeauthority.com/wp-content/uploads/2116/11/No-image-found.jpg';

// TODO: make "x" button appear only on hover & fade in - maybe use CSS instead of state
function Card({
  product,
  // handleClickIcon,
  icon,
  index,
  // onChangeProd,
  // outfits,
  length,
}) {
  console.log('[Card] is running');
  const {
    setProductID,
  } = useGlobalContext();

  // understand why arrow functions do not bind
  // understand why need to wrap arrow function in useCallback
  // and use this type of function declaration/definition (understand which type it is)
  // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md

  // might not want to rest outfit list carousel
  const changeItem = () => {
    setProductID(product.productID);
    // onChangeProd && onChangeProd();
  };

  const [compProdIndex, setCompProdIndex] = useState(null);

  const handleClickIconBtn = (e, index) => {
    e.preventDefault()
    e.stopPropagation();
    setCompProdIndex(index)
  };

  const rating = calcAverageRating(product?.revMeta?.ratings);

  return (
  <CardContainer>

      <CardContent
        onClick={changeItem}
      >

        <CardButton
          icon={icon}
          // icon='remove'
          handleClickIconBtn={handleClickIconBtn}
          active={index === compProdIndex}
          index={index}
        />

     <CardImageWrapper>
        <Image src={product?.selectedStyle?.photos[0]?.thumbnail_url || DEFAULT_IMAGE} alt="RelatedProductImage" />
      </CardImageWrapper>

        <TextContainer>
          <Text>{product?.productInfo?.category}</Text>
          <Text productName>{product?.productInfo?.name}</Text>
          <Text price>
            {product?.selectedStyle?.sale_price
              ? (
                <>
                  <SalePrice>
                    {`$${product.selectedStyle.sale_price}    `}
                  </SalePrice>
                  <s>{product.selectedStyle?.original_price}</s>
                </>
              )
              : (
                <span>{`$${product?.selectedStyle?.original_price}`}</span>
              )}
            </Text>
          <StarRating
            rating={rating}
          />
        </TextContainer>
      </CardContent>


      {typeof compProdIndex === 'number' && <ComparisonModal
      // resetCarousel={resetCarousel}
      compProdIndex={compProdIndex}
      productInfo={product.productInfo}
      setCompProdIndex={setCompProdIndex}
      // details={comparisonProduct?.productInfo}
      />}


  </CardContainer>
  );
}

// Card.propTypes = {
//   product: PropTypes.shape({
//     productID: PropTypes.number,
//     productInfo: PropTypes.shape({
//       name: PropTypes.string,
//       category: PropTypes.string,
//       default_price: PropTypes.string,
//     }),
//     selectedStyle: PropTypes.shape({
//       style_id: PropTypes.number,
//       name: PropTypes.string,
//       original_price: PropTypes.string,
//       sale_price: PropTypes.string,
//       'default?': PropTypes.bool,
//       photos: PropTypes.arrayOf(
//         PropTypes.shape({
//           thumbnail_url: PropTypes.string,
//           url: PropTypes.string,
//         }),
//       ),
//       skus: PropTypes.shape({
//         quantity: PropTypes.number,
//         size: PropTypes.string,
//       }),
//     }),
//   }).isRequired,
//   onChangeProd: PropTypes.func,
//   // icon: PropTypes.string.isRequired,
//   // onClickRightButton: PropTypes.func.isRequired,
//   // idx: PropTypes.number.isRequired,
//   // compProdIdx: PropTypes.number,
// };

Card.defaultProps = {
  compProdIndex: null,
  onChangeProd: null,
};

// TO-DO: implement scroll for mobile
const CardContainer = styled.div`
  margin: 0;
  padding: 0 2.5vw;

  @media (min-width: 900px) {
    padding: 0 1.25vw;
  }
`;

const CardContent = styled.div`
  height: 100%;
  position: relative;
  border-radius: 7.5px;
  overflow: hidden;
  cursor: pointer;

  background-color: ${(props) => props.theme.backgroundColor};
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

 /* &:hover {
    transform: translateY(-5%);
    transition: translateY 0.5s ease;
  } */

  &:hover {
/*    opacity: 0.8; */
    transform: scale(1.025);
    transition: scale 0.25s ease;
  }
`;


// mask-image: ${(props) => (props.i === 3 ?
// 'linear-gradient(to right, rgba(0,0,0,1), 40%, rgba(0,0,0,0) 80%)' : ' ')};
// mask-image: ${(props) => (props.i === 0 ?
// 'linear-gradient(to left, rgba(0,0,0,1), 40%, rgba(0,0,0,0) 80%)' : ' ')};
// mask-image: ${(props) => (props.i === 3 ?
// 'linear-gradient(to right, rgba(0,0,0,1), 40%, rgba(0,0,0,0) 80%)' : ' ')};

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25em;
  padding: 0.5em 0.25em;
`;

const Text = styled.div`
  ${(props) => props.productName && css`
    font-size: 1.17em;
    font-weight: 500;
    line-height: 1em;
  `};

  ${(props) => props.price && css`
    line-height: 1.5em
  `};
`;

const SalePrice = styled.span`
  color: ${(props) => props.theme.formError};
`;


const CardImageWrapper = styled.div`
/* only need to set height and width if setting aspect ratio of card instead of image wrapper */
  aspect-ratio: 4/5;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;

 ${CardContent}:hover & {
    opacity: 0.8;
  }
`;

export default Card;
