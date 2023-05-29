export const url = "https://moon-delivery-api.onrender.com/api";

export const server = "https://moon-delivery-api.onrender.com";

export const setHeaders = () => {
  const headers = {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  };

  return headers;
};
