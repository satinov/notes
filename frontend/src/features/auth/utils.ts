const TOKEN_NAME = "token";

export const setToken = (token: string) => {
  localStorage.setItem(TOKEN_NAME, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_NAME);
};

export const clearToken = () => {
  localStorage.removeItem(TOKEN_NAME);
};
