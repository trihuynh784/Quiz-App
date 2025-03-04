const API_DOMAIN = "http://localhost:3002/";
// const API_DOMAIN = "https://quiz-db.vercel.app/";

export const get = async (path) => {
  const response = await fetch(API_DOMAIN + path);
  const result = await response.json();
  return result;
};

export const post = async (path, options) => {
  const response = await fetch(API_DOMAIN + path, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify(options),
  })
  const result = await response.json();
  return result;
};
