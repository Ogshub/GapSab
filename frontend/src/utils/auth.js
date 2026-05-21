const AUTH_TOKEN_KEY = "gapsab_auth_token";

const canUseStorage = typeof window !== "undefined";

export const getAuthToken = () => {
    if (!canUseStorage) return "";
    return window.localStorage.getItem(AUTH_TOKEN_KEY) || "";
};

export const setAuthToken = (token) => {
    if (!canUseStorage) return;
    if (!token) return;
    window.localStorage.setItem(AUTH_TOKEN_KEY, token);
};

export const clearAuthToken = () => {
    if (!canUseStorage) return;
    window.localStorage.removeItem(AUTH_TOKEN_KEY);
};

export const getAuthConfig = (config = {}) => {
    const token = getAuthToken();

    return {
        ...config,
        withCredentials: true,
        headers: {
            ...(config.headers || {}),
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
    };
};
