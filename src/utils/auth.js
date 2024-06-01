export const getToken = () => {
  const token = localStorage.getItem("custom-auth-token");
  return token;
};
export const TOKEN_TYPE = {
  BEARER: "Bearer",
};
