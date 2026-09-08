const BASE_URL = "http://localhost:8080/api";

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export const postData = async (endpoint, payload) => {
  const path = endpoint.replace(/^\//, "");

  const response = await fetch(`${BASE_URL}/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new ApiError(`Failed to post data to ${path}`, response.status);
  }

  return await response.json();
};

export function getSubmitErrorMessage(err) {
  if (err instanceof ApiError) {
    if (err.status === 400) {
      return "Bad request — check your input fields.";
    }
    return `Server error (${err.status}). Please try again.`;
  }

  return "Could not connect to the server. Is the backend running?";
}
