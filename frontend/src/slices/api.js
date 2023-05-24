export const url = "http://localhost:5000/api";

export const server = "http://localhost:5000";

export const setHeaders = () => {
  const headers = {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  };

  return headers;
};
