import { addRequestInterceptor, addResponseInterceptor } from "./fetch-client";

/**
 * Add request interceptor
 * example: add token to authorization
 */
addRequestInterceptor(async (input, init = {}) => {
  const token = "token_example";
  const headers = {
    ...(init.headers || {}),
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  return [input, { ...init, headers }];
});

addResponseInterceptor(async (response) => {
  if (!response.ok) {
    console.error("Fetch error:", response.status);
  }

  return response;
});
