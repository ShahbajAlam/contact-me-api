import { NextRequest, NextResponse } from "next/server";

const allowedOrigins = [
    "http://localhost:5173",
    "https://shahbajalam-portfolio.netlify.app/",
];

const middleware = (req: NextRequest) => {
    const origin = req.headers.get("origin");

    if (origin && !allowedOrigins.includes(origin)) {
        return new NextResponse(null, {
            status: 400,
            statusText: "Bad Request",
            headers: {
                "Content-Type": "text/plain",
            },
        });
    }

    return NextResponse.next();
};

export const config = {
    matcher: "/api/:path*",
};

export { middleware };
