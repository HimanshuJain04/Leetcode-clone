import nodemailer from "nodemailer";

export const sendMail = async ({ body, sendTo, subject }) => {
    try {
        //true for 465 and false for 587
        const transporter = nodemailer.createTransport(
            {
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS,
                },
            }
        );

        const options = {
            from: process.env.MAIL_USER,
            to: sendTo,
            subject: subject,
            html: body
        };

        return await transporter.sendMail(options);

    } catch (error) {
        console.error("Error sending email:", err);
        throw new Error("Failed to send email. Please try again later.");
    }
}