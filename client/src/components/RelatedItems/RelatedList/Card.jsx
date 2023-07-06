import React, { useState, useCallback } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { useGlobalContext } from '../../../contexts/GlobalStore';
import StarButton from './StarButton';
import CardImage from './CardImage';
import Stars from './Stars';
import ComparisonModal from './ComparisonModal';
import {
  calcAverageRating,
  // getProductInfo,
  // getReviewsMetaData,
} from '../../utils/useAverageRating';

function Card({
  product, setIndex, setTranslate
}) {
  const {
    setProductID,
  } = useGlobalContext();

  const [modal, setModal] = useState(false);

  // understand why passing function as JSX props causes unnecessary re-render
  // understand why arrow functions do not bind
  // understand why need to wrap arrow function in useCallback
  // and use this type of function declaration/definition (understand which type it is)
  // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md
  const closeModal = useCallback(() => {
    setModal(false);
  }, [setModal]);

  function handleBackgroundClick(event) {
    if (event.target.id === 'CompareProductsBackground') {
      closeModal();
    }
    event.stopPropagation();
  }

  function changeItem() {
    setProductID(product.details.data.id);
    // Reset card index when clicking on new item
    setIndex(0);
    setTranslate(0);
  }

  const rating = calcAverageRating(product.stars.data.ratings);

  return (
    <CardContainer
      onClick={() => changeItem()}
    >
      <CardStyle>
        <StarButton
          setModal={setModal}
        />
        <CardImage
          imageUrl={product.image.data.results[0].photos[0].thumbnail_url}
        />
        <Text>
          <Cards category>{product.details.data.category}</Cards>
          <Cards productName>{product.details.data.name}</Cards>
          <Cards price>
            $
            {product.details.data.default_price}
          </Cards>
        </Text>
        <Stars
          rating={rating}
        />
      </CardStyle>
      {modal
      && (
        <ModalBackground
          id="CompareProductsBackground"
          onClick={(e) => handleBackgroundClick(e)}
        >
          <ComparisonModal
            onClick={(e) => { e.stopPropagation(); }}
            details={product.details.data}
            closeModal={closeModal}
          />
        </ModalBackground>
      )}
    </CardContainer>
  );
}

// Card.propTypes = {
//   product: PropTypes.shape({
//     details: PropTypes.shape({
//       id: PropTypes.number,
//       name: PropTypes.string,
//       category: PropTypes.string,
//       default_price: PropTypes.string,
//     }),
  //   image: PropTypes.arrayOf(
  //     PropTypes.shape({
  //       style_id: PropTypes.number,
  //       name: PropTypes.string,
  //       original_price: PropTypes.string,
  //       sale_price: PropTypes.string,
  //       'default?': PropTypes.bool,
  //       photos: PropTypes.arrayOf(
  //         thumbnail_url: PropTypes.string,
  //         url: PropTypes.string,
  //       ),
  //       skus: PropTypes.shape({
  //         PropTypes.string: PropTypes.shape({
  //           size: PropTypes.number,



  // }).isRequired,
// };

const CardContainer = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.backgroundColor};
  margin: 0 auto;
  width: 100%;
  height: 100%;
`;

const CardStyle = styled.div`
  display: flex;
  flex-direction: column;
  border: lightgrey solid thin;
  justify-content: flex-end;
  height: 100%;
  position: relative;
  overflow: hidden;
`;
// box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

// mask-image: ${(props) => (props.i === 3 ?
// 'linear-gradient(to right, rgba(0,0,0,1), 40%, rgba(0,0,0,0) 80%)' : ' ')};
// mask-image: ${(props) => (props.i === 0 ?
// 'linear-gradient(to left, rgba(0,0,0,1), 40%, rgba(0,0,0,0) 80%)' : ' ')};
// mask-image: ${(props) => (props.i === 3 ?
// 'linear-gradient(to right, rgba(0,0,0,1), 40%, rgba(0,0,0,0) 80%)' : ' ')};

const Cards = styled.div`
  margin-right: auto;
  font-size: ${(props) => props.theme.tertiary};
  paddingTop: ${(props) => (props.category ? '0.1em' : props.productName ? '0.05em' : '')};
  padding: ${(props) => props.price && '0.25em'};
  padding-left: 0.25em;
  ${(props) => props.productName && css`
    font-size: ${props.theme.body};
    font-weight: 500;
  `};
`;
// font-size: ${props.theme.cardTitle};
// font-size: ${(props) => props.theme.cardText};
// font-size: 1.0rem;
// padding-left: 0.25rem;
// ${props => props.name && css`
// font-size: 1.25rem;
// fontWeight: '500'
// `}
// margin-left: auto;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  &:hover {
    text-decoration: underline;
  }
  cursor: pointer;
  margin-top: 0.2em;
`;

const ModalBackground = styled.div`
  width: 90vw;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 1.25vw;
  top: 0%;
  z-index: 10;
  flex-direction: column;
`;
// width: 100vw;
// height: 100vh;

export default Card;
