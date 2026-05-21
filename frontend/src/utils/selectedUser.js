const SELECTED_USER_KEY = "gapsab_selected_user_id";

const canUseStorage = typeof window !== "undefined";

export const getStoredSelectedUserId = () => {
    if (!canUseStorage) return "";
    return window.localStorage.getItem(SELECTED_USER_KEY) || "";
};

export const setStoredSelectedUserId = (userId) => {
    if (!canUseStorage || !userId) return;
    window.localStorage.setItem(SELECTED_USER_KEY, userId);
};

export const clearStoredSelectedUserId = () => {
    if (!canUseStorage) return;
    window.localStorage.removeItem(SELECTED_USER_KEY);
};
