export default function Home() {
    return (
        <div
            style={{
                color: "rgba(255,255,255,0.9)",
                backgroundColor: "rgba(0,0,0,0.8)",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <h1 style={{ fontSize: "3rem" }}>
                This is a simple "Contact-me API"
            </h1>
            <h3>Accessible on "/api/contact"</h3>
            <h3>Requires a form with 3 fields</h3>
            <ul>
                <li>fname</li>
                <li>email</li>
                <li>message</li>
            </ul>
        </div>
    );
}
