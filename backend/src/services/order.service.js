const Address = require("../models/address.model.js");
const Order = require("../models/order.model.js");
const OrderItem = require("../models/orderItems.js");
const Product = require("../models/product.model.js");
const User = require("../models/user.model.js");
const cartService = require("./cart.service.js");
const twilioService = require('./twilio.service.js');
const { sendOrderConfirmationEmail } = require("./email.service.js");
const { v4: uuidv4 } = require('uuid');

async function createOrder(user, shippingAddress) {
  try {
    // Check if the user exists
    const existingUser = await User.findById(user._id);
    if (!existingUser) {
      throw new Error(`User not found with id: ${user._id}`);
    }

    let address;
    if (shippingAddress._id) {
      address = await Address.findById(shippingAddress._id);
    } else {
      address = new Address(shippingAddress);
      address.user = user._id;
      // Set address for the user
      existingUser.addresses.push(address._id);
      await address.save();
      await existingUser.save(); // Save the user with the new address
    }

    const cart = await cartService.findUserCart(user._id);
    const orderItems = [];

    for (const item of cart.cartItems) {
      const product = await Product.findById(item.product._id);
      if (!product) {
        throw new Error(`Product not found with id: ${item.product._id}`);
      }

      const productSize = product.sizes.find(size => size.name === item.size);
      if (!productSize || productSize.quantity < item.quantity) {
        throw new Error(`Product ${product.name} in size ${item.size} is out of stock`);
      }

      productSize.quantity -= item.quantity;
      await product.save();

      const orderItem = new OrderItem({
        price: item.price,
        product: item.product,
        quantity: item.quantity,
        size: item.size,
        userId: user._id,
        discountedPrice: item.discountedPrice,
      });

      const createdOrderItem = await orderItem.save();
      orderItems.push(createdOrderItem);
    }

    const createdOrder = new Order({
      user: user._id,
      orderItems: orderItems,
      totalPrice: cart.totalPrice,
      totalDiscountedPrice: cart.totalDiscountedPrice,
      referralDiscountPercentage: cart.referralDiscountPercentage,
      discount: cart.discounte,
      totalItem: cart.totalItem,
      shippingAddress: address._id,
      orderDate: new Date(),
      orderStatus: "PENDING",
      paymentDetails: { status: "PENDING" },
      createdAt: new Date(),
    });

    const savedOrder = await createdOrder.save();
    return savedOrder;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function placedOrder(orderId) {
  try {
    const order = await findOrderById(orderId);
    
    if (!order) throw new Error(`Order not found with id: ${orderId}`);

    if(order.orderStatus != "PLACED"){
      // Generate and assign referral code
      const referralCode = await generateAndAssignReferralCode(order.user._id);
      console.log(referralCode, 'generated referral code');

      // Update order status
      order.orderStatus = "PLACED";
      order.referralCode = referralCode;
      order.paymentDetails.status = "COMPLETED";
      await order.save();

      console.log(`Order placed and referral code generated for user: ${order.user}`);
      // Send confirmation message
      const userPhoneNumber = `+91${order.shippingAddress.mobile}`??'+916397710583'; // This should be dynamically fetched based on the order
      const messageBody = `Your Empressa order worth Rs. ${order.totalDiscountedPrice} has been received. Thank you for shopping with us! Additionally you have earned a coupon code ${order.referralCode}. You can get upto 25% discount by sharing the coupon code with others`;
      
      await twilioService.sendMessage(`whatsapp:${userPhoneNumber}`, messageBody);
      await sendOrderConfirmationEmail(order);
      //check if referral discount was taken if so update it
      const user = await User.findById(order.user._id);
      if(order.referralDiscountPercentage > 0){
        user.referralRewards -= order.referralDiscountPercentage;
        await user.save();
      }
    }
    return order;
  } catch (error) {
    console.error("Error placing order from orders:", error.message);
    throw new Error(error.message);
  }
}

async function generateAndAssignReferralCode(userId) {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error(`User not found with id: ${userId}`);
    console.log('user found for asssigning referral code')
    const newReferralCode = generateUniqueReferralCode(user.firstName);
    const referralExists = await User.findOne({ "referrals.referralCode": newReferralCode });

    // Ensure the referral code is unique
    if (referralExists) {
      console.log('retrying refferal generation')
      await generateAndAssignReferralCode(userId); // Retry generating a unique code
    }

    user.referrals.push({
      referralCode: newReferralCode,
      referrer: [],
      referralCount: 0,
    });

    await user.save();
    return newReferralCode;
  } catch (error) {
    console.error("Error generating referral code:", error.message);
    throw new Error(error.message);
  }
}

function generateUniqueReferralCode(firstName) {
  // Generate a unique code using UUID or any custom logic
  console.log('generating referral code...')
  const referralCode =  uuidv4().slice(0, 8).toUpperCase(); // Shorten UUID for a simple referral code
  return referralCode;
}

async function confirmedOrder(orderId) {
  try {
    const order = await findOrderById(orderId);
    if (!order) throw new Error(`Order not found with id: ${orderId}`);
    order.orderStatus = "CONFIRMED";
    return await order.save();
  } catch (error) {
    throw new Error(error.message);
  }
}

async function shipOrder(orderId) {
  try {
    const order = await findOrderById(orderId);
    if (!order) throw new Error(`Order not found with id: ${orderId}`);
    order.orderStatus = "SHIPPED";
    return await order.save();
  } catch (error) {
    throw new Error(error.message);
  }
}

async function deliveredOrder(orderId) {
  try {
    const order = await findOrderById(orderId);
    if (!order) throw new Error(`Order not found with id: ${orderId}`);
    order.orderStatus = "DELIVERED";
    return await order.save();
  } catch (error) {
    throw new Error(error.message);
  }
}

async function cancelledOrder(orderId) {
  try {
    const order = await findOrderById(orderId);
    if (!order) throw new Error(`Order not found with id: ${orderId}`);
    order.orderStatus = "CANCELLED";
    return await order.save();
  } catch (error) {
    throw new Error(error.message);
  }
}

async function findOrderById(orderId) {
  try {
    const order = await Order.findById(orderId)
      .populate("user")
      .populate({ path: "orderItems", populate: { path: "product" } })
      .populate("shippingAddress");
      return order;
    
  } catch (error) {
    throw new Error(error.message);
  }
}

async function usersOrderHistory(userId) {
  try {
    const orders = await Order.find({ user: userId, orderStatus: "PLACED", })
      .populate({ path: "orderItems", populate: { path: "product" } }).populate("shippingAddress")
      .lean();
    return orders;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getAllOrders() {
  try {
    const orders = await Order.find()
     .populate("user")
    .populate({
      path: "orderItems",
      populate: { path: "product" },
    })
    .populate("shippingAddress");
    return orders;
  } catch (error) {
    throw new Error(error.message);
  }
}


module.exports = {
  createOrder,
  placedOrder,
  confirmedOrder,
  shipOrder,
  deliveredOrder,
  cancelledOrder,
  findOrderById,
  usersOrderHistory,
  getAllOrders,
  // deleteOrder,
};
