import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const POST = async (req: NextRequest) => {
    const { fname, email, message } = await req.json();

    try {
        const resend = new Resend("re_BY6yRV8T_AnYNXw1HVrmuhyBXRj7yb6Co");
        const { data, error } = await resend.emails.send({
            from: process.env.FROM,
            to: process.env.TO,
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

        if (error) return NextResponse.json({ error });
        return NextResponse.json({ status: 200, data });
    } catch (error) {
        if (error instanceof Error)
            return NextResponse.json({ status: 401, error: error.message });
    }
};

export { POST };
