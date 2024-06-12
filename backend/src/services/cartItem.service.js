const CartItem = require("../models/cartItem.model.js");
const userService = require("./user.service.js");
const Product = require("../models/product.model.js");

async function updateCartItem(userId, cartItemId, cartItemData) {
  const cartItem = await findCartItemById(cartItemId);

  if (!cartItem) {
    throw new Error("Cart item not found: " + cartItemId);
  }

  if (cartItem.userId.toString() !== userId.toString()) {
    throw new Error("Unauthorized action");
  }

  const product = await Product.findById(cartItem.product._id);
  if (!product) {
    throw new Error("Product not found");
  }

  // Check if the product size is in stock
  const productSize = product.sizes.find(size => size.name === cartItem.size);
  if (!productSize) {
    throw new Error('Product size not found');
  }

  // Ensure the updated quantity does not exceed the available stock
  if (productSize.quantity < cartItemData.quantity) {
    throw new Error('Product size is out of stock');
  }

  cartItem.quantity = cartItemData.quantity;
  cartItem.price = cartItem.quantity * cartItem.product.price;
  cartItem.discountedPrice = cartItem.quantity * cartItem.product.discountedPrice;

  const updatedCartItem = await cartItem.save();
  return updatedCartItem;
}

// // Remove a cart item
async function removeCartItem(userId, cartItemId) {
  console.log("console at cartItem.service", cartItemId);
  const cartItem = await findCartItemById(cartItemId);

  if (!cartItem) {
    throw new Error("Cart item not found: " + cartItemId);
  }

  // Convert userId to string if it's an object
  const userIdString = typeof userId === 'object' ? userId.toString() : userId;

  console.log("userIdString:", userIdString);
  console.log("cartItem.userId:", cartItem.userId);

  if (cartItem.userId.toString() !== userIdString) {
    throw new Error("Unauthorized action");
  }

  await CartItem.findByIdAndDelete(cartItemId);
}



// Find a cart item by its ID
async function findCartItemById(cartItemId) {
  const cartItem = await CartItem.findById(cartItemId).populate("product");
  if (cartItem) {
    return cartItem;
  } else {
    throw new Error(`CartItem not found with id: ${cartItemId}`);
  }
}

module.exports = {
//   createCartItem,
  updateCartItem,
//   isCartItemExist,
  removeCartItem,
  findCartItemById,
};
