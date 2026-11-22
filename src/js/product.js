import { setLocalStorage } from './utils.mjs';
import ProductData from './ProductData.mjs';
import { getDiscount, discountTemplate } from './discount.mjs';

const dataSource = new ProductData('tents');

function addProductToCart(product) {
  setLocalStorage('so-cart', product);
}

// play a short animation on the backpack icon so the user sees the cart changed
function animateCartIcon() {
  const cart = document.querySelector('.cart');
  if (!cart) {
    return;
  }
  // remove the class first so the animation can play again on every click
  cart.classList.remove('cart--animate');
  void cart.offsetWidth;
  cart.classList.add('cart--animate');
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  if (!product) {
    return;
  }
  addProductToCart(product);
  animateCartIcon();
}

// add listener to Add to Cart button
document
  .getElementById('addToCart')
  .addEventListener('click', addToCartHandler);

// show the discount next to the price, using the product data from tents.json
async function showDiscount() {
  const button = document.getElementById('addToCart');
  const price = document.querySelector('.product-card__price');
  if (!button || !price) {
    return;
  }

  try {
    const product = await dataSource.findProductById(button.dataset.id);
    const discount = getDiscount(product);
    if (!discount) {
      return;
    }

    const box = document.createElement('div');
    box.classList.add('product-discount');
    box.innerHTML = discountTemplate(discount);
    price.after(box);
  } catch (err) {
    // if the data does not load, the page still shows the normal price
  }
}

showDiscount();
