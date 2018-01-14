const endpoint = "https://small-project-api.herokuapp.com/";

const getResponse = ({ method, path, body }) => {
  const headers = {
    "Content-Type": "application/json",
    "X-Access-Token": localStorage.getItem("jwt")
  };
  return fetch(`${endpoint}/${path}`, {
    method,
    headers,
    body
  }).then(response => {
    if (method !== "DELETE") {
      return response.json();
    }
  });
};


export { getResponse }