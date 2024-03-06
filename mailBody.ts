const mailBody = (message: string, email: string) => {
    return `
        <div
            style="
                font-family: sans-serif;
                border-radius: 15px;
                background: #151515;
                color: aliceblue;
                overflow: hidden;
            "
        >
            <div>
                <h3 style="padding: 2rem 1rem; margin: 0">
                    ${message}
                </h3>
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
    `;
};

export { mailBody };
