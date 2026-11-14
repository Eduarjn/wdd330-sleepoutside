// Helpers to show how much money a customer saves on a product.
// The discount compares the suggested retail price with the final price.

export function getDiscount(product) {
  const retail = Number(product?.SuggestedRetailPrice);
  const final = Number(product?.FinalPrice);

  // no discount when a price is missing or the final price is not lower
  if (!retail || !final || final >= retail) {
    return null;
  }

  const amount = retail - final;
  return {
    retail,
    final,
    amount,
    percent: Math.round((amount / retail) * 100),
  };
}

export function formatPrice(value) {
  return `$${value.toFixed(2)}`;
}

// markup for the badge, the old price and the money saved
export function discountTemplate(discount) {
  return `<span class="discount-badge">${discount.percent}% OFF</span>
    <span class="product-discount__retail">Was <s>${formatPrice(discount.retail)}</s></span>
    <span class="product-discount__savings">You save ${formatPrice(discount.amount)}</span>`;
}
