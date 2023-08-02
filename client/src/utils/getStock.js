export function createStock(skus) {
  const stock = Object.entries(skus).map(([sku, { size, quantity }]) => (
    {
      sku,
      size,
      quantity,
    }
  ));
  return stock;
}

export function getAvailableStock(skus) {
  const availableStock = skus.filter((sku) => sku.quantity > 0);
  return availableStock;
}

// export function getUnique() {

// }

export function sortBySize(stock) {
  stock.sort((a, b) => Number(a.sku) - Number(b.sku));
  return stock;
}

export function getQuantityOptions(quantity) {
  const number = Number(quantity);
  // handle edge cases
  if (number >= 15) {
    return 15;
  } if (number < 15) {
    return number;
  }
  return 0;
}
