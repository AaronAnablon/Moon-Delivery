export const url = "https://moon-delivery-api.onrender.com/api";

export const server = "https://moon-delivery-api.onrender.com";

// export const url = "http://localhost:5000/api";

// export const server = "http://localhost:5000";



export const setHeaders = () => {
  const headers = {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  };

  return headers;
};
