const { EmailClient, KnownEmailSendStatus } = require("@azure/communication-email");


const sendResetPasswordEmail = async (email, resetLink) => {
    const emailClient = new EmailClient(process.env.Email_Connection_String);

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

// const sendOrderConfirmationEmail = async (order) => {
//     try {
//         const emailClient = new EmailClient(process.env.Email_Connection_String);
//         const email = order.user.email;
//         const orderDetails = order.orderItems.map(item => {
//             return `<div>
//                         <p><strong>Product:</strong> ${item.product.title}</p>
//                         <p><strong>Size:</strong> ${item.size}</p>
//                         <p><strong>Quantity:</strong> ${item.quantity}</p>
//                         <img src="${item.product.imageUrl[0]}" alt="${item.product.title}" style="max-width: 200px;"/>
//                     </div>`;
//         }).join('<br>');

//         const message = {
//             senderAddress: "DoNotReply@empressafashion.com",
//             content: {
//                 subject: "Your Order is Placed",
//                 html: `<html>
//                         <body>
//                             <p>Hello ${order.user.firstName},</p>
//                             <p>Your order has been placed successfully on ${new Date().toLocaleDateString()}.</p>
//                             <p><strong>Order Details:</strong></p>
//                             ${orderDetails}
//                             <p><strong>Total Price:</strong> ${order.totalDiscountedPrice}</p>
//                             <p>Thank you for shopping with Empressa, your tracking details will be available once your order is shipped.</p>
//                             <p>For any queries or feedback you can reach out to us at <a href="mailto:empressafashion@empressafashion.com">empressafashion@empressafashion.com</a>.</p>
//                             <p>Have a delightful day ahead ✨</p>
//                             <p>Team Empressa</p>
//                         </body>
//                     </html>`,
//             },
//             recipients: {
//                 to: [
//                     {
//                         address: email,
//                     },
//                 ],
//             },
//         };
        

//         const poller = await emailClient.beginSend(message);
//         await poller.pollUntilDone();
//         if (poller.getResult().status !== KnownEmailSendStatus.Succeeded) {
//             throw new Error("Failed to send email");
//         }
//     } catch (error) {
//         console.error("Error sending order confirmation email:", error);
//         //throw new Error("Failed to send order confirmation email");
//     }
// };

const sendOrderConfirmationEmail = async (order) => {
    try {
        const email = order.user.email;
        const emailClient = new EmailClient(process.env.Email_Connection_String);
        
        const orderDetails = order.orderItems.map(item => {
            return `<div style="margin-bottom: 20px; padding: 10px; border: 1px solid #ddd;">
                        <p style="margin: 0;"><strong>Product:</strong> ${item.product.title}</p>
                        <p style="margin: 0;"><strong>Size:</strong> ${item.size}</p>
                        <p style="margin: 0;"><strong>Quantity:</strong> ${item.quantity}</p>
                        <img src="${item.product.imageUrl[item.product.defaultImageIndex??0]}@mq" alt="${item.product.title}" style="max-width: 200px; margin-top: 10px;"/>
                    </div>`;
        }).join('<br>');

        const message = {
            senderAddress: "DoNotReply@empressafashion.com",
            content: {
                subject: "Your order is Placed",
                html: `<html>
                        <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.5;">
                            <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                                <p style="font-size: 16px;">Hello ${order.user.firstName},</p>
                                <p style="font-size: 16px;">Your order has been placed successfully on ${new Date().toLocaleDateString()}.</p>
                                <p style="font-size: 16px;"><strong>Order Details:</strong></p>
                                ${orderDetails}
                                <p style="font-size: 16px;"><strong>Total Price:</strong> ${order.totalDiscountedPrice}</p>
                                <p style="font-size: 16px;">Thank you for shopping with Empressa, your tracking details will be available once your order is shipped.</p>
                                <p style="font-size: 16px;">For any queries or feedback you can reach out to us at <a href="mailto:empressafashion@empressafashion.com" style="color: #1a73e8; text-decoration: none;">empressafashion@empressafashion.com</a>.</p>
                                <p style="font-size: 16px;">Have a delightful day ahead ✨</p>
                                <p style="font-size: 16px; font-weight: bold;">Team Empressa</p>
                            </div>
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
    }
}

const sendAccountConfirmationEmail = async (email, otp) => {
    try {
        const emailClient = new EmailClient(process.env.Email_Connection_String); 
        const message = {
            senderAddress: "DoNotReply@empressafashion.com",
            content: {
                subject: "Verify you email",
                html: `<html>
                         <div style='width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 5px; overflow: hidden;'>
                        <div style="padding: 20px; text-align: center;">
                            <h1>Empressa</h1>
                        </div>
                        <div style='padding: 30px; text-align: center; color: #333333;'>
                            <img style='max-width: 50px; margin-bottom: 10px;' src="https://blobstorage0401.blob.core.windows.net/empressa/logo.png" alt="Email Icon">
                            <h1 style='font-size: 24px; margin-bottom:20px;' >Please confirm your email address</h1>
                            <p style='font-size: 16px; line-height: 1.5; margin-bottom: 20px;'>Thanks for signing up to Empressa. We're happy to have you.</p>
                            <p style='font-size: 16px; line-height: 1.5; margin-bottom: 20px;'>Please take a second to make sure we have your correct email address.</p>
                            <a href=${process.env.FRONTEND_URL}/verify/${email}/${otp} style='display: inline-block; background-color: #4CAF50; color: #ffffff; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;'>
                                Confirm your email address
                            </a>
                            <p style='font-size: 16px; line-height: 1.5; margin-bottom: 20px;'>If you didn't sign up for Empressa,<a href="#">let us know</a>.</p>
                        </div>
                        <div style='padding: 20px; text-align: center; font-size: 12px; color: #888888'>
                            <p>Empressa. <br>Platinum Tower, Sohna Road, 1st Floor <br> Gurugram, Haryana 120001</p>
                        </div>
                        </div>
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
        console.error("Error sending account confirmation email:", error);
        //throw new Error("Failed to send order confirmation email");
    }
}



const sendOrderConfirmationEmailToAdmins = async (order, admins) => {
    try {
        const recipientEmails = admins.map(admin=> ({address: admin.email}));
        const emailClient = new EmailClient(process.env.Email_Connection_String);
        
        const orderDetails = order.orderItems.map(item => {
            return `<div style="margin-bottom: 20px; padding: 10px; border: 1px solid #ddd;">
                        <p style="margin: 0;"><strong>Product:</strong> ${item.product.title}</p>
                        <p style="margin: 0;"><strong>Size:</strong> ${item.size}</p>
                        <p style="margin: 0;"><strong>Quantity:</strong> ${item.quantity}</p>
                        <img src="${item.product.imageUrl[item.product.defaultImageIndex??0]}@mq" alt="${item.product.title}" style="max-width: 200px; margin-top: 10px;"/>
                    </div>`;
        }).join('<br>');

        const message = {
            senderAddress: "DoNotReply@empressafashion.com",
            content: {
                subject: `New Orderr Placed by ${order.user.firstName}`,
                html: `<html>
                        <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.5;">
                            <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                                <p style="font-size: 16px;">Dear Admin,</p>
                                <p style="font-size: 16px;">A new order has been placed on ${new Date().toLocaleDateString()}.</p>
                                <p style="font-size: 16px;"><strong>Order Details:</strong></p>
                                ${orderDetails}
                                <p style="font-size: 16px;"><strong>Total Price:</strong> ${order.totalDiscountedPrice}</p>
                            </div>
                        </body>
                    </html>`,
            },
            recipients: {
                to: recipientEmails,
            },
        };

        const poller = await emailClient.beginSend(message);
        await poller.pollUntilDone();
        if (poller.getResult().status !== KnownEmailSendStatus.Succeeded) {
            throw new Error("Failed to send email");
        }

    } catch (error) {
        console.error("Error sending order confirmation email:", error);
    }
}

module.exports = { sendResetPasswordEmail, sendOrderConfirmationEmail, sendAccountConfirmationEmail, sendOrderConfirmationEmailToAdmins};
