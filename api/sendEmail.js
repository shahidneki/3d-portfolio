const Sib = require("sib-api-v3-sdk");

require("dotenv").config({ path: "../.env" });

const client = Sib.ApiClient.instance;

const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.SENDINBLUE_API_KEY;
const tranEmailApi = new Sib.TransactionalEmailsApi();

const sender = {
  email: "shahidneki@gmail.com",
};

const receivers = [
  {
    email: "shahidneki@gmail.com",
  },
];
tranEmailApi
  .sendTransacEmail({
    sender,
    to: receivers,
    subject: "This is a test for my contact form",
    textContent: `This is a test for my contact form`,
  })
  .then(console.log)
  .catch(console.error);
