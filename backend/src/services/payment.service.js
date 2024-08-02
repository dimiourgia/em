const razorpay = require("../config/razorpayClient");
const orderService = require("../services/order.service.js");
const cartService = require("../services/cart.service.js");
const Product = require("../models/product.model.js");
const { sendOrderConfirmationEmail } = require("../services/email.service.js");

const createPaymentLink = async (orderId) => {
  try {
    const order = await orderService.findOrderById(orderId);

    const paymentLinkRequest = {
      amount: order.totalDiscountedPrice * 100,
      currency: "INR",
      customer: {
        name: order.user.firstName + " " + order.user.lastName,
        contact: order.user.mobile,
        email: order.user.email,
      },
      notify: {
        sms: true,
        email: true,
      },
      reminder_enable: true,
      callback_url: `http://localhost:5173/payment/${orderId}`,
      callback_method: "get",
    };

    const paymentLink = await razorpay.paymentLink.create(paymentLinkRequest);

    const paymentLinkId = paymentLink.id;
    const payment_link_url = paymentLink.short_url;

    // Return the payment link URL and ID in the response
    const resData = {
      paymentLinkId: paymentLinkId,
      payment_link_url,
    };
    return resData;
  } catch (error) {
    console.error("Error creating payment link:", error);
    throw new Error(error.message);
  }
};

const updatePaymentInformation = async (reqData) => {
  const paymentId = reqData.payment_id??'COD';
  const orderId = reqData.order_id;

  try {
    const order = await orderService.findOrderById(orderId);

    const payment = {status:'captured'}//await razorpay.payments.fetch(paymentId);

    if (payment.status === "captured" || true) { {/* just for now */}
      // Clear the user's cart after successful payment
      await cartService.clearCart(order.user._id);

      // Update order status and payment details
      for (const item of order.orderItems) {
        const product = await Product.findById(item.product._id);
        const productSize = product.sizes.find(size => size.name === item.size);

        if (productSize) {
          productSize.quantity -= item.quantity;
          if (productSize.quantity < 0) {
            productSize.quantity = 0;
          }
        }
        await product.save();
      }

      await orderService.placedOrder(orderId);
      // order.paymentDetails.paymentId = paymentId;
      // order.paymentDetails.status = "COMPLETED";
      // order.orderStatus = "PLACED";
      //await order.save();

      await sendOrderConfirmationEmail(orderId);
    }

    const resData = { message: "Your order is placed", success: true };
    return resData;
  } catch (error) {
    console.error("Error processing payment:", error);
    throw new Error(error.message);
  }
};

module.exports = { createPaymentLink, updatePaymentInformation };
