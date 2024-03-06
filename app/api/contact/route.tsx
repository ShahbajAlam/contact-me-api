import { Resend } from "resend";
import { NextResponse } from "next/server";
import { mailBody } from "@/mailBody";

const allowedOrigins = [process.env.DEV, process.env.PROD];

const POST = async (req: Request) => {
    const origin = req.headers.get("origin");
    const { fname, email, message } = await req.json();

    if (!origin || (origin && !allowedOrigins.includes(origin))) {
        return new NextResponse(null, {
            status: 400,
            statusText: "Bad Request",
        });
    }

    try {
        const resend = new Resend(process.env.API_KEY);
        const { data, error } = await resend.emails.send({
            from: process.env.FROM,
            to: process.env.TO,
            subject: `New message from ${fname}`,
            html: mailBody(message, email),
        });

        if (error)
            return new NextResponse(null, {
                status: 400,
                statusText: "Could not send the message",
            });
        return new NextResponse(JSON.stringify(data), {
            headers: {
                "Access-Control-Allow-Origin": origin,
                "Access-Control-Allow-Methods": "POST",
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        if (error instanceof Error)
            return new NextResponse(null, {
                status: 401,
                statusText: error.message,
            });
    }
};

export { POST };
