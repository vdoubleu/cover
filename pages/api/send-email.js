import { sendMail } from './utils.js';

export default function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
    return;
  }
    
  const succFun = () => {
    res.status(200).send({
      message: 'Email sent'
    });
  };

  const failFun = (error) => {
    res.status(500).send({
      message: "Error " + error,
      error: error
    });
  };

  const apiKey = process.env.SENDGRID_API_KEY;

  console.log("api key" + apiKey);
  sendMail(apiKey, succFun, failFun, req.body.email, req.body.data);
}
