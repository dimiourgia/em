const { EmailClient, KnownEmailSendStatus } = require("@azure/communication-email");
const emailClient = new EmailClient(process.env.Email_Connection_String);

const sendResetPasswordEmail = async (email, resetLink) => {
    const message = {
        senderAddress: "DoNotReply@0b92c556-0591-4ff8-bfc5-9fa5358b53c0.azurecomm.net",
        content: {
            subject: "Link to Reset Your Password",
            plainText: `Hi,

Greetings!

You are just a step away from accessing your Empressa account.

We are sharing a link to access your account and it is valid for 10 minutes, in case of invalid or expired link please navigate back to Forgot Password and try again.
Upon opening the link, you'll be prompted to set a new password immediately. This is to ensure that only you have access to your account.

Click the link to reset your password: ${resetLink}

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

const sendOrderConfirmationEmail = async (order) => {
    try {
        const email = order.user.email;
        const orderDetails = order.orderItems.map(item => {
            return `<div>
                        <p><strong>Product:</strong> ${item.product.title}</p>
                        <p><strong>Size:</strong> ${item.size}</p>
                        <p><strong>Quantity:</strong> ${item.quantity}</p>
                        <img src="${item.product.imageUrl[0]}" alt="${item.product.title}" style="max-width: 200px;"/>
                    </div>`;
        }).join('<br>');

        const message = {
            senderAddress: "DoNotReply@0b92c556-0591-4ff8-bfc5-9fa5358b53c0.azurecomm.net",
            content: {
                subject: "Your Order is Placed",
                html: `<html>
                        <body>
                            <p>Hello ${order.user.firstName},</p>
                            <p>Your order has been placed successfully on ${new Date().toLocaleDateString()}.</p>
                            <p><strong>Order Details:</strong></p>
                            ${orderDetails}
                            <p><strong>Total Price:</strong> ${order.totalDiscountedPrice}</p>
                            <p>Thank you for shopping with Empressa, your tracking details will be available once your order is shipped.</p>
                            <p>For any queries or feedback you can reach out to us at <a href="mailto:empressa.queries@gmail.com">empressa.queries@gmail.com</a>.</p>
                            <p>Have a delightful day ahead ✨</p>
                            <p>Team Empressa</p>
                        </body>
                    </html>`,
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
        //throw new Error("Failed to send order confirmation email");
    }
};

module.exports = { sendResetPasswordEmail, sendOrderConfirmationEmail };
