import emailjs from "@emailjs/browser";

export default async function handler(req : any, res : any) {
  if (req.method === "POST") {
    try {
      const { message, user_email } = req.body;

      const result = await emailjs.send(
        process.env.SERVICE_ID!,
        process.env.TEMPLATE_ID!,
        {
          message,
          user_email,
        },
        process.env.PUBLIC_KEY!
      );

      res.status(200).json({ message: "Email sent successfully", result });
    } catch (error) {
      res.status(500).json({ message: "Failed to send email", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
