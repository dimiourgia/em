const { EmailClient, KnownEmailSendStatus } = require("@azure/communication-email");
const orderService = require("../services/order.service");
const emailClient = new EmailClient(process.env.Email_Connection_String);

const sendResetPasswordEmail = async (email, resetLink) => {
    const message = {
        senderAddress: "DoNotReply@0b92c556-0591-4ff8-bfc5-9fa5358b53c0.azurecomm.net",
        content: {
            subject: "Link to Reset Your Password",
            plainText: `Hi,

Greetings!

You are just a step away from accessing your Empressa account.

We are sharing a link to access your account and it is valid for 10 minutes, in case of invalid or  expired link please navigate back to Forgot Password and try again.
Upon opening the link. you'll be prompted to set a new password immediately. This is to ensure that only you have access to your account.

Click the link to reset your password:  ${resetLink}

Expires in: 10 minutes

Best Regards,
Team Empressa`,
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
