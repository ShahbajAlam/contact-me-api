import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

const POST = async (req: NextRequest) => {
    const { fname, email, message } = await req.json();

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            port: 465,
            host: "smtp.gmail.com",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
            secure: true,
        });

        const mailOptions = {
            to: "shahbajalam78@gmail.com",
            subject: `New message from ${fname}`,
            html: `
            <div
                style="
                    font-family: sans-serif;
                    border-radius: 15px;
                    background: linear-gradient(to top, #181717, #313130);
                    color: aliceblue;
                    overflow: hidden;
                "
            >
                <div style="padding: 1rem">
                    <h3 style="margin: 0">Hi Shahbaj Alam,</h3>
                </div>
                <div>
                    <h3 style="padding: 2rem 1rem; margin: 0">${message}</h3>
                    <p
                    style="
                        text-decoration: none;
                        margin: 0;
                        padding: 1rem;
                        font-size: 1.1rem;
                    "
                    >
                    ${email}
                    </p>
                </div>
            </div>
            `,
        };

        await transporter.sendMail(mailOptions);
        return NextResponse.json({
            status: 200,
            message: "Message is sent successfully",
        });
    } catch (error) {
        if (error instanceof Error)
            return NextResponse.json({ status: 401, error: error });
    }
};

export { POST };
