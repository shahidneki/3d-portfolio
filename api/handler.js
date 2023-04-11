import Sib from "sib-api-v3-sdk";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const client = Sib.ApiClient.instance;

const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.SENDINBLUE_API_KEY;
const tranEmailApi = new Sib.TransactionalEmailsApi();

const sender = {
  email: "shahidneki@gmail.com",
};

export default async (req, res) => {
  if (req.method === "POST") {
    const { name, email, message } = req.body;

    const receivers = [
      {
        email: "shahidneki@gmail.com",
      },
    ];

    const emailData = {
      sender,
      to: receivers,
      subject: `New message from ${name}`,
      htmlContent: `<html><body><p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Message:</b> ${message}</p></body></html>`,
    };

    try {
      const apiResponse = await tranEmailApi.sendTransacEmail(emailData);
      res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Something went wrong!" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};
