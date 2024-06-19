const { EmailClient, KnownEmailSendStatus } = require("@azure/communication-email");
const orderService = require("../services/order.service");
const emailClient = new EmailClient(process.env.Email_Connection_String);

const sendResetPasswordEmail = async (email, resetLink) => {
    const message = {
        senderAddress: "DoNotReply@0b92c556-0591-4ff8-bfc5-9fa5358b53c0.azurecomm.net",
        content: {
            subject: "Reset Your Password",
            plainText: `Click the link to reset your password: ${resetLink}`,
        },
        recipients: {
            to: [
                {
                    address: email,
                },
            ],
        },
    };

    const poller = await emailClient.beginSend(message);
    await poller.pollUntilDone();
    if (poller.getResult().status !== KnownEmailSendStatus.Succeeded) {
        throw new Error("Failed to send email");
    }
};

const sendOrderConfirmationEmail = async (orderId) => {
    try {
        const order = await orderService.findOrderById(orderId);
        const email = order.user.email;
        const orderDetails = order.orderItems.map(item => {
            return `Product: ${item.product.title}, Size: ${item.size}, Quantity: ${item.quantity}`;
        }).join('\n');

        const message = {
            senderAddress: "DoNotReply@0b92c556-0591-4ff8-bfc5-9fa5358b53c0.azurecomm.net",
            content: {
                subject: "Your Order is Placed",
                plainText: `Hello ${order.user.firstName},\n\nYour order has been placed successfully.\n\nOrder Details:\n${orderDetails}\n\nTotal Price: ${order.totalDiscountedPrice}\n\nThank you for shopping with us!`,
            },
            recipients: {
                to: [
                    {
                        address: email,
                    },
                ],
            },
        };

        const poller = await emailClient.beginSend(message);
        await poller.pollUntilDone();
        if (poller.getResult().status !== KnownEmailSendStatus.Succeeded) {
            throw new Error("Failed to send email");
        }
    } catch (error) {
        console.error("Error sending order confirmation email:", error);
        throw new Error("Failed to send order confirmation email");
    }
};

module.exports = { sendResetPasswordEmail, sendOrderConfirmationEmail };
