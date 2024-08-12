const Cart = require("../models/cart.model.js");
const CartItem = require("../models/cartItem.model.js");
const Product = require("../models/product.model.js");
const User = require("../models/user.model.js");
const couponService = require("./coupon.service.js");

// const userService = require("./user.service.js");

// Create a new cart for a user
async function createCart(user) {
  const cart = new Cart({ user: user._id });
  const createdCart = await cart.save();
  return createdCart;
}

// Find a user's cart and update cart details
async function findUserCart(userId) {
  try{
    const cart = await Cart.findOne({ user: userId }).populate('cartItems').exec();
    const user = await User.findOne({ _id:userId });
    const referralDiscountPercentage = Math.min(25, user.referralRewards);
   

    if (!cart && !user) {
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

    const referralDiscount = (totalDiscountedPrice * referralDiscountPercentage)/100;
    
    totalDiscountedPrice = totalDiscountedPrice - referralDiscount;

    //update discounted price if coupon code is applied
    if(cart.cartItems.length > 0){
      if(cart?.couponId){
        totalDiscountedPrice = totalDiscountedPrice - cart.totalPrice*(cart.couponOffer/100)
      }
    }else {
      cart.couponId = null;
      cart.couponDiscount=0;
      cart.couponOffer=null;
    }
    

    cart.totalPrice = totalPrice;
    cart.totalItem = totalItem;
    cart.referralDiscount = referralDiscount;
    cart.referralDiscountNeeded = true;
    cart.referralDiscountPercentage = referralDiscountPercentage;
    cart.totalDiscountedPrice = totalDiscountedPrice;
    cart.discounte = totalPrice - totalDiscountedPrice;
    if(cart?.couponId && cart.cartItems.length>0){
      const couponDiscount = cart.totalPrice*(cart.couponOffer/100);
      cart.couponDiscount = couponDiscount;
    }
 
    await cart.save();

    return cart;
  }catch(e){
    console.log(e, 'error in getting cart');
  }
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

async function applyCoupon(userId, couponId){
  try {
    // Find the user's cart and remove all cart items
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      throw new Error('Cart not found for the user');
    }

    const coupon = await couponService.getCouponById(couponId);

    //check if coupon has expired
    const currentDateTime = new Date();
    if(coupon.expirationDate - currentDateTime < 0) throw new Error('Coupon expired')
    
    // set coupon Id
    cart.couponId = couponId;
    const couponDiscount = cart.totalPrice*(coupon.offer/100);
    cart.couponDiscount = couponDiscount;
    cart.couponOffer = coupon.offer;

    // Save the updated cart
    await cart.save();

  } catch (error) {
    console.error("Error applying coupon to cart:", error);
    throw error;
  }
}

async function removeCoupon(userId){
  try {
    // Find the user's cart and remove all cart items
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      throw new Error('Cart not found for the user');
    }

    //remove coupon Id and couponDiscount
    cart.couponId = null;
    cart.couponDiscount = 0;

    // Save the updated cart
    await cart.save();

  } catch (error) {
    console.error("Error removing coupon from cart:", error);
    throw error;
  }
}

module.exports = {
  createCart,
  findUserCart,
  addCartItem,
  clearCart,
  applyCoupon,
  removeCoupon,
  // addCartItem,
  // updateCartItem,
  // removeCartItem,
  // findCartItemById,
};