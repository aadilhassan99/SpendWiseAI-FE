const TOKEN_KEY = "spendwise_access_token";

export const authStorage = {
  getToken: () =>
    typeof window === "undefined"
      ? null
      : window.localStorage.getItem(TOKEN_KEY),
  setToken: (token: string) => window.localStorage.setItem(TOKEN_KEY, token),
  clearToken: () => window.localStorage.removeItem(TOKEN_KEY),
};
