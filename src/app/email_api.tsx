import emailjs from "@emailjs/browser";
import type { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, message } = req.body;

    const serviceID = process.env.SERVICE_ID!;
    const templateID = process.env.TEMPLATE_ID!;
    const userID = process.env.KEY!;

    const templateParams = {
      from_email: email,
      message: message,
    };

    try {
      await emailjs.send(serviceID, templateID, templateParams, userID);
      res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to send email' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
