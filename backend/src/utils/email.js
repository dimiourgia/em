const {
  EmailClient,
  KnownEmailSendStatus,
} = require("@azure/communication-email");
require("dotenv").config();

const Email_Connection_String = process.env.Email_Connection_String;
const emailClient = new EmailClient(Email_Connection_String);

async function email() {
  const POLLER_WAIT_TIME = 10;

  try {

    const message = {
      senderAddress: "DoNotReply@0b92c556-0591-4ff8-bfc5-9fa5358b53c0.azurecomm.net",
      content: {
        subject: "Welcome to Azure Communication Service Email.",
        plainText: "This email message is sent from Azure Communication Service Email using JavaScript SDK.",
      },
      recipients: {
        to: [
          {
            address: "hariomtri27@gmail.com",
            displayName: "Hari Om",
          },
        ],
      }
    };

    const poller = await emailClient.beginSend(message);
    if (!poller.getOperationState().isStarted) {
      throw new Error("Poller was not started.");
    }

    let timeElapsed = 0;
    while (!poller.isDone()) {
      await poller.poll();
      console.log("Email send polling in progress");

      await new Promise((resolve) =>
        setTimeout(resolve, POLLER_WAIT_TIME * 1000)
      );
      timeElapsed += POLLER_WAIT_TIME;

      if (timeElapsed > 18 * POLLER_WAIT_TIME) {
        throw new Error("Polling timed out.");
      }
    }
    if (poller.getResult().status === KnownEmailSendStatus.Succeeded) {
      console.log(
        `Successfully sent the email (operation id: ${poller.getResult().id})`
      );
    } else {
      throw new Error(poller.getResult().error);
    }
  } catch (e) {
    console.error(e);
  }
}

email();
