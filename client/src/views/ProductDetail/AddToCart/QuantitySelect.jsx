import React from 'react';

import SelectOption from './SelectOption';

// const QuantityDropdown = useMemo(() => {

//   // generate unique keys

//   const values = [...Array(quantity + 1).keys()].slice(1);

//   const quantities = values.map(quantitiy => {
//     <SelectOption
//       value={quantity}
//       label={quantity}
//       name="quantity"
//       key={quantity}
//     />
//   });

//   return (
//     { quantities }
//   );
// }, [quantity]);

export default function QuantityDropdown({ quantity }) {
  console.log('quantity: ', quantity);
  // generate unique keys

  // const values = [...Array(quantity + 1).keys()].slice(1);
  // console.log('values: ', values);

  return (
    <>
      {[...Array(quantity + 1).keys()].slice(1).map((value) => (
        <SelectOption
          value={`${value}`}
          label={`${value}`}
          name="quantity"
          key={value}
        />
      ))}
      ;
    </>
  );
}
