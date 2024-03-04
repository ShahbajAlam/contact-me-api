import { Resend } from "resend";
import { NextResponse } from "next/server";

const allowedOrigins = [
    "http://localhost:5173",
    "https://shahbajalam-portfolio.netlify.app",
];

const POST = async (req: Request) => {
    const origin = req.headers.get("origin");
    const { fname, email, message } = await req.json();

    if (origin && !allowedOrigins.includes(origin)) {
        return new NextResponse(null, {
            status: 400,
            statusText: "Bad Request",
        });
    }

    try {
        const resend = new Resend("re_BY6yRV8T_AnYNXw1HVrmuhyBXRj7yb6Co");
        const { data, error } = await resend.emails.send({
            from: "onboarding@resend.dev",
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
