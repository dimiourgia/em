const { EmailClient, KnownEmailSendStatus } = require("@azure/communication-email");

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

module.exports = { sendResetPasswordEmail };
