const Cart = require("../models/cart.model.js");
const CartItem = require("../models/cartItem.model.js");
const Product = require("../models/product.model.js");
// const userService = require("./user.service.js");

// Create a new cart for a user
async function createCart(user) {
  const cart = new Cart({ user: user._id });
  const createdCart = await cart.save();
  return createdCart;
}

// Find a user's cart and update cart details
async function findUserCart(userId) {
  const cart = await Cart.findOne({ user: userId }).populate('cartItems').exec();
  if (!cart) {
    throw new Error('Cart not found for the user');
  }

  const cartItems = await CartItem.find({ cart: cart._id }).populate('product').exec();
  cart.cartItems = cartItems;

  let totalPrice = 0;
  let totalDiscountedPrice = 0;
  let totalItem = 0;

  cart.cartItems.forEach(cartItem => {
    totalPrice += cartItem.price;
    totalDiscountedPrice += cartItem.discountedPrice;
    totalItem += cartItem.quantity;
  });

  cart.totalPrice = totalPrice;
  cart.totalItem = totalItem;
  cart.totalDiscountedPrice = totalDiscountedPrice;
  cart.discounte = totalPrice - totalDiscountedPrice;

  return cart;
}

async function addCartItem(userId, itemData) {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
      throw new Error('Cart not found for the user');
  }

  const product = await Product.findById(itemData.productId);
  if (!product) {
      throw new Error('Product not found');
  }

  // Check if the product size is in stock
  const productSize = product.sizes.find(size => size.name === itemData.size);
  if (!productSize || productSize.quantity < itemData.quantity) {
      throw new Error('Product size is out of stock');
  }

  const isPresent = await CartItem.findOne({ cart: cart._id, product: product._id, size: itemData.size, userId });
  if (isPresent) {
      isPresent.quantity += itemData.quantity;
      isPresent.price = isPresent.quantity * product.price;
      isPresent.discountedPrice = isPresent.quantity * product.discountedPrice;
      await isPresent.save();
  } else {
      const newCartItem = new CartItem({
          product: product._id,
          cart: cart._id,
          quantity: itemData.quantity,
          price: product.price,
          discountedPrice: product.discountedPrice,
          userId: userId,
          size: itemData.size
      });
      await newCartItem.save();
      cart.cartItems.push(newCartItem);
      await cart.save();
  }

  return 'Item added to cart';
}

async function clearCart(userId) {
  try {
    // Find the user's cart and remove all cart items
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      throw new Error('Cart not found for the user');
    }

    // Remove all cart items associated with this cart
    await CartItem.deleteMany({ cart: cart._id });

    // Optionally, you can reset cart totals here if needed
    cart.totalPrice = 0;
    cart.totalItem = 0;
    cart.totalDiscountedPrice = 0;
    cart.discounte = 0;

    // Save the updated cart
    await cart.save();
  } catch (error) {
    console.error("Error clearing cart:", error);
    throw new Error(error.message);
  }
}


module.exports = {
  createCart,
  findUserCart,
  addCartItem,
  clearCart,
  // addCartItem,
  // updateCartItem,
  // removeCartItem,
  // findCartItemById,
};