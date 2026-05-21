export const getAuthCookieOptions = (req, overrides = {}) => {
    const origin = req.get("origin") || "";
    const isProduction =
        process.env.NODE_ENV === "production" ||
        (origin !== "" && !origin.includes("localhost"));

    return {
        httpOnly: true,
        sameSite: isProduction ? "none" : "lax",
        secure: isProduction,
        ...overrides
    };
};

export const clearAuthCookie = (req, res) => {
    res.clearCookie("token", getAuthCookieOptions(req));
};
