import React from 'react';
import styled from 'styled-components';
import CardsList from './RelatedList/CardsList';
import CardsList2 from './RelatedList/CardsList2';
import OutfitList from './OutfitList/OutfitList';
import OutfitList2 from './OutfitList/OutfitList2';
import SectionHeader from '../reusable/SectionHeader';

function RelatedItems() {
  return (
    <Container id="related-items">
      <Text>
        Related Items
      </Text>
      {/* <CardsList /> */}
      <CardsList2 />
      <Text second>
        Outfit List
      </Text>
      {/* <OutfitList /> */}
      <OutfitList2 />
    </Container>
  );
}

const Container = styled.div`
  padding-left: 5%;
  padding-right: 5%;

  @media (max-width: 600px) {
    padding-top: 5%;
  };

  @media (min-width: 600px) {

  };
`;


// @media (max-width: 600px) {
//   padding-top: 5%;
//   display: grid;
//   grid-template-columns: 1fr 3fr 1.0rem 3fr 1fr;
//   grid-template-rows: 1.0rem 1fr 1.5em 1.0rem 1fr;
// }

// @media (min-width: 600px) {
//   margin-top: 1.5rem;
//   display: grid;
//   grid-template-columns: 1fr 3fr 2.0rem 4fr 2.0rem 4fr 2.0rem 3fr 1fr;
//   grid-template-rows: 2.0rem 1fr 1.5em 2.0rem 1fr;
// }
// grid-template-columns: repeat(3, 4fr 1rem) 3fr 5% 5%;

const Text = styled(SectionHeader)`
  text-align:left;
`;
// grid-row: ${(props) => (props.second ? '4/5' : '1/2')};
//   grid-column: 1/11;

// const Text1 = styled.div`
//   font-size: large;
//   font-weight: bold;
//   border-radius: 10px;
//   text-align:left;
//   grid-row: 1/2;
// `;

// const Text2 = styled.div`
//   text-align:left;
//   grid-row: 4/5;
//   grid-column: 1/8;
// `;

// const CardList = styled.div`
//   grid-column: 2/6;
//   column-gap: 10%;
//   grid-row: 2/3;
//   display: flex;
// `;

// const CardList = styled.div`
//   grid-column: 2/12;
//   column-gap: 10%
// `;

export default RelatedItems;
