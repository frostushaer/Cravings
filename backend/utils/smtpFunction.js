import nodemailer from 'nodemailer';

async function sendEmail(userEmail, message) {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.AUTH_EMAIL,
                pass: process.env.AUTH_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: userEmail,
            subject: 'Verification Code from Cravings',
            html: `<h1>Cravings Email Verificaion</h1>
                <p>Your verification code is : </p>
                <h2 style="color: blue;">${message}</h2>
                <p>Use this code to verify your email address</p>
                <p>If you didnot request this email, Ignore it.</p>
                <p>Thank you for choosing Cravings</p>
                <p>Cravings Team</p>`
        };

        await transporter.sendMail(mailOptions);
        console.log("Verification code sent to email");
    } catch (error) {
        console.log(error);
    }
}

export default sendEmail;